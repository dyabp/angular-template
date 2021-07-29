import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { TranslateService } from '@ngx-translate/core';

import { NzIconService } from 'ng-zorro-antd/icon';
import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ConfigStateService } from '@abp/ng.core';
import { AppMenus } from '../AppMenus';
import { LocalizationExtendService } from '../i18n/localization.service';
import { environment } from '@env/environment';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private translate: TranslateService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private configStateService: ConfigStateService,
    @Inject(ALAIN_I18N_TOKEN) private localizationExtendService: LocalizationExtendService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
    private injector: Injector,
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  private viaMock(resolve: any, reject: any): void {
    // const tokenData = this.tokenService.get();
    // if (!tokenData.token) {
    //   this.injector.get(Router).navigateByUrl('/passport/login');
    //   resolve({});
    //   return;
    // }
    // mock
    const app: any = {
      name: `ng-alain`,
      description: `Ng-zorro admin panel front-end framework`,
    };
    const user: any = {
      name: 'Admin',
      avatar: './assets/tmp/img/avatar.jpg',
      email: 'cipchk@qq.com',
      token: '123456789',
    };
    // Application information: including site name, description, year
    this.settingService.setApp(app);
    // User information: including name, avatar, email address
    this.settingService.setUser(user);
    // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
    this.aclService.setFull(true);
    // Menu data, https://ng-alain.com/theme/menu
    this.menuService.add([
      {
        text: 'Main',
        group: true,
        children: [
          {
            text: 'Dashboard',
            link: '/dashboard',
            icon: { type: 'icon', value: 'appstore' },
          },
        ],
      },
    ]);
    // Can be set page suffix title, https://ng-alain.com/theme/title
    this.titleService.suffix = app.name;

    resolve({});
  }

  // I18n
  private localization(resolve: any, reject: any) {
    this.configStateService
      .getDeep$('localization')
      .pipe(filter((cultureName) => !!cultureName))
      .subscribe((res) => {
        this.localizationExtendService.languages = res.languages;
        this.localizationExtendService.currentLanguage = res.currentCulture;
        this.authPermission(resolve, reject);
      });
  }
  // auto
  private authPermission(resolve: any, reject: any): void {
    this.configStateService.getOne$('auth').subscribe((auth) => {
      if (!auth) {
        return;
      }
      const permissions = Object.keys(auth.grantedPolicies);
      this.aclService.setRole(permissions);
      this.menuService.add(AppMenus.Menus);
      this.userInfo(resolve, reject);
    });
  }
  // user
  private userInfo(resolve: any, reject: any): void {
    this.configStateService.getAll$().subscribe((res) => {
      if (!Object.keys(res).length) {
        return;
      }
      this.settingService.setUser(res.currentUser);
      resolve({});
    });
  }

  load(): Promise<any> {
    // only works with promises
    return new Promise((resolve, reject) => {
      // 设置项目信息
      this.settingService.setApp({ name: environment.application.name, logoSrc: environment.application.logoUrl });
      this.localization(resolve, reject);
    });
  }
}

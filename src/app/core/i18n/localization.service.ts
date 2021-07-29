import { LocalizationService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { AlainI18NService } from '@delon/theme';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LocalizationExtendService implements AlainI18NService {
  [key: string]: any;

  private change$ = new BehaviorSubject<string>(null);

  languages: any[];

  /** 默认语言 */
  get defaultLang(): string {
    return this._default;
  }
  /** 当前语言 */
  currentLang: any;
  use(lang: string, emit?: boolean): void {}
  getLangs(): any[] {
    return this.langs;
  }
  constructor(private localizationService: LocalizationService) {}

  get change(): Observable<string> {
    return this.change$.asObservable().pipe(filter((w) => w != null));
  }

  fanyi(key: string, interpolateParams?: Object, isSafe?: boolean): string {
    if (key) {
      return this.localization(key, null);
    }
    return '';
  }

  /**
   * ABP的本地化翻译
   * @param key 国际化键值
   * @param sourceName 语言源
   */
  localization(key: string, sourceName: string): string {
    sourceName = sourceName || environment.localization.defaultResourceName;
    return this.localizationService.instant(key, sourceName);
  }

  /**
   * 填充参数到字符串占位符 如: 你好{0} -> 你好世界
   * @param str 有占位符的模板
   * @param args 参数
   */
  formatString(str: string, args: any[]): string {
    let result: string = str;
    for (let i = 0; i < args.length; i++) {
      const placeHolder = '{' + i + '}';
      result = this.replaceAll(result, placeHolder, args[i]);
    }
    return result;
  }

  private replaceAll(str, search, replacement): string {
    const fix = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return str.replace(new RegExp(fix, 'g'), replacement);
  }
}

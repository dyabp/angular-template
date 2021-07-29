import { NgModule, Optional, SkipSelf } from '@angular/core';
import { LocalizationExtendService } from './i18n/localization.service';
import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
  providers: [LocalizationExtendService],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

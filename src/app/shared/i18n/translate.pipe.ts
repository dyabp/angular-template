import { Inject, Pipe, PipeTransform } from '@angular/core';
import { ALAIN_I18N_TOKEN } from '@delon/theme';
import { environment } from '@env/environment';
import { LocalizationExtendService } from '../../core/i18n/localization.service';

@Pipe({
  name: '_translate',
})
export class TranslateVNextPipe implements PipeTransform {
  localizationSourceName = environment.localization.defaultResourceName;
  constructor(@Inject(ALAIN_I18N_TOKEN) private i18nSrv: LocalizationExtendService) {}
  transform(key: string | { toString(): string }, ...args: unknown[]): string {
    let localizedText: string;
    if (typeof key !== 'string') {
      localizedText = key?.toString().includes('') ? key?.toString() : '' + key?.toString();
    } else {
      localizedText = this.i18nSrv.localization(key?.includes('::') ? key : `::${key}`, this.localizationSourceName);
    }

    if (!localizedText) {
      localizedText = key?.toString();
    }

    if (!args || !args.length) {
      return localizedText;
    }
    return this.i18nSrv.formatString(localizedText, args);
  }
}

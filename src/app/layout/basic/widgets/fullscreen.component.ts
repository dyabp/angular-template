import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import * as screenfull from 'screenfull';

@Component({
  selector: 'header-fullscreen',
  template: `
    <i nz-icon [nzType]="status ? 'fullscreen-exit' : 'fullscreen'"></i>
    {{ (status ? 'Menu:Full.Screen.Exit' : 'Menu:Full.Screen') | _translate }}
  `,
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.d-block]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderFullScreenComponent {
  status = false;
  private get sf(): screenfull.Screenfull {
    return screenfull as screenfull.Screenfull;
  }

  @HostListener('window:resize')
  _resize(): void {
    this.status = this.sf.isFullscreen;
  }

  @HostListener('click')
  _click(): void {
    if (this.sf.isEnabled) {
      this.sf.toggle();
    }
  }
}

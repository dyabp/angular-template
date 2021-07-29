// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { DelonMockModule } from '@delon/mock';

const baseUrl = 'http://localhost:4200';
const authUrl = 'https://localhost:44386';
const serviceUrl = 'https://localhost:44342';

export const environment = {
  production: false,
  useHash: true,
  localization: {
    defaultResourceName: 'Blog',
  },
  api: {
    baseUrl: './',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh',
  },
  application: {
    baseUrl,
    name: 'Blog',
    logoUrl: '/assets/logo.png',
  },
  oAuthConfig: {
    issuer: authUrl,
    redirectUri: baseUrl,
    clientId: 'Blog_App',
    responseType: 'code',
    scope: 'offline_access openid profile role email phone Blog',
  },
  apis: {
    default: {
      url: serviceUrl,
      rootNamespace: 'Bcvp.Blog',
    },
  },
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

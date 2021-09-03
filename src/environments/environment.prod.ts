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

import {
	OAUTH_DOMAIN,
	OAUTH_REDIRECT_SIGN_IN,
	OAUTH_REDIRECT_SIGN_OUT,
	USER_POOL_CLIENT_ID,
	USER_POOL_ID
} from '$env/static/public';
import { Amplify } from 'aws-amplify';

export const prerender = true;
export const csr = true;
export const ssr = false;

Amplify.configure({
	Auth: {
		Cognito: {
			userPoolId: USER_POOL_ID,
			userPoolClientId: USER_POOL_CLIENT_ID,
			signUpVerificationMethod: 'code',
			loginWith: {
				oauth: {
					domain: OAUTH_DOMAIN,
					scopes: ['openid'],
					redirectSignIn: [OAUTH_REDIRECT_SIGN_IN],
					redirectSignOut: [OAUTH_REDIRECT_SIGN_OUT],
					responseType: 'code'
				}
			}
		}
	}
});

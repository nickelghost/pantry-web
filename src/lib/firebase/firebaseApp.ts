import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID } from '$env/static/public';
import { getApps, initializeApp } from 'firebase/app';

const firebaseApp = !getApps().length
	? initializeApp({
			apiKey: FIREBASE_API_KEY,
			projectId: FIREBASE_PROJECT_ID,
			authDomain: FIREBASE_AUTH_DOMAIN
		})
	: getApps()[0];

export default firebaseApp;

import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID } from '$env/static/public';
import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';

let firebaseApp: FirebaseApp | undefined;

if (!getApps().length) {
	firebaseApp = initializeApp({
		apiKey: FIREBASE_API_KEY,
		projectId: FIREBASE_PROJECT_ID,
		authDomain: FIREBASE_AUTH_DOMAIN
	});
} else {
	firebaseApp = getApps()[0];
}

export default firebaseApp;

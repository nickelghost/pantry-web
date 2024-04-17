import firebaseApp from '$lib/firebase/firebaseApp';
import { getAuth, getIdToken } from 'firebase/auth';

const getAccessToken = async (): Promise<string> => {
	const auth = getAuth(firebaseApp);
	if (!auth.currentUser) {
		throw 'User not found!';
	}

	return await getIdToken(auth.currentUser);
};

export default getAccessToken;

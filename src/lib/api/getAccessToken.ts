import { fetchAuthSession } from 'aws-amplify/auth';

const getAccessToken = async (): Promise<string> => {
	const { accessToken } = (await fetchAuthSession()).tokens ?? {};
	if (!accessToken) {
		throw 'Token not found!';
	}
	return accessToken.toString();
};

export default getAccessToken;

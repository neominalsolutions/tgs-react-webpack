import http from './client';

export async function getUser(endpoint: string) {
	try {
		const response = (await http.get(endpoint)).data;
		return response;
	} catch (error) {
		console.log('error', error);
	}
}

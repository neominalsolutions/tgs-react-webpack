import http from './client';


export async function getUser(endpoint: string) {
	try {
		const response = (await http.get(endpoint)).data;
		return response;
	} catch (error) {
		console.log('error', error);
	}
}

export async function getUserById(endpoint: string, id: number) {
	try {
		const response = (await http.get(`${endpoint}?userId=${id}`)).data;
		return response;
	} catch (error) {
		console.log('error', error);
	}
}

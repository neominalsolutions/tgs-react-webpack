import axios, {
	Axios,
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';

// her network işleminde burası tetiklenir.

const http: AxiosInstance = axios.create({
	timeout: 5000,
	timeoutErrorMessage: 'İstek zaman aşımına uğradı',
	baseURL: 'https://jsonplaceholder.typicode.com/',
});

// Then
const onRequest = (
	config: InternalAxiosRequestConfig<any>
): InternalAxiosRequestConfig => {
	console.info(`[request] [${JSON.stringify(config)}]`);
	return config;
};

// Catch
const onRequestError = (error: AxiosError): Promise<AxiosError> => {
	console.error(`[request error] [${JSON.stringify(error)}]`);
	return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
	console.info(`[response] [${JSON.stringify(response)}]`);
	return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
	console.error(`[response error] [${JSON.stringify(error)}]`);
	return Promise.reject(error);
};

http.interceptors.request.use(onRequest, onRequestError);
http.interceptors.response.use(onResponse, onResponseError);

export default http;

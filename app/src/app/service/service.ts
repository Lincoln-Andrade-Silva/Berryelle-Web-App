import axios, {AxiosError, AxiosResponse} from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import {DataListResponse} from '../model/DataListResponse';
import {DataResponse} from '../model/DataResponse';
import {UserFormValues, UserResponse} from '../model/UserResponse';
import {ProductResponse} from '../model/Product';
import {store} from '../store/store';
import ErrorHandler from './error-handler';

const authModule = '/auth';
const userModule = '/auth/user';
const productModule = '/product';

const BASE_URL = "http://localhost:8080";

const response = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (config.headers) {
        if (token) {
            config.headers.Authorization = `${token}`;
        }

        if (timezone) {
            config.headers.Timezone = timezone;
        }
    }

    return config;
}, (error: any) => {
    return Promise.reject(error);
});

axios.interceptors.response.use(
    response => {
        return response;
    },
    (error: AxiosError<any>) => {
        return ErrorHandler.handleError(error, store.commonStore.language);
    }
);

const requests = {
    get: <T>(url: string, baseURL: string = axios.defaults.baseURL ?? '') => axios.get<T>(baseURL + url).then(response),
    delete: <T>(url: string, baseURL: string = axios.defaults.baseURL ?? '') => axios.delete<T>(baseURL + url).then(response),
    put: <T>(url: string, body?: {}, baseURL: string = axios.defaults.baseURL ?? '') => axios.put<T>(baseURL + url, body).then(response),
    post: <T>(url: string, body: {}, baseURL: string = axios.defaults.baseURL ?? '') => axios.post<T>(baseURL + url, body).then(response),
    xls: (url: string, type?: string, baseURL: string = axios.defaults.baseURL ?? ''): Promise<Blob> => axios.get(`${baseURL + url}/xls${type ? `?type=${type}` : ''}`, {responseType: 'blob'}).then(response),
};

const auth = {
    edit: (user: UserFormValues) => requests.put<UserResponse>(authModule + '/edit', user, BASE_URL).then((response) => {
        return response
    }),
    login: (user: UserFormValues) => requests.post<UserResponse>(authModule + '/login', user, BASE_URL).then((response) => {
        return response
    }),
    register: (user: UserFormValues) => requests.post<UserResponse>(authModule + '/register', user, BASE_URL).then((response) => {
        return response
    }),
};

const product = {
    list: (page: number, pageSize?: number, search?: string) => requests.get<DataListResponse<ProductResponse>>(`${productModule}/list?page=${page}&pageSize=${pageSize ?? 10}&search=${search ?? ''}`, BASE_URL),
    create: (formData: FormData) => requests.post<DataResponse<ProductResponse>>(`${productModule}/create`, formData, BASE_URL),
    edit: (id: any, formData: FormData) => requests.put<DataResponse<ProductResponse>>(`${productModule}/edit/${id}`, formData, BASE_URL),
    remove: (id: any) => requests.delete<void>(productModule + `/delete/${id}`, BASE_URL),
    checkout: (checkoutItems: { productId: string, quantity: number }[])=> requests.post<void>(`${productModule}/checkout`, checkoutItems, BASE_URL),
};


const user = {
    remove: (id: any) => requests.delete<void>(userModule + `/${id}`, BASE_URL),
    get: () => requests.get<DataResponse<UserResponse>>(userModule + '/get', BASE_URL),
    list: (page: number, pageSize?: number, search?: string) => requests.get<DataListResponse<UserResponse>>(`${userModule}?page=${page}&pageSize=${pageSize ?? 10}&search=${search ?? ''}`, BASE_URL),
};

const service = {auth, user, product}

export default service;
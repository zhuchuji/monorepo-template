/**
 * isomophic request
 * 
 * @todo support server-side request 
 */

import axios, { AxiosResponse, AxiosRequestConfig, Canceler, AxiosInstance } from 'axios';

const { CancelToken } = axios;

export interface Options extends AxiosRequestConfig {
  cancel?: (canceler: Canceler) => void;
}

interface ServerResponse<T> {
  code: number;
  msg: string;
  data: T;
}

export class ErrorCode extends Error {
  public code: number;
  public msg: string;

  constructor(error: { code: number; msg: string }) {
    super();
    this.code = error.code;
    this.msg = error.msg;
  }
}

class Request {
  private static request: Request;
  private requestor: AxiosInstance;

  static getInstance(): Request {
    if (Request.request == null) {
      Request.request = new Request();
    }
    return Request.request;
  }

  private constructor() {
    this.requestor = axios.create({
      timeout: 10000,
      headers: { 'content-type': 'application/json' },
    });
  }

  public addResInterceptor(onFulfilled: (res: AxiosResponse) => AxiosResponse, onRejected?: (error: any) => any) {
    return this.requestor.interceptors.response.use(onFulfilled, onRejected);
  }

  public addReqInterceptor(onFulFilled: (reqConfig: AxiosRequestConfig) => AxiosRequestConfig, onRejected?: (error: any) => any) {
    return this.requestor.interceptors.request.use(onFulFilled, onRejected);
  }

  public ejectInterceptor(id: number, isResponseId?:boolean) {
    return isResponseId ? this.requestor.interceptors.response.eject(id) : this.requestor.interceptors.request.eject(id);
  }

  public async request(options: Options) {
    const { cancel, ...axiosOptions } = options;
    return this.requestor({
      ...axiosOptions,
      cancelToken: new CancelToken((canceler: Canceler) => {
        typeof cancel === 'function' && cancel(canceler);
      }),
    });
  }

  public async requestApi<T = any>(options: Options): Promise<T> {
    const { cancel, ...axiosOptions } = options;
    const res: AxiosResponse<ServerResponse<T>> = await this.requestor({
      ...axiosOptions,
      cancelToken: new CancelToken((canceler: Canceler) => {
        typeof cancel === 'function' && cancel(canceler);
      }),
    });
    if (res.data.code === 0) {
      return res.data.data;
    } else {
      return Promise.reject(new ErrorCode(res.data));
    }
  }
}

export default Request;

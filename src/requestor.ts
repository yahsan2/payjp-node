/* global Buffer */

import axios, { AxiosRequestConfig } from 'axios'

export default class Requestor {
  apikey: string;
  apibase: string;
  config: any;

  constructor(apikey: string, apibase: string, config: any = {}) {
    this.apikey = apikey;
    this.apibase = apibase;
    this.config = config;
  }

  buildHeader(method: string): object {
    const encodedKey = Buffer.from(`${this.apikey}:`).toString('base64');

    const headers = {
      Accept: 'application/json',
      Authorization: `Basic ${encodedKey}`
    };

    if (method === 'POST') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    return headers;
  }

  buildUrl(endpoint: string): string {
    return `${this.apibase}/${endpoint}`;
  }

  request(method: string, endpoint: string, query: object = {}, headers: object = {}): Promise<any> {
    const url = this.buildUrl(endpoint);
    const fixed_header = this.buildHeader(method);
    const header = Object.assign(fixed_header, headers);

    return new Promise((resolve, reject): any => {
      axios.request({
        method: method,
        url: url,
        headers: header
      }).then( ({data}) =>{
        resolve(data);
      }).catch((error)=>{
        reject(error);
      })
    });

  }

}

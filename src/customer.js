import Resource from './resource';

export default class Customer extends Resource {

  constructor(payjp) {
    super(payjp);
    this.resource = 'customers';
  }

  list(query = {}) {
    return this.request('GET', this.resource, query);
  }

  create(query = {}) {
    return this.request('POST', this.resource, query);
  }

  retrieve(id) {
    return this.request('GET', `${this.resource}/${id}`);
  }

  update(id, query = {}) {
    return this.request('POST', `${this.resource}/${id}`, query);
  }

  delete(id) {
    return this.request('DELETE', `${this.resource}/${id}`);
  }

}

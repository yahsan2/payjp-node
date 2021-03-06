import assert from 'power-assert';

import Requestor from '../built/requestor';
import Payjp from '../built';

import config from './config';

const payjp = new Payjp(config.auth_key, config);

describe('Accounts Resource', () => {

  var _method;
  var _endpoint;

  before(() => {
    Requestor.prototype.request = (...args) => {
      _method = args[0];
      _endpoint = args[1];
      return Promise.resolve();
    };
  });

  describe('retrieve', () => {
    it('Sends the correct request', () => {
      return payjp.accounts.retrieve().then(() => {
        assert(_method === 'GET');
        assert(_endpoint === 'accounts');
      });
    });
  });

});

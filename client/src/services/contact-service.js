import Axios from 'axios';
import config from '../configs';
import common from '../common';

class ContactService {
  url = `${config.reqUrl}contacts`;
  // token = null;
  _reqHeaders = {
    'x-auth-token': null
  };

  constructor(token) {
    this.requestHeader = token;
  }
  set requestHeader(token) {
    this._reqHeaders['x-auth-token'] = token;
  }

  async getAllContacts() {
    const obj = common.createResultObj();
    try {
      const res = await Axios.get(this.url, {
        headers: this._reqHeaders
      });
      obj.res = res.data.results;
    } catch (ex) {
      obj.err = common.msgFromEx(ex);
    }
    return obj;
  }

  async getOneContact(id) {
    const obj = common.createResultObj();
    try {
      const res = await Axios.get(`${this.url}/${id}`, {
        headers: this._reqHeaders
      });
      obj.res = res.data.results;
    } catch (ex) {
      obj.err = common.msgFromEx(ex);
    }
    return obj;
  }

  async updateContact(contact, id) {
    const obj = common.createResultObj();
    try {
      const res = await Axios.put(`${this.url}/${id}`, contact, {
        headers: this._reqHeaders
      });
      if (res.data.error) throw new Error(res.data.error);
      obj.res = res.data.results;
    } catch (ex) {
      obj.err = common.msgFromEx(ex);
    }
    return obj;
  }

  async addNewContact(contact) {
    const obj = common.createResultObj();
    try {
      const res = await Axios.post(this.url, contact, {
        headers: this._reqHeaders
      });
      if (res.data.error) throw new Error(res.data.error);
      obj.res = res.data.results;
    } catch (ex) {
      obj.err = common.msgFromEx(ex);
    }
    return obj;
  }
}

export default ContactService;

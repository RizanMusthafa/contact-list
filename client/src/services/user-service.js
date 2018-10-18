import Axios from 'axios';
import config from '../configs';
import common from '../common';

class UserService {
  url = `${config.reqUrl}users`;

  async loginUser(user) {
    const obj = common.createResultObj();
    try {
      const res = await Axios.post(this.url + '/login', user);
      obj.res = res.data.results;
    } catch (ex) {
      obj.err = common.msgFromEx(ex);
    }
    return obj;
  }
}

export default UserService;

import Axios from 'axios';
import config from '../configs';

class UserService {
  url = `${config.reqUrl}users`;
  returnObj = () => ({ res: null, error: null });

  async loginUser(user) {
    const obj = this.returnObj();
    try {
      const res = await Axios.post(this.url + '/login', user);
      obj.res = res.data.results;
    } catch (ex) {
      ex.response
        ? (obj.error = ex.response.data.error)
        : (obj.error = ex.message);
    }
    return obj;
  }
}

export default UserService;

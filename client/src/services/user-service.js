import Axios from 'axios';

class UserService {
  usrl = 'http://localhost:3300/api/users';
  returnObj = () => ({ res: null, error: null });

  async loginUser(user) {
    const obj = this.returnObj();
    try {
      const res = await Axios.post(this.usrl + '/login', user);
      obj.res = res.data.results;
    } catch (ex) {
      obj.error = ex;
    }
    return obj;
  }
}

export default UserService;

export default {
  createResultObj() {
    return { res: null, err: null };
  },
  msgFromEx(ex) {
    if (ex.response) return ex.response.data.error;
    return ex.message;
  }
};

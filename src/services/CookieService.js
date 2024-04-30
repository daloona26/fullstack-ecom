import Cookies from "universal-cookie";

const cookies = new Cookies();

class CookieService {
  //GET
  get(key) {
    return cookies.get(key);
  }
  //SET
  set(key, value, options) {
    return cookies.set(key, value, options);
  }

  //REMOVE
  remove(key) {
    return cookies.remove(key);
  }
}

export default new CookieService();

/**
 * SessionStorage class declaration
 *
 * @class SessionStorage
 *
 */
class SessionStorage {
  /**
   * Component constructor
   *
   * @memberOf SessionStorage
   */
  constructor() {
    this.store = {};
  }
  /**
   *
   * @method getItem
   *
   * @param { key } key
   *
   * @return {void}
   */
  getItem(key) {
    return this.store[key] || null;
  }
  /**
   *
   * @method setItem
   *
   * @param { key } key
   *
   * @param { key } value
   *
   * @return {void}
   */
  setItem(key, value) {
    this.store[key] = value.toString();
  }
  /**
   *
   * @method removeItem
   *
   * @param { key } key
   *
   * @return {void}
   */
  removeItem(key) {
    delete this.store[key];
  }
}

export default SessionStorage;
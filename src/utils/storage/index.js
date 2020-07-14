/* eslint-disable no-new-func */
// 存储前缀
import { storage_prefix } from "../../config/index";
import Taro from "@tarojs/taro";

class Storage {
  constructor() {
    this.prefix = storage_prefix;
  }

  set(key, value) {
    try {
      value = JSON.stringify(value);
    } catch (e) {
      //
    }
    return Taro.setStorageSync(this.prefix + key, value);
  }

  get(key) {
    return new Promise((resolve, reject) => {
      if (!key) {
        return reject(new Error("没有找到key。"));
      }
      if (typeof key === "object") {
        return reject(new Error("key不能是一个对象。"));
      }
      let value = {};
      const data = Taro.getStorageSync(this.prefix + key);
      value = data
      try {
        value = JSON.parse(value);
      } catch (e) {
        // reject()
      }
      return resolve(value);
    });
  }

  remove(key) {
    Taro.removeStorageSync(this.prefix + key);
    return this;
  }
}

export default new Storage();

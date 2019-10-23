/**
 * author: zto
 * validate config
 */
import Vue from 'vue'
import { ValidationProvider, extend } from 'vee-validate';
import { required, confirmed, length, email } from "vee-validate/dist/rules";
import zh_CN from 'vee-validate/dist/locale/zh_CN';


extend("required", {
  ...required,
  message: zh_CN.messages.required
});

extend("email", {
  ...email,
  message: zh_CN.messages.email
});

extend("confirmed", {
  ...confirmed,
  message: zh_CN.messages.confirmed
});

extend("length", {
  ...length,
  message: zh_CN.messages.length
});

Vue.component('ValidationProvider', ValidationProvider);

export * from "./lib"


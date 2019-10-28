/**
 * author: zto
 * validate config
 */
import Vue from 'vue'
import { ValidationProvider, extend } from 'vee-validate';
import { required, confirmed, length, email, max, regex , min_value} from "vee-validate/dist/rules";
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

extend("max", {
  ...max,
  message: zh_CN.messages.max
});

extend("regex", {
  ...regex,
  message: zh_CN.messages.regex
});

extend("min_value", {
  ...min_value,
  message: zh_CN.messages.min_value
});

Vue.component('ValidationProvider', ValidationProvider);

export * from "./lib" 
export * from "./example"


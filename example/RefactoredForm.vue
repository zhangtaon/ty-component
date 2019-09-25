<template>
  <ValidationObserver ref="observer" v-slot="{ passes }">
    <el-form ref="form" label-width="120px">
      <ty-input v-model="email" rules="required|email" label="Email" :change="change"/>

      <ty-input
        v-model="password"
        type="password"
        rules="required"
        label="Password"
        vid="password"
      />

      <ty-input
        v-model="confirmation"
        type="password"
        rules="required|confirmed:password"
        label="Password confirmation"
      />

      <ty-select rules="required" label="Subject" v-model="subject" :change="change">
        <el-option label="None" value></el-option>
        <el-option label="Subject 1" value="s1"></el-option>
        <el-option label="Subject 2" value="s2"></el-option>
      </ty-select>

      <ty-checkboxes rules="required|length:2" name="Drinks" v-model="choices" :change="change">
        <el-checkbox label="Coffee"></el-checkbox>
        <el-checkbox label="Tea"></el-checkbox>
        <el-checkbox label="Soda"></el-checkbox>
      </ty-checkboxes>

      <el-form-item>
        <el-button type="primary" @click="passes(onSubmit)">Create</el-button>
        <el-button @click="resetForm">Reset</el-button>
      </el-form-item>
    </el-form>
  </ValidationObserver>
</template>

<script>
import TyCheckboxes from "../lib/input/tyCheckboxes.vue"
import TyInput from "../lib/input/tyInput.vue"
import TySelect from "../lib/input/tySelect.vue"

import { ValidationObserver } from "vee-validate";

export default {
  name: "RForm",
  components: {
    ValidationObserver,
    TyInput,
    TySelect,
    TyCheckboxes
  },
  data: () => ({
    email: "",
    password: "",
    confirmation: "",
    subject: "",
    choices: []
  }),
  methods: {
    onSubmit() {
      console.log("Form submitted yay!");
    },
    change(val){
      console.log("change ...",val);
    },
    resetForm() {
      this.email = "";
      this.password = "";
      this.confirmation = "";
      this.subject = "";
      this.choices = [];
      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });
    }
  }
};
</script>

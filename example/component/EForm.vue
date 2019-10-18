<template>
  <ValidationObserver ref="observer" v-slot="{ passes }">
    <el-form ref="form" label-width="120px">
      <ValidationProvider rules="required|email" name="Email" v-slot="{ errors }">
        <el-form-item :error="errors[0]" label="Email">
          <el-input v-model="email"></el-input>
        </el-form-item>
      </ValidationProvider>

      <ValidationProvider rules="required" name="Password" vid="password" v-slot="{ errors }">
        <el-form-item prop="pass" :error="errors[0]" label="Password">
          <el-input type="password" v-model="password"></el-input>
        </el-form-item>
      </ValidationProvider>

      <ValidationProvider
        rules="required|confirmed:password"
        name="Password Confirmation"
        v-slot="{ errors }"
      >
        <el-form-item prop="pass" :error="errors[0]" label="Password Confirmation">
          <el-input type="password" v-model="confirmation"></el-input>
        </el-form-item>
      </ValidationProvider>

      <ValidationProvider rules="required" name="Subject" v-slot="{ errors }">
        <el-form-item :error="errors[0]" label="Subject">
          <el-select v-model="subject" placeholder="Select Subject">
            <el-option label="None" value></el-option>
            <el-option label="Subject 1" value="s1"></el-option>
            <el-option label="Subject 2" value="s2"></el-option>
          </el-select>
        </el-form-item>
      </ValidationProvider>

      <ValidationProvider rules="required|length:2" name="Drinks" v-slot="{ errors }">
        <el-form-item :error="errors[0]" label="Drinks">
          <el-checkbox-group v-model="choices">
            <el-checkbox label="Coffee"></el-checkbox>
            <el-checkbox label="Tea"></el-checkbox>
            <el-checkbox label="Soda"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </ValidationProvider>
      <el-form-item>
        <el-button type="primary" @click="passes(onSubmit)">Create</el-button>
        <el-button @click="resetForm">Reset</el-button>
      </el-form-item>
    </el-form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  name: "EForm",
  components: {
    ValidationObserver,
    ValidationProvider
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
    resetForm() {
      this.email = "";
      this.password = "";
      this.confirmation = "";
      this.subject = "";
      this.choices = [];
      this.$nextTick(() => {
        this.$refs.observer.reset();
      });
    }
  }
};
</script>

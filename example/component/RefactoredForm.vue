<template>
  <ValidationObserver ref="observer" v-slot="{ passes }">
    <el-form ref="form" label-width="220px" class="demoForm">
      <ty-input
        v-model="form.email"
        rules="required|email"
        label="Email"
        :change="change"
        :editable="editable"
      />

      <ty-input
        v-model="form.password"
        type="password"
        rules="required"
        label="Password"
        vid="password"
        :editable="editable"
      />

      <ty-input
        v-model="form.confirmation"
        type="password"
        rules="required|confirmed:password"
        label="Password confirmation"
        :editable="editable"
      />

      <ty-select
        rules="required"
        label="Subject"
        v-model="form.subject"
        :change="change"
        :editable="editable"
      >
        <el-option label="None" value></el-option>
        <el-option label="Subject 1" value="s1"></el-option>
        <el-option label="Subject 2" value="s2"></el-option>
      </ty-select>

      <ty-radio-group
        rules="required"
        label="radio编辑态展现label"
        v-model="form.radioVal"
        :change="change"
        :editable="editable"
        label-name="label"
      >
        <ty-radio v-for="(item,index) in subjects" :key="index" :label="item">{{item.label}}</ty-radio>
      </ty-radio-group>
      <ty-select
        rules="required"
        label="select编辑态展现label"
        v-model="form.selectVal"
        :change="change"
        :editable="editable"
        label-name="label"
      >
        <el-option label="None" value></el-option>
        <el-option v-for="(item,index) in subjects" :key="index" :label="item.label" :value="item"></el-option>
      </ty-select>

      <ty-select
        rules="required"
        label="分组展现"
        v-model="form.subjectGroupObj"
        :change="change"
        :editable="editable"
        placeholder="请选择啊啊啊"
        label-name="label"
      >
        <el-option-group v-for="group in options3" :key="group.label" :label="group.label">
          <el-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item"
          ></el-option>
        </el-option-group>
      </ty-select>

      <ty-checkboxes
        rules="required|length:2"
        label="Drinks"
        v-model="form.choices"
        :change="change"
        :editable="editable"
      >
        <el-checkbox label="Coffee"></el-checkbox>
        <el-checkbox label="Tea"></el-checkbox>
        <el-checkbox label="Soda"></el-checkbox>
      </ty-checkboxes>

      <ty-date-picker
        v-model="form.alarmDate"
        type="date"
        placeholder="选择日期a"
        label="报警日期"
        :editable="editable"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
      ></ty-date-picker>

      <el-form-item>
        <el-button type="primary" @click="passes(onSubmit)">Create</el-button>
        <el-button @click="resetForm">Reset</el-button>
        <el-button type="primary" @click="toggleStatus()">编辑态切换</el-button>
      </el-form-item>
    </el-form>
  </ValidationObserver>
</template>

<script>
import { createHash } from "crypto";
import TyCheckboxes from "../../lib/input/tyCheckboxes.vue";
import TyInput from "../../lib/input/tyInput.vue";
import TySelect from "../../lib/input/tySelect.vue";
import TyRadioGroup from "../../lib/input/tyRadioGroup.vue";
import TyRadio from "../../lib/input/tyRadio.vue";
import TyDatePicker from "../../lib/input/tyDatePicker.vue";

import { ValidationObserver } from "vee-validate";

export default {
  name: "RForm",
  components: {
    ValidationObserver,
    TyInput,
    TySelect,
    TyCheckboxes,
    TyRadioGroup,
    TyRadio,
    TyDatePicker
  },
  data: () => ({
    form: {
      email: "",
      password: "",
      confirmation: "",
      subject: "",
      radioVal: {
        label: "Subject 2",
        value: "s2"
      },
      selectVal: {
        label: "Subject 1",
        value: "s1"
      },
      subjectGroupObj: null,
      choices: [],
      alarmDate: ""
    },
    subjects: [
      {
        label: "Subject 1",
        value: "s1"
      },
      {
        label: "Subject 2",
        value: "s2"
      }
    ],
    options3: [
      {
        label: "热门城市",
        options: [
          {
            value: "Shanghai",
            label: "上海"
          },
          {
            value: "Beijing",
            label: "北京"
          }
        ]
      },
      {
        label: "城市名",
        options: [
          {
            value: "Chengdu",
            label: "成都"
          },
          {
            value: "Shenzhen",
            label: "深圳"
          },
          {
            value: "Guangzhou",
            label: "广州"
          },
          {
            value: "Dalian",
            label: "大连"
          }
        ]
      }
    ],
    editable: true
  }),
  created() {
    // console.log("createHash:",this.radioVal);
  },
  methods: {
    toggleStatus() {
      console.log("form:", this.form);
      this.editable = !this.editable;
    },
    onSubmit() {
      console.log("Form submitted yay!");
    },
    change(val) {
      console.log("change ...", val);
    },
    resetForm() {
      this.form.email = "";
      this.form.password = "";
      this.form.confirmation = "";
      this.form.subject = "";
      this.form.choices = [];
      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });
    }
  }
};
</script>
<style lang="scss">
.demoForm {
  width: 50%;
  margin: 30px auto;
}
</style>
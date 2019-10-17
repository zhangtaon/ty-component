<template>
  <ValidationProvider :vid="vid" :name="$attrs.label" :rules="rules" v-slot="{ errors }">
    <el-form-item :error="errors[0]" :label="(rules=='required'?'*':'')+$attrs.label+':'">
      <el-input v-if="editable" :type="$attrs.type" v-model="innerValue" @change="change"></el-input>
      <span v-if="!editable">{{innerValue}}</span>
    </el-form-item>
  </ValidationProvider>
</template>

<script>
import { type } from "os";

export default {
  props: {
    vid: {
      type: String
    },
    rules: {
      type: [Object, String],
      default: ""
    },
    // must be included in props
    value: {
      type: null
    },
    editable: {
      type: Boolean,
      default: true
    },
    change: {
      type: Function,
      default: function() {}
    }
  },
  data: () => ({
    innerValue: ""
  }),
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit("input", newVal);
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal;
    },
    edit(newVal) {
      console.log("edit:",newVal);
    }
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  }
};
</script>

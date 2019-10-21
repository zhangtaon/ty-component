<template>
  <ValidationProvider :vid="vid" :name="$attrs.label" :rules="rules" v-slot="{ errors }">
    <el-form-item :error="errors[0]" :label="(rules=='required'?'*':'')+$attrs.label+':'">
      <el-select v-if="editable" v-model="innerValue" v-bind="$attrs" @change="change">
        <slot />
      </el-select>
      <span v-if="!editable">{{innerValue[labelName]}}</span>
    </el-form-item>
  </ValidationProvider>
</template>

<script>
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
    },
    labelName: String
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
    }
  },
  created() {
    // console.log("select $attrs：",this.$attrs);
    if (this.value) {
      this.innerValue = this.value;
    }
    // console.log(this.change.toString());
  }
};
</script>

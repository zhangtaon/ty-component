<template>
  <ValidationProvider :vid="vid" :name="$attrs.label" :rules="rules" v-slot="{ errors }">
    <el-form-item :error="errors[0]" :label="(rules=='required'?'*':'')+$attrs.label+':'">
      <el-radio-group v-if="editable" v-model="innerValue" ref="radio" v-bind="$attrs" @change="change">
        <slot />
      </el-radio-group>
      <span v-if="!editable">{{text}}</span>
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
    innerValue: "",
    text:""
  }),
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.text = newVal[this.labelName];
      this.$emit("input", newVal);
    },
    // Handles external model changes.
    value(newVal) {
      // console.log("watch value");
      this.innerValue = newVal;
    }
  },
  created() {
    // console.log("$attrs:", typeof this.$attrs.hideLabel);
    if (this.value) {
      this.innerValue = this.value;
    }
  }
};
</script>

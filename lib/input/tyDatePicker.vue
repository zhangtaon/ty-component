<template>
  <ValidationProvider :vid="vid" :name="$attrs.label" :rules="rules" v-slot="{ errors }">
    <el-form-item :error="errors[0]" :label="(rules=='required'?'*':'')+$attrs.label+':'">
      <el-date-picker v-if="editable" v-bind="$attrs" v-model="innerValue" type="date" @change="change"></el-date-picker>
      <span v-if="!editable">{{innerValue}}</span>
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

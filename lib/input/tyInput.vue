<template>
  <ValidationProvider :vid="vid" :name="$attrs.label" :rules="rules" v-slot="{ errors }">
    <!-- 隐藏label -->
    <el-form-item v-if="typeof $attrs.hideLabel == 'string'" :error="errors[0]" :label-width="$attrs['label-width']">
      <el-input v-if="editable" v-bind="$attrs" v-model="innerValue" @change="change"/>
      <span v-if="!editable">{{innerValue}}</span>
    </el-form-item>
    <!-- 显示label -->
    <el-form-item v-else :error="errors[0]" :label="(rules.includes('required')?'*':'')+$attrs.label+':'" :label-width="$attrs['label-width']">
      <el-input v-if="editable" v-bind="$attrs" v-model="innerValue" @change="change"/>
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
    // console.log("$attrs.label:",  this.$attrs.label,this.rules);
    if (this.value) {
      this.innerValue = this.value;
    }
  }
};
</script>

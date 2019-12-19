<template>
  <ValidationProvider :vid="vid" :name="$attrs.label" :rules="rules" v-slot="{ errors }">
    <el-form-item :error="errors[0]" :label="$attrs.label+':'" :label-width="$attrs['label-width']">
      <el-checkbox-group v-if="editable" v-model="innerValue" v-bind="$attrs" @change="change">
        <slot />
      </el-checkbox-group>
      <span v-if="!editable">{{labelValue}}</span>
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
    labelKey: {
      type: String,
      default: "label"
    },
    change: {
      type: Function,
      default: function() {}
    }
  },
  computed:{
    labelValue(val){
      let _labelVal=[];
      if(!this.editable){
        this.innerValue.forEach(item => {
          if(Object.prototype.toString.call(item) == "[object Object]"){
            _labelVal.push(item[this.labelKey]);
          }else{
            _labelVal.push(item);
          }
        })
        return _labelVal.join();
      }
    }
  },
  data: () => ({
    innerValue: []
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
    console.log("this:",this);
    if (this.value) {
      this.innerValue = this.value;
    }
  }
};
</script>

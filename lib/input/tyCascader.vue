<template>
  <ValidationProvider :vid="vid" :name="$attrs.label" :rules="rules" v-slot="{ errors }">
    <el-form-item :error="errors[0]" :label="requiredSymbol+$attrs.name+':'" :label-width="$attrs['label-width']">
      <el-cascader v-show="editable" v-model="innerValue" v-bind="$attrs" @change="change" ref="cascader"/>
      <span v-show="!editable">{{labelValue}}</span>
    </el-form-item>
  </ValidationProvider>
</template>

<script>
import { prototype } from "events"

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
    clear: {
      type: Function,
      default: function() {}
    }
  },
  computed:{
    requiredSymbol() {
      let res = false;
        if (typeof this.rules === "string") {
          res = this.rules.includes("required");
        } else {
          res = this.rules.required;
        }
      return res ? "*" : "";
    },
    labelValue(){
      if(!this.editable){
        return this.$refs.cascader ? this.$refs.cascader.inputValue : this.initLabelValue()
      }
    }
  },
  data: () => ({
    innerValue: "",
  }),
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      if(Object.prototype.toString.call(newVal) == "[object Array]" && newVal.length>1){
        this.$emit("input", newVal[newVal.length-1]);
      }else{
        this.$emit("input", newVal);
      }
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal;
    }
  },
  methods:{
    initLabelValue(){
      let options = this.$attrs.options
      return this.value;
    }
  },
  created() {
    switch(this.value){
      case "":
      case "undefined":
      case undefined:
      case null:
        break;
      default:
        this.innerValue = this.value;
    }
  }
};
</script>

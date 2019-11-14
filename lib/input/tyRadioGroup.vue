<template>
  <ValidationProvider :vid="vid" :name="$attrs.label" :rules="rules" v-slot="{ errors }">
    <el-form-item :error="errors[0]" :label="(rules=='required'?'*':'')+$attrs.label+':'" :label-width="$attrs['label-width']">
      <el-radio-group v-if="editable" v-model="innerValue" ref="radio" v-bind="$attrs" @change="change">
        <slot />
      </el-radio-group>
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
    change: {
      type: Function,
      default: function() {}
    },
    labelKey: String,
    valueKey: String,
    data: {
      type: Array,
      default: ()=>[]
    }
  },
  computed:{
    labelValue(val){
      if(!this.editable){
        switch (this.value) {
          case "":
          case "undefined":
          case undefined:
          case null:
            return "";
          default:
            return this.getLabelValue();
        }
      }
    }
  },
  methods:{
    getLabelValue(){
      try {
        if(this.labelKey && this.valueKey){
          return this.data.matchPropValue(this.valueKey,this.value)[this.labelKey];
        }
      } catch (error) {
        this.$notify.error({
            title: '错误',
            message: `字段[ ${this.$attrs.label} ]无匹配到有效值!`
        })
      }
    }
  },
  data: () => ({
    innerValue: "",
  }),
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
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

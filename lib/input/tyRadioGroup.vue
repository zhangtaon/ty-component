<template>
  <ValidationProvider :vid="vid" :name="$attrs.label" :rules="rules" v-slot="{ errors }">
    <el-form-item :error="errors[0]" :label="(rules=='required'?'*':'')+$attrs.label+':'" :label-width="$attrs['label-width']">
      <el-radio-group v-if="editable" v-model="innerValue" v-bind="$attrs" @change="change">
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
    labelKey: {
      type: String,
      default: "label"
    },
    valueKey:  {
      type: String,
      default: "value"
    },
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
    innerValue: null,
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

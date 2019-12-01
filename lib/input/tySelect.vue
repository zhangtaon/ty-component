<template>
  <el-select v-if="typeof $attrs.native == 'string'" v-model="innerValue" v-bind="$attrs" @change="change" @clear="clear">
    <slot />
  </el-select>
  <ValidationProvider v-else :vid="vid" :name="$attrs.label" :rules="rules" v-slot="{ errors }">
    <el-form-item :error="errors[0]" :label="requiredSymbol+$attrs.label+':'" :label-width="$attrs['label-width']">
      <el-select v-if="editable" v-model="innerValue" v-bind="$attrs" @change="change" @clear="clear">
        <slot />
      </el-select>
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
    clear: {
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
    requiredSymbol() {
      let res = false;
        if (typeof this.rules === "string") {
          res = this.rules.includes("required");
        } else {
          res = this.rules.required;
        }
      return res ? "*" : "";
    },
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
  data: () => ({
    innerValue: "",
    tag:"",
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
  methods:{
    getLabelValue(){
      if(!this.tag && this.$slots.default){
        this.tag = this.$slots.default[0].componentOptions.tag;
      }
      try {
        if(this.labelKey && this.valueKey){
          if(this.tag == "el-option"){
            if(Array.isArray(this.value)) {
                let item = [],
                _labelVal = [];
                for(let i = 0; i < this.value.length; i++ ){
                    item = this.data.matchPropValue(this.valueKey,this.value[i]);
                    if(Object.prototype.toString.call(item) == "[object Object]"){
                        _labelVal.push(item[this.labelKey]);
                    }else{
                        _labelVal.push(item);
                    }
                }
                return _labelVal.join();
            }else{
                return this.data.matchPropValue(this.valueKey,this.value)[this.labelKey];
            }

          }else{//el-option-group
            let item;
            for(let i = 0; i < this.data.length; i++ ){
              let item = this.data[i].options.matchPropValue(this.valueKey,this.value);
              if(item){
                return item[this.labelKey];
                break;
              }
            }
          }
        }
      } catch (error) {
        this.$notify.error({
            title: '错误',
            message: `字段[ ${this.$attrs.label} ]无匹配到有效值!`
        })
      }
    }
  },
  created() {
    // 子项标签
    if(this.$slots.default){
      this.tag = this.$slots.default[0].componentOptions.tag;
    }
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

<template>
  <span v-if="!innerEditable">
    <el-button v-if="$listeners.journal" type="primary" @click="$emit('journal')">日志</el-button>
    <el-button v-if="$listeners.checkRecord" type="primary" @click="$emit('checkRecord')">排查记录</el-button>
    <el-button v-if="$listeners.check" type="primary" @click="$emit('check')">排查</el-button>
    <el-button v-if="$listeners.end" type="primary" @click="$emit('end')">终止</el-button>
    <el-button v-if="$listeners.start" type="primary" @click="$emit('start')">开始</el-button>
    <el-button v-if="$listeners.approval" type="primary" @click="$emit('approval')">审批</el-button>
    <el-button v-if="$listeners.supervise" type="primary" @click="$emit('supervise')">督办</el-button>
    <el-button v-if="$listeners.feedback" type="primary" @click="$emit('feedback')">反馈</el-button>
    <el-button v-if="$listeners.submit" type="primary" @click="$emit('submit')">提交</el-button>
    <el-button v-if="$listeners.print" type="primary" @click="$emit('print')">打印</el-button>

    <el-button v-if="operate.update" type="primary" @click="$emit('change',innerEditable=!innerEditable)">编辑</el-button>
    <el-button @click="back()">返回</el-button>
  </span>
  <span v-else>
    <el-button v-if="$listeners.saveDraft" type="primary" @click="$emit('saveDraft')">保存草稿</el-button>
    <el-button v-if="$listeners.save" type="primary" @click="$emit('save')">保存</el-button>
    <el-button v-if="!isAdd" @click="change()">取消</el-button>
    <el-button v-if="isAdd" @click="back()">返回</el-button>
  </span>
</template>
<script>
import { mapState } from "vuex";

export default {
  props: {
    editable: {
      type: [Boolean,String],
      default: false
    },
    backUrl: {
      type: String,
      default: ""
    },
    form: Object
  },
  created(){
    // console.log("this.operate:",this.operate);
    // console.log("this.editable:",this.editable);
  },
  data() {
    return {
      innerEditable: (this.editable == "add" || this.editable == "copy") ? true : false,
      isAdd: this.editable == "add" || this.editable == "copy"
    };
  },
  computed: {
    ...mapState({
      operate: state=> state.authority.operate
    })
  },
  methods: {
    back() {
      if(this.backUrl){
        this.$router.push(this.backUrl);
      }else{
        this.$router.go(-1);
      }
    },
    change(){
      this.form.reset();
      this.$emit('change',this.innerEditable=!this.innerEditable)
    }
  }
};
</script>

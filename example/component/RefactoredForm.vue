<template>
  <div>
    <ValidationObserver ref="observer">
      <el-form ref="form" label-width="220px" class="demoForm">
        <ty-input
          v-model="form.email"
          rules="required|email"
          label="Email"
          :change="change"
          :editable="editable"
        />
        <ty-input
          v-model="form.password"
          type="password"
          :rules="{ regex: /^[0-9]+$/ }"
          label="Password"
          vid="password"
          :editable="editable"
        />
        <ty-input
          v-model="form.confirmation"
          type="password"
          rules="required|confirmed:password"
          label="Password confirmation"
          :editable="editable"
        />
        <ty-select
          style="margin: 0 0 20px 220px;"
          v-model="form.native"
          :change="change"
          placeholder="原生el-select结构下拉"
          native
        >
          <el-option v-for="(item,index) in subjects" :key="index" :label="item.label" :value="item.value"></el-option>
        </ty-select>

        <ty-radio-group
          rules="required"
          label="radio编辑态展现label"
          v-model="form.radioVal"
          :change="change"
          :editable="editable"
          :data="radioList"
        >
          <el-radio v-for="(item,index) in radioList" :key="index" :label="item.value">{{item.label}}</el-radio>
        </ty-radio-group>
        
        <ty-select
          rules="required"
          label="select编辑态展现label"
          clearable
          v-model="form.selectVal"
          :change="change"
          :clear="clear"
          :editable="editable"
          :data="subjects"
        >
          <el-option label="None" value></el-option>
          <el-option v-for="(item,index) in subjects" :key="index" :label="item.label" :value="item.value"></el-option>
        </ty-select>

        <ty-select
          rules="required"
          label="分组展现"
          v-model="form.subjectGroupVal"
          :change="change"
          :editable="editable"
          placeholder="请选择啊啊啊"
          :data="options3"
        >
          <el-option-group v-for="group in options3" :key="group.label" :label="group.label">
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-option-group>
        </ty-select>

        <ty-checkboxes
          rules="required|length:2"
          label="Drinks"
          v-model="form.choices"
          :change="change"
          :editable="editable"
        >
           <el-checkbox v-for="(item,index) in subjects" :key="index" :label="item">{{item.label}}</el-checkbox>
        </ty-checkboxes>

        <ty-date-picker
          v-model="form.alarmDate"
          type="date"
          placeholder="选择日期a"
          label="报警日期"
          :editable="editable"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></ty-date-picker>

        <ty-date-picker
          v-model="form.alarmDateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          placeholder="选择日期b"
          label="报警区间"
          :editable="editable"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></ty-date-picker>
        <ty-upload 
          v-model="form.file"
          label="上传文件："
          action="http://39.106.229.106:8011/file/upload"
          :limit="3"
          :file-list="fileList"
          :disabled="!editable"
          name="files">
            <el-button size="small" type="text">点击上传</el-button>
            <span slot="tip" class="el-upload__tip">(只能上传jpg/png文件，且不超过500kb)</span>
        </ty-upload>
      </el-form>
    </ValidationObserver>
    <ty-edit-button-group style="display:block;text-align:center" @save="$refs.observer.handleSubmit(onSubmit)" editable="" @change="editChange"/>
  </div>
      
</template>

<script>
import TyCheckboxes from "../../lib/input/tyCheckboxes.vue";
import TyInput from "../../lib/input/tyInput.vue";
import TySelect from "../../lib/input/tySelect.vue";
import TyRadioGroup from "../../lib/input/tyRadioGroup.vue";
import TyRadio from "../../lib/input/tyRadio.vue";
import TyDatePicker from "../../lib/input/tyDatePicker.vue";
import TyUpload from "../../lib/input/tyUpload.vue";
import TyEditButtonGroup from "../../lib/component/tyEditButtonGroup.vue";


import { ValidationObserver } from "vee-validate";

export default {
  name: "RForm",
  components: {
    ValidationObserver,
    TyInput,
    TySelect,
    TyCheckboxes,
    TyRadioGroup,
    TyRadio,
    TyDatePicker,
    TyUpload,
    TyEditButtonGroup
  },
  data: () => ({
    fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
    radioList:[
          {
              label: "是",
              value: true
          },
          {
              label: "否",
              value: false
          }
      ],
    form: {
      email: "ztok999@163.com",
      password: "111",
      confirmation: "111",
      radioVal: false,
      native: null,
      selectVal: "2",
      subjectGroupVal: "Shenzhen",
      choices: [],
      alarmDate: "2019-10-24"
    },
    subjects: [
      {
        label: "Subject 0",
        value: "0"
      },
      {
        label: "Subject 1",
        value: "1"
      },
      {
        label: "Subject 2",
        value: "2"
      }
    ],
    options3: [
      {
        label: "热门城市",
        options: [
          {
            value: "Shanghai",
            label: "上海"
          },
          {
            value: "Beijing",
            label: "北京"
          }
        ]
      },
      {
        label: "城市名",
        options: [
          {
            value: "Chengdu",
            label: "成都"
          },
          {
            value: "Shenzhen",
            label: "深圳"
          },
          {
            value: "Guangzhou",
            label: "广州"
          },
          {
            value: "Dalian",
            label: "大连"
          }
        ]
      }
    ],
    editable: false
  }),
  created() {
  },
  methods: {
    onSubmit() {
      console.log("Form submitted yay!",JSON.parse(JSON.stringify(this.form)));
      this.resetForm();
    },
    change(val) {
      console.log(val);
    },
    editChange(val) {
      this.editable = val;
    },
    clear(val) {
      console.log("clear ...");
    },
    resetForm() {
      this.form.email = "";
      this.form.password = "";
      this.form.confirmation = "";
      this.form.choices = [];
      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });
    }
  }
};
</script>
<style lang="scss">
.demoForm {
  width: 50%;
  margin: 30px auto;
}
.el-upload .el-upload__input {
    display: none;
}
</style>
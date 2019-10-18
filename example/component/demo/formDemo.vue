<template>
<div>
  <h1>refactored-form</h1>
  <refactored-form/>
  <h2>form</h2>
  <e-form/>
</div>
</template>
<script>
import {RefactoredForm,EForm} from "ty-component"
export default {
  name: "formDemo",
  components:{
    RefactoredForm,
    EForm
  },
  data() {
    return {
      formLabelWidth: "120px"
    };
  }
};
</script>
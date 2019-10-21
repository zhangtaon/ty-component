import EForm from "./component/EForm.vue"
import RefactoredForm from "./component/RefactoredForm.vue"
import Breadcrumb from "./component/Breadcrumb.vue"

export default [
    { path: "/form", component: RefactoredForm },
    { path: "/eform", component: EForm },
    { path: "/breadcrumb", component: Breadcrumb }
]
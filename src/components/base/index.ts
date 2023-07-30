import { defineComponent, reactive,ref, toRefs, onMounted,watch } from "vue";

export default defineComponent({
  props: {
    search:{
      type:Object,
      default:{},
    }
  },
  components: {},
  setup(props,{emit}) {
    const state = reactive({});
    onMounted(()=>{
      console.log('---base---onMounted---');
      
    });
    
    watch(()=>props.search,(newVal:any,oldVal:any)=>{
      console.log('-----watch----',newVal);
    },{deep:true});

    return {
      ...toRefs(state),
    };
  },
});

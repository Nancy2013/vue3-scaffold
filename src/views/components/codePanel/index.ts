import { defineComponent, reactive, toRefs, onMounted, watch } from "vue";
import service from "@/service/mainRoutes";
import { objectAndProductDataTypeDict } from "@/utils/dict";
// 产品分类级联选择
const fieldCategoryNames = {
  label: "categoryName",
  value: "id",
  children: "children",
};
// 产品选择
const fieldProductNames = {
  label: "name",
  value: "id",
};
const columns=[
  {
    key: "categoryId",
    dataIndex: "categoryId",
    title: "选择产品分类",
  },
  {
    key: "productId",
    dataIndex: "",
    title: "选择产品",
  },
  {
    key: "specifications",
    dataIndex: "specifications",
    title: "申请规格",
  },
  {
    key: "applyCodeNum",
    dataIndex: "applyCodeNum",
    title: "申请码量",
  },
  {
    key: "action",
    dataIndex: "action",
    title: "操作",
  },
];
const baseItem={
  categoryId:null,
  productId:null,
  specifications:'',
  applyCodeNum:'',
}
export default defineComponent({
  props: {
    data:{
      type:Array,
      default:[],
    },
  },
  components: {},
  setup(props:any, { emit }) {
    const state = reactive({
      columns,
      dataSource:[
        {
          ...baseItem,
        },
      ] as any,
      fieldCategoryNames,
      fieldProductNames,
      categoryOptions:[] as any,
      productOptions:[] as any,
    });

    onMounted(()=>{
      init();
    });

    watch(()=>state.dataSource,
    (newVal:any,oldVal:any)=>{
      console.log('-----watch----',newVal);
      emit('update',newVal);
    },{
      deep:true
    })

    /**
     * 初始化
     */
    const init=()=>{
      initCategory();
    }

    /**
     * 初始化产品分类
     */
    const initCategory=async ()=>{
      const {code,data}=await queryCategory();
      if (code === 200) {
        state.categoryOptions=data&&data.map((item:any)=>({
          ...item,
          isLeaf: false,
        }));
      }
    }

    /**
     * 选择产品分类
     * @param index 索引 
     */
    const categoryChange=(index:any)=>{
      initCategoryItem(index);
      productChange(index);
      const item=state.dataSource[index];
      const {categoryId}=item;
      if(categoryId){
        queryProduct(index);
      }
    }

    /**
     * 选择产品分类时重置
     * @param index 索引
     */
    const initCategoryItem=(index:any)=>{
      const {dataSource}=state;
      const edit=dataSource[index];
      const item={
        ...edit,
        productId:null,
        productOptions:[],
      }
      Object.assign(dataSource[index],item);
      console.log('----initCategoryItem------',item,dataSource);
    }

    /**
     * 选择产品
     * @param index 索引 
     */
    const productChange=(index:any)=>{
      initProductItem(index);
      const {dataSource}=state
      const edit=dataSource[index];
      const {productId,productOptions}=edit;
      if(productId){
        const current=productOptions.filter((product:any)=>{product.id===productId})[0];
        if(current){
          const {specifications,unit}=current;
          const item={
            ...edit,
            specifications,
            unit,
          }
          Object.assign(dataSource[index],item);
        }
      }
    }

    /**
     * 选择产品时重置
     * @param index 索引
     */
    const initProductItem=(index:any)=>{
      const {dataSource}=state
      const edit=dataSource[index];
      const item={
        ...edit,
        specifications:'',
        applyCodeNum:'',
        unit:'',
      }
      Object.assign(dataSource[index],item);
      console.log('------initProductItem-------',item,dataSource);
    }

    /**
     * 查询产品分类
     * @param id 上级对象分类id
     */
    const queryCategory = (id?: number) => {
      const { queryCategoryByParentId } = service.identity;
      const params = {
        parentId:id || 0, // 0：查一级，非0：查二级子分类
        dataType:objectAndProductDataTypeDict.product,
      };
      return queryCategoryByParentId(params);
    };

    /**
     * 查询产品
     * @param index 索引
     */
    const queryProduct=(index:any)=>{
      const item=state.dataSource[index];
      const {categoryId}=item;
      const len=categoryId.length;

      const params={
        categoryId:categoryId[len-1],
        dataType:objectAndProductDataTypeDict.product,
      }
      const {queryProduct}=service.identity;
      queryProduct(params).then((res:any)=>{
        const {code,rows}=res;
        if(code===200){
          item.productOptions=rows;
        }
      }).catch((e:any)=>{
        console.error(e)
      })

    }

    /**
     * 动态加载子分类
     * @param selectedOptions
     */
    const loadData = (selectedOptions: any) => {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      console.log("-----loadData-----", selectedOptions);
      const len=selectedOptions.length;
      const {id}=selectedOptions[len-1];
      queryCategory(id)
        .then((res: any) => {
          const { code, data } = res;
          if (code === 200) {
            targetOption.children = data.map((item:any)=>({
              ...item,
              isLeaf: len===2?true:false,
            }));
          }
          targetOption.loading = false;
        })
        .catch((e: any) => {
          targetOption.loading = false;
          console.error(e);
        });

      state.categoryOptions = [...state.categoryOptions];
    };

    /**
     * 添加
     */
    const handleAdd=()=>{
      const {dataSource}=state;
      dataSource.push({...baseItem});
    }

    
    /**
     * 移除
     * @param index 索引
     */
    const handleDelete=(index:Number)=>{
      const {dataSource}=state
      dataSource.splice(index,1);
    }
    return {
      ...toRefs(state),
      ...toRefs(props),
      categoryChange,
      productChange,
      handleAdd,
      handleDelete,
      loadData,
    };
  },
});

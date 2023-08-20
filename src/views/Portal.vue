<template>
  <div class="portal">
      <h1>This is an portal page</h1>
      <div>
        <a-table :dataSource="dataSource" :columns="columns" />
      </div>
     <div>
      <a-button type="primary" @click="handleExport">导出</a-button>
     </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs,ref, onMounted, computed } from "vue";
import {usePage} from '@/composables/usePage'
import service from '@/service'
import { getDate } from '@/utils/function';
const columns = [
    {
        key: "typeName",
        dataIndex: "typeName",
        align: "center",
        title: "统计数据",
        width:200,
    },
];
export default defineComponent({
  props: {},
  components: {},
  setup() {
    const state = reactive({
      columns,
      search:{},
    });
    const opts={
      queryApi: 'queryCode',
      filename:'码量授权趋势'
    };
    const {dataSource,exportData}=usePage(opts);

    onMounted(() => {
       setColumns();
    });

    /**
     * 更新表格头
     */
    const setColumns = () => {
      const date = getDate({});
      const { columns } = state;
      date.forEach((item: any, $index: number) => {
        columns.push({
          key: `data${$index + 1}`,
          dataIndex: `data${$index + 1}`,
          align: "center",
          title: `${item}年`,
          width:200,
        });
      });
      state.columns = columns;
    };

    const handleExport=()=>{
      
      const {columns}=state;
      console.log('---handleExport---',columns); 
      const header={} as any;
      columns.forEach((item:any)=>{
        const {key,title}=item;
        header[`${key}`]=title;  
      });
      console.log('---handleExport---',header); 
      exportData(header);
    }

    return {
      ...toRefs(state),
      dataSource,
      handleExport,
    };
  },
});
</script>
<style lang="less" scoped>
.portal{
  height: 100vh;
}
</style>

<template>
  <div class="portal">
    <h1>Excel Import page</h1>
    <div>
      <a-table :dataSource="dataSource"
               :columns="columns" />
    </div>
    <div>
      <a-upload :file-list="fileList"
                :before-upload="beforeUpload">
        <a-button>
          <upload-outlined></upload-outlined>
          导入
        </a-button>
      </a-upload>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  onMounted,
  computed,
} from "vue";
import { useExcel } from "@/composables/useExcel";
import service from "@/service";
import { getDate } from "@/utils/function";
const columns = [
  {
    key: "typeName",
    dataIndex: "typeName",
    align: "center",
    title: "统计数据",
    width: 200,
  },
];
export default defineComponent({
  props: {},
  components: {},
  setup() {
    const state = reactive({
      columns,
      search: {},
      fileList: [] as any,
    });
    const opts = {
      queryApi: "queryCode",
      filename: "码量授权趋势",
    };
    const { dataSource, importData } = useExcel(opts);

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
          width: 200,
        });
      });
      state.columns = columns;
    };

    const beforeUpload = (file: any) => {
      state.fileList = [file];
      handleImport(file);
      return false;
    };
    const handleImport = (file: any) => {
      const header = [
        "typeName",
        "data1",
        "data2",
        "data3",
        "data4",
        "data5",
        "data6",
        "data7",
        "data8",
        "data9",
        "data10",
      ];
      importData(file, { header });
    };

    return {
      ...toRefs(state),
      dataSource,
    };
  },
});
</script>
<style lang="less" scoped>
.portal {
  height: 100vh;
}
</style>

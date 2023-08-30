<template>
  <div class="codePanel"
       style="height: 100%">
    <div class="table-btn">
      <a-button type="primary"
                @click="handleAdd">添加</a-button>
    </div>
    <a-table :columns="columns"
             :dataSource="dataSource"
             :pagination="false">
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'categoryId'">
          <a-cascader style="width: 150px"
                      placeholder="请选择产品分类"
                      :options="categoryOptions"
                      v-model:value="record.categoryId"
                      :fieldNames="fieldCategoryNames"
                      :load-data="loadData"
                      @change="()=>categoryChange(index)"></a-cascader>
        </template>
        <template v-if="column.key === 'productId'">
          <a-select style="width: 150px"
                    placeholder="请选择产品"
                    :options="record.productOptions"
                    v-model:value="record.productId"
                    :fieldNames="fieldProductNames"
                    @change="productChange(index)"></a-select>
        </template>
        <template v-if="column.key === 'specifications'">
          {{ record.specifications }}
        </template>
        <template v-if="column.key === 'applyCodeNum'">
          <a-input-number v-model:value.number="record.applyCodeNum"
                          type="number"
                          placeholder="请输入申请码量"
                          style="width: 100%" />
        </template>
        <template v-if="column.key === 'action'">
          <a-button type="link"
                    danger
                    size="small"
                    @click="handleDelete(index)"> 移除 </a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import Index from "./index";

export default Index;
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
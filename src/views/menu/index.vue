<template>
  <div class="p-15px">
    <n-card
      class="menu-container"
      hoverable
    >
      <n-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-placement="left"
        style="max-width: 100%"
      >
        <n-grid
          cols="2 s:3 m:4 l:5 xl:6 2xl:7"
          x-gap="12"
          responsive="screen"
        >
          <n-grid-item>
            <n-form-item
              label="菜单名称"
              path="inputValue"
            >
              <n-input v-model:value="formData.inputValue" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item
              label="路由名称"
              path="inputValue"
            >
              <n-input v-model:value="formData.inputValue" />
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-form>
      <n-data-table
        pagination-behavior-on-filter="first"
        :columns="columns"
        :data="result?.menus.edges"
        :pagination="pagination"
        :scroll-x="1200"
      />
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { DataTableColumns } from "naive-ui";
import { ref, watchEffect } from "vue";
import { useMenusApi } from "@/gqlApi/menu.gql";

const formData = ref({ inputValue: "" });
const formRules = ref({});
/**
 * 列表数据
 */
const { result } = useMenusApi({
  queryMenuInput: {
    after: "",
    first: 10,
    query: {
      parentId: null
    }
  }
});
watchEffect(() => {
  console.log(result.value?.menus);
});

type RowData = {
  key: number;
  name: string;
  age: number;
  address: string;
};

const columns: DataTableColumns<RowData> = [
  {
    title: "名称",
    key: "node.title",
    fixed: "left"
  },
  {
    title: "唯一标识",
    key: "node.name"
  },
  {
    title: "类型",
    key: "node.type"
  },
  {
    title: "名称",
    key: "node.title"
  },
  {
    title: "名称",
    key: "node.title"
  },
  {
    title: "名称",
    key: "node.title"
  },
  {
    title: "名称",
    key: "node.title"
  },
  {
    title: "名称",
    key: "node.title"
  }
];

const pagination = {
  "show-quick-jumper": true,
  "show-size-picker": true,
  "page-sizes": [5, 10, 20, 50, 100]
};
</script>

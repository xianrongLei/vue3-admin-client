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
        size="small"
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
        :data="tableDate"
        :pagination="pagination"
        :scroll-x="1200"
        :row-key="rowKey"
      />
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import type { DataTableColumns } from "naive-ui";
import type { Ref } from "vue";
import { ref, watchEffect } from "vue";
import type { Menu } from "@/types/gql.types";
import { useMenusApi } from "@/gqlApi/menu.gql";

const formData = ref({ inputValue: "" });
const formRules = ref({});
const tableDate: Ref<Partial<Menu & { key: string }>[]> = ref([]);
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
  if (result.value?.menus?.edges)
    tableDate.value = result.value.menus.edges.map((e) => ({ ...e?.node, key: e!.cursor }));
});

const columns: DataTableColumns<Menu> = [
  {
    type: "selection",
    fixed: "left"
  },
  {
    title: "菜单名称",
    key: "title",
    fixed: "left"
  },
  {
    title: "唯一标识",
    key: "name",
    align: "center"
  },
  {
    title: "类型",
    key: "type",
    align: "center"
  },
  {
    title: "是否隐藏",
    key: "isHidden",
    align: "center",
    render(rowData) {
      if (rowData.isHidden) {
        return "是";
      }
      return "否";
    }
  },
  {
    title: "是否缓存",
    key: "isCache",
    align: "center",
    render(rowData) {
      if (rowData.isCache) {
        return "是";
      }
      return "否";
    }
  },
  {
    title: "打开方式",
    key: "outside",
    align: "center",
    render(rowData) {
      if (rowData.outside) {
        return "外部链接";
      }
      return "内部打开";
    }
  },
  {
    title: "组件路径",
    key: "component",
    align: "center"
  },
  {
    title: "路由地址",
    key: "route",
    align: "center"
  },
  {
    title: "操作",
    key: "none",
    fixed: "right",
    align: "center",
    render() {
      return "dsf";
    }
  }
];
const rowKey = (row: Menu) => row.id;
const pagination = {
  "show-quick-jumper": true,
  "show-size-picker": true,
  "page-sizes": [5, 10, 20, 50, 100]
};
</script>

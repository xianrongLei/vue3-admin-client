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
      />
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { DataTableColumns } from "naive-ui";
import { Ref, ref, watchEffect } from "vue";
import { useMenusApi } from "@/gqlApi/menu.gql";
import { MenuEdge } from "@/types/gql.types";

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

const tableDate: Ref<Partial<MenuEdge & { key: string }>[]> = ref([]);
console.log(tableDate);

watchEffect(() => {
  if (result.value?.menus?.edges) {
    tableDate.value = result.value.menus.edges.map((e) => ({ ...e, key: e!.cursor }));
  }
});

type RowData = {
  key: number;
  name: string;
  age: number;
  address: string;
};

const columns: DataTableColumns<RowData> = [
  {
    type: "selection",
    fixed: "left"
  },
  {
    title: "名称",
    key: "node.title",
    fixed: "left",
    align: "center"
  },
  {
    title: "唯一标识",
    key: "node.name",
    align: "center"
  },
  {
    title: "类型",
    key: "node.type",
    align: "center"
  },
  {
    title: "是否隐藏",
    key: "node.isHidden",
    align: "center"
  },
  {
    title: "打开方式",
    key: "node.outside",
    align: "center"
  },
  {
    title: "组件路径",
    key: "node.component",
    align: "center"
  },
  {
    title: "路由地址",
    key: "node.route",
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

const pagination = {
  "show-quick-jumper": true,
  "show-size-picker": true,
  "page-sizes": [5, 10, 20, 50, 100]
};
</script>

<template>
  <div class="p-15px">
    <n-card class="menu-container">
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
        :data="data"
        :pagination="pagination"
      />
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { DataTableColumns } from "naive-ui";
import { ref } from "vue";

const formData = ref({ inputValue: "" });
const formRules = ref({});

type RowData = {
  key: number;
  name: string;
  age: number;
  address: string;
};

const columns: DataTableColumns<RowData> = [
  {
    title: "Name",
    key: "name"
  },
  {
    title: "Age",
    key: "age"
  },
  {
    title: "Address",
    key: "address",
    defaultFilterOptionValues: [],
    filterOptions: [
      {
        label: "London",
        value: "London"
      },
      {
        label: "New York",
        value: "New York"
      }
    ],
    filter(value, row) {
      // eslint-disable-next-line no-bitwise
      return !!~row.address.indexOf(String(value));
    }
  }
];

const data: RowData[] = [
  {
    key: 1,
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park"
  },
  {
    key: 2,
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park"
  },
  {
    key: 3,
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park"
  },
  {
    key: 4,
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park"
  }
];
const pagination = {
  "show-quick-jumper": true,
  "show-size-picker": true,
  "page-sizes": [5, 10, 20, 50, 100]
};
</script>

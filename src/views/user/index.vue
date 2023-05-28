<template>
  <div class="user-container m-15px">
    <n-data-table
      pagination-behavior-on-filter="first"
      :columns="columns"
      :data="data"
      :pagination="pagination"
    />
  </div>
</template>

<script lang="ts" setup>
import { DataTableColumns } from "naive-ui";

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

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Table, Card, Button, Popconfirm } from "ant-design-vue";
import Search, { SearchStateType } from "./components/search.vue";
import EditDialog from "./components/editDialog.vue";
import { AccountItem } from "@/types/api";
import request from 'main_request_vue/request';

const searchRef = ref<InstanceType<typeof Search> | null>();
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>();
const loading = ref(false)

const onSearch = async (values: SearchStateType) => {
  loading.value = true
  const res = await request.get<AccountItem[]>('/accounts', { params: values })
  data.value = res.data
  loading.value = false
};
const onCreate = () => {
  editDialogRef.value?.show(undefined, true);
};
const refresh = () => {
  const values = searchRef.value?.getSearchValues();
  onSearch(values!);
};
onMounted(() => {
  refresh()
})
const dataColumns = [
  { title: "用户名", dataIndex: "name", key: "name" },
  { title: "邮箱", dataIndex: "email", key: "email" },
  { title: "权限", dataIndex: "rules", key: "rules" },
  { title: "状态", dataIndex: "status", key: "status" },
  { title: "操作", key: "operation" },
];

const data = ref<AccountItem[]>([]);


const onDelete = async (id: number, index: number) => {
  await request.del(`/accounts/${id}`)
  data.value.splice(index, 1);
};

const onClick = (record: AccountItem) => {
  editDialogRef.value?.show(
    {
      ...record,
      rules: record.rules.map((item) => item.value),
    },
    false
  );
};
</script>

<template>
  <div class="accounts-pages">
    <Search ref="searchRef" :loading="loading" @search="onSearch" @create="onCreate" />
    <EditDialog ref="editDialogRef" @refresh="refresh" />
    <Card class="mt-20">
      <Table :loading="loading" :data-source="data" :columns="dataColumns" bordered>
        <template #bodyCell="{ record, column, index }">
          <template v-if="column.key === 'status'">
            <span>{{ record.status == "on" ? "启用" : "禁用" }}</span>
          </template>
          <template v-else-if="column.key === 'rules'">
            <span
              >{{ record.rules.map((item: AccountItem['rules'][0]) => item.name).join(',') }}</span
            >
          </template>
          <template v-else-if="column.key === 'operation'">
            <Button 
              type="text"
              :size="'small'"
              @click="onClick(record as AccountItem)"
            >编辑</Button>
            <Popconfirm
              title="删除后无法恢复，请确认"
              ok-text="确认"
              cancel-text="取消"
              @confirm="onDelete(record.id, index)"
            >
              <Button type="text" :size="'small'" danger>删除</Button>
            </Popconfirm>
          </template>
        </template>
      </Table>
    </Card>
  </div>
</template>

<style scoped lang="less">
@color: red;
.accounts-pages {
  color: @color;
}
</style>

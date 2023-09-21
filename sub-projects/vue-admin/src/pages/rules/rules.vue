<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Table, Card, Button, Popconfirm } from "ant-design-vue";
import Search, { SearchStateType } from "./components/search.vue";
import EditDialog from "./components/editDialog.vue";
import { RuleItem } from '@/types/api';
import request from 'main_for_vue/request';

const loading = ref(false)
const searchRef = ref<InstanceType<typeof Search> | null>();
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>();
const onSearch = (values: SearchStateType) => {
  getData(values)
};
const onCreate = () => {
  editDialogRef.value?.show(undefined, true);
};
const refresh = () => {
  const values = searchRef.value?.getSearchValues();
  onSearch(values!);
};
const dataColumns = [
  { title: "用户名", dataIndex: "name", key: "name" },
  { title: "菜单权限", dataIndex: "menus", key: "menus" },
  { title: "按钮权限", dataIndex: "buttons", key: "buttons" },
  { title: "操作", key: "operation" },
];

const data = ref<RuleItem[]>([]);

const getData = async (params: SearchStateType) => {
  loading.value = true
  const res = await request.get<RuleItem[]>('/rules', { params })
  data.value = res.data
  loading.value = false
}

onMounted(() => {
  refresh()
})

const onDelete = async (id: number, index: number) => {
  await request.del(`/rules/${id}`)
  data.value.splice(index, 1);
};

const onClick = (record: RuleItem) => {
  editDialogRef.value?.show(
    {
      ...record,
      menus: record.menus.map((item) => item.value),
      buttons: record.buttons.map((item) => item.value),
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
      <Table :data-source="data" :columns="dataColumns" bordered>
        <template #bodyCell="{ record, column, index }">
          <template v-if="column.key === 'buttons'">
            <span>{{ record.buttons.map((item: RuleItem['buttons'][0]) => item.name).join(',') }}</span>
          </template>
          <template v-else-if="column.key === 'menus'">
            <span>{{ record.menus.map((item: RuleItem['menus'][0]) => item.name).join(',') }}</span>
          </template>
          <template v-else-if="column.key === 'operation'">
            <Button type="text" :size="'small'" @click="onClick(record as RuleItem)">编辑</Button>
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

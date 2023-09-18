<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Card, Table, Button, Popconfirm } from "ant-design-vue";
import Search, { SearchStateType } from "./components/search.vue";
import EditDialog from './components/editDialog.vue';
import request from 'main_request_vue/request';
import { MenuItem } from '@/types/api';

const dialog = ref<InstanceType<typeof EditDialog> | null>(null)
const searchRef = ref<InstanceType<typeof Search> | null>();

const onSearch = (values: SearchStateType) => {
  getData(values)
};

const dataColumns = [
  { title: "系统", dataIndex: "name", key: "name" },
  { title: "目录个数", dataIndex: "count", key: "count" },
  { title: "操作", key: "operation" },
];
const innerColumns = [
  { title: "目录名称", dataIndex: "name", key: "name" },
  { title: '目录跳转url', dataIndex: 'url', key: 'url' },
  { title: "目录层级", dataIndex: "level", key: "level" },
  { title: "是否显示在菜单", dataIndex: "hidden", key: "hidden" },
  { title: "优先级", dataIndex: "sort", key: "sort" },
  { title: "是否启用", dataIndex: "status", key: "status" },
  { title: "操作", key: "operation" },
];

const data = ref<MenuItem[]>([]);
const loading =  ref(false)

const getData = async (params: SearchStateType) => {
  loading.value = true
  const res = await request.get<MenuItem[]>('/menus', { params })
  data.value = res.data
  loading.value = false
}

const refresh = () => {
  const values = searchRef.value?.getSearchValues()
  onSearch(values!)
}

onMounted(() => {
  refresh()
})

type DataType = MenuItem

const add = (systemId: number, parent?: DataType['menus'][0]) => {
  dialog.value?.show(true, undefined, systemId, parent)
}

const edit = (systemId: number, targetMenu: DataType['menus'][0]) => {
  dialog.value?.show(false, targetMenu, systemId)
}

const onDelete = async (TargetSystem: DataType, id: number, index: number) => {
  await request.del(`/menus/${id}`)
  TargetSystem.menus.splice(index, 1)
}

</script>

<template>
  <div class="menus-pages">
    <EditDialog ref="dialog" @refresh="refresh"></EditDialog>
    <Search
      ref="searchRef"
      :loading="loading"
      :init-state="{
        system: '',
        status: 'on',
        name: '',
      }"
      @search="onSearch"
    />
    <Card class="mt-20">
      <Table bordered :data-source="data" :columns="dataColumns">
        <template #bodyCell="{ record: systemRecord, column }">
          <template v-if="column.key === 'operation'">
            <Button type="text" :size="'small'" @click="add(systemRecord.id)">增加一级目录</Button>
          </template>
        </template>
        <template #expandedRowRender="{ record: systemRecord }">
          <Table :columns="innerColumns" :data-source="systemRecord.menus" :pagination="false">
            <template #bodyCell="{ record, column, index }">
              <template v-if="column.key === 'hidden'">
                <span>{{ record.hidden ? "隐藏" : "显示" }}</span>
              </template>
              <template v-else-if="column.key === 'status'">
                <span>{{ record.status === 'on' ? "启用" : "未启用" }}</span>
              </template>
              <template v-else-if="column.key === 'operation'">
                <Button type="text" :size="'small'" @click="add(systemRecord.id, record as DataType['menus'][0])">增加子目录</Button>
                <Button type="text" :size="'small'" @click="edit(systemRecord.id, record as DataType['menus'][0])">编辑</Button>
                <Popconfirm
                  title="删除后无法恢复，请确认"
                  ok-text="确认"
                  cancel-text="取消"
                  @confirm="onDelete(systemRecord, record.id, index)"
                >
                  <Button type="text" :size="'small'" danger>删除</Button>
                </Popconfirm>
              </template>
            </template>
          </Table>
        </template>
      </Table>
    </Card>
  </div>
</template>

<style lang="less">
  .ant-table-wrapper .ant-table-pagination {
    margin-bottom: 0px !important;
  }
</style>

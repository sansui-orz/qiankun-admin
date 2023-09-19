<script setup lang="ts">
import { reactive, defineProps, defineEmits, ref, toRaw, onMounted } from "vue";
import {
  Card,
  Form,
  Row,
  Col,
  FormItem,
  Select,
  SelectOption,
  Input,
  Button,
} from "ant-design-vue";
import CreateSystem from './createSystem.vue'
import { useOptionsStore } from '@/store/options'

defineExpose({
  getSearchValues() {
    return toRaw(formState)
  }
})

const options = useOptionsStore()
onMounted(() => {
  options.getSystemOptions()
})

const createSystemRef = ref<InstanceType<typeof CreateSystem> | null>()

const props = defineProps<{ initState: SearchStateType; loading: boolean; }>();

const emit = defineEmits<{
  search: [values: SearchStateType]; // 具名元组语法
}>();

const formState = reactive(props.initState);

const onFinish = (values: any) => {
  emit('search', values)
};

const create = () => {
  createSystemRef.value?.show()
};
const onCreated = () => {
  emit('search', formState)
}
</script>
<script lang="ts">
export type SearchStateType = {
  system: string;
  status: "on" | "off" | "all";
  name: string;
};
</script>

<template>
  <div class="menus-search">
    <CreateSystem ref="createSystemRef" @onCreated="onCreated"/>
    <Card>
      <Form name="searchForm" :model="formState" @finish="onFinish">
        <Row :gutter="20">
          <Col :span="6">
            <FormItem name="system" label="系统名称">
              <Select v-model:value="formState.system" allow-clear>
                <SelectOption v-for="item in options.systemOptions" :key="item.value" :value="item.value">{{ item.name }}</SelectOption>
              </Select>
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem name="status" label="启用状态">
              <Select v-model:value="formState.status">
                <SelectOption value="on">启用</SelectOption>
                <SelectOption value="off">未启用</SelectOption>
                <SelectOption :value="'all'">全部</SelectOption>
              </Select>
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem name="name" label="目录名称">
              <Input v-model:value="formState.name" />
            </FormItem>
          </Col>
        </Row>
        <div className="flex">
          <div className="grow">
            <Button type="primary" @click="create">创建系统</Button>
          </div>
          <Button type="primary" html-type="submit" :loading="props.loading">搜索</Button>
        </div>
      </Form>
    </Card>
  </div>
</template>

<style scoped lang="less"></style>

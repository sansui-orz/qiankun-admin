<script setup lang="ts">
import { reactive, defineProps, defineEmits, defineExpose, toRaw, onMounted } from "vue";
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
import { useOptionsStore } from '@/store/options'

defineExpose({
  getSearchValues() {
    return toRaw(formState)
  }
})

const props = defineProps<{ initState?: SearchStateType; loading: boolean; }>();

const emit = defineEmits<{
  search: [values: SearchStateType];
  create: [];
}>();

const options = useOptionsStore()
onMounted(() => {
  options.getRuleOptions()
})

const formState = reactive<SearchStateType>(
  props.initState || {
    rules: [],
    status: "all",
    name: "",
    email: "",
  }
);

const onFinish = (values: SearchStateType) => {
  emit("search", values);
};

const create = () => {
  emit('create');
};
</script>
<script lang="ts">
export type SearchStateType = {
  rules: string[];
  status: "on" | "off" | "all";
  name: string;
  email: string;
};
</script>
<template>
  <div class="menus-search">
    <Card>
      <Form name="searchForm" :model="formState" @finish="onFinish">
        <Row :gutter="20">
          <Col :span="6">
            <FormItem name="name" label="账号名称">
              <Input v-model:value="formState.name" />
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem name="email" label="账号邮箱">
              <Input v-model:value="formState.email" />
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem name="rules" label="包含角色">
              <Select v-model:value="formState.rules" :max-tag-count="1" mode="multiple" allow-clear>
                <SelectOption v-for="item in options.ruleOptions" :value="item.value" :key="item.value">{{ item.name }}</SelectOption>
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
        </Row>
        <div className="flex">
          <div className="grow">
            <Button type="primary" @click="create">创建账号</Button>
          </div>
          <Button type="primary" html-type="submit" :loading="props.loading">搜索</Button>
        </div>
      </Form>
    </Card>
  </div>
</template>

<style scoped lang="less"></style>

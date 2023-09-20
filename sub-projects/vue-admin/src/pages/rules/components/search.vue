<script setup lang="ts">
import { reactive, toRaw, onMounted } from "vue";
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

export type SearchStateType = {
  menus: number[];
  buttons: number[];
  name: string;
};

defineExpose({
  getSearchValues() {
    return toRaw(formState)
  }
})

const props = defineProps<{ initState?: SearchStateType; loading?: boolean }>();

const emit = defineEmits<{
  search: [values: SearchStateType];
  create: [];
}>();

const options = useOptionsStore()
onMounted(() => {
  options.getMenuOptions()
})

const formState = reactive<SearchStateType>(
  props.initState || {
    menus: [],
    buttons: [],
    name: "",
  }
);

const onFinish = (values: SearchStateType) => {
  emit("search", values);
};

const create = () => {
  emit('create');
};
</script>

<template>
  <div class="menus-search">
    <Card>
      <Form name="searchForm" :model="formState" @finish="onFinish">
        <Row :gutter="20">
          <Col :span="6">
            <FormItem name="name" label="角色名称">
              <Input v-model:value="formState.name" />
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem name="menus" label="目录权限">
              <Select v-model:value="formState.menus" :max-tag-count="1" mode="multiple" allow-clear>
                <SelectOption v-for="item in options.menuOptions" :key="item.value" :value="item.value">{{ item.name }}</SelectOption>
              </Select>
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem name="buttons" label="按钮权限">
              <Select v-model:value="formState.buttons" :max-tag-count="1" mode="multiple" allow-clear>
                <SelectOption :value="1">删除账号</SelectOption>
                <SelectOption :value="2">删除角色</SelectOption>
                <SelectOption :value="3">创建账号</SelectOption>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <div className="flex">
          <div className="grow">
            <Button type="primary" @click="create">创建角色</Button>
          </div>
          <Button type="primary" html-type="submit" :loading="props.loading">搜索</Button>
        </div>
      </Form>
    </Card>
  </div>
</template>

<style scoped lang="less"></style>

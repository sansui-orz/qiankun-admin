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
  rules: string[];
  status: "on" | "off" | "all";
  name: string;
  email: string;
};

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

<template>
  <div class="menus-search">
    <Card>
      <Form name="searchForm" :model="formState" @finish="onFinish">
        <Row :gutter="20">
          <Col :span="6">
            <FormItem name="name" :label="$t('account')">
              <Input v-model:value="formState.name" />
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem name="email" :label="$t('email')">
              <Input v-model:value="formState.email" />
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem name="rules" :label="$t('include-rule')">
              <Select v-model:value="formState.rules" :max-tag-count="1" mode="multiple" allow-clear>
                <SelectOption v-for="item in options.ruleOptions" :value="item.value" :key="item.value">{{ item.name }}</SelectOption>
              </Select>
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem name="status" :label="$t('status')">
              <Select v-model:value="formState.status">
                <SelectOption value="on">{{ $t('on') }}</SelectOption>
                <SelectOption value="off">{{ $t('off') }}</SelectOption>
                <SelectOption :value="'all'">{{ $t('all') }}</SelectOption>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <div className="flex">
          <div className="grow">
            <Button type="primary" @click="create">{{ $t('create') }}</Button>
          </div>
          <Button type="primary" html-type="submit" :loading="props.loading">{{ $t('search') }}</Button>
        </div>
      </Form>
    </Card>
  </div>
</template>

<style scoped lang="less"></style>

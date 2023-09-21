<script setup lang="ts">
import { ref, reactive, toRaw, onMounted } from "vue";
import {
  Modal,
  Form,
  FormItem,
  Select,
  SelectOption,
  Input,
  Switch,
  InputNumber,
  message
} from "ant-design-vue";
import request from "main_for_vue/request";
import { useOptionsStore } from '@/store/options'

defineExpose({
  show: (
    create: boolean,
    targetMenu?: StateType,
    systemId?: number,
    parent?: StateType
  ) => {
    if (create) {
      formState.value = { ...defaultState, systemId, parentId: parent?.id };
    } else {
      formState.value = { ...targetMenu!, systemId };
    }
    isCreate.value = create;
    show.value = true;
  },
  close: () => {
    show.value = false;
  },
});
const emit = defineEmits<{
  refresh: [];
}>();

const options = useOptionsStore()
onMounted(() => {
  options.getSystemOptions()
})

const show = ref(false);
const isCreate = ref(true);
const formRef = ref<InstanceType<typeof Form> | null>(null);

interface StateType {
  name: string;
  level: number;
  hidden: boolean;
  sort: number;
  status: string;
  parentId?: number | null;
  systemId?: number | null;
  id: number | null;
  url: string;
}

const defaultState: StateType = {
  name: "",
  level: 1,
  hidden: false,
  sort: 1,
  status: "on",
  parentId: null,
  systemId: null,
  id: null,
  url: "",
};
const formState = ref({ ...defaultState });
const rules = reactive({
  name: [{ required: true, message: "目录名称不能为空" }],
  url: [{ required: true, message: "目录跳转url不能为空" }],
  sort: [{ required: true, message: "排序值不能为空" }],
});
const handleOk = () => {
  const hide = message.loading('数据更新中...', 0)
  formRef
    // @ts-ignore
    .value!.validate()
    .then(() => {
      const params = toRaw(formState.value);
      const method = isCreate.value ? request.post : request.put;
      return method(isCreate.value ? "/menus" : `/menus/${params.id}`, {
        ...params,
        id: undefined,
      });
    })
    .then(() => {
      show.value = false;
      emit('refresh')
    })
    .catch((err: any) => {
      console.log("err", err);
    })
    .finally(() => {
      hide()
    });
};

const onFinish = (values: StateType) => {
  console.log("values", values);
};
const onFinishFailed = () => {};

const parentMenus = {
  "1": [
    { value: 11, name: "数据看板" },
    { value: 12, name: "数据详情" },
    { value: 13, name: "数据表格" },
  ],
  "2": [
    { value: 21, name: "账号管理" },
    { value: 22, name: "角色管理" },
    { value: 23, name: "菜单管理" },
  ],
};
</script>
<template>
  <Modal
    v-model:open="show"
    :title="isCreate ? '创建目录' : '编辑目录'"
    @ok="handleOk"
  >
    <Form
      ref="formRef"
      :model="formState"
      name="form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <FormItem label="所属系统" name="systemId">
        <Select v-model:value="(formState.systemId as number)" disabled>
          <SelectOption v-for="item in options.systemOptions" :key="item.value" :value="item.value">{{ item.name }}</SelectOption>
        </Select>
      </FormItem>
      <FormItem v-if="formState.parentId" label="父级目录" name="parentId">
        <Select v-model:value="(formState.parentId as number)" disabled>
          <SelectOption
            v-for="item in parentMenus[formState.systemId as (1 | 2)]"
            :value="item.value"
            >{{ item.name }}</SelectOption
          >
        </Select>
      </FormItem>
      <FormItem label="目录层级" name="level">
        <Input v-model:value="formState.level" disabled />
      </FormItem>
      <FormItem label="目录名称" name="name" :rules="rules.name">
        <Input v-model:value="formState.name" placeholder="请输入目录名称" />
      </FormItem>
      <FormItem label="目录跳转url" name="url" :rules="rules.url">
        <Input v-model:value="formState.url" placeholder="请输入目录跳转url" />
      </FormItem>
      <FormItem label="是否在菜单隐藏" name="hidden">
        <Switch v-model:checked="formState.hidden" />
      </FormItem>
      <FormItem label="排序" name="sort" :rules="rules.sort">
        <InputNumber
          v-model:value="formState.sort"
          placeholder="数值越大，目录排序越靠前"
        ></InputNumber>
      </FormItem>
      <FormItem label="是否启用" name="status">
        <Switch
          v-model:checked="formState.status"
          :checkedValue="'on'"
          :unCheckedValue="'off'"
        />
      </FormItem>
    </Form>
  </Modal>
</template>

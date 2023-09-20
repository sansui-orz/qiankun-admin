<script setup lang="ts">
import { ref, toRaw, onMounted } from "vue";
import { Modal, Form, FormItem, Input, Select, SelectOption, message } from "ant-design-vue";
import request from 'main_request_vue/request';
import { useOptionsStore } from '@/store/options'

defineExpose({
  show: (state: AccountType | undefined, create: boolean) => {
    if (state) {
      formState.value = state;
    } else {
      formState.value = { ...defaultState };
    }
    show.value = true;
    isCreate.value = create;
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
  options.getMenuOptions()
})

const defaultState = {
  id: undefined,
  name: "",
  menus: [],
  buttons: [],
};
const show = ref(false);
const isCreate = ref(false);
const formRef = ref<InstanceType<typeof Form> | null>(null);
const formState = ref<AccountType>({ ...defaultState });

const handleOk = () => {
  const hide = message.loading('数据更新中...', 0)
  formRef
    // @ts-ignore
    .value!.validate()
    .then(() => {
      const params = toRaw(formState.value)
      const method = isCreate.value ? request.post : request.put
      return method(isCreate.value ? '/rules' : `/rules/${params.id}`, {
        ...params,
        id: undefined
      })
    })
    .then(() => {
      show.value = false;
      emit("refresh");
    })
    .catch((err: any) => {
      console.log("err", err);
    })
    .finally(() => {
      hide()
    });
};
</script>
<script lang="ts">
export type AccountType = {
  id: number | undefined;
  name: string;
  menus: number[];
  buttons: number[];
};
</script>
<template>
  <Modal
    v-model:open="show"
    :title="isCreate ? '新建角色' : '编辑角色'"
    @ok="handleOk"
  >
    <Form
      ref="formRef"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      :model="formState"
      name="form"
    >
      <FormItem
        label="角色名称"
        name="name"
        :rules="[{ required: true, message: '请输入角色名称' }]"
      >
        <Input v-model:value="formState.name" placeholder="请输入角色名称" />
      </FormItem>
      <FormItem label="用户权限" name="menus">
        <Select v-model:value="formState.menus" mode="multiple" allow-clear>
          <SelectOption v-for="item in options.menuOptions" :key="item.value" :value="item.value">{{ item.name }}</SelectOption>
        </Select>
      </FormItem>
      <FormItem name="buttons" label="按钮权限">
        <Select v-model:value="formState.buttons" mode="multiple" allow-clear>
          <SelectOption :value="1">删除账号</SelectOption>
          <SelectOption :value="2">删除角色</SelectOption>
          <SelectOption :value="3">创建账号</SelectOption>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>

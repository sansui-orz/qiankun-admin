<script setup lang="ts">
import { ref, toRaw, onMounted } from "vue";
import { Modal, Form, FormItem, Input, Select, SelectOption, message } from "ant-design-vue";
import request from "main_for_vue/request";
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
  options.getRuleOptions()
})

const defaultState = {
  id: undefined,
  name: "",
  email: "",
  password: "",
  rules: [],
  status: "off",
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
      const params = toRaw(formState.value);
      const method = isCreate.value ? request.post : request.put;
      return method(isCreate.value ? "/accounts" : `/accounts/${params.id}`, {
        ...params,
        id: undefined,
      });
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
  email: string;
  password?: string;
  rules: string[];
  status: string;
};
</script>
<template>
  <Modal
    v-model:open="show"
    :title="isCreate ? '新建用户' : '编辑用户'"
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
        label="用户名称"
        name="name"
        :rules="[{ required: true, message: '请输入用户名称' }]"
      >
        <Input v-model:value="formState.name" placeholder="请输入用户名称" />
      </FormItem>
      <FormItem
        label="用户邮箱"
        name="email"
        :rules="[{ required: true, message: '请输入用户邮箱' }]"
      >
        <Input v-model:value="formState.email" placeholder="请输入用户邮箱" />
      </FormItem>
      <FormItem
        v-if="isCreate"
        label="用户密码"
        name="password"
        :rules="[{ required: true, message: '请输入用户密码' }]"
      >
        <Input v-model:value="formState.password" placeholder="请输入用户密码" />
      </FormItem>
      <FormItem label="用户权限" name="rules">
        <Select v-model:value="formState.rules" mode="multiple" allow-clear>
          <SelectOption v-for="item in options.ruleOptions" :value="item.value" :key="item.value">{{ item.name }}</SelectOption>
        </Select>
      </FormItem>
      <FormItem name="status" label="启用状态">
        <Select v-model:value="formState.status">
          <SelectOption value="on">启用</SelectOption>
          <SelectOption value="off">未启用</SelectOption>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>

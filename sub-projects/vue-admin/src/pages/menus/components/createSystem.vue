<script setup lang="ts">
import { ref, defineExpose, defineEmits, reactive } from "vue";
import { Modal, Form, FormItem, Input } from "ant-design-vue";

defineExpose({
  show: () => {
    formState.name = ''
    show.value = true;
  },
  close: () => {
    show.value = false;
  },
});
const emit = defineEmits<{
  onCreated: [];
}>();

const show = ref(false);
const formRef = ref<InstanceType<typeof Form> | null>(null);
const formState = reactive({ name: "" });

const handleOk = () => {
  formRef
    // @ts-ignore
    .value!.validate()
    .then(() => {
      console.log("创建系统 => ", formState.name);
      // TODO: 发起请求
      show.value = false;
      emit('onCreated')
    })
    .catch((err: any) => {
      console.log("err", err);
    });
};
</script>
<template>
  <Modal v-model:open="show" :title="'创建系统'" @ok="handleOk">
    <Form ref="formRef" :model="formState" name="form">
      <FormItem
        label="目录名称"
        name="name"
        :rules="[{ required: true, message: '请输入系统名称' }]"
      >
        <Input v-model:value="formState.name" placeholder="请输入目录名称" />
      </FormItem>
    </Form>
  </Modal>
</template>

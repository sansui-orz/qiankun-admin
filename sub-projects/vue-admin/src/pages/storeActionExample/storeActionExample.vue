<script setup lang="ts">
import { ref, toRaw } from "vue";
import { Card, Form, Row, Col, FormItem, Input, Button } from "ant-design-vue";

import { useUserStore, UserStoreType } from "@/store/user";
import { useConfigStore, ConfigStoreType } from "@/store/config";
import { useMainStoreDispatch } from "@/hooks";

const user = useUserStore();
const config = useConfigStore();
const formState = ref<UserStoreType>({ ...toRaw(user.$state) });
const formState2 = ref<ConfigStoreType>({ ...toRaw(config.$state) });
const dispatch = useMainStoreDispatch();

const onFinish = (values: any) => {
  if (JSON.stringify(toRaw(user.$state)) !== JSON.stringify(values)) {
    dispatch({ type: 'setUserInfo', value: values })
  } else {
    console.log('数据未变化')
  }
};
const onFinish2 = (values: any) => {
  if (JSON.stringify(toRaw(config.$state)) !== JSON.stringify(values)) {
    dispatch({ type: 'setConfig', value: values })
  } else {
    console.log('数据未变化')
  }
};
</script>

<template>
  <div class="store-action-example">
    <Row :gutter="20">
      <Col :span="12">
        <Card title="更新全局用户信息">
          <Form :labelCol="{ span: 6 }" :onFinish="onFinish" :model="formState">
            <FormItem
              name="username"
              label="用户名"
              :rules="[{ required: true, message: '请输入用户名' }]"
            >
              <Input v-model:value="formState.username"  />
            </FormItem>
            <FormItem
              name="account"
              label="邮箱"
              :rules="[{ required: true, message: '请输入邮箱' }]"
            >
              <Input v-model:value="formState.account"  />
            </FormItem>
            <FormItem
              name="avatar"
              label="头像"
              :rules="[{ required: true, message: '请输入头像url' }]"
            >
              <Input v-model:value="formState.avatar"  />
            </FormItem>
            <FormItem name="language" label="语言">
              <Input v-model:value="formState.language" disabled />
            </FormItem>
            <FormItem :wrapperCol="{ offset: 6 }">
              <Button type="primary" htmlType="submit"> 更新 </Button>
            </FormItem>
          </Form>
        </Card>
      </Col>
      <Col :span="12">
        <Card title="更新全局系统信息">
          <Form :labelCol="{ span: 6 }" :onFinish="onFinish2" :model="formState2">
            <FormItem
              name="name"
              label="系统名称"
              :rules="[{ required: true, message: '请输入系统名称' }]"
            >
              <Input v-model:value="formState2.name"  />
            </FormItem>
            <FormItem
              name="version"
              label="系统版本"
              :rules="[{ required: true, message: '请输入系统版本' }]"
            >
              <Input v-model:value="formState2.version"  />
            </FormItem>
            <FormItem :wrapperCol="{ offset: 6 }">
              <Button type="primary" htmlType="submit"> 更新 </Button>
            </FormItem>
          </Form>
        </Card>
      </Col>
    </Row>
  </div>
</template>

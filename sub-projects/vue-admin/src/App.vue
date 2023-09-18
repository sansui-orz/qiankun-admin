<script setup lang="ts">
import { KeepAlive } from "vue";
import { RouterView } from "vue-router";
import { routes } from "@/router/router";
import { useTabsEvent } from "@/hooks";
import { ConfigProvider } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "./App.less";

dayjs.locale("zh-cn");
const locale = zhCN;

const keepAlivePages = routes
  .map((item) => item.meta?.keepAliveName || "")
  .filter((item) => !!item);
const keepAliveInstance = useTabsEvent();
</script>

<template>
  <div class="vue-admin">
    <config-provider
      :theme="{
        token: {
          colorPrimary: '#00b96b',
        },
      }"
      :locale="locale"
    >
      <router-view v-slot="{ Component }">
        <keep-alive :include="keepAlivePages" ref="keepAliveInstance">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </config-provider>
  </div>
</template>

<style scoped lang="less"></style>

<script setup lang="ts">
import { KeepAlive, computed, watch } from "vue";
import { RouterView } from "vue-router";
import { routes } from "@/router/router";
import { useTabsEvent } from "@/hooks";
import { ConfigProvider } from "ant-design-vue";
import { useUserStore } from '@/store/user';
import zhCN from "ant-design-vue/es/locale/zh_CN";
import enUS from "ant-design-vue/es/locale/en_US";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "./App.less";

const user = useUserStore()
dayjs.locale(user.language === 'zh' ? "zh-cn" : 'en');
const locale = computed(() => user.language === 'zh' ? zhCN : enUS);

watch(() => user.language, () => {
  dayjs.locale(user.language === 'zh' ? "zh-cn" : 'en');
})

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

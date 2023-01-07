<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="state.activeTab" route active-color='#36c1ba'>
      <van-tabbar-item replace :to='item.path' v-for='item in state.tabList' :icon="item.icon">
        {{item.title}}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang='ts' setup>
  import { onMounted, reactive, ref } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const state = reactive({
    activeTab: 'home' as any,
    tabList: [
      { path: '/home', icon: 'wap-home-o', title: '首页' },
      { path: '/type', icon: 'label-o', title: '专栏' },
      { path: '/tag', icon: 'bookmark-o', title: '标签' },
      { path: '/user', icon: 'user-o', title: '用户' },
    ]
  });
  onMounted(() => {
    setTimeout(() => {
      state.activeTab = route.name;
    }, 100);
  })
</script>

<style>

</style>

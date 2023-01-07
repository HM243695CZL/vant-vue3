<template>
  <div class='home-container'>
    home
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive } from 'vue';
import { postAction, getAction } from '@/common';
import { getBlogListApi } from '@/api';
import { StatusEnum } from '@/common/status.enum';

export default defineComponent({
  name: 'home',
  setup() {
    const state = reactive({
      blogList: [],
      pageIndex: 1,
      pageSize: 10
    });
    const getBlogList = () => {
      postAction(getBlogListApi, {
        pageIndex: state.pageIndex,
        pageSize: state.pageSize
      }).then(res => {
        if(res.status === StatusEnum.SUCCESS) {
          console.log(res);
        }
      })
    };
    onMounted(() => {
      getBlogList();
    })
  }
});
</script>

<style scoped lang='scss'>
  .home-container{

  }
</style>

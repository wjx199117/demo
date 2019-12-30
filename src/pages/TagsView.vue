<template>
  <div class="float-left">
    <router-link v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path" style="float: left;">
      <div @dblclick="delSelectTag(tag)">
        <el-tag
          closable
          :disable-transitions="false"
          @close.prevent="delSelectTag(tag)" style="margin-left: 10px;" :type="isActive(tag)?'':'success'" color="white">
          {{tag.title}}
        </el-tag>
      </div>
    </router-link>
  </div>
</template>

<script>
    export default {
        computed: {
            visitedViews() {//store中取值
                return this.$store.state.tagsview.visitedviews
            }
        },
        methods: {
            reFreshTab(item) {
                let c = item.components
                item.components = []
                this.$nextTick(() => {
                    item.components = c
                })
            },
            isActive(route) {
                return route.path == this.$route.path
            },
            delSelectTag(route) {//先提交删除数据的方法,数组删除出掉数据后，如果关闭的是当前打开的路由需要将路由改为数组最后一次push进去的路由
                this.$store.dispatch('delVisitedViews', route).then((views) => {
                    if (this.isActive(route)) {//只有在关闭当前打开的标签页才会有影响
                        let lastView = views.slice(-1)[0]//选取路由数组中的最后一位
                        if (lastView) {
                            this.$router.push(lastView);
                        } else {
                            this.$router.push('/');
                        }
                    }
                })
            }
        }
    };
</script>

<style scoped>

</style>

<template>
  <div class="MemberPage">
    <div class="tabs">
      <router-link
        v-for="tab in tabs"
        :key="tab.id"
        :to="tab.path"
        class="tab"
        >{{ tab.item }}</router-link
      >
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "MemberPage",
  data() {
    return {
      tabs: [
        {
          id: 0,
          item: "個人資料",
          // path: "/profile",
          path: "/member/profile",
        },
        {
          id: 1,
          item: "收藏紀錄",
          // path: "/collection",
          path: "/member/collection",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  margin: 0 auto;
  padding: 15px;

  box-shadow: 0 5px 10px #00000070;
  background-color: $dark-green;

  text-align: center;
}

.tab {
  & + .tab {
    margin-left: 20px;
  }
  padding: 15px;

  color: #abcdef;
  font-size: 18px;

  position: relative;

  &:hover {
    text-decoration: none;
    color: #cba987;
  }

  &.router-link-active {
    &::after {
      content: "";
      margin: 0 auto;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 5px;
      background-color: #acdfff;
    }
  }
}
</style>

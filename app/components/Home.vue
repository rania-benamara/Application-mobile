<!-- components/Home.vue -->
<template>
  <Page actionBarHidden="true">
    <GridLayout rows="*, auto">
      <!-- Main content area -->
      <StackLayout row="0" @tap="closeMenu">
        <Label :text="'Content: ' + currentPage" class="page-content"/>
      </StackLayout>

      <!-- Menu component -->
      <Menu v-if="isMenuVisible" row="0" rowSpan="2" @menuTap="onMenuTap" />

      <!-- Bottom bar with menu icon -->
      <StackLayout row="1" class="bottom-bar" v-if="!isMenuVisible">
        <Label text="☰" class="menu-icon" @tap="openMenu" />
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script>
import Menu from './Menu'

export default {
  components: {
    Menu
  },
  data() {
    return {
      currentPage: 'Home',
      isMenuVisible: false
    }
  },
  methods: {
    openMenu() {
      this.isMenuVisible = true;
    },
    closeMenu() {
      if (this.isMenuVisible) {
        this.isMenuVisible = false;
      }
    },
    onMenuTap(item) {
      this.currentPage = item;
      this.closeMenu();
    }
  }
}
</script>

<style scoped>
.page-content {
  font-size: 20;
  margin: 10;
}
.bottom-bar {
  background-color: #f0f0f0;
  height: 50;
}
.menu-icon {
  font-size: 28;
  text-align: center;
  vertical-align: center;
  height: 50;
}
</style>

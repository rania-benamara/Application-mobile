<template>
  <GridLayout rows="auto" columns="*, *, *, *, *" class="bottom-nav">
    <Image src="~/images/accueil.png" col="0" class="nav-icon" @tap="navigateTo('Accueil')" />
    <Image src="~/images/chercher.png" col="1" class="nav-icon" @tap="navigateTo('Search')" />
    <Image src="~/images/panier.png" col="2" class="nav-icon" @tap="navigateTo('Panier')" />
    <Image src="~/images/favoris.png" col="3" class="nav-icon" @tap="navigateTo('Favoris')" />
    <Image src="~/images/menu.png" col="4" class="nav-icon" @tap="navigateTo('Menu')" />
  </GridLayout>
</template>

<script>
import { File, knownFolders, path } from '@nativescript/core';

export default {
  name: 'NavBar',
  mounted() {
    this.checkIconsExistence();
  },
  methods: {
    checkIconsExistence() {
      const iconNames = ['accueil', 'chercher', 'panier', 'favoris', 'menu'];
      iconNames.forEach(name => {
        const imagePath = path.join(knownFolders.currentApp().path, `images/${name}.png`);
        console.log(`${name}.png in images folder:`, File.exists(imagePath));
      });
    },
    navigateTo(page) {
      switch(page) {
        case 'Accueil':
          import('./Accueil.vue').then(module => {
            this.$navigateTo(module.default);
          }).catch(err => console.error("Failed to load Accueil:", err));
          break;
        case 'Search':
          import('./Search.vue').then(module => {
            this.$navigateTo(module.default);
          }).catch(err => console.error("Failed to load Search:", err));
          break;
        case 'Panier':
          import('./Panier.vue').then(module => {
            this.$navigateTo(module.default);
          }).catch(err => console.error("Failed to load Panier:", err));
          break;
        case 'Favoris':
          import('./Favoris.vue').then(module => {
            this.$navigateTo(module.default);
          }).catch(err => console.error("Failed to load Favoris:", err));
          break;
        case 'Menu':
          console.log('Navigate to Menu - Not implemented yet');
          break;
        default:
          console.log(`Navigate to ${page} - Not implemented`);
      }
    }
  }
}
</script>

<style scoped>
.bottom-nav {
  background-color: #ffffff;
  height: 60px;
}
.nav-icon {
  height: 24px;
  width: 24px;
  vertical-align: middle;
}
</style>

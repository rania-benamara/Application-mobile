<template>
  <Page actionBarHidden="true">
    <GridLayout rows="auto, *, auto">
      <!-- Barre de recherche en haut -->
      <StackLayout row="0" orientation="horizontal" horizontalAlignment="center" marginTop="20">
        <Label text="<" class="boutton-retour" @tap="goBack" />
        <SearchBar hint="Rechercher" class="search-bar"></SearchBar>
        <Button text="RECHERCHER" class="search-button" @tap="performSearch"></Button>
      </StackLayout>

      <!-- Espace pour le contenu principal -->
      <ScrollView row="1">
        <StackLayout>
          <!-- Add your search results or other content here -->
          <Label text="Search Results" class="search-results-title" />
          <!-- You can add more components or logic for displaying search results -->
        </StackLayout>
      </ScrollView>

      <!-- LogoBarre component -->
      <LogoBarre row="2" />
    </GridLayout>
  </Page>
</template>

<script>
import LogoBarre from './LogoBarre.vue';

export default {
  name: 'Search',
  components: {
    LogoBarre
  },
  methods: {
    goBack() {
      this.$navigateBack();
    },
    performSearch() {
      // Implement your search logic here
      console.log('Performing search...');
    }
  }
}
</script>

<style scoped>
.boutton-retour {
  color: #E95322;
  font-size: 28px;
  margin-right: 10;
}

.search-bar {
  width: 70%;
  margin: 10;
  border-radius: 0.6px;
  border-color: #8E8383;
  height: 40;
  border: solid;
}

.search-button {
  color: #ffffff;
  background-color: #1C1D53;
  border-radius: 20px;
  height: 40;
  margin: 10;
  padding: 0 10;
}

.search-results-title {
  font-size: 20;
  font-weight: bold;
  margin: 20;
  color: #1C1D53;
}
</style>

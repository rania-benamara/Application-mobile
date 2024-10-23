<template>
  <Page actionBarHidden="true" class="backgr-livraison">
    <GridLayout rows="*, auto">
      <ScrollView row="0">
        <StackLayout class="page-content">
          <Label text="<" class="boutton-retour" @tap="onBackTap" />
          <Label text="Adresse de livraison" class="titre-pLivraison" />
          <ListView>
            <!-- Liste d'adresses ici -->
          </ListView>
          <Button text="Ajouter une nouvelle adresse" @tap="onAddAddressTap" class="b-adress" />
        </StackLayout>
      </ScrollView>

      <!-- LogoBarre as navbar at the bottom -->
      <LogoBarre row="1" />
    </GridLayout>
  </Page>
</template>

<script>
import LogoBarre from './LogoBarre.vue';

export default {
  name: 'Livraison',
  components: {
    LogoBarre
  },
  methods: {
    onBackTap() {
      this.$navigateBack();
    },
    onAddAddressTap() {
      console.log('Add new address');
      // Implement your logic for adding a new address
    }
  }
};
</script>

<style scoped>
.backgr-livraison {
  background-color: #1C1D53;
}
.boutton-retour {
  color: #E95322;
  font-size: 28px;
  margin-top: 20px;
  margin-left: 10px;
}
.titre-pLivraison {
  font-size: 28px;
  color: #F8F8F8;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
}
.b-adress {
  width: 300px;
  padding: 10px;
  color: #E95322;
  background-color: #FFDECF;
  border-radius: 100px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 60px;
  margin-left: auto;
  margin-right: auto;
}
.b-adress:hover {
  background-color: #FFDECF;
}
.custom-tabview {
  border-width: 0;
  separator-color: transparent;
}
</style>

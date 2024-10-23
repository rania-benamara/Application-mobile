<template>
  <Page actionBarHidden="true" class="backgr-livraison">
    <GridLayout rows="*, auto" columns="*">
      <!-- Contenu principal : Ajout d'adresse -->
      <ScrollView row="0">
        <StackLayout class="conteneur">
          <Label text="<" class="boutton-retour" @tap="onBackTap" />
          <Label text="Ajouter nouvelle adresse" class="titre" />
          <StackLayout class="champ-texte-conteneur">
            <TextField hint="Numéro Appartement" required="true" keyboardType="number" />
          </StackLayout>
          <StackLayout class="champ-texte-conteneur">
            <TextField hint="Rue" required="true" />
          </StackLayout>
          <StackLayout class="champ-texte-conteneur">
            <TextField hint="Ville" required="true" />
          </StackLayout>
          <StackLayout class="champ-texte-conteneur">
            <TextField hint="Province" required="true" />
          </StackLayout>
          <StackLayout class="champ-texte-conteneur">
            <TextField hint="Code postal" required="true" />
          </StackLayout>
          <Button text="Ajouter" class="ajouterAdresse" @tap="addAddress" />
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
  name: 'AddAddress',
  components: {
    LogoBarre
  },
  methods: {
    onBackTap() {
      this.$navigateBack();
    },
    addAddress() {
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
.titre {
  font-size: 28px;
  color: #F8F8F8;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}
.champ-texte-conteneur {
  padding: 15px;
  background-color: #f8f8f8;
  font-size: 20px;
  text-align: left;
  margin-bottom: 15px;
  width: 342px;
  border-radius: 8px;
  border: 1.5px solid #8E8383;
}
.ajouterAdresse {
  width: 300px;
  padding: 10px;
  color: #E95322;
  background-color: #FFDECF;
  border-radius: 100px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
}
.ajouterAdresse:hover {
  background-color: #FFDECF;
}
.custom-tabview {
  border-width: 0;
  separator-color: transparent;
}
</style>

<template>
  <Page actionBarHidden="true" class="backgr-livraison">
    <GridLayout rows="*, auto" columns="*">
      <!-- Contenu principal : Ajout d'adresse -->
      <ScrollView row="0">
                      <StackLayout class="conteneur">
                          <Label text="<" class="boutton-retour" @tap="onBackTap" />
                          <Label text="Ajouter nouvelle adresse" class="titre" />
                          <StackLayout class="champ-texte-conteneur">
                              <TextField hint="Numéro Appartement" required="true" keyboardType="number" class="input-field" />
                          </StackLayout>
                          <StackLayout class="champ-texte-conteneur">
                              <TextField hint="Rue" required="true" class="input-field" />
                          </StackLayout>
                          <StackLayout class="champ-texte-conteneur">
                              <TextField hint="Ville" required="true" class="input-field" />
                          </StackLayout>
                          <StackLayout class="champ-texte-conteneur">
                              <TextField hint="Province" required="true" class="input-field" />
                          </StackLayout>
                          <StackLayout class="champ-texte-conteneur">
                              <TextField hint="Code postal" required="true" class="input-field" />
                          </StackLayout>
                          <Button text="Ajouter" class="ajouterAdresse" @tap="onBackTap"/>
                      </StackLayout>
                  </ScrollView>

      <!-- LogoBarre as navbar at the bottom -->

    </GridLayout>
  </Page>
</template>

<script>
import Menu from './Menu.vue'
import { Frame } from '@nativescript/core'

export default {
  name: "AddLivraison",
  components: {
    Menu
  },
  methods: {
    onBackTap() {
      this.$navigateBack();
    },
    addAddress() {
      console.log('Add new address');
      // Implement your logic for adding a new address
    },
    openDrawer() {
        if (this.$refs.drawer && this.$refs.drawer.nativeView) {
         this.$refs.drawer.nativeView.showDrawer();
     }
     },
     onMenuTap(item) {
         console.log(`Menu item tapped: ${item}`);
         if (this.$refs.drawer && this.$refs.drawer.nativeView) {
               this.$refs.drawer.nativeView.closeDrawer();
          }
      }

     }
  }

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
    margin-bottom: 130px;
    text-align: center;
}

.champ-texte-conteneur {
    background-color: #f8f8f8;
    font-size: 11px;
    text-align: left;
    margin-bottom: 80px;
    width: 700px;
    border-radius: 8px;
    border: 1.5px solid #8E8383;
    padding: 0 10; /* Add padding for better text alignment */
}

.input-field {
    border-bottom-width: 0;
    border-bottom-color: #FFFFFF;
    background-color: transparent;
    placeholder-color: #8E8383;
    color: #000000;
    padding: 10 0;
    margin: 0;
    font-size: 14;
}

TextField {
    border-bottom-width: 0;
    border-bottom-color: transparent;
    background-color: transparent;
}

.ajouterAdresse {
    width: 300px;
    padding: 10px;
    color: #E95322;
    background-color: #FFDECF;
    border-radius: 100px;
    font-size: 14px;
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


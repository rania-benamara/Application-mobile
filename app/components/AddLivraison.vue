<template>
  <Page actionBarHidden="true" class="backgr-livraison">
    <GridLayout rows="*, auto" columns="*">
      <!-- Contenu principal : Ajout d'adresse -->
      <StackLayout class="conteneur" row="0">
      <Label text="<" class="boutton-retour" @tap="" />
        <Label text="Ajouter nouvelle adresse " class="titre" />

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

      <!-- TabView en bas de la page -->
      <TabView androidTabsPosition="bottom" class="custom-tabview" row="1">
        <TabViewItem title="Acceuil" iconSource="~/images/acceuil.png">
          <StackLayout @tap="" orientation="horizontal"></StackLayout>
        </TabViewItem>
        <TabViewItem title="Explorer" iconSource="~/images/chercher.png">
          <StackLayout @tap="" orientation="horizontal"></StackLayout>
        </TabViewItem>
        <TabViewItem title="Panier" iconSource="~/images/panier.png">
          <StackLayout @tap="" orientation="horizontal"></StackLayout>
        </TabViewItem>
        <TabViewItem title="Favoris" iconSource="~/images/favoris.png">
          <StackLayout @tap="" orientation="horizontal"></StackLayout>
        </TabViewItem>
        <TabViewItem title="Menu" iconSource="~/images/menu.png">
          <StackLayout @tap="" orientation="horizontal"></StackLayout>
        </TabViewItem>
      </TabView>
    </GridLayout>
  </Page>
</template>
<style scoped>
.backgr-livraison{
    background-color:#1C1D53;
    }
.titre {
    font-size: 28px;
    color: #F8F8F8;
    font-weight: bold;
    margin-top: 20;
    margin-bottom:200px;
    text-align:center;

}
.champ-texte-conteneur {
  padding: 15px; /* Ajout de padding pour l'espace intérieur */
  background-color: #f8f8f8; /* Fond clair */
  font-size: 20px; /* Ajuster la taille de la police */
  text-align: left;
  margin-bottom: 15;
  width:342;
  border-radius: 8px; /* Coins arrondis */
  border: 1.5px solid #8E8383;
}
.ajouterAdresse{
    width: 300;
    padding: 10px;
    color: #E95322;
    background-color: #FFDECF;
    border-radius: 100px;
    font-size: 16px;
    font-weight: bold;
    margin-top: 40;
    }
.ajouterAdresse:hover {
    background-color: #FFDECF;
}
.custom-tabview {
  border-width: 0;
  separator-color: transparent;
}
</style>

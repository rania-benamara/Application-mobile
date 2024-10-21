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

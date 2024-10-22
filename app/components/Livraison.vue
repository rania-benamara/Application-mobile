<template>
  <Page actionBarHidden="true" class="backgr-livraison">
    <GridLayout rows="*, auto" columns="*">

      <!-- Contenu principal -->
      <StackLayout row="0">
        <Label text="<" class="boutton-retour" @tap="onBackTap" />
        <Label text="Adresse de livraison" class="titre-pLivraison" />
        <ListView>
          <!-- Liste d'adresses ici -->
        </ListView>
        <Button text="Ajouter une nouvelle adresse" @tap="" class="b-adress" />
      </StackLayout>

      <!-- TabView pour la barre de navigation en bas -->
      <TabView androidTabsPosition="bottom" class="custom-tabview" row="1">
        <TabViewItem title="Acceuil" iconSource="~/images/acceuil.png">
          <StackLayout @tap="onHomeTap" orientation="horizontal">
            <!-- Contenu de l'onglet Acceuil -->
          </StackLayout>
        </TabViewItem>
        <TabViewItem title="Explorer" iconSource="~/images/chercher.png">
          <StackLayout @tap="onExplorerTap" orientation="horizontal">
            <!-- Contenu de l'onglet Explorer -->
          </StackLayout>
        </TabViewItem>
        <TabViewItem title="Panier" iconSource="~/images/panier.png">
          <StackLayout @tap="onCartTap" orientation="horizontal">
            <!-- Contenu de l'onglet Panier -->
          </StackLayout>
        </TabViewItem>
        <TabViewItem title="Favoris" iconSource="~/images/favoris.png">
          <StackLayout @tap="onFavorisTap" orientation="horizontal">
            <!-- Contenu de l'onglet Favoris -->
          </StackLayout>
        </TabViewItem>
        <TabViewItem title="Menu" iconSource="~/images/menu.png">
          <StackLayout @tap="onMenuTap" orientation="horizontal">
            <!-- Contenu de l'onglet Menu -->
          </StackLayout>
        </TabViewItem>
      </TabView>
    </GridLayout>
  </Page>
</template>
<style scoped>
.backgr-livraison{
    background-color:#1C1D53;
    }
.boutton-retour{
    color:#E95322;
    font-size:28px;
    top: 2px;
    left: 3px;
    }
.titre-pLivraison {
    font-size: 28px;
    color: #F8F8F8;
    font-weight: bold;
    margin-top: 248px;
    text-align:center;

}
.b-adress{
    width: 300;
    padding: 10px;
    color: #E95322;
    background-color: #FFDECF;
    border-radius: 100px;
    font-size: 16px;
    font-weight: bold;
    margin-top: 60;
    }
.b-adress:hover {
    background-color: #FFDECF;
}
</style>

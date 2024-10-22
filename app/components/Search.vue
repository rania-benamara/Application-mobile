<template>
    <Page actionBarHidden="true">
        <GridLayout rows="auto, *, auto">
            <!-- Barre de recherche en haut -->
            <StackLayout row="0" orientation="horizontal" horizontalAlignment="center" marginTop="20">
                <Label text="<" class="boutton-retour" @tap="" />
                <SearchBar hint="Rechercher" class="search-bar"></SearchBar>
                <Button text="RECHERCHER" class="search-button"></Button>
            </StackLayout>

            <!-- Espace vide pour le contenu principal -->
            <StackLayout row="1">
                <!-- Ajoutez ici le contenu principal de votre page si nécessaire -->
            </StackLayout>

            <!-- Menu de navigation en bas -->
            <TabView androidTabsPosition="bottom" class="custom-tabview" row="2">
                <TabViewItem title="Acceuil" iconSource="~/images/acceuil.png" class="small-title">
                    <StackLayout @tap="" orientation="horizontal">
                    </StackLayout>
                </TabViewItem>
                <TabViewItem title="Explorer" iconSource="~/images/chercher.png" class="small-title">
                    <StackLayout @tap="" orientation="horizontal">
                    </StackLayout>
                </TabViewItem>
                <TabViewItem title="Panier" iconSource="~/images/panier.png" class="small-title">
                    <StackLayout @tap="" orientation="horizontal">
                    </StackLayout>
                </TabViewItem>
                <TabViewItem title="Favoris" iconSource="~/images/favoris.png" class="small-title">
                    <StackLayout @tap="" orientation="horizontal">
                    </StackLayout>
                </TabViewItem>
                <TabViewItem title="Menu" iconSource="~/images/menu.png" class="small-title">
                    <StackLayout @tap="" orientation="horizontal">
                    </StackLayout>
                </TabViewItem>
            </TabView>
        </GridLayout>
    </Page>
</template>
<style scoped>
.boutton-retour{
    color:#E95322;
    font-size:28px;
    top: 2px;
    left: 3px;
    }
.search-bar {
    margin: 10;
    border-radius: 0.6px;
    border-color:#8E8383;
    height: 40;
    width: 250;
    border: solid;
}
.search-bar-container{
    border: 0.6px solid #8E8383;
    }
 .custom-tabview {
     background-color: #ffffff;
     border-top-width: 1;
     border-top-color: #cccccc;
     height: 60;
 }
 .small-title .tab-title {
     font-size: 5px; /* Ajustez la taille selon vos besoins */
     margin: 0; /* Réduisez les marges pour plus d'espace */
     width:60px;
 }

 .custom-tabview .tab-view-item {
     flex: 1;
     text-align: center;
     width:60;

 }
 TabViewItem {
     width: 120;
     text-align: center;
 }
 .search-button {
     color: #ffffff;
     background-color: #1C1D53;
     border-radius: 20px;
     height: 40;
     margin-top: 10;
     width: 125;
 }
 .search-button:hover {
     background-color: #1C1D53;
 }
</style>

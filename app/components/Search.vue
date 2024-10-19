<template>
    <Page actionBarHidden="true">
        <GridLayout rows="auto, *, auto">
            <!-- Barre de recherche en haut -->
            <StackLayout row="0" orientation="horizontal" horizontalAlignment="center" marginTop="20">
                <!--<Image src="~/images/Vector.png" class="back-image" @tap=""></Image>-->
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

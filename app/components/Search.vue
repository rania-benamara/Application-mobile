<template>
    <Page actionBarHidden="true">
        <RadSideDrawer ref="drawer" drawerLocation="Right">
            <GridLayout ~drawerContent>
                <Menu @menuTap="onMenuTap"/>
            </GridLayout>

            <StackLayout ~mainContent>
                <GridLayout rows="auto, *, auto">
                    <!-- Barre de recherche en haut -->
                    <GridLayout row="0" columns="auto, *, auto" class="search-container">
                        <Image src="~/images/gobackIcon.png" col="0" class="back-icon" @tap="goBack" />
                        <SearchBar hint="Rechercher" col="1" class="search-bar"></SearchBar>
                        <Button text="RECHERCHER" col="2" class="search-button" @tap="performSearch"></Button>
                    </GridLayout>

                    <!-- Espace pour le contenu principal -->
                    <ScrollView row="1">
                        <StackLayout>
                            <Label text="Search Results" class="search-results-title" />
                        </StackLayout>
                    </ScrollView>

                    <!-- NavBar component -->
                    <NavBar row="2" @menuTap="openDrawer" />
                </GridLayout>
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
import Menu from './Menu.vue'
import NavBar from './LogoBarre.vue'
import MesCommandes from './MesCommandes.vue'
import Profile from './Profile.vue'
import AddLivraison from './AddLivraison.vue'
import NousContacter from './NousContacter.vue'
import Parametre from './Parametre.vue'
import Login from './Login.vue'

export default {
    name: 'Search',
    components: {
        Menu,
        NavBar
    },
    data() {
        return {
            isDrawerOpen: false
        }
    },
    methods: {
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
            // Handle menu item navigation
            switch(item) {
                                    case 'Mes commandes':
                                        this.$navigateTo(MesCommandes, {
                                            transition: {
                                                name: "fade"
                                            }
                                        }).then(() => {
                                            console.log("Navigation to MesCommandes successful");
                                        }).catch(error => {
                                            console.error("Navigation to MesCommandes failed:", error);
                                        });
                                        break;
                                    case 'Mon profile':
                                        this.$navigateTo(Profile, {
                                                  transition: {
                                                     name: "fade"
                                                   }
                                        }).then(() => {
                                                   console.log("Navigation to MesCommandes successful");
                                        }).catch(error => {
                                                  console.error("Navigation to MesCommandes failed:", error);
                                        });
                                        break;
                                    case 'Adresse de livraison':
                                         this.$navigateTo(AddLivraison, {
                                              transition: {
                                                name: "fade"
                                               }
                                         }).then(() => {
                                                console.log("Navigation to MesCommandes successful");
                                          }).catch(error => {
                                                 console.error("Navigation to MesCommandes failed:", error);
                                           });
                                        break;
                                    case 'Nous contacter':
                                        this.$navigateTo(NousContacter, {
                                               transition: {
                                                  name: "fade"
                                                }

                                                }).then(() => {
                                                   console.log("Navigation to MesCommandes successful");
                                                 }).catch(error => {
                                                    console.error("Navigation to MesCommandes failed:", error);
                                                 });
                                        break;
                                    case 'Paramètres':
                                        this.$navigateTo(Parametre, {
                                               transition: {
                                                   name: "fade"
                                                }

                                        }).then(() => {
                                                 console.log("Navigation to MesCommandes successful");
                                        }).catch(error => {
                                                  console.error("Navigation to MesCommandes failed:", error);
                                        });

                                        break;
                                    case 'Se déconnecter':
                                        this.$navigateTo(Login, {
                                              transition: {
                                                name: "fade"
                                        }

                                         }).then(() => {
                                                console.log("Navigation to MesCommandes successful");
                                         }).catch(error => {
                                                 console.error("Navigation to MesCommandes failed:", error);
                                         });

                                        break;
                        }
        },
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
.search-container {
    padding: 10;
    margin-top: 10;
}

.back-icon {
    width: 20;
    height: 20;
    vertical-align: middle;
    margin: 8 15 8 8;
}

.search-bar {
    width: 100%;
    margin: 0 10;
    border-radius: 0.6;
    border-color: #8E8383;
    height: 40;
    border: solid;
}

.search-button {
    color: #ffffff;
    background-color: #1C1D53;
    border-radius: 20;
    height: 40;
    width: 100; /* Increased width */
    padding: 0 15;
    font-size: 10; /* Increased font size */
    text-transform: none;
    margin: 0;
}

.search-results-title {
    font-size: 20;
    font-weight: bold;
    margin: 20;
    color: #1C1D53;
}

.drawer-content {
    background-color: #1C1D53;
}

.main-content {
    padding: 0;
}
</style>


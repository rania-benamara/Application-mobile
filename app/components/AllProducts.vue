<script>
import Menu from './Menu.vue'
import NavBar from './LogoBarre.vue'
import MesCommandes from './MesCommandes.vue'
import { Frame } from '@nativescript/core'
import Profile from './Profile.vue'
import AddLivraison from './AddLivraison.vue'
import NousContacter from './NousContacter.vue'
import Parametre from './Parametre.vue'
import Login from './Login.vue'

export default {
    name: 'AllProducts',
    components: {
        Menu: () => import('./Menu.vue'),
        NavBar: () => import('./LogoBarre.vue')
    },
    data() {
        return {
            products: [
                {
                    name: "Chocolate Chip",
                    category: "Cookies",
                    price: 19.99,
                    rating: 4.9,
                    image: "~/images/cookie1.png",
                    isFavorite: false
                },
                {
                    name: "Oatmeal Raisin",
                    category: "Cookies",
                    price: 18.99,
                    rating: 4.7,
                    image: "~/images/cookie2.png",
                    isFavorite: false
                },
                {
                    name: "Double Chocolate",
                    category: "Cookies",
                    price: 21.99,
                    rating: 4.8,
                    image: "~/images/cookie1.png",
                    isFavorite: false
                },
                {
                    name: "Sugar Cookie",
                    category: "Cookies",
                    price: 17.99,
                    rating: 4.6,
                    image: "~/images/cookie2.png",
                    isFavorite: false
                }
            ]
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
        formatPrice(price) {
            return `$${price.toFixed(2)}`;
        },
        toggleFavorite(index) {
            this.products[index].isFavorite = !this.products[index].isFavorite;
        },
        goBack() {
            const frame = Frame.topmost();
            if (frame.canGoBack()) {
                frame.goBack();
            }
        }
    }
}
</script>

<template>
    <Page actionBarHidden="true">
        <RadSideDrawer ref="drawer" drawerLocation="Right">
            <GridLayout ~drawerContent>
                <Menu @menuTap="onMenuTap"/>
            </GridLayout>

            <StackLayout ~mainContent>
                <GridLayout rows="auto, *, auto">
                    <!-- Header -->
                    <GridLayout row="0" columns="auto, *" rows="auto, auto" class="action-bar-layout">
                        <Image src="~/images/gobackIcon.png" col="0" row="0" class="back-icon" @tap="goBack" />
                        <Label text="Tous les produits" col="0" row="1" colSpan="2" class="category-title" />
                    </GridLayout>

                    <!-- Products Grid -->
                    <ScrollView row="1">
                        <GridLayout columns="*, *" rows="auto" class="product-grid">
                            <StackLayout v-for="(product, index) in products"
                                :key="index"
                                :col="index % 2"
                                :row="Math.floor(index / 2)"
                                class="product-item">
                                <GridLayout rows="auto" columns="*">
                                    <Image :src="product.image" stretch="aspectFill" class="product-image"/>
                                    <Label :text="formatPrice(product.price)" class="product-price"/>
                                </GridLayout>
                                <StackLayout class="product-info">
                                    <Label :text="product.name" class="product-name"/>
                                    <Label :text="product.category" class="product-category"/>
                                </StackLayout>
                                <GridLayout rows="auto" columns="auto, *, auto" class="product-details">
                                    <Image :src="product.isFavorite ? '~/images/favoriteIconFilled.png' : '~/images/favoriteIcon.png'"
                                        col="0"
                                        class="favorite-icon"
                                        @tap="toggleFavorite(index)"/>
                                    <Label :text="product.rating.toFixed(1)" col="2" class="product-rating"/>
                                </GridLayout>
                            </StackLayout>
                        </GridLayout>
                    </ScrollView>

                    <!-- NavBar at bottom -->
                    <NavBar row="2" @menuTap="openDrawer" />
                </GridLayout>
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>

<style scoped>
.action-bar-layout {
    padding: 10 16;
    background-color: #ffffff;
}

.back-icon {
    width: 10;
    height: 13;
    vertical-align: middle;
    margin: 5 0 5 0;
}

.category-title {
    font-size: 24;
    font-weight: 700;
    margin-top: 10;
    margin-bottom: 10;
    color: #000000;
}

.product-grid {
    padding: 10;
}

.product-item {
    margin: 5;
    background-color: #ffffff;
    border-radius: 10;
}

.product-image {
    width: 100%;
    height: 120;
    border-top-left-radius: 10;
    border-top-right-radius: 10;
}

.product-price {
    font-size: 16;
    font-weight: 600;
    color: #564146;
    background-color: #FFE8E3;
    padding: 5 7;
    border-bottom-left-radius: 15;
    border-top-right-radius: 15;
    margin: 0;
    horizontal-align: right;
    vertical-align: top;
}

.product-info {
    padding: 10 10 0 10;
}

.product-name {
    font-size: 18;
    font-weight: 700;
    color: #FF4A4C;
    horizontal-align: center;
}

.product-category {
    font-size: 14;
    color: #ACA9A7;
    font-weight: 400;
    margin-top: 2;
    horizontal-align: center;
}

.product-details {
    padding: 10;
}

.favorite-icon {
    width: 24;
    height: 24;
    vertical-align: center;
}

.product-rating {
    font-size: 14;
    color: #000000;
    text-align: right;
    font-weight: 700;
}
</style>

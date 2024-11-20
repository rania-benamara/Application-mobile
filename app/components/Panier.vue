<template>
    <Page actionBarHidden="true">
        <RadSideDrawer ref="drawer" drawerLocation="Right">
            <GridLayout ~drawerContent>
                <Menu @menuTap="onMenuTap"/>
            </GridLayout>

            <StackLayout ~mainContent>
                <GridLayout rows="auto, *, auto, auto">
                    <!-- Header -->
                    <ActionBar row="0" title="Mon Panier" class="action-bar">
                        <NavigationButton icon="~/images/img.png" @tap="goBack" ios.position="left" class="back-image" />
                    </ActionBar>

                    <!-- Scrollable Products List -->
                    <ScrollView row="1">
                        <StackLayout class="offers-content">
                            <StackLayout v-for="(product, index) in favoriteProducts"
                                :key="index"
                                class="product-list">
                                <GridLayout columns="auto, *" rows="auto, auto, auto" class="product-item">
                                    <Image :src="product.image" class="product-image" col="0" rowSpan="3" />
                                    <Label :text="product.name" class="product-name" col="1" row="0" />
                                    <Label :text="product.category" class="product-category" col="1" row="1" />
                                    <Label :text="product.originalPrice" class="original-price" col="1" row="2" />
                                    <StackLayout class="offer-subtitle" col="1" row="2" orientation="horizontal">
                                        <Image src="~/images/img_1.png" class="qt-image" />
                                        <TextField class="input-field" />
                                        <Image src="~/images/img_2.png" class="qtt-image" />
                                    </StackLayout>
                                </GridLayout>
                            </StackLayout>
                        </StackLayout>
                    </ScrollView>

                    <!-- Fixed Summary Section -->
                    <StackLayout row="2" class="summary-section">
                        <!-- Champ commentaire avec bouton -->
                        <GridLayout columns="*, auto" class="comment-generale">
                            <StackLayout class="comment-section" col="0">
                                <TextField hint=" Laisser un commentaire" class="comment" />
                            </StackLayout>
                            <StackLayout class="bouton-section" col="1">
                                <Button text="Envoyer" class="bouton" />
                            </StackLayout>
                        </GridLayout>

                        <!-- Sous-total, Frais de livraison, Frais de taxe, Coût total -->
                        <GridLayout columns="*, auto" class="summary-item">
                            <Label text="Sous-total" class="summary-label" />
                            <Label text="$92.00" class="summary-value" />
                        </GridLayout>
                        <GridLayout columns="*, auto" class="summary-item">
                            <Label text="Frais de livraison" class="summary-label" />
                            <Label text="$0.00" class="summary-value" />
                        </GridLayout>
                        <GridLayout columns="*, auto" class="summary-item">
                            <Label text="Coût des taxes" class="summary-label" />
                            <Label text="$92.00" class="summary-value" />
                        </GridLayout>

                        <!-- Ligne en pointillés -->
                        <GridLayout columns="*" class="dotted-line">
                            <Label text="------------------------" class="dotted-line-label" />
                        </GridLayout>

                        <GridLayout columns="*, auto" class="summary-item">
                            <Label text="Coût total" class="summary-label" />
                            <Label text="$92.00" class="summary-value" />
                        </GridLayout>

                        <!-- Bouton Passer à la caisse -->
                        <Button text="Passer à la caisse" class="checkout-button" />
                    </StackLayout>

                    <!-- NavBar -->
                    <NavBar row="3" @menuTap="openDrawer" />
                </GridLayout>
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
import Menu from './Menu.vue'
import NavBar from './LogoBarre.vue'
import Login from './Login'
import { Frame } from '@nativescript/core'
import MesCommandes from './MesCommandes.vue'
import Profile from './Profile.vue'
import AddLivraison from './AddLivraison.vue'
import NousContacter from './NousContacter.vue'
import Parametre from './Parametre.vue'
import { Http } from '@nativescript/core'
import { ApplicationSettings } from '@nativescript/core'

export default {
    name: 'Panier',
    components: {
        Menu,
        NavBar
    },
    data() {
        return {
            isDrawerOpen: false,
            favoriteProducts: [] // Tableau des produits du panier récupérés depuis l'API
        }
    },
    mounted() {
        this.getProductsInCart(); // Appel de l'API lors du montage du composant
    },
    methods: {
        // Ouvrir le menu
        openDrawer() {
            if (this.$refs.drawer && this.$refs.drawer.nativeView) {
                this.$refs.drawer.nativeView.showDrawer();
            }
        },

        // Récupérer les produits dans le panier via l'API
        async getProductsInCart() {
            try {
                const response = await Http.request({
                    url: 'http://10.0.2.2:3000/Clients/panier', // Remplacez par l'URL de votre API
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${ApplicationSettings.getString('token')}`
                    }
                });
                const products = response.content.toJSON();

                if (Array.isArray(products) && products.length > 0) {
                    // Remplir favoriteProducts avec les produits récupérés
                    this.favoriteProducts = products.map(product => ({
                        name: product.name,
                        category: product.categories ? product.categories.split(',')[0] : 'Inconnue', // Prendre la première catégorie
                        originalPrice: `$${product.price}`, // Format du prix
                        image: product.image_url || "~/images/default.png" // Image du produit, avec une image par défaut si elle est absente
                    }));
                } else {
                    console.log("Aucun produit trouvé dans le panier.");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des produits du panier:", error);
            }
        },

        // Gérer les éléments du menu
        onMenuTap(item) {
            console.log(`Menu item tapped: ${item}`);
            if (this.$refs.drawer && this.$refs.drawer.nativeView) {
                this.$refs.drawer.nativeView.closeDrawer();
            }
            // Navigation vers les pages
            switch (item) {
                case 'Panier':
                    this.$navigateTo(Panier, {
                        transition: { name: "fade" }
                    }).then(() => {
                        console.log("Navigation vers Panier réussie");
                    }).catch(error => {
                        console.error("Navigation vers Panier échouée:", error);
                    });
                    break;
                case 'Mes commandes':
                    this.$navigateTo(MesCommandes, {
                        transition: { name: "fade" }
                    }).then(() => {
                         console.log("Navigation vers MesCommandes réussie");
                    }).catch(error => {
                        console.error("Navigation vers MesCommandes échouée:", error);
                    });
                    break;
                case 'Mon profile':
                    this.$navigateTo(Profile, {
                        transition: { name: "fade" }
                    }).then(() => {
                        console.log("Navigation vers Profile réussie");
                    }).catch(error => {
                        console.error("Navigation vers Profile échouée:", error);
                    });
                    break;
                case 'Adresse de livraison':
                    this.$navigateTo(AddLivraison, {
                        transition: { name: "fade" }
                    }).then(() => {
                        console.log("Navigation vers AddLivraison réussie");
                    }).catch(error => {
                        console.error("Navigation vers AddLivraison échouée:", error);
                    });
                    break;
                case 'Nous contacter':
                    this.$navigateTo(NousContacter, {
                        transition: { name: "fade" }
                    }).then(() => {
                        console.log("Navigation vers NousContacter réussie");
                    }).catch(error => {
                        console.error("Navigation vers NousContacter échouée:", error);
                    });
                    break;
                case 'Paramètres':
                    this.$navigateTo(Parametre, {
                        transition: { name: "fade" }
                    }).then(() => {
                        console.log("Navigation vers Parametre réussie");
                    }).catch(error => {
                        console.error("Navigation vers Parametre échouée:", error);
                    });
                    break;
                case 'Se déconnecter':
                    this.$navigateTo(Login, {
                        transition: { name: "fade" }
                    }).then(() => {
                        console.log("Navigation vers Login réussie");
                    }).catch(error => {
                        console.error("Navigation vers Login échouée:", error);
                    });
                    break;
            }
        },

        // Lien de connexion
        loginlink() {
            this.$navigateTo(Login);
        },

        // Retour en arrièrece
        goBack() {
            console.log("Go back tapped");
            const frame = Frame.topmost();
            if (frame.canGoBack()) {
                frame.goBack();
            } else {
                console.log("No page to go back to");
            }
        }
    }
}
</script>

<style scoped>
.qt-image {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 20px;
    background-color: #ddd;
    margin-left: 200;
}

.qtt-image {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 20px;
    background-color: #ddd;
    margin-left: 5;
}

.input-field {
    font-size: 14px;
    border-color: #808080;
    border-radius: 20px;
    border: 3px solid black;
    margin-top: 5px;
    margin-left: 10px;
}

.action-bar {
    color: black;
}

.page {
    background-color: white;
    height: 100%;
    width: 100%;
}

.summary-section {
    background-color: white;
    padding: 10;
    border-top-width: 1;
    border-top-color: #E0E0E0;
}

.offers-content {
    padding: 2px;
    margin-top: 40px;
    margin-left: 30px;
    margin-bottom: 20px; /* Add some bottom margin for better scrolling */
}

.product-list {
    margin-bottom: 20px;
}

.product-image {
    width: 170px;
    height: 170px;
    border-radius: 40px;
    margin-right: 18px;
}

.product-name {
    font-size: 18px;
    font-weight: bold;
    color: black;
}

.product-category {
    font-size: 14px;
    color: gray;
}

.original-price {
    font-size: 16px;
    color: black;
}

.comment-section {
    height: 50;
    width: 700;
    margin-left: 20;
}

.comment {
    background-color: #F4F3F3;
    border-radius: 10px;
    height: 50;
    width: 700;
    border-top-left-radius: 200px;
    border-bottom-left-radius: 200px;
}

.bouton {
    background-color: #6F2E00;
    color: white;
    font-size: 16px;
    padding: 10px;
    border-radius: 10px;
    border-top-left-radius: 200px;
    border-bottom-left-radius: 200px;
    border-top-right-radius: 200px;
    border-bottom-right-radius: 200px;
    height: 70;
    text-transform: none;
    width: 120;
}

.bouton-section {
    height: 50;
    background-color: #F4F3F3;
    margin-right: 10;
}

.comment-generale {
    background-color: white;
}

.summary-item {
    margin-left: 50px;
    height: 30;
}

.summary-label {
    font-size: 16px;
    color: black;
    font-weight: bold;
    text-align: left;
}

.summary-value {
    font-size: 16px;
    color: black;
    font-weight: bold;
    text-align: right;
    margin-right: 40px;
}

.dotted-line {
    margin: 15px 0;
    border-top: 1px dotted gray;
}

.dotted-line-label {
    text-align: center;
    color: gray;
    margin: 0;
}

.checkout-button {
    background-color: black;
    color: white;
    padding: 10px;
    border-radius: 20;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    width: 200;
    margin-bottom: 30;
    text-transform: none;
}

.comment-input {
    padding: 10px;
    font-size: 14px;
    background-color: #e0e0e0;
    border-radius: 5px;
    width: 100%;
    border: none;
    box-sizing: border-box;
}
</style>

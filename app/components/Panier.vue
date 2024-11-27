<template>
    <Page actionBarHidden="true">
        <RadSideDrawer ref="drawer" drawerLocation="Right">
            <GridLayout ~drawerContent>
                <Menu @menuTap="onMenuTap" />
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
                                        <Image src="~/images/delete.png" class="delete-icon" @tap="deleteProduct(index)" />
                                        <Image src="~/images/img_1.png" class="qt-image" @tap="decrementQuantity(index)" />
                                        <TextField v-model="product.quantity" class="input-field" />
                                        <Image src="~/images/img_2.png" class="qtt-image" @tap="incrementQuantity(index)" />
                                    </StackLayout>
                                </GridLayout>
                            </StackLayout>
                        </StackLayout>
                    </ScrollView>

                    <!-- Fixed Summary Section -->
                    <StackLayout row="2" class="summary-section">
                        <GridLayout columns="*, auto" class="summary-item">
                            <Label text="Sous-total" class="summary-label" />
                            <Label :text="`$${subTotal.toFixed(2)}`" class="summary-value" />
                        </GridLayout>
                        <GridLayout columns="*, auto" class="summary-item">
                            <Label text="Frais de livraison" class="summary-label" />
                            <Label :text="`$${deliveryFee.toFixed(2)}`" class="summary-value" />
                        </GridLayout>
                        <GridLayout columns="*, auto" class="summary-item">
                            <Label text="Coût des taxes" class="summary-label" />
                            <Label :text="`$${taxAmount.toFixed(2)}`" class="summary-value" />
                        </GridLayout>
                        <GridLayout columns="*, auto" class="summary-item">
                            <Label text="Coût total" class="summary-label" />
                            <Label :text="`$${totalCost.toFixed(2)}`" class="summary-value" />
                        </GridLayout>
                        <Button text="Passer la commande" class="checkout-button" @tap="passerCommande" />
                    </StackLayout>

                    <NavBar row="3" @menuTap="openDrawer" />
                </GridLayout>
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>


<script>
import { Http, ApplicationSettings } from '@nativescript/core';
import Menu from './Menu.vue'
import NavBar from './LogoBarre.vue'
import Login from './Login'
import { Frame } from '@nativescript/core'
import MesCommandes from './MesCommandes.vue'
import Profile from './Profile.vue'
import AddLivraison from './AddLivraison.vue'
import NousContacter from './NousContacter.vue'
import Parametre from './Parametre.vue'
import ConfirmationPage from './ConfirmationPage.vue'

export default {
    name: 'Panier',
    components: {
        Menu,
        NavBar
    },
    data() {
        return {
            token: ApplicationSettings.getString("token"),
            favoriteProducts: [
                { productId: 22, originalPrice: "$20.00", image: "~/images/4.png", quantity: 1 },
                { productId: 6298, originalPrice: "$20.00", image: "~/images/4.png", quantity: 1 },
                { productId: 6320, originalPrice: "$20.00", image: "~/images/4.png", quantity: 1 },
                { productId: 6351, originalPrice: "$20.00", image: "~/images/4.png", quantity: 1 },
                { productId: 6671, originalPrice: "$20.00", image: "~/images/4.png", quantity: 1 },
                { productId: 6675, originalPrice: "$20.00", image: "~/images/4.png", quantity: 1 },
                { productId: 6680, originalPrice: "$20.00", image: "~/images/4.png", quantity: 1 },
                { productId: 22, originalPrice: "$20.00", image: "~/images/4.png", quantity: 1 },
                { productId: 6298, originalPrice: "$20.00", image: "~/images/7.png", quantity: 1 }
            ],
            deliveryFee: 0.00, // Initialiser les frais de livraison à 0
            taxRate: 0.00 // Initialiser le taux de taxe à 0
        }
    },
    created() {
        // Appel des méthodes pour récupérer les frais et le taux de taxe lors de la création du composant
        this.getDeliveryFee();
        this.getTaxRate();
    },
    computed: {
        subTotal() {
            return this.favoriteProducts.reduce((total, product) => {
                // Convertir la chaîne de caractères en nombre, enlever le symbole `$`
                let price = parseFloat(product.originalPrice.replace('$', ''));
                return total + (price * product.quantity);
            }, 0);
        },
        taxAmount() {
            // Calculer les frais de taxe à partir du taux de taxe
            return this.subTotal * this.taxRate;
        },
        totalCost() {
            // Calculer le coût total avec les frais de livraison et de taxe
            return this.subTotal + this.taxAmount + this.deliveryFee;
        }
    },
    methods: {
        async getDeliveryFee() {
            try {
                const response = await fetch('http://10.0.2.2:3000/Orders/frais-livraison', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ` + this.token,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des frais de livraison');
                }

                const data = await response.json();
                console.log("Données récupérées pour les frais de livraison:", data);
                console.log("Frais de livraison:", data.frais_livraison); // Changer deliveryFee en frais_livraison

                // Assurez-vous que frais_livraison est un nombre
                this.deliveryFee = parseFloat(data.frais_livraison) || 0; // Valeur par défaut 0 si conversion échoue
            } catch (error) {
                console.error('Erreur:', error);
                alert('Erreur lors de la récupération des frais de livraison');
            }
        },


        async getTaxRate() {
            try {
                const response = await fetch('http://10.0.2.2:3000/Orders/frais-taxe', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ` + this.token,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération du taux de taxe');
                }

                const data = await response.json();
                console.log("Taux de taxe récupéré:", data);
                // Assurez que taxRate est un nombre
                this.taxRate = parseFloat(data.frais_taxe) || 0; // Valeur par défaut 0 si conversion échoue
            } catch (error) {
                console.error('Erreur:', error);
                alert('Erreur lors de la récupération du taux de taxe');
            }
        },
    async passerCommande() {
      try {
        // Appel à l'API pour récupérer les informations utilisateur

        const responseUserInfo = await fetch('http://10.0.2.2:3000/Clients/commande/informations', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ` + this.token, // Ajouter un token si nécessaire
            'Content-Type': 'application/json'
          }
        });

        if (!responseUserInfo.ok) {
          throw new Error('Erreur lors de la récupération des informations utilisateur');
        }

        const userInfo = await responseUserInfo.json();

        // Préparer l'objet de commande avec les informations récupérées
        const commande = {
          items: this.favoriteProducts.map(product => ({
            productId: product.productId,
            quantity: product.quantity
          })),
          ville: userInfo.ville,
          adresse: `${userInfo.numero_appartement} ${userInfo.rue}`,
          codePostal: userInfo.code_postal,
          telephone: userInfo.telephone
        };
        console.log(commande);
        // Envoyer la commande à l'API
        const responseCommande = await fetch('http://10.0.2.2:3000/Orders/place-order', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ` + this.token, // Ajouter un token si nécessaire
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commande)
        });

        if (responseCommande.ok) {
         // alert('Commande passée avec succès');
           this.$navigateTo('wait');  // Rediriger vers wait.vue

           // Attendre 2 secondes puis naviguer vers ConfirmationPage
               setTimeout(() => {
                 this.$navigateTo('ConfirmationPage');  // Redirection vers ConfirmationPage.vue
                  }, 2000); // Délai de 2 secondes
        } else {
         // alert('Erreur lors de l\'envoi de la commande');
         // Attendre 2 secondes puis naviguer vers ConfirmationPage
                  setTimeout(() => {
                   this.$navigateTo('CommandeEchouee');  // Redirection vers ConfirmationPage.vue
                     }, 2000); // Délai de 2 secondes

        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue : ' + error.message);
      }
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
        loginlink() {
            this.$navigateTo(Login);
        },
        goBack() {
            console.log("Go back tapped");
            const frame = Frame.topmost();
            if (frame.canGoBack()) {
                frame.goBack();
            } else {
                console.log("No page to go back to");
            }
        },
        incrementQuantity(index) {
                if (this.favoriteProducts[index].quantity !== undefined) {
                    this.favoriteProducts[index].quantity++;
                } else {
                    // Si quantity n'est pas défini, on peut l'initialiser
                    this.favoriteProducts[index].quantity = 1;
                }
            },
            decrementQuantity(index) {
                if (this.favoriteProducts[index].quantity > 1) {
                    this.favoriteProducts[index].quantity--;
                }
            },

            deleteProduct(index) {
                    this.favoriteProducts.splice(index, 1); // Supprime l'article de la liste
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
    margin-left: 11;
}

.qtt-image {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 20px;
    background-color: #ddd;
    margin-left: 5;
}
.delete-icon {
    width: 70px;
        height: 70px;
        object-fit: cover;
        border-radius: 20px;
        background-color: #ddd;
        margin-left: 180;
    cursor: pointer; /* Pour indiquer que l'icône est cliquable */
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

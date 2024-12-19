<template>
    <Page actionBarHidden="true">
        <RadSideDrawer ref="drawer" drawerLocation="Right">
            <!-- Contenu du menu -->
            <GridLayout ~drawerContent>
                <Menu @menuTap="onMenuTap" />
            </GridLayout>

            <!-- Contenu principal -->
            <StackLayout ~mainContent>
                <GridLayout rows="auto, *, auto, auto">
                    <!-- En-tÃªte -->
                    <ActionBar row="0" title="Mon Panier" class="action-bar">
                        <NavigationButton icon="~/images/img.png" @tap="goBack" ios.position="left" class="back-image" />
                    </ActionBar>

                    <!-- Liste des produits scrollable -->
                    <ScrollView row="1">
                        <StackLayout class="offers-content">
                            <StackLayout
                                v-for="(product, index) in favoriteProducts"
                                :key="index"
                                class="product-list"
                            >
                                <GridLayout columns="auto, *" rows="auto, auto, auto" class="product-item">
                                    <Image :src="product.image" class="product-image" col="0" rowSpan="3" />
                                    <Label :text="product.name" class="product-name" col="1" row="0" />
                                    <Label :text="product.category" class="product-category" col="1" row="1" />
                                    <Label :text="product.originalPrice" class="original-price" col="1" row="2" />
                                    <StackLayout class="offer-subtitle" col="1" row="2" orientation="horizontal">
                                        <Image
                                            src="~/images/delete.png"
                                            class="delete-icon"
                                            @tap="deleteProduct(index)"
                                        />
                                        <Image src="~/images/img_1.png" class="qt-image" @tap="decreaseQuantity(index)" />
                                        <TextField class="input-field" :text="product.quantity || 1" />
                                        <Image src="~/images/img_2.png" class="qtt-image" @tap="increaseQuantity(index)" />
                                    </StackLayout>
                                </GridLayout>
                            </StackLayout>
                        </StackLayout>
                    </ScrollView>

                    <!-- Section rÃ©sumÃ© -->
                    <StackLayout row="2" class="summary-section">
                        <!-- Champ commentaire avec bouton -->
                        <GridLayout columns="*, auto" class="comment-generale">
                            <StackLayout class="comment-section" col="0">
                            <TextField v-model="commentaire" hint=" Laisser un commentaire" class="comment" />
                            </StackLayout>

                        </GridLayout>

                        <!-- RÃ©sumÃ© des coÃ»ts -->
                        <GridLayout columns="*, auto" class="summary-item">
                            <Label text="Sous-total" class="summary-label" />
                            <Label :text="totalPrice" class="summary-value" />
                        </GridLayout>
                        <GridLayout columns="*, auto" class="summary-item">
                            <Label text="Frais de livraison" class="summary-label" />
                             <Label :text="`$${deliveryFee.toFixed(2)}`" class="summary-value" />
                        </GridLayout>
                        <GridLayout columns="*, auto" class="summary-item">
                            <Label text="Cout des taxes" class="summary-label" />
                            <Label :text="taxes" class="summary-value" />
                        </GridLayout>
                        <GridLayout columns="*" class="dotted-line">
                            <Label text="------------------------" class="dotted-line-label" />
                        </GridLayout>
                        <GridLayout columns="*, auto" class="summary-item">
                            <Label text="Cost total" class="summary-label" />
                            <Label :text="totalCost" class="summary-value" />
                        </GridLayout>
                        <Button text="Passer la commande" class="checkout-button" @tap="passerCommande" />

                    </StackLayout>

                    <!-- Barre de navigation -->
                    <NavBar row="3" @menuTap="openDrawer" />
                </GridLayout>
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
import Menu from './Menu.vue';
import NavBar from './LogoBarre.vue';
import { Http } from '@nativescript/core';
import { ApplicationSettings } from '@nativescript/core';

export default {
    name: 'Panier',
    components: {
        Menu,
        NavBar
    },
    data() {
        return {
            token: ApplicationSettings.getString("token"),
            isDrawerOpen: false,
            favoriteProducts: [], // Liste des produits du panier
            deliveryFee: 0.00,
            taxRate: 0.00 ,
            commentaire: ''
        };
    },
    computed: {
        // Calcul dynamique du sous-total
        totalPrice() {
            return parseFloat(this.favoriteProducts.reduce((total, product) => {
                return total + (parseFloat(product.originalPrice.replace('$', '')) * product.quantity);
            }, 0).toFixed(2));
        },
        // Calcul de la taxe (en utilisant le taux de taxe)
        taxes() {
            return (this.totalPrice * this.taxRate).toFixed(2);
        },
        // Calcul du coÃ»t total
        totalCost() {
            // Le coÃ»t total inclut le sous-total, les taxes et les frais de livraison
            return (this.totalPrice + parseFloat(this.taxes) + this.deliveryFee).toFixed(2);
        }
    },
    mounted() {
        this.getProductsInCart();
        this.getDeliveryFee();  // RÃ©cupÃ©rer les frais de livraison
        this.getTaxRate();  // RÃ©cupÃ©rer le taux de taxe
    },
    methods: {
        openDrawer() {
            if (this.$refs.drawer && this.$refs.drawer.nativeView) {
                this.$refs.drawer.nativeView.showDrawer();
            }
        },
        // GÃ©rer l'augmentation et la diminution des quantitÃ©s
        increaseQuantity(index) {
            const product = this.favoriteProducts[index];
            product.quantity = (product.quantity || 1) + 1;
        },
        decreaseQuantity(index) {
            const product = this.favoriteProducts[index];
            if (product.quantity > 1) {
                product.quantity -= 1;
            }
        },
        async getProductsInCart() {
            try {
                const response = await Http.request({
                    url: 'https://dev-api.wnsansgluten.ca/Clients/panier',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${ApplicationSettings.getString('token')}`
                    }
                });
                const products = response.content.toJSON();

                // VÃ©rifier si `products` est un tableau
                if (Array.isArray(products)) {
                    this.favoriteProducts = products.map(product => ({
                        panierId: product.panier_id, // Utiliser id_panier pour identifier chaque produit dans la liste
                        productId: product.id || product.productId,
                        name: product.name,
                        category: product.categories?.split(',')[0] || 'Inconnue',
                        originalPrice: `$${product.price}`,
                        image: product.image_url || '~/images/default.png',
                        quantity: 1 // QuantitÃ© par dÃ©faut
                    }));
                } else {
                    // Si ce n'est pas un tableau, vider le panier et loguer un message
                    this.favoriteProducts = [];
                    console.warn("Le panier est vide :", products.message || "Aucun produit trouvÃ© dans le panier.");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des produits :", error);
            }
        },
         // Supprimer un produit de la liste et de la base de donnÃ©es
async deleteProduct(index) {
  console.log("Full product object:", this.favoriteProducts[index]);

  // Change from .id to .productId
  const panierId = this.favoriteProducts[index].productId;

  console.log("PanierId to delete:", panierId);

  if (!panierId) {
    console.error("No panierId found in product object");
    return;
  }

  try {
    const response = await Http.request({
      url: `https://dev-api.wnsansgluten.ca/Clients/panier/${panierId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("Full response:", response);

    if (response.statusCode === 200) {
      this.favoriteProducts.splice(index, 1);
      console.log("Product deleted successfully");
    } else {
      console.error("Failed to delete product:", response.content);
    }
  } catch (error) {
    console.error("Error in deleteProduct:", error);
  }
}



,
          // MÃ©thode pour vider le panier aprÃ¨s la commande
              async viderPanier() {
                  try {
                      const response = await Http.request({
                          url: 'https://dev-api.wnsansgluten.ca/Clients/panier',  // Utilisez la route qui supprime tous les produits
                          method: 'DELETE',
                          headers: {
                              Authorization: `Bearer ${this.token}`,
                              'Content-Type': 'application/json'
                          }
                      });

                      if (response.statusCode === 200) {
                          console.log("Panier vidÃ© avec succÃ¨s.");
                          this.favoriteProducts = []; // Vide la liste des produits dans le frontend
                      } else {
                          console.error("Erreur lors de la suppression du panier:", response.content.toJSON());
                      }
                  } catch (error) {
                      console.error("Erreur:", error);
                  }
              },
        async getDeliveryFee() {
            try {
                const response = await Http.request({
                    url: 'https://dev-api.wnsansgluten.ca/Orders/frais-livraison',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${ApplicationSettings.getString('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.content.toJSON();
                this.deliveryFee = parseFloat(data.frais_livraison) || 0.00; // Mettre Ã  jour les frais de livraison
            } catch (error) {
                console.error("Erreur lors de la rÃ©cupÃ©ration des frais de livraison:", error);
            }
        },
        async getTaxRate() {
            try {
                const response = await Http.request({
                    url: 'https://dev-api.wnsansgluten.ca/Orders/frais-taxe',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${ApplicationSettings.getString('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.content.toJSON();
                this.taxRate = parseFloat(data.frais_taxe) || 0.15; // Mettre Ã  jour le taux de taxe
            } catch (error) {
                console.error("Erreur lors de la rÃ©cupÃ©ration du taux de taxe:", error);
            }
        },
        async passerCommande() {
            try {
                // VÃ©rifier si le panier est vide
                if (this.favoriteProducts.length === 0) {
                    alert('Votre panier est vide. Veuillez ajouter des produits avant de passer une commande.');
                    return; // ArrÃªte l'exÃ©cution de la mÃ©thode
                }

                // Appel Ã  l'API pour rÃ©cupÃ©rer les informations utilisateur
                const responseUserInfo = await fetch('https://dev-api.wnsansgluten.ca/Clients/commande/informations', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${ApplicationSettings.getString('token')}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!responseUserInfo.ok) {
                    throw new Error('Erreur lors de la rÃ©cupÃ©ration des informations utilisateur');
                }

                const userInfo = await responseUserInfo.json();

                // PrÃ©parer l'objet de commande avec les informations rÃ©cupÃ©rÃ©es
                const commande = {
                    items: this.favoriteProducts.map(product => ({
                        productId: product.productId,
                        quantity: product.quantity
                    })),
                    ville: userInfo.ville,
                    adresse: `${userInfo.numero_appartement} ${userInfo.rue}`,
                    codePostal: userInfo.code_postal,
                    telephone: userInfo.telephone,
                    commentaire: this.commentaire || ''  // Ajout du commentaire
                };

                console.log(commande);  // VÃ©rifier la structure de la commande

                // Envoyer la commande Ã  l'API
                const responseCommande = await fetch('https://dev-api.wnsansgluten.ca/Orders/place-order', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${ApplicationSettings.getString('token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(commande)
                });

                if (responseCommande.ok) {
                    // Commande rÃ©ussie
                     await this.viderPanier();  // Vider le panier aprÃ¨s une commande rÃ©ussie

                    this.$navigateTo('wait');
                    setTimeout(() => {
                        this.$navigateTo('ConfirmationPage');
                    }, 2000);
                } else {
                    // Commande Ã©chouÃ©e, loggez le message d'erreur
                    const errorData = await responseCommande.json();  // RÃ©cupÃ©rer le message d'erreur du serveur
                    console.error('Erreur lors de la commande:', errorData);
                    alert('Erreur: ' + (errorData.error || 'Une erreur inconnue est survenue.'));

                    setTimeout(() => {
                        this.$navigateTo('CommandeEchouee');
                    }, 2000);
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Une erreur est survenue : ' + error.message);
            }
        },

        onMenuTap(item) {
              if (this.$refs.drawer?.nativeView) {
                this.$refs.drawer.nativeView.closeDrawer();
              }

              const routes = {
                'Mes commandes': () => import('./MesCommandes.vue'),
                'Mon profile': () => import('./Profile.vue'),
                'Adresse de livraison': () => import('./AddLivraison.vue'),
                'Nous contacter': () => import('./NousContacter.vue'),
                'Paramètres': () => import('./Parametre.vue'),
                'Se déconnecter': () => import('./Login.vue')
              };

              if (routes[item]) {
                routes[item]()
                  .then(module => this.$navigateTo(module.default, {
                    transition: { name: "fade" }
                  }))
                  .catch(error => console.error('Navigation error:', error));
              }
            },
        goBack() {
            this.$navigateBack();
        },
        logout() {
            ApplicationSettings.setString('token', ''); // Effacer le token de l'utilisateur
            this.$navigateTo(Login); // Rediriger vers la page de login
        }
    }
};
</script>

</script>

<style scoped>
.qt-image {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 20px;
    background-color: #ddd;
    margin-left: 20;
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
.delete-icon {
    width: 70px;
        height: 70px;
        object-fit: cover;
        border-radius: 20px;
        background-color: #ddd;
        margin-left: 180;
    cursor: pointer; /* Pour indiquer que l'icÃ´ne est cliquable */
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

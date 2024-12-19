<template>
 <Page actionBarHidden="true" class="backgr-livraison">
 <GridLayout rows="*, auto">
 <!-- Liste des adresses -->
 <ScrollView row="0">
 <StackLayout class="page-content">
 <!-- Bouton de retour -->
 <Label text="<" class="boutton-retour" @tap="onBackTap" />

 <!-- Titre de la page -->
 <Label text="Adresses de livraison" class="titre-pLivraison" />

 <!-- Liste d'adresses -->
 <StackLayout v-for="(address, index) in addresses" :key="index" class="address-item">
 <GridLayout columns="*, auto" class="address-layout">
 <!-- Informations sur l'adresse -->
 <StackLayout col="0" class="address-details">
 <Label :text="(address.rue || address.numero_appartement) ? `Rue ${address.rue} ${address.rue && address.numero_appartement ? ' - ' : ''}App ${address.numero_appartement}` : ''" class="address-line" />

 <Label :text="(address.ville || address.province) ? `Ville de ${address.ville} ${address.ville && address.province ? ' - ' : ''}Province: ${address.province}` : ''" class="address-line" />

 <Label :text="address.code_postal ? `code postale : ${address.code_postal}` : ''" class="address-line" />
 </StackLayout>

 <!-- Bouton pour supprimer l'adresse -->
 <Button text="Supprimer" @tap="deleteAddress(address.id)" class="delete-button" col="1" />
 </GridLayout>

 <!-- Séparateur -->
 <StackLayout class="separator" />
 </StackLayout>

 <!-- Message si aucune adresse -->
 <Label v-if="addresses.length === 0" text="Aucune adresse disponible. Ajoutez-en une nouvelle !" class="no-address" />
 </StackLayout>
 </ScrollView>

 <!-- Bouton pour ajouter une nouvelle adresse -->
 <StackLayout row="1" class="bottom-actions">
 <Button text="Ajouter une nouvelle adresse" @tap="onAddAddressTap" class="b-adress" />
 </StackLayout>
 </GridLayout>
 </Page>
</template>
<script>
import { Http, ApplicationSettings } from '@nativescript/core';
import AddLivraison from './AddLivraison.vue';

const API_URL = 'https://dev-api.wnsansgluten.ca/Clients/adresses'; // URL de l'API des adresses

export default {
 name: "Livraison",
 data() {
 return {
 addresses: [] // Liste des adresses récupérées depuis l'API
 };
 },
 methods: {
 // Retour à l'écran précédent
 onBackTap() {
 this.$navigateBack();
 },
 // Navigation pour ajouter une adresse
 onAddAddressTap() {
 this.$navigateTo(AddLivraison, {
 transition: { name: "slide" }
 });
 },
 // Récupération des adresses depuis l'API
 async fetchAddresses() {
 const token = ApplicationSettings.getString('token', '');
 if (!token) {
 console.error("Token non trouvé");
 return;
 }

 try {
 const response = await Http.request({
 url: API_URL,
 method: 'GET',
 headers: {
 "Authorization": `Bearer ${token}`,
 "Content-Type": "application/json"
 }
 });

 const result = response.content.toJSON();
 console.log("Adresses récupérées :", result);

 if (Array.isArray(result)) {
 this.addresses = result;
 } else {
 console.error("Données inattendues :", result);
 }
 } catch (error) {
 console.error("Erreur lors de la récupération des adresses :", error);
 }
 },
 // Suppression d'une adresse via l'API
 async deleteAddress(id) {
 const token = ApplicationSettings.getString('token', '');
 if (!token) {
 console.error("Token non trouvé");
 return;
 }

 try {
 const response = await Http.request({
 url: `https://dev-api.wnsansgluten.ca/Clients/adresses/${id}`, // Utilisation de l'ID pour supprimer l'adresse
 method: 'DELETE',
 headers: {
 "Authorization": `Bearer ${token}`,
 "Content-Type": "application/json"
 }
 });

 if (response.statusCode === 200) {
 console.log(`Adresse avec ID ${id} supprimée`);
 this.addresses = this.addresses.filter(address => address.id !== id); // Retirer l'adresse de la liste
 } else {
 const result = response.content.toJSON();
 console.error("Erreur lors de la suppression :", result.message || response.statusCode);
 }
 } catch (error) {
 console.error("Erreur lors de la suppression de l'adresse :", error);
 }
 }
 },
 // Appel automatique de fetchAddresses lorsque le composant est monté
 mounted() {
 this.fetchAddresses();
 }
};
</script>

<style scoped>
.backgr-livraison {
 background-color: #1C1D53;
}

.boutton-retour {
 color: #E95322;
 font-size: 28px;
 margin-top: 20px;
 margin-left: 10px;
}

.titre-pLivraison {
 font-size: 28px;
 color: #F8F8F8;
 font-weight: bold;
 margin-top: 20px;
 margin-bottom: 150px;
 text-align: center;
}

.addresses-container {
 margin-top: 30;
 padding: 0 20;
}

.address-item {
 margin-bottom: 20;
}

.address-content {
 padding: 15;
}

.address-title {
 color: #FFFFFF;
 font-size: 18;
 font-weight: bold;
 margin-bottom: 5;
}

.address-line {
 color: #F3E9B5;
 font-size: 14;
 margin-bottom: 2;
}

.address-underline {
 height: 1;
 background-color: rgba(243, 233, 181, 0.3);
 margin-top: 10;
}

.b-adress {
 width: 500px;
 padding: 10px;
 color: #E95322;
 background-color: #FFDECF;
 border-radius: 100px;
 font-size: 11px;
 font-weight: bold;
 margin-top: 60px;
 margin-left: auto;
 margin-right: auto;
}

.b-adress:hover {
 background-color: #FFDECF;
}

.custom-tabview {
 border-width: 0;
 separator-color: transparent;
}
</style>

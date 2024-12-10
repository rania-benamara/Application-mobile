
<template>
 <Page actionBarHidden="true">
 <StackLayout class="container">
 <Label text="Créez un compte" class="title" />
 <Label text="Créez votre compte et commencez votre aventure pâtissière avec nous!" class="description" textWrap="true" />

 <!-- Text Fields -->
 <StackLayout class="text-field-container">
 <TextField v-model="prenom" hint="Prénom" required="true" class="input-field" />
 </StackLayout>

 <StackLayout class="text-field-container">
 <TextField v-model="nom" hint="Nom" required="true" class="input-field" />
 </StackLayout>
 <StackLayout class="text-field-container">
 <TextField v-model="telephone" hint="Téléphone" required="true" keyboardType="phone" class="input-field" />
 </StackLayout>
 <StackLayout class="text-field-container">
 <TextField v-model="email" hint="Email" required="true" keyboardType="email" class="input-field" />
 </StackLayout>
 <StackLayout class="text-field-container">
 <TextField v-model="password" hint="Mot de passe" required="true" secure="true" class="input-field" />
 </StackLayout>
 <StackLayout class="text-field-container">
 <DatePicker
   maxDate="2024"
    v-model="date_naissance"
 />
  </StackLayout>

 <!-- Create Button -->
 <Button text="Créer" class="create-button" @tap="registerUser" />

 <!-- Footer -->
 <Label class="footer" text="Vous avez déjà un compte ? " />
 <Label text="Connexion" class="footer-link" @tap="loginlink" />
 </StackLayout>
 </Page>
</template>
<script>
import Login from './Login.vue';
import { Buffer } from 'buffer';
import { Http } from "@nativescript/core"; // Importer le module HTTP

export default {
 data() {
 return {
 prenom: '',
 nom: '',
 email: '',
 telephone: '',
 password: '',
 date_naissance: '',
 };
 },
 methods: {
 ddnChange () {

 },
 async registerUser() {
 if (!this.prenom || !this.nom || !this.telephone || !this.email || !this.password || !this.date_naissance) {
 alert('Veuillez remplir tous les champs.');
 return;
 }

 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!emailRegex.test(this.email)) {
 alert("Veuillez entrer un email valide (ex : exemple@domaine.com).");
 return;
 }

 const phoneRegex = /^\d{10,}$/;
 if (!phoneRegex.test(this.telephone)) {
 alert("Veuillez entrer un numéro de téléphone valide (au moins 10 chiffres).");
 return;
 }

 const passwordRegex = /^(?=.*\d).{4,}$/;
 if (!passwordRegex.test(this.password)) {
 alert("Le mot de passe doit contenir au moins 4 caractères et au moins 1 chiffre.");
 return;
 }

 // const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
 // if (!dateRegex.test(this.date_naissance)) {
 // alert("Veuillez entrer une date de naissance valide au format JJ/MM/AAAA.");
 // return;
 // }

 const dataToSend = {
 prenom: this.prenom,
 nom: this.nom,
 email: this.email,
 telephone: this.telephone,
 password: this.password,
     date_naissance: this.date_naissance.getYear() + "-" + this.date_naissance.getMonth() + "-" + this.date_naissance.getDate()
 };

 try {
 const response = await Http.request({
 url: 'https://dev-api.wnsansgluten.ca/Clients/register',
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 content: JSON.stringify(dataToSend),
 });

 if (response.statusCode !== 200) {
 alert(response.content.toString());
 return;
 }

 const data = response.content.toJSON();

 const confirmed = confirm(data.message);
 console.log(confirmed);
 if (confirmed == true) {
 // Effacer les champs du formulaire
 this.prenom = '';
 this.nom = '';
 this.email = '';
 this.telephone = '';
 this.password = '';
 this.date_naissance = '';

 // Redirection
 this.$navigateTo(Login, {
 transition: { name: "slide", duration: 380, curve: "easeIn" },
 clearHistory: true,
 });
 }

 } catch (error) {
 alert('Erreur lors de l\'inscription: ' + error);
 }
 }
,

 loginlink() {
 this.$navigateTo(Login, {
 transition: { name: "slide", duration: 380, curve: "easeIn" },
 clearHistory: true
 });
 }
 }
};
</script>

<style scoped>
.container {
 padding: 20px;
 border-radius: 8px;
 box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
 background-color: #ffffff;
 text-align: center;
 font-family: 'Arial', sans-serif;
 width: 95%; /* Ensure container fits within the page */
 margin: 0 auto; /* Center the container */
}

.title {
 font-family: Outfit;
 font-size: 35px;
 font-weight: 700;
 line-height: 44.1px;
 text-align: left;
 color: #1C1D53;
 margin-top: 68px;
 margin-left: 40px;
 margin-right: 40px;
}

.description {
 font-size: 16px;
 color: #1C1D53;
 margin-bottom: 80px;
 margin-top:25px;
 text-align: center;
 line-height: 24px;
 text-wrap: true; /* Ensure text wraps */
 width: auto; /* Allow width to adjust */
 height: auto; /* Allow height to adjust */
}

.text-field-container {
 margin: 10px 0;
 border-width: 1px;
 border-color: #8E8383;
 border-radius: 5px;
 padding: 10px;
 background-color: #f9f9f9;
 text-align: left;
 font-family: Outfit;
 font-size: 14px;
 font-weight: 400;
 line-height: 20.16px;
 width: auto;
 max-width: 100%; /* Ensure it doesn't exceed the container width */
 margin-bottom: 30px;
}

.input-field {
 border-width: 0;
 background-color: transparent;
 color: #000;
 placeholder-color: #8E8383;
 padding: 10;
 margin: 0;
 font-size: 14;
}

.create-button {
 width: auto; /* Ensure the button is wide enough */
 padding: 15; /* Increased padding */
 color: #ffffff;
 background-color: #1C1D53;
 font-size: 18; /* Increased font size */
 font-weight: bold;
 margin-top: 30;
 height: auto; /* Ensure it expands to fit content */
 min-height: 60; /* Set a minimum height */
 font-family: Outfit;
}

.create-button:hover {
 background-color: #333388;
}

.footer {
 margin-top: 20;
 font-size: 12;
}

.footer-link {
 color: #1C1D53;
 font-weight: bold;
 cursor: pointer;
}
</style>

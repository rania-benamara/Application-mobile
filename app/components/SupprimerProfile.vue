<template>
  <Page actionBarHidden="true">
    <ActionBar title="Supprimer mon compte" class="action-bar" />
    <StackLayout class="confirmation-container">
      <Label text="Êtes-vous sûr de vouloir supprimer votre compte ?" class="confirmation-title" />
      <Label text="Cette action est irréversible." class="confirmation-subtitle" />

      <StackLayout class="button-container">
        <Button text="Oui" class="confirm-button" @tap="loginlink" />
        <Button text="Annuler" class="cancel-button" @tap="goBack" />
      </StackLayout>
    </StackLayout>
  </Page>
</template>

<script>
import Login from './Login'
import Accueil from './Accueil'
import { Frame } from '@nativescript/core';

export default {
  name: "SupprimerProfile",
  methods: {
   goBack() {
        this.$navigateBack(); // Retour à la page précédente
      },
  loginlink() {
          this.$navigateTo(Login);
  },
  accueillink() {
        this.$navigateTo(Accueil);
  },

  }
};
</script>

<style scoped>
.confirmation-container {
  padding: 20px;
  text-align: center;
}

.confirmation-title {
  font-size: 23px;
  font-weight: bold;
  color: #1f1f44; /* Couleur foncée */
  margin-top: 20px;
  word-wrap: break-word; /* Permet au texte de se casser sur plusieurs lignes si nécessaire */
      white-space: normal; /* Permet au texte de s'enrouler */
      width: 100%; /* Prend la largeur complète de la cellule */
}

.confirmation-subtitle {
  font-size: 15px;
  color: #808080; /* Gris */
  margin-bottom: 30px;
  color: #1f1f44;
}

.button-container {
  display: flex;
  justify-content: space-around; /* Espacement entre les boutons */
}

.confirm-button,
.cancel-button {
  text-transform: none; /* Désactive la mise en majuscules */
  margin-top:40;
    background-color: #3f51b5;
    color: white;
    text-align: center;
    width:150;
      height:40;
      padding:10px;
      font-size: 15px;
      border-radius:20;
}

.confirm-button {
  background-color: #1f1f44; /* Bleu foncé */
  color: white;
}

.cancel-button {
  background-color: #808080; /* Gris */
  color: white;
}
</style>

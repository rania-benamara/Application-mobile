<template>
  <Page>
    <ActionBar title="" class="action-bar" />
    <StackLayout class="login-container">
      <!-- Logo -->
      <Image src="~/images/logo.png" class="logo" /> <!-- Utilisation de ~/ comme alias pour le répertoire de ressources -->
      <!-- Titre et sous-titre -->
      <Label text="Identifiez-vous" class="login-title" />
      <Label text="Bon retour" class="subtitle" />
      <Label text="Vous nous avez manqué" class="subtitle" />

      <!-- Champs de connexion -->
      <TextField v-model="email" hint="E-mail, Nom d'utilisateur" class="input-field" keyboardType="email" />
      <TextField v-model="mot_de_passe" hint="Mot de passe" secure="true" class="input-field" />
      <Label text="Mot de passe oublié ?" class="forgot-password" />

      <!-- Bouton Se connecter -->
      <Button text="Se connecter" class="login-button" @tap="goToaccueil" />

      <!-- Lien pour créer un compte -->
      <Label text="Vous n'avez pas de compte ?" class="register-text" />
      <Label text="Inscrivez-vous maintenant" class="register-link" />
    </StackLayout>
  </Page>
</template>

<script>
import Accueil from './Accueil'

export default {
  data() {
    return {

      mot_de_passe: '',
    };
  },
  methods: {
      goToaccueil() {
            this.$navigateTo(Accueil);
      },
  },
};
</script>
<style scoped>

/* Styles */
.login-container {
  padding: 20px;
  text-align: center;
}

.logo {
  margin-top: 40px;
  height: 400px;
  width: 400px;
  align-self: center;
  margin-bottom: 40px;
}

.login-title {
  font-size: 23px;
  font-weight: bold;
  color: #1f1f44; /* Couleur foncée */
  margin-top: 20px;
}

.subtitle {
  font-size: 14px;
  color: #808080; /* Gris */
  margin-bottom: 10px;
}
.input-field {
  margin-top: 20px;
  padding: 15px; /* Ajout de padding pour l'espace intérieur */
  background-color: #f8f8f8; /* Fond clair */
  font-size: 14px; /* Ajuster la taille de la police */
  border-color :#808080;
  text-align: left;

}


.forgot-password {
  font-size: 12px;
  color: #808080; /* Gris */
  text-align: right;
  margin-top: 5px;
}

.login-button {
  background-color: #1f1f44; /* Bleu foncé */
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  padding: 15px;
  border-radius: 5px;
}

.register-text {
  font-size: 14px;
  color: #808080; /* Gris */
  margin-top: 20px;
}

.register-link {
  font-size: 14px;
  color: #1f1f44; /* Bleu foncé */
  font-weight: bold;
  margin-top: 5px;
}


</style>

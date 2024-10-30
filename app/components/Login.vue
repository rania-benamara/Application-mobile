<template>
  <Page  actionBarHidden="true">
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
      <Label text="Mot de passe oublié ?" class="forgot-password" @tap="goForgotPwd"/>

      <!-- Bouton Se connecter -->
      <Button text="Se connecter" class="login-button" @tap="goToAccueil"/>


      <!-- Lien pour créer un compte -->
      <Label text="Vous n'avez pas de compte ?" class="register-text" />
      <Label text="Inscrivez-vous maintenant" class="register-link" @tap="registerlink"   />
    </StackLayout>
  </Page>
</template>


<script>
import Accueil from './Accueil.vue';
import Register from './Register.vue';
import ForgotPassword from './ForgotPassword.vue';

export default {
  data() {
    return {
      email: '',
      mot_de_passe: ''
    };
  },
  methods: {
    goToAccueil() {
      console.log("Attempting to navigate to Accueil");
      this.$navigateTo(Accueil, {
        clearHistory: true,
        transition: {
          name: "fade"
        }
      }).then(() => {
        console.log("Navigation to Accueil successful");
      }).catch(error => {
        console.error("Navigation to Accueil failed:", error);
      });
    },
    registerlink() {
      console.log("Attempting to navigate to Register");
      this.$navigateTo(Register, {
        transition: {
          name: "slide"
        }
      }).then(() => {
        console.log("Navigation to Register successful");
      }).catch(error => {
        console.error("Navigation to Register failed:", error);
      });
    },

    goForgotPwd(){
      console.log("Attempting to navigate to Register");
            this.$navigateTo(ForgotPassword, {
              transition: {
                name: "slide"
              }
            }).then(() => {
              console.log("Navigation to Register successful");
            }).catch(error => {
              console.error("Navigation to Register failed:", error);
            });
    }

  }
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
  font-size: 15px;
  color: #1f1f44; /* Gris */

}
.input-field {
  margin-top: 80px;
  padding: 15px; /* Ajout de padding pour l'espace intérieur */
  font-size: 14px; /* Ajuster la taille de la police */
border-color :#808080;
  text-align: left;
  border-radius:20px;
  border: 3px solid black; /* Spécifiez l'épaisseur, le style et la couleur de la bordure */
  width:350;
  height:50;
}


.forgot-password {
  font-size: 14px;
 color: #1f1f44;  /* Gris */
  text-align: right;
  margin-top: 5px;
}

.login-button {
  text-transform: none; /* Désactive la mise en majuscules */

  background-color: #1f1f44; /* Bleu foncé */
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  padding: 15px;
  border-radius: 20px;
  margin-bottom:300px;
  width:350;
    height:50;
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

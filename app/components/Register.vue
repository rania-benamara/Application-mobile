<template>
  <Page actionBarHidden="true">
    <StackLayout class="register-container">
      <Label text="Créez un compte" class="register-title" />
      <Label text="Créez votre compte et commencez votre aventure pâtissière avec nous!" class="register-subtitle" />

      <StackLayout class="register-input-field">
        <TextField hint="Nom" required="true" />
      </StackLayout>
      <StackLayout class="register-input-field">
        <TextField hint="Téléphone" required="true" keyboardType="phone" />
      </StackLayout>
      <StackLayout class="register-input-field">
        <TextField hint="Email" required="true" keyboardType="email" />
      </StackLayout>
      <StackLayout class="register-input-field">
        <TextField hint="Mot de passe" required="true" secure="true" />
      </StackLayout>
      <StackLayout class="register-input-field">
        <TextField hint="JJ / MM / AAAA" required="true" keyboardType="datetime" />
      </StackLayout>

      <Button text="Créer" class="register-button" @tap="" />

      <Label class="register-login-text" text="Vous avez déjà un compte ?" />
      <Label text="Connexion" class="register-login-link" @tap="loginlink" />
    </StackLayout>
  </Page>
</template>

<script>
import Login from './Login.vue';

export default {
  data() {
    return {
      mot_de_passe: '',
    };
  },
  methods: {
    loginlink() {
      console.log("Attempting to navigate back to Login");
      this.$navigateTo(Login, {
        transition: {
          name: "slide",
          duration: 380,
          curve: "easeIn"
        },
        clearHistory: true
      });
    }
  }
};
</script>

<style scoped>
.register-container {
  padding: 20px;
  text-align: center;
}

.register-title {
  font-size: 23px;
  font-weight: bold;
  color: #1f1f44;
  margin-top: 20px;
  margin-bottom: 10px;
}

.register-subtitle {
  font-size: 15px;
  color: #1f1f44;
  margin-bottom: 20px;
}

.register-input-field {
  margin-top: 15px;
  padding: 15px;
  font-size: 14px;
  border-color: #808080;
  text-align: left;
  border-radius: 20px;
  border-width: 0.6;
  border-color: #8E8383;
  width: 350;
  height: 50;
}

.register-button {
  text-transform: none;
  background-color: #1f1f44;
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  padding: 15px;
  border-radius: 20px;
  width: 350;
  height: 50;
}

.register-login-text {
  font-size: 14px;
  color: #808080;
  margin-top: 20px;
}

.register-login-link {
  font-size: 14px;
  color: #1f1f44;
  font-weight: bold;
  margin-top: 5px;
}
</style>

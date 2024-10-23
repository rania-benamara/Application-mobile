<template>
  <Page actionBarHidden="true">
    <StackLayout class="container">
      <Label text="Créez un compte" class="title" />
      <Label text="Créez votre compte et commencez votre aventure pâtissière avec nous!" class="description" />

      <!-- Wrap each TextField inside a rectangle container -->
      <StackLayout class="text-field-container">
        <TextField hint="Nom" required="true" />
      </StackLayout>

      <StackLayout class="text-field-container">
        <TextField hint="Téléphone" required="true" keyboardType="phone" />
      </StackLayout>

      <StackLayout class="text-field-container">
        <TextField hint="Email" required="true" keyboardType="email" />
      </StackLayout>

      <StackLayout class="text-field-container">
        <TextField hint="Mot de passe" required="true" secure="true" />
      </StackLayout>

      <StackLayout class="text-field-container">
        <TextField hint="JJ / MM / AAAA" required="true" keyboardType="datetime" />
      </StackLayout>

      <Button text="Créer" class="create-button" @tap="loginlink" />

      <Label class="footer" text="Vous avez déjà un compte ? " />
      <Label text="Connexion" class="footer-link" @tap="loginlink" />
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
.container {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  text-align: center;
  font-family: 'Arial', sans-serif;
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
  font-size: 16px;
  font-weight: 400;
  line-height: 20.16px;
  width: 342px;
  margin-bottom: 30px;
}

.create-button {
  width: 250px;
  padding: 10px;
  color: #ffffff;
  background-color: #1C1D53;
  font-size: 16px;
  font-weight: bold;
  margin-top: 61px;
  height: 60px;
  font-family: Outfit;
}

.create-button:hover {
  background-color: #333388;
}

.footer {
  margin-top: 20px;
  font-size: 12px;
}

.footer-link {
  color: #1C1D53;
  font-weight: bold;
  cursor: pointer;
}
</style>

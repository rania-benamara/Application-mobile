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
      <Button text="Se connecter" class="login-button" />

      <!-- Lien pour créer un compte -->
      <Label text="Vous n'avez pas de compte ?" class="register-text" />
      <Label text="Inscrivez-vous maintenant" class="register-link" />
    </StackLayout>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      mot_de_passe: '',
    };
  },
};
</script>

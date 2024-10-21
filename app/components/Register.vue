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

      <Button text="Créer" class="create-button" @tap="" />

      <Label class="footer" text="Vous avez déjà un compte ? " />
      <Label text="Connexion" class="footer-link" @tap="" />
    </StackLayout>
  </Page>
</template>

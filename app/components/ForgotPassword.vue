<!-- components/ForgotPassword.vue -->
<template>
  <Page actionBarHidden="true">
    <GridLayout rows="auto, *" class="page-content">
      <StackLayout row="0" class="top-container">
        <Image src="~/images/goback1.png" class="go-back-icon" @tap="goBack" />
      </StackLayout>
      <StackLayout row="1">
        <Label text="Mot de passe oublié" class="main-title" />
        <Label text="Réinitialisez le mot de passe de votre compte" textWrap="true" class="subtitle" />
        <StackLayout class="input-field">
          <Label text="Email" class="input-label" />
          <TextField v-model="email" hint="Entrez votre email" keyboardType="email" autocorrect="false" autocapitalizationType="none" class="input" />
        </StackLayout>
        <Button text="Suivant" @tap="onSubmit" class="submit-button" />
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      email: ''
    }
  },
  methods: {
    onSubmit() {
      // Handle the submission logic here
      console.log('Email submitted:', this.email);
      // You would typically call an API or service here to handle the password reset
    },
    goBack() {
      this.$navigateBack();
    }
  }
}
</script>

<style scoped>
.page-content {
  padding: 0;
}
.top-container {
  padding-top: 20;
  padding-left: 20;
  height: 60;
}
.go-back-icon {
  width: 40;
  height: 40;
  vertical-align: top;
  horizontal-align: left;
}
.main-title {
  font-size: 28;
  font-weight: 600;
  margin-bottom: 10;
  margin-top: 30;
  color: #1F2C37;
  text-align: center;
}
.subtitle {
  font-size: 14;
  color: #9CA4AB;
  margin-bottom: 80;
  font-weight: 500;
  text-align: center;
  padding: 0 20;
}
.input-field {
  margin-bottom: 20;
  background-color: #ffffff;
  padding: 0 20;
}
.input-label {
  font-size: 14;
  margin-bottom: 5;
  font-weight: 600;
  color: #1F2C37;
}
.input {
  font-size: 16;
  padding: 10;
  border-width: 2;
  border-color: #ECF1F6;
  border-radius: 20;
  font-weight: 500;
  height:60;
}
.submit-button {
  background-color: #010035;
  color: white;
  font-size: 18;
  font-weight: bold;
  padding: 15 10;
  border-radius: 5;
  margin: 60 20 0 20;
}
</style>

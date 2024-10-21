<template>
  <Page>
    <ActionBar title="Modifier Mot de Passe" />

    <ScrollView>
      <StackLayout class="container">
        <!-- Current Password Field -->
        <TextField hint="Mot de Passe actuel" secure="true" class="inputField" color="white" hintColor="white" />

        <!-- New Password Field -->
        <TextField hint="Nouveau mot de passe" secure="true" class="inputField" color="white" hintColor="white" />

        <!-- Confirm New Password Field -->
        <TextField hint="Confirm mot de passe" secure="true" class="inputField" color="white" hintColor="white" />

        <!-- Submit Button -->
        <Button text="Soumettre" class="submitButton" @tap="onSubmit" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
export default {
  name: "EditPassword",
  methods: {
    onSubmit() {
      // Handle the submit action here
      console.log("Password change submitted");
    },
  },
};
</script>

<style scoped>
/* Container style */
.container {
  padding: 20px;
  justify-content: center;
  align-items: center;
}

/* Input field style */
.inputField {
  width: 80%;
  margin-bottom: 80px;
  padding: 50px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;

}

/* Submit button style */
.submitButton {
  width: 80%;
  padding: 10px;
  background-color: rgba(1, 0, 53, 1);
  color: white;
  border-radius: 5px;
  text-align: center;
}
</style>

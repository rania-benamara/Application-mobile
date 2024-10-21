<template>
  <Page>
    <ActionBar title="Enter New Address" class="actionBar" />

    <ScrollView>
      <StackLayout class="container">
        <!-- Street Address Field -->
        <TextField hint="Adresse de la rue" class="inputField" color="white" hintColor="#aaa" />

        <!-- City Field -->
        <TextField hint="Ville" class="inputField" color="white" hintColor="#aaa" />

        <!-- Postal Code Field -->
        <TextField hint="Postal Code" class="inputField" color="white" hintColor="#aaa" />

        <!-- Country Field -->
        <TextField hint="province" class="inputField" color="white" hintColor="#aaa" />

        <!-- Submit Button -->
        <Button text="Soumettre" class="submitButton" @tap="onSubmit" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
export default {
  name: "NewAddress",
  methods: {
    onSubmit() {
      // Handle the submit action here
      console.log("Address submitted");
    },
  },
};
</script>

<style scoped>
/* ActionBar style */
.actionBar {
  background-color: rgba(1, 0, 53, 1);
  color: white;
}

/* Container style */
.container {
  padding: 30px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
}

/* Input field style */
.inputField {
  color: white;

  width: 100%;
  margin-bottom: 80px;
  padding: 15px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
}


/* Submit button style */
.submitButton {
  width: 50%;
  padding: 15px;
  background-color: rgba(1, 0, 53, 1);
  color: white;
  border-radius: 5px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
}
</style>

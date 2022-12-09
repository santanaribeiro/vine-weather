<template>
  <q-page padding>
    <img
      style="weight: 10px; width: 200px; margin-left: 120px; margin-top: 80px"
      src="https://cdn-icons-png.flaticon.com/512/2322/2322701.png"
    />
    <q-form
      class="row justify-center"
      style="margin-top: 120px"
      @submit.prevent="handleRegister"
    >
      <p class="col-12 text-h5 text-center">Registre-se aqui</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Username"
          v-model="form.name"
          rounded
          standout="bg-primary text-white"
        />
        <q-input
          label="Email"
          v-model="form.email"
          rounded
          standout="bg-primary text-white"
        />
        <q-input
          label="Password"
          type="password"
          v-model="form.password"
          rounded
          standout="bg-primary text-white"
        />
        <div class="row q-pt-md">
          <q-btn
            style="left: 105px"
            label="Voltar"
            color="secondary"
            outlined
            rounded
            flat
            to="/login"
          />
          <q-btn
            style="left: 114px; text-align: center; color: #ffffff"
            label="Criar a conta"
            color="primary"
            outlined
            rounded
            type="submit"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PageRegister",

  setup() {
    const router = useRouter();
    const { register } = useAuthUser();
    const form = ref({
      name: "",
      email: "",
      password: "",
    });

    const handleRegister = async () => {
      try {
        await register(form.value);
        router.push({
          name: "email-confirmation",
          query: { email: form.value.email },
        });
      } catch (error) {
        alert(error);
      }
    };

    return {
      form,
      handleRegister,
    };
  },
});
</script>

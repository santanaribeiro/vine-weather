<template>
  <q-page padding>
    <img
      style="weight: 10px; width: 200px; margin-left: 95px; margin-top: 80px"
      src="https://cdn-icons-png.flaticon.com/512/1146/1146860.png"
    />
    <p class="text-h6">
      <q-form
        class="row justify-center text-center"
        style="margin-top: 100px"
        @submit.prevent="handleLogin"
      >
        <p class="col-12 text-h5 text-center">Login</p>
        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
          <q-input
            style="top: 200px"
            standout="bg-primary text-white"
            label="Email"
            v-model="form.email"
            rounded
          />
          <q-input
            style="top: 200px"
            standout="bg-primary text-white"
            label="Password"
            type="password"
            v-model="form.password"
            rounded
          />
          <div class="row q-pt-md">
            <q-btn
              style="text-align: center; font-style: normal; left: 105px"
              label="Registre-se"
              to="/register"
              flat
              color="secondary"
              rounded
            />
            <q-btn
              style="left: 114px; text-align: center; color: #ffffff"
              label="Entrar"
              color="primary"
              outlined
              rounded
              type="submit"
            />
          </div>
        </div>
      </q-form>
    </p>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import userAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PageLogin",

  setup() {
    const router = useRouter();

    const { login } = userAuthUser();

    const form = ref({
      email: "",
      password: "",
    });

    const handleLogin = async () => {
      try {
        await login(form.value);
        router.push({ name: "App" });
      } catch (error) {
        alert(error);
      }
    };
    return {
      form,
      handleLogin,
    };
  },
});
</script>

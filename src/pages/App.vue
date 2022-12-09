<template>
  <q-page class="flex column">
    <div class="col q-pt-lg q-px-md">
      <q-input
        outlined
        v-model="search"
        @keyup.enter="getWeatherBySearch"
        placeholder="Pesquisar"
        dark
        borderless
      >
        <template v-slot:prepend>
          <q-icon @click="getLocation" name="place" />
        </template>
        <template v-slot:append>
          <q-icon
            name="search"
            @click="getWeatherBySearch"
            class="cursor-pointer"
          />
        </template>
      </q-input>
    </div>
    <template v-if="weatherData">
      <div class="col text-white text-center">
        <div class="text-h4 text-weight-light">
          {{ weatherData.name }} - {{ weatherData.sys.country }}
        </div>
        <div class="text-h6 text-weight-light">
          {{ weatherData.weather[0].description }}
        </div>
        <div class="text-h1 text-weight-thin q-my-lg relative-position">
          <span>{{ Math.round(weatherData.main.temp) }}</span>
          <span class="text-h4 relative-position degree">&deg;C</span>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="col column text-center text-white">
        <div class="col text-h2 text-weight-thin">VineWeather</div>
        <q-btn @click="getLocation" class="col" flat>
          <q-icon left size="1em" name="place" />
          <div>Veja o clima na sua localização</div>
        </q-btn>
      </div>
    </template>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
  data() {
    return {
      search: "",
      weatherData: null,
      lat: null,
      lon: null,
      urlApi: "https://api.openweathermap.org/data/2.5/weather",
      keyApi: "cb9a9935b1b2ae09a7ccf06d2c36e61a",
    };
  },

  methods: {
    getLocation() {
      this.$q.loading.show(); //quasarconfig loading
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("position: ", position);
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        console.log("lat: ", this.lat);
        this.getWeather();
      });
    },
    getWeather() {
      this.$q.loading.show();
      this.$axios(
        `${this.urlApi}?lat=${this.lat}&lon=${this.lon}&lang=pt_br&appid=${this.keyApi}&units=metric`
      ).then((response) => {
        this.weatherData = response.data;
        this.$q.loading.hide();
      });
    },
    getWeatherBySearch() {
      this.$q.loading.show();
      this.$axios(
        `${this.urlApi}?q=${this.search}&lang=pt_br&appid=${this.keyApi}&units=metric`
      ).then((response) => {
        this.weatherData = response.data;
        this.$q.loading.hide();
      });
    },
  },
});
</script>

<style lang="sass">
.degree
  top: -44px
</style>

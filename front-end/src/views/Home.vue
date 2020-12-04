<template>
  <div class="home">
    <v-container class="country list">
      <v-layout row class="country" v-for="country in countries" :key="country.country">
        <hr />
        <router-link :to="'country/' + country.country" class='navbutton'>
          <v-col cols="12" md="6">
            <Map class='map' :mapName=country.country></Map>
          </v-col>
          <v-col cols="12" md="6">
            <h2>{{country.country}}</h2>
            <p> {{country.leaderTitle}}: {{country.leader}}</p>
            <p>Population: {{country.population}}</p>
          </v-col>
        </router-link>
      </v-layout>
        <hr />
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import Map from '@/components/Map.vue'

export default {
  name: 'Home',
  data() {
  return {
    countries: [],
    }
  },
  created() {
    this.getCountries();
  },
  components: {
    Map,
  },
  methods: {
    async getCountries() {
      try {
        let response = await axios.get("/api/country");
        console.log('Get Countries Done');
        console.log(response);
        this.countries = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
<style>
.flexbox {
  display: flex
}
.map {
  width: 200px;
}
</style>

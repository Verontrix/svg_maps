<template>
  <div class="home">
    <v-container class="country list">
      <section class="country" v-for="country in countries" :key="country.country">
        <hr />
        <router-link :to="'country/' + country._id" class='navbutton'>
          <v-layout row>
            <v-col cols="12" sm="6">
              <Map class='map' :mapId=country._id></Map>
            </v-col>
            <v-col cols="12" sm="6">
              <div>
                <h2>{{country.country}}</h2>
                <p> {{country.leaderTitle}}: {{country.leader}}</p>
                <p>Population: {{country.population}}</p>
              </div>
            </v-col>
          </v-layout>
        </router-link>
      </section>
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

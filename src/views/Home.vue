<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <section class="country list">
      <div class="country" v-for="country in countries" :key="country.country">
        <hr />
        <router-link :to="'country/' + country.country" class='navbutton'>
          <h2>{{country.country}}</h2>
          <p> {{country.leaderTitle}}: {{country.leader}}</p>
          <p>Population: {{country.population}}</p>
        </router-link>
      </div>
        <hr />
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios';

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
    HelloWorld
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

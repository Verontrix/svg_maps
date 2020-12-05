<template>
<div class="admin">
  <h1>The Admin Page!</h1>
  <div class="heading">
    <div class="circle">1</div>
      <h2>Add an Item</h2>
    </div>
    <div class="add">
      <v-form>
        <input v-model="country" placeholder="Country Name">
        <p></p>
        <input v-model="title" placeholder="Title">
        <p></p>
        <input v-model="leader" placeholder="Leader">
        <p></p>
        <input v-model="population" type="number" min="0" placeholder="1000000" step="100">
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
        <v-btn @click="upload">Upload</v-btn>
      </v-form>
      <div class="upload" v-if="addItem">
        <h2>{{addItem.title}}</h2>
        <img :src="addItem.path" />
      </div>
    </div>
  <div class="heading">
    <div class="circle">2</div>
      <h2>Edit/Delete an Item</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findCountry" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.country}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="foundCountry">
        <Map class='map' :mapId=foundCountry._id :key="componentKey"></Map>
        <input v-model="foundCountry.country" placeholder="Country Name">
        <p></p>
        <input v-model="foundCountry.leaderTitle" placeholder="Title">
        <p></p>
        <input v-model="foundCountry.leader" placeholder="Leader">
        <p></p>
        <input v-model="foundCountry.population" type="number" min="0" placeholder="1000000" step="100">
      </div>
      <div class="actions" v-if="foundCountry">
        <v-btn @click="deleteItem(foundCountry)">Delete</v-btn>
        <v-btn @click="editItem(foundCountry)">Edit</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Map from '@/components/Map.vue'

function getNames(obj, name) {
  for (var key in obj) {
    var property = Object.prototype.hasOwnProperty.call(obj,key);
    if (property) {
      var type = typeof(obj[key]);
      if ( key == name)
      {
        return obj[key];
      }
      else if ("object" == type) {
        var result = getNames(obj[key], name);
        if (result != null)
          return result;
      }
    }
  }
  return null;
}

export default {
  name: 'Admin',
  data() {
    return {
      country: "",
      population: 0,
      leader: "",
      title: "",
      uploadFile: null,
      addItem: null,
      countries: [],
      findCountry: "",
      foundCountry: null,
      map: "",
      editChangedSVG: false,
    }
  },
  components: {
    Map
  },
  computed: {
    suggestions() {
      let countries = this.countries.filter(item => item.country.toLowerCase().startsWith(this.findCountry.toLowerCase()));
      return countries.sort((a, b) => a.country > b.country);
    },
    componentKey() {
      return this.foundCountry._id;
    },
  },
  created() {
    this.getCountries();
  },
  methods: {
    fileChanged(event) {
      console.log("File Changed");
      console.log(this.uploadFile);
      this.uploadFile = event.target.files[0]
    },
    selectItem(item) {
      this.findCountry = "";
      this.foundCountry = item;
      this.editCountry = item.country;
      this.editPopulation = item.population;
      this.editLeader = item.leader;
      this.editTitle = item.leaderTitle;
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/country/" + item._id);
        this.foundCountry = null;
        this.getCountries();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        if (!this.editChangedSVG)
        {
          await axios.put("/api/country/" + item._id, {
            country: this.editCountry,
            leader: this.editLeader,
            leaderTitle: this.editTitle,
            population: this.editPopulation,
          })
        } else {
          //reuploading svg, easiest to delete item again?
          this.deleteItem(item);
          this.uploadSVG(item, this.editFile)
        }
      } catch (error) {
        //console.log(error);
      }
    },
    async uploadSVG(item, file) {
      var reader = new FileReader();
      console.log(file);
      reader.onload = (event) => {
        console.log("On load called!");
        console.log(event.target.result);
        var parser = require('fast-xml-parser');
        const result = parser.parse(event.target.result, {
          attrNodeName: false,
          textNodeName: "#text",
          attributeNamePrefix: "-",
          arrayMode: "false",
          ignoreAttributes: false,
          parseAttributeValue: true,
        }, true);
        console.log(result);
        console.log(item.country);
        console.log(item.leader);
        try {
          var map = {
            country: item.country,
            leader: item.leader,
            leaderTitle: item.leaderTitle,
            population: item.population,
            regions:{
              g: {
              }
            }
          };
          var path = getNames(result.svg, 'path');
          map.regions.g.path = path;
          axios.post('/api/country', map);
          this.getCountries();
        } catch (error) {
          //console.log(error);
        }
      }
      reader.readAsText(file);
    },
    async upload() {
      var self = this;
      console.log("upload Called!");
      var item = {
        country: self.country,
        leader: self.leader,
        leaderTitle: self.title,
        population: self.population,
      };
      this.uploadSVG(item, this.uploadFile);
    },
    async getCountries() {
      try {
        let response = await axios.get("/api/country");
        console.log(response);
        this.countries = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>


<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>

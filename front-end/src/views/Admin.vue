<template>
<div class="admin">
  <h1>The Admin Page!</h1>
  <div class="heading">
    <div class="circle">1</div>
      <h2>Add an Item</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="country" placeholder="Country Name">
        <p></p>
        <input v-model="title" placeholder="Title">
        <p></p>
        <input v-model="leader" placeholder="Leader">
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
        <button @click="upload">Upload</button>
      </div>
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
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findItem">
        <input v-model="findItem.title">
        <p></p>
        <textarea v-model="findItem.description" placeholder="Missing Description"> </textarea>
        <p></p>
        <img :src="findItem.path" />
      </div>
      <div class="actions" v-if="findItem">
        <button @click="deleteItem(findItem)">Delete</button>
        <button @click="editItem(findItem)">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Admin',
  data() {
    return {
      country: "",
      population: 0,
      leader: "",
      title: "",
      file: null,
      addItem: null,
      countries: [],
      findTitle: "",
      findItem: null,
      map: ""
    }
  },
  computed: {
    suggestions() {
      //let countries = this.countries.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      //return countries.sort((a, b) => a.title > b.title);
      return "";
    }
  },
  created() {
    this.getCountries();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      let self = this;
      var reader = new FileReader();

      console.log(this.file);

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
        console.log(self.country);
        console.log(self.leader);
        try {
          axios.post('/api/country', {
            country: self.country,
            leader: self.leader,
            leaderTitle: self.title,
            population: self.population,
            regions: {
                g: result.svg.g,
              }
          });
        } catch (error)
        {
        console.log(error);
        }
      }
      reader.readAsText(this.file);
    },
    async getCountries() {
      try {
        let response = await axios.get("/api/country");
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

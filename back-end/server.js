const express = require('express');
const bodyParser = require("body-parser");


// Using multer to write to public images
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');


const schemaCountry = new mongoose.Schema({
  country: String,
  leader: String,
  leaderTitle: String,
  population: Number,
  regions: {
    g: {
      path: [{
        '-id': String,
        '-title': String,
        '-class': String,
        '-d': String, //Really, really long string.
      }]
    }
  }
});

const Country = mongoose.model('Country', schemaCountry);
// connect to the database
mongoose.connect('mongodb://localhost:27017/countries', {
  useNewUrlParser: true
});

app.post('/api/countrymap', upload.single('svg'), async (req, res) => {
  // Safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
})


//use multer middleware to wait for the upload
app.post('/api/country', async(req, res) => {
  // Safety check
  console.log("post /api/country called");
  var regions = req.body.regions;
  var path = regions.g;

  const country = new Country (
    req.body
    //country: req.body.country,
    //leader: req.body.leader,
    //leaderTitle: req.body.leaderTitle,
    //population: req.body.population,
    //regions: {
    //  g: {
    //    path: path
    //  }
  );
  try {
    var response = await country.save();
    res.send(country);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Pull the country from the database
app.get('/api/country/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    let country = await Country.findOne({
      _id: req.params.id,
    });
    console.log(country.regions.g);
    res.send(country);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// Get list of all countries
app.get('/api/country', async (req, res) => {
  try {
    console.log("get /api/country called");
    let countries = await Country.find();
    //console.log(countries);
    res.send(countries);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.delete('/api/country/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(2500, () => console.log('Server listening on port 3000!'));

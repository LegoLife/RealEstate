'use strict';
var express = require('express');
var router = express.Router();
var faker = require('faker');
//var searchImages = require('pixabay-api');
var pixabay = require('pixabay-api');
/* GET home page. */
var list = [];
pixabay.searchImages('8068846-d269499359616c95a54dd35ba', 'Home Exterior')
    .then(function (d) { getHousePhotos(d); });
var photos = [];

router.get('/', function (req, res) {
    list = getModel();
    res.render('index', {mod:list});
});

router.post('/homes/:id', function (req, res) {
    var id = req.params.id;
    var model = getHomebyId(id);
    
    res.render('popup', { mod: model });
    
});

function getModel() {
    var homeDataArr = [];
    
    for (var i = 0; i < 10; i++) {
        var price = faker.fake("{{commerce.price}}")*175;
        var mod = {
            id: i,
            City: faker.fake("{{address.city}}"),
            State: faker.fake("{{address.state}}"),
            Zip: faker.fake("{{address.zipCode}}"),
            Street: faker.fake("{{address.streetAddress}}"),
            Owner: faker.fake("{{name.firstName}} {{name.lastName}}"),
            Price: price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            DatePosted: faker.fake("{{date.recent}}"),
            AboutLong: faker.fake("{{lorem.paragraphs}}"),
            AboutShort: faker.fake("{{lorem.sentence}}"),         
            PhotoPath: "images/home" + i + ".jpg",
            BathRooms: faker.random.number(5),
            SquareFt: faker.random.number({ min: 500, max: 3500 })
    }
        homeDataArr.push(mod);
    }
    return homeDataArr;
}
function getHomebyId(id) {
    var i = {};
    var arr = [];
    list.forEach(function(item) {
        if (item.id == id) {
            i = item;
        }
    });

    photos.hits.forEach(function (ii) {
       arr.push(ii.webformatURL);
    });
   
    i.Photos = arr;

    return i;
}
function getHousePhotos(data) {
    photos = data;
}

module.exports = router;

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/upload_data', {
    useNewUrlParser: true
}); //mongodb connection 
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
});
app.use(bodyParser.json());
app.use(express.static('public')); //access file from public dir
app.use(bodyParser.urlencoded({
    extended: true
}));

//data model
var menuSchema = mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    email: String,
    type:String,
    Veg: Array,
    Desserts: Array,
    NonVeg: Array,
    item: String,
    price: String
});
var meenu = mongoose.model('meenu', menuSchema);
/*var parent = new Parent({ 
    name:'Franklin',
    address:'At-downtown,borivelli',
    phone:"6689367495",
    email:"abcert744@gmai.com",
    Vegetables: [{ item: 'Paneer',price:120 }, { item: 'Mushroom',price:140 }] 
   });*/
app.post('/uploadedd', function (req, res) {
    var p = req.body;
    var item = p.item;
    var price = p.price;
    var type = p.menu_type;
    
    if (type[0] == "V" || type[0] == "N" || type[0] == "D" || type[0] == "Veg" || type[0] == "NonVeg" || type[0] == "Desserts")
        type[0] = {
            item,
            price
        };
    else if (type[1] == "V" || type[1] == "N" || type[1] == "D" || type[1] == "Veg" || type[1] == "NonVeg" || type[1] == "Desserts")
        type[1] = {
            item,
            price
        };
    else if (type[2] == "V" || type[2] == "N" || type[2] == "D" ||type[2] == "Veg" || type[2] == "NonVeg" || type[2] == "Desserts")
        type[3] = {
            item,
            price
        };
    var newMenu = new meenu({
        name: p.resto_name,
        address: p.address,
        phone: p.resto_phone,
        email: p.resto_email,
        Veg: [type[0]],
        Desserts: [type[1]],
        NonVeg: [t3]
    });
    newMenu.save(function (err) {
        if (err)
            return handleError(err); //saved data!
    });
    console.log(type);
    console.log("Record inserted successfully.")
    return res.redirect('sign_up_success.html');
});

app.get('/', function (req, res) {
    res.render('form_menu.html');
}).listen(7000)

console.log("server listening at port 7000.");
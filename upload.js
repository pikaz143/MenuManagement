var express = require('express');
var bodyParser = require('body-parser');

const path = require('path');
// import Resto model
const Resto = require('./models/Resto');
const getMenus = require('./helper/getMenus');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/upload_data', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// need this to support unique in email
// mongoose.set('useCreateIndex', true);

var db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error'));
db.once('open', function(callback) {
  console.log('connection succeeded');
});

var app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// render the form -> temporary
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/form_menu.html'));
});

app.post('/uploaded', function(req, res) {
  var p = req.body;

  let menus;

  // if user send multiple menus
  if (Array.isArray(p.menu_type)) {
    menus = getMenus(p.menu_type, p.item, p.price);
  } else {
    let type = p.menu_type.toLowerCase();
    menus = { [type]: { item: p.item, price: p.price } };
  }

  // create an instance of Resto
  var resto = new Resto({
    name: p.resto_name,
    address: p.address,
    phone: p.resto_phone,
    email: p.resto_email,
    ...menus
  });

  //save to database
  resto.save(function(err, data) {
    if (err) return res.send({ error: err.message });

    // console.log(data);
    res.send(data);
  });

  //   return res.redirect('sign_up_success.html');
});

app
  .get('/', function(req, res) {
    res.render('form_menu.html');
  })
  .listen(4000);

console.log('server listening at port 4000.');

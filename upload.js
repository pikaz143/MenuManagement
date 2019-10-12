var express=require("express"); 
var bodyParser=require("body-parser"); 

const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/upload_data', {useNewUrlParser: true}); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("connection succeeded"); 
}) 

var app=express() ;
app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.set('views', './');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ 
	extended: true
})); 
app.set('view engine', 'html');
app.post('/uploaded',function(req,res){

var p=req.body;
var name=p.resto_name;
var address=p.address;
var phone=p.resto_phone;
var email=p.resto_email;
var type1=p.menu_type;
var type2=p.menu_type;
var type3=p.menu_type;
var item=p.item;
var price=p.item.price;
var data={
    "name":name,
    "address":address,
    "phone":phone,
    "email":email,
    "type1":type1 [{
        "item":item,
        "price":price
    }], 
    "type2":type2 [{
        "item":item,
        "price":price
    }], 
    "type3":type3 [{
        "item":item,
        "price":price
    }]
}
db.collection('user_data').insertOne(data,function(err, collection){ 
    if (err) throw err; 
    console.log("Record inserted Successfully"); 			
}); 
return res.redirect('sign_up_success.html'); 
})

app.get('/',function(req,res){
res.render('form_menu.html');
}).listen(4000);    

console.log("server listening at port 4000.");
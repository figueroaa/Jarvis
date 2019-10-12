// Inicialización Express
var express   = require('express');
var langfs = require('fs');
var app       = express();
const def     = require('./defglobal.js');

// configuración de la aplicación
app.set('views', def.Path.views);
app.set('view engine', 'pug');
app.use(express.static(def.Path.mimes));
app.use(express.static('../'));

//Definiciones globales

//----- soporte multilenguaje
const texts = {
  es : Lenguaje('es'),
  en : Lenguaje('en'),
  fr : Lenguaje('fr'),
  de : Lenguaje('de'),
  ch : Lenguaje('ch')
};
var selectedtext = texts.es;
// Rutas
app.get('/',function(req,res){ res.render('home',{params : {par1 : selectedtext , par2 : def.trans }})});
console.log(def.trans);
app.get('/es/',function(req,res){res.render('home',{params : {par1 : texts.es , par2 : def.trans }})});
app.get('/en/',function(req,res){res.render('home',{params : {par1 : texts.en , par2 : def.trans }})});
app.get('/fr/',function(req,res){res.render('home',{params : {par1 : texts.fr , par2 : def.trans }})});
app.get('/de/',function(req,res){res.render('home',{params : {par1 : texts.de , par2 : def.trans }})});
app.get('/ch/',function(req,res){res.render('home',{params : {par1 : texts.ch , par2 : def.trans }})});
app.get('/admin/langreload/',
         function(req,res){
           texts.es = Lenguaje('es');
           texts.de = Lenguaje('de');
           texts.en = Lenguaje('en');
           texts.ch = Lenguaje('ch');
           texts.fr = Lenguaje('fr');
           res.redirect('/')           
          }
        );
// Inicio de la aplicación
app.listen(3000, function () {
  console.log('Escuchando en el puerto 3000');
});

function Lenguaje(lang){
  console.log('este es el lenguage: '+lang);
    var myfile = '../lang/txt_'+lang;
    console.log('Leyendo: '+myfile);
    var rawdata  =  langfs.readFileSync( myfile );
    var jsdata = JSON.parse(rawdata);
    return jsdata;
};

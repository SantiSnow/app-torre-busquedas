var express = require('express');
var request = require('request'); 
const cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

/* CORS ENABLE */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
    app.options('*', (req, res) => { 
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});
/* CORS ENABLE */


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//rutas
app.get('/api/oportunities/:id', function(req, res){
    var id = req.params.id;
    request("https://torre.co/api/opportunities/" + id, function(err, body){
        res.send(body);
    });
});

app.get('/api/:username', function(req, res){
    var name = req.params.username;
    request("https://torre.bio/api/bios/" + name, function(err, body){
        res.send(body);
    });
});

app.post('/api/oportunities/:id', function(req, res){
    var id = req.params.id;
    
    request("https://search.torre.co/opportunities/_search/?" + id, function(err, body){
        res.send(body);
    });
});

app.post('/api/personas/:nombre', function(req, res){
    var id = req.params.nombre;
    request("https://search.torre.co/people/_search/?" + id, function(err, body){
        res.send(body);
    });
});


app.listen(3000);
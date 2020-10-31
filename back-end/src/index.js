var express = require('express');
var request = require('request'); 
const cors = require('cors');

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


//rutas
app.get('/', function (req, res) {
    res.json(
        { "Mensaje": "Bienvenido"}
    );
});

app.get('/user/:id', function (req, res) {
    res.json(
        { "Id": req.params.id}
    );
});



app.get('/api', function(req, res){
    request("https://bio.torre.co/api/bios/torrenegra", function(err, body){
        res.send(body);
    });
});

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

//get
//https://torre.co/api/opportunities/JWO8X4wQ
//https://torre.bio/api/bios/$username


/* post

 https://search.torre.co/opportunities/_search/?[offset=$offset&size=$size&aggregate=$aggregate] 

 https://search.torre.co/people/_search/?[offset=$offset&size=$size&aggregate=$aggregate]
 */

app.listen(3000);
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/products');
const keys = require('./config/keys');
const hb = require('./config/handlebars');
const app = express();

//set template engine
app.engine("hbs", hb);
app.set("view engine","hbs");


const PORT = process.env.PORT || 8090;

mongoose.connect(keys.mongoURI,
    {useNewUrlParser: true}    
).then(() => {
    console.log('Connection Succed !!');
},
error =>{
    console.log(`Connection Failed :( Error : ${error}`)
}
)
//make way for some custom css, js and images
app.use('/custom/css', express.static(__dirname + '/views/static/css'));
app.use('/custom/js', express.static(__dirname + '/views/static/js'));
app.use('/custom/imgs', express.static(__dirname + '/views/static/imgs'));

app.use(bodyParser.json()); // Cast the body response to retrieve just the info that we will be using

app.use('/api', routes);

app.use((err, req, res, next)=>{
    res.status(422).send({error: err.message});
})

//Home route
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`);
})
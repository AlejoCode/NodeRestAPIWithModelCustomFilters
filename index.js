const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/products');
const keys = require('./config/keys');

const app = express();

const PORT = 8080;

mongoose.connect(keys.mongoURI,
    {useNewUrlParser: true}    
).then(() => {
    console.log('Connection Succed !!');
},
error =>{
    console.log(`Connection Failed :( Error : ${error}`)
}
)

app.use(bodyParser.json()); // Cast the body response to retrieve just the info that we will be using

app.use('/api', routes);

app.use((err, req, res, next)=>{
    res.status(422).send({error: err.message});
})

app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`);
})
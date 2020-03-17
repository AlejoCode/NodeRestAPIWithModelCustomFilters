# NodeRestAPIWithModelCustomFilters

## DataBase Development Enviroment

Create a devCredentials.js file inside /config folder and put your data base connection string as follows:

  module.exports = {
    mongoURI: <Your_Connection_String>
  };
  
## DataBase Production Enviroment

The API is configured to be deployed in heroku you just have to save a enviroment variable inside your new heroku application called `MONGO_URI`with your connection string.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:8090/`.

Remember to add the two products using the endpoint // -> POST , CREATE ONE `http://localhost:8090//api/products`
They have to be named specific as below on the tafiffName so the consumption endpoint works properly:

  "tafiffName":"Packaged tariff",
  "annualCosts":800"

  "tafiffName":"basic electricity tariff",
  "annualCosts":60"
  
## Live Version 

 `https://alejo-code-api-verivox.herokuapp.com/`.

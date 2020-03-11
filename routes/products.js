const express = require('express');
const router = express.Router();
const ProductModel = require('../models/Product')

// -> POST , CREATE ONE
router.post('/products', (req, res, next) => {
    console.log("req.body");
    console.log(req.body);

    ProductModel.create(req.body).then((band) => {
        res.send(band);
    }).catch(next);
});

// -> GET / READ ALL
router.get('/products', (req, res, next) => {
    console.log("req.query.consumption");
    console.log((req.query.consumption));
    ProductModel.find({}).sort({annualCosts: -1}).then((products) => {
        if (req.query.consumption) {
            let answer = [];
            products.forEach(product => {
                if (product.tafiffName == "basic electricity tariff") {
                    console.log("entered basic : " + (product.annualCosts + (req.query.consumption * 0.22)))
                    answer.push({
                        "_id": product._id,
                        "tariff": "basic electricity tariff",
                        "annualCosts": product.annualCosts,
                        "consumption": (product.annualCosts + (req.query.consumption * 0.22))
                    })
                } else if (product.tafiffName == "Packaged tariff") {
                    if (req.query.consumption <= 4000) {
                        answer.push({
                            "_id": product._id,
                            "tariff": "Packaged tariff",
                            "annualCosts": product.annualCosts,
                            "consumption": product.annualCosts
                        })
                    } else {
                        answer.push({
                            "_id": product._id,
                            "tariff": "Packaged tariff",
                            "annualCosts": product.annualCosts,
                            "consumption": product.annualCosts + ((req.query.consumption - 4000) * 0.3)
                        })
                    }

                }
            });
            res.send(answer);
        } else {

            res.send(products);
        }
    }).catch(next);
});

// -> GET / READ ONE
router.get('/products/:id', (req, res, next) => {
    ProductModel.findById({ _id: req.params.id }, req.body).then(() => {
        ProductModel.findOne({ _id: req.params.id }).then((band) => {
            res.send(band);
        })
    }).catch(next);
});

// -> PUT / UPDATE ONE
router.put('/products/:id', (req, res, next) => {
    ProductModel.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        ProductModel.findOne({ _id: req.params.id }).then((band) => {
            res.send(band);
        })
    }).catch(next);
});

// -> DELETE ONE
router.delete('/products/:id', (req, res, next) => {
    ProductModel.findOneAndRemove({ _id: req.params.id }).then((band) => {
        res.send(band);
    }).catch(next);
})

module.exports = router;
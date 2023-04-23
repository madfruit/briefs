const Brief = require("../models/brief");
const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('form.ejs', { renderMessage: false });
});

router.post('/', async (req, res) => {
    try {
        await Brief.create({...req.body});
        res.render('form.ejs', { renderMessage: true, success: true});
    } catch(err) {
        console.log(err);
        res.render('form.ejs', { renderMessage: true, success: false });
    }
});

module.exports = router;

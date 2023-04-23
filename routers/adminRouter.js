const Brief = require("../models/brief");
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Admin = require("../models/admin");

router.get('/', async (req, res) => {
    const token = req.cookies.auth;
    if(!token) {
        return res.render('login.ejs', { renderErrorMessage: false });
    }
    try {
        const { id } = jwt.verify(token, 'some secret');
        if(!id) {
            return res.render('login.ejs', { renderErrorMessage: false });
        }
        const user = await Admin.findById(id).lean();
        if(!user) {
            return res.render('login.ejs', { renderErrorMessage: true });
        }
        const briefs = await Brief.find({}).lean();
        return res.render('admin.ejs', { briefs, user });
    } catch (err) {
        console.log(err);
        return res.render('login.ejs', { renderErrorMessage: true });
    }
});

router.post('/login', async (req, res) => {
    const { login, password } = req.body;
    const user = await Admin.findOne({ login }).lean();
    if(user) {
        if(user.password !== password) {
            return res.status(403).render('login.ejs', {renderErrorMessage: true});
        }
        const briefs = await Brief.find({}).lean();
        const id = user._id.toString();
        const token = await jwt.sign({id}, 'some secret');
        res.cookie('auth', token);
        return res.render('admin.ejs', { briefs, user });
    }
    return res.status(403).render('login.ejs', { renderErrorMessage: true });
});

router.get('logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/form');
});

module.exports = router;

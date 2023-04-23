const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BriefSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    companyName: {type: String, required: true},
    aboutCompany: {type: String, required: true},
    enemies: {type: String, required: true},
    targetAudience: {type: String, required: true},
    structure: {type: String, required: true},
    mobileVersion: {type: String, required: true},
    keywords: {type: String, required: true},
    colorsLike: {type: String, required: true},
    colorsDislike: {type: String, required: true},
    integrations: {type: String, required: true},
    time: {type: Number, required: true},
    devBudget: {type: Number, required: true},
    promotionBudget: {type: Number, required: true}
});

const Brief = new mongoose.model('Brief', BriefSchema);

module.exports = Brief

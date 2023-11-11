const mongoose = require('mongoose');

const ReactFormDataSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    userLatitude: {
        type: String,
        required: true
    },
    userLongitude: {
        type: String,
        required: true
    }
});

const FormData = mongoose.model('FormData', ReactFormDataSchema);
module.exports = FormData;
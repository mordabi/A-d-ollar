"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let participateScheama = new mongoose_1.Schema({
    kopon: {
        type: Number,
        required: true
    },
    winner: Boolean,
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});
participateScheama.path('kopon').validate(function (kopon) {
    if (!kopon)
        return false;
    return true;
}, 'kopon cant be null');
exports.default = mongoose_1.model('Participate', participateScheama);

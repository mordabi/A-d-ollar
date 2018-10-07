"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require("bcryptjs");
const SLAT_WORK_FACTOR = 10;
let users = new mongoose_1.Schema({
    name: { type: String, min: 3, required: true, match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
    email: { type: String, required: true, unique: true, match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'is invalid'], index: true },
    password: { type: String, required: true, min: 5, max: 15 },
    gender: { tpye: String, default: '' },
    age: { type: Number, default: null },
});
users.methods.check = function (A) {
    this.name += A;
    console.log(this.password);
};
users.methods.encPassword = function () {
    const pass = new Promise((resolve, reject) => {
        if (!this.isModified('password'))
            return resolve(null);
        if (!this.password)
            return reject('password undefind');
        bcrypt.hash(this.password, SLAT_WORK_FACTOR, function (err, hash) {
            if (err)
                return reject(err);
            // console.log(hash);
            return resolve(hash);
        });
    });
    return pass;
};
users.methods.ValidatePassword = function (ClearPassword, cb) {
    bcrypt.compare(ClearPassword, this.password, function (err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};
exports.default = mongoose_1.model('Users', users);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
const userRules = {
    forRegister: [
        check_1.check('email')
            .isEmail().withMessage('Invalid email format'),
        //.custom(email => Users.find({ where: { email } }).then(u => {if (u) return false})).withMessage('Email exists'),
        // check('password')
        //  .isLength({ min: 8 }).withMessage('Invalid password min 8'),
        check_1.check('name')
            .isLength({ min: 3, max: 15 }).withMessage('min 3 max 15')
    ]
};
exports.default = userRules;

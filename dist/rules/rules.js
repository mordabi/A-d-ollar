"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
const users_1 = require("../models/users");
const userRules = {
    forRegister: [
        check_1.check('email')
            .isEmail().withMessage('Invalid email format')
            .custom(email => { return users_1.default.find({ email: email }).then(u => { return u.length == 0; }); }).withMessage('email already exist'),
        check_1.check('password')
            .isLength({ min: 8 }).withMessage('Invalid password min 8'),
        check_1.check('name')
            .isLength({ min: 3, max: 15 }).withMessage('min 3 max 15')
    ],
    isNew: Boolean,
    forupdate: [
        check_1.check('email')
            .isEmail().withMessage('Invalid email format')
            .custom(email => { return users_1.default.find({ email: email }).then(u => { return u.length; }); }).withMessage('email does not exist'),
        check_1.check('password')
            .isLength({ min: 8 }).withMessage('Invalid password min 8'),
        check_1.check('name')
            .isLength({ min: 3, max: 15 }).withMessage('min 3 max 15'),
        check_1.check('newMail')
            .custom(value => {
            if (value) {
                return check_1.check('newMail').isEmail().withMessage('Invalid emil format');
            }
        })
    ]
};
exports.default = userRules;

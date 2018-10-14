"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../models/users");
const check_1 = require("express-validator/check");
const rules_1 = require("../rules/rules");
//const Useres = require('../data');
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
        this.init();
    }
    init() {
    }
    GetAllUsers(req, res) {
        users_1.default.find({}).then((data) => {
            res.status(200).json({
                Data: data,
            });
        })
            .catch((err) => {
            const status = res.statusCode;
            res.json({
                Status: status,
                err: err
            });
        });
    }
    GetUsersById(req, res) {
        const email = req.params.email;
        users_1.default.findOne({ email: email }).then((data) => {
            if (!data) {
                res.status(404).json({
                    err: 'does not exist'
                });
            }
            else {
                res.status(200).json({
                    Data: data,
                });
            }
        })
            .catch((err) => {
            const status = res.statusCode;
            res.json({
                Status: status,
                err: err
            });
        });
    }
    CreateUser(req, res, next) {
        const errors = check_1.validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json(errors.array());
        var name = req.body.name;
        var gender = req.body.gender;
        var email = req.body.email;
        var password = req.body.password;
        var age = req.body.age;
        var user = new users_1.default({
            name: name,
            gender: gender,
            email: email,
            password: password,
            age: age
        });
        user.check('a');
        let Pass = user.encPassword();
        Pass.then(function (hash) {
            if (hash)
                user.password = hash;
            user.save().then((data) => {
                console.log(user.password);
                res.status(res.statusCode).json({
                    Data: data,
                    status: res.statusCode
                });
            }).catch((err) => {
                const status = res.statusCode;
                // res.json({
                //     Status:status,
                //     err:err
                //})
                err.status = res.statusCode;
                next(err);
            });
        }).catch(err => { console.log(err); });
    }
    DeleteUser(req, res) {
        const email = req.params.email;
        const status = res.statusCode;
        users_1.default.findOneAndRemove(email, (err, removed) => {
            if (err) {
                return res.json({ status });
            }
            res.json({
                status,
                removed
            });
        });
    }
    UpdateUser(req, res) {
        const errors = check_1.validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json(errors.array());
        var email = req.params.email;
        var user = new users_1.default(req.body);
        console.log(user);
        if (!user)
            return res.status(501).json({ err: 'undefined' });
        let Pass = user.encPassword();
        Pass.then(function (hash) {
            if (hash)
                user.password = hash;
            users_1.default.findOne({ email: email }).exec((err, result) => {
                user._id = result._id;
                if (err || !result) {
                    return res.status(res.statusCode).json({
                        Err: err
                    });
                }
                users_1.default.findOneAndUpdate({ email: email }, user, { new: true }).then((data) => {
                    return res.status(res.statusCode).json({
                        Data: data
                    });
                }).catch(err => {
                    return res.status(res.statusCode).json({
                        Err: err
                    });
                });
            });
        }).catch(err => res.status(404).json({ Err: err }));
    }
    routes() {
        this.router.get('/', this.GetAllUsers);
        this.router.get('/:email', this.GetUsersById);
        this.router.post('/newUser', rules_1.default['forRegister'], this.CreateUser);
        this.router.put('/:email', rules_1.default['forupdate'], this.UpdateUser);
        this.router.delete('/:email', this.DeleteUser);
    }
}
const routes = new UserRoutes();
routes.routes();
//routes.init();
exports.default = routes.router;

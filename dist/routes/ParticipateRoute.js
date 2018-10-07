"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Participate_1 = require("../models/Participate");
//const Participatees = require('../data');
class ParticipateRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
        this.init();
    }
    init() {
    }
    GetAllParticipate(req, res) {
        Participate_1.default.find({}).then((data) => {
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
    GetParticipateById(req, res) {
        const id = req.params.id;
        Participate_1.default.findById(id).then((data) => {
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
    CreateParticipate(req, res, next) {
        const newParticipate = req.body.Participate;
        if (!newParticipate || !newParticipate.kopon || !newParticipate.userId)
            return res.status(401).json({ err: 'cant be empty' });
        Participate_1.default.create(newParticipate).then((data) => {
        }).catch(err => {
            const status = res.statusCode;
            res.json({
                Status: status,
                err: err
            });
        });
    }
    DeleteParticipate(req, res) {
        const id = req.params.id;
        const status = res.statusCode;
        Participate_1.default.findByIdAndRemove(id, (err, removed) => {
            if (err) {
                return res.json({ status });
            }
            res.json({
                status,
                removed
            });
        });
    }
    UpdateParticipate(req, res) {
        var id = req.params.id;
        var Participate = req.body.Participate;
        Participate.findByIdAndUpdate(id, Participate, { new: true }).exec((err, result) => {
            if (err) {
                return res.status(res.statusCode).json({
                    Err: err
                });
            }
            res.json({
                Status: res.statusCode,
                Upate: result
            });
        });
    }
    routes() {
        this.router.get('/', this.GetAllParticipate);
        this.router.get('/:id', this.GetParticipateById);
        this.router.post('/newParticipate', this.CreateParticipate);
        this.router.put('/:id', this.UpdateParticipate);
        this.router.delete('/:id', this.DeleteParticipate);
    }
}
const routes = new ParticipateRoutes();
routes.routes();
//routes.init();
exports.default = routes.router;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Tashqi Model
const express_1 = require("express");
const lodash_1 = __importDefault(require("lodash"));
const cors_1 = __importDefault(require("cors"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Ichki Model
const db_1 = require("../db/db");
const Schemadb = __importStar(require("../Schema/schema"));
const router = express_1.Router();
var corsOptions = {
    origin: '*',
    methods: "GET,PUT,POST,DELETE",
    optionsSuccessStatus: 200
};
// GET
router.get('/', cors_1.default(corsOptions), (req, res) => {
    res.status(200).render('index');
});
router.get('/login', cors_1.default(corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).render('login');
}));
router.get('/users', cors_1.default(corsOptions), (req, res) => {
    res.status(200).render('users');
});
router.get('/messages', cors_1.default(corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield db_1.Users.findOne({ username: req.query.username }).select({ password: 1 });
    try {
        if (req.query.message) {
            req.query.author = user._id;
            const message = new db_1.Messages(lodash_1.default.pick(req.query, ['message', 'author']));
            yield message.save();
            const messages = yield db_1.Messages.find().populate('author');
            res.status(200).render('messages', { messages, name: req.query.username, pass: req.query.password });
        }
        else {
            const bcr = yield bcrypt.compare(req.query.password, user.password);
            if (bcr) {
                const token = jwt.sign({ _id: user._id }, process.env.jwtKey);
                const messages = yield db_1.Messages.find().populate('author');
                res.status(200).header({ 'X-Auth-Token': token }).render('messages', { messages, name: req.query.username, pass: req.query.password });
            }
            else {
                res.status(400).json({ Type: false, Error: `Username yoke password hato` });
            }
        }
    }
    catch (err) {
        res.status(400).json({ Type: false, Error: `Username yoke password hato \n ${err}` });
    }
}));
// POST
router.post('/users', cors_1.default(corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Schemadb.UserSchema.validate(lodash_1.default.pick(req.body, ['username', 'email', 'password']));
    if (result.error) {
        console.log(result.error);
        res.json(result.error.details[0].message);
    }
    else {
        try {
            const Salt = yield bcrypt.genSalt();
            req.body.password = yield bcrypt.hash(req.body.password, Salt);
            const user = new db_1.Users(lodash_1.default.pick(req.body, ['username', 'email', 'password']));
            yield user.save();
            res.redirect('/login');
        }
        catch (err) {
            res.status(400).json({ Type: false, Error: 'Bu Foydalanuvchi ro\'yhatdan o\'tgan' });
        }
    }
}));
//router.post('/messages',cors(corsOptions),async (req:Request,res:Response)=>{
//    res.render('messages')
//});
exports.default = router;

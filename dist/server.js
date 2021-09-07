"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Tashqi Model
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose = require('mongoose');
const dotenv_1 = __importDefault(require("dotenv"));
// Ichki Model
const router_1 = __importDefault(require("./routers/router"));
const prod_1 = __importDefault(require("./production/prod"));
const app = express_1.default();
dotenv_1.default.config();
mongoose.connect(process.env.URL)
    .then(() => console.log("Ulandi db..."))
    .catch((err) => console.log(`Xato Ro'yberdi db ${err}`));
prod_1.default(app);
if (app.get('env') === 'development') {
    app.use(morgan_1.default('tiny'));
}
app.set('view engine', 'hbs');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', router_1.default);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server Ishga tushdi ${PORT}...`));

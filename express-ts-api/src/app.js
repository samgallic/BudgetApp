"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var userRoutes_1 = require("./routes/userRoutes");
var db_1 = require("./config/db");
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
// Connect to MongoDB
(0, db_1.default)();
app.use(body_parser_1.default.json());
app.use('/api/users', userRoutes_1.default);
app.listen(port, function () {
    console.log("Server running on port ".concat(port));
});

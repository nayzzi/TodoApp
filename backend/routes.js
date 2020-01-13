const express = require('express');
const TodoRoutes = require('./Todo/Todo.Routes');
const Routes = express.Router();

Routes.use('/todo/',TodoRoutes);

module.exports = Routes;
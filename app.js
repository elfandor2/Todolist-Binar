const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const userRouter = require('./routers/users.router');
const listRouter = require('./routers/lists.router');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(bodyParser.json({ extended: true }));

const uri = "mongodb+srv://elfandor2:12345@cluster0.ahsnmyw.mongodb.net/todolistDB?retryWrites=true&w=majority";
mongoose.connect(uri);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todolist Project',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'https://localhost:3000/'
      }
    ]
  },
  apis: ['./app.js']
}

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 * get:
 *    summary: This api is used to check if get method is working or not
 *    description: This api is used to check if get method is wokring or not
 *    responses:
 *      200:
 *          description: To test Get Method
 */

app.use('/v1', userRouter)
app.use('/v1', listRouter)


app.listen(3000, function () {
  console.log("Server started on port 3000");
});

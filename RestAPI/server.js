const express = require("express");
const app = express();
const mongoose = require("mongoose");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

mongoose.connect("mongodb://localhost/employees", {useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", (error)=> console.error(error));
db.once("open", ()=>console.log("Connected with Database"));

const options ={
    definition: {
        openapi: "3.0.0",
    info:{
        title: "RestAPI",
        version: "1.1",
        description: " Testowe API "
    },
    servers:[
    {
        url: "http://localhost:8080"
    }
    ],
},
    apis:["./routes/*.js"],
};

const spec = swaggerJSDoc(options);

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(spec));

const employeesRouter = require("./routes/employees");
app.use("/employees", employeesRouter);

app.listen(8080, () => console.log("Server Started"));


const express = require("express")
const predictsRouter = require("./router/predictsRouter")

const app = express()

app.use(predictsRouter)

module.exports = app;
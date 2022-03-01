const express = require('express')
const consign = require('consign')
const bodyParser = require("body-parser")
const handleError = require('../app/errors/Handler')
const { AcceptFormats, SerializeError } = require('../app/infra/serializer')
const RequestError = require('../app/errors/406-bad-request')

module.exports = () => {
    const app = express()
    
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    
    app.use((request, response, middleware) => {
        let format = request.header('Accept');
        if (format === "*/*") format = "application/json";

        if (AcceptFormats.indexOf(format) === -1) {
            throw new RequestError(format)
        }

        response.setHeader("Content-Type", format)
        middleware()
    })

    consign().include("src/app/controllers").into(app)

    app.use((err, request, response, middleware) => {
        let status = handleError(err)

        const serializer = new SerializeError(response.getHeader("Content-Type"))
        response.status(status).send(serializer.exec({message: err.message, idError: err.idError})) //json({})
    })

    return app;
}
const Service = require("../models/atendimento.js")

module.exports = app => {
    app.get("/atendimento", (req, res) => Service.list(res))
    app.get("/atendimento/:id", (req, res) => Service.search(Number(req.params.id), res))
    app.post("/atendimento", (req, res) => Service.add(req.body, res))
}
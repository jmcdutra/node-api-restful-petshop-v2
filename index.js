const app = require("./src/config/custom-express.js")()
const connection = require("./src/app/infra/connection.js")
const Providers = require("./src/app/infra/models/providers/table.js")
const config = require("./src/config/config.js")
const colors = require("colors")

connection.authenticate().then(() => {
    console.log(colors.green("Conexão estabelicida com sucesso (MySQL)"))
    
    app.listen(config.server.port, () => {
        console.log(colors.blue("Servidor rodando na porta " + config.server.port))
        Providers.init()
    })
}).catch(err => console.error(colors.yellow('Não foi possível conectar-se a database'), colors.red(err) ))
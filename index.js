const app = require("./src/config/custom-express.js")()
const connection = require("./src/app/infra/connection.js")
const tables = require("./src/app/infra/tables.js")

connection.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("Conexão mysql2 estabelecida com sucesso!")

        tables.init(connection)
        app.listen(3000, () => console.log(`Servidor rodando na porta 3000!`))
    }
})


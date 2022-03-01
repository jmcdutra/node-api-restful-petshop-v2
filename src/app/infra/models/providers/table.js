const colors = require("colors")
const ModelProviders = require("./instance.js")
const NotFound = require("../../../errors/404-not-found.js")

class Table {
    init() {
        ModelProviders.sync().then( () => console.log(colors.green("Tabela providers carregada com sucesso"))).catch((error) => console.log(colors.red(error)))
    }

    list() {
        return ModelProviders.findAll({raw: true})
    }

    insert(_provider) {
        return ModelProviders.create(_provider)
    }

    async search(id) {
        const result = await ModelProviders.findOne({
            where: {id: id}
        })

        if (!result) {
            throw new NotFound()
        }

        return result
    }

    update(id, data) {
        return ModelProviders.update(data, {where: {id: id}})
    }

    remove(id) {
        return ModelProviders.destroy({where: {id: id}})
    }
}

module.exports = new Table
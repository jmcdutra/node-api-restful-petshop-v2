const Sequelize = require("sequelize")
const instance = require("../../connection.js")

const columns = {
    empresa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.ENUM("ração", "brinquedos", "petiscos"),
        allowNull: false
    }
}

const options = {
    freezeTableName: true,
    tableName: "fornecedores",
    timestamps: true,
}

module.exports = instance.define("fornecedor", columns, options)
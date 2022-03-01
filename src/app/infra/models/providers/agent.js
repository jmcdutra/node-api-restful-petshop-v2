const EmptyError = require("../../../errors/400-empty-fields.js")
const FieldError = require("../../../errors/400-invalid-fields.js")
const Table = require("./table.js")

class Provider {
    constructor({id, empresa, email, categoria, createdAt, updatedAt, version}) {
        this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.version = version
    }

    async create () {
        this.validate()

        const result = await Table.insert({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria,
        })

        this.id = result.id
        this.createdAt = result.createdAt
        this.updatedAt = result.updatedAt
    }

    async get() {
        const provider = await Table.search(this.id)
        this.empresa = provider.empresa
        this.categoria = provider.categoria
        this.email = provider.email
        this.categoria = provider.categoria
        this.createdAt = provider.createdAt
        this.updatedAt = provider.updatedAt
        this.version = provider.version
    }

    async update() {
        await Table.search(this.id)
        const fields = ["empresa", "email", "categoria"]
        const data_update = {}

        fields.forEach((field) => {
            const value = this[field]
            if (typeof value === "string" && value.length > 0) {
                data_update[field] = value
            }
        })

        if (Object.keys(data_update).length === 0) {
            throw new EmptyError()
        }

        await Table.update(this.id, data_update)
    }

    delete() {
        return Table.remove(this.id)
    }

    validate() {
        const fields = ['empresa', 'email', 'categoria']

        fields.forEach(field => {
            const value = this[field]

            if (typeof value !== "string" || value.length === 0) {
                throw new FieldError(field)
            }
        })
    }
}

module.exports = Provider
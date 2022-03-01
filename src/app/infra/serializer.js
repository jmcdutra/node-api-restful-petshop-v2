const jsontoxml = require("jsontoxml")
const RequestError = require("../errors/406-bad-request");

class Serializer {
    json (data) {
        return JSON.stringify(data)
    }

    xml (data) {
        let tag = this.tagSingular

        if (Array.isArray(data)) {
            tag = this.tagPlural
            data = data.map(item => { return {[this.tagPlural]: item} })
        }

        return jsontoxml({[tag]: data})
    }

    exec(data) {
        data = this.filter(data)

        if (this.contentType === "application/json") return this.json(data)
        if (this.contentType === "application/xml") return this.xml(data)

        throw new RequestError(this.contentType)
    }

    filterObject(object) {
        const result = new Object()
        this.publicFields.forEach(field => {
            if (object.hasOwnProperty(field)) {
                result[field] = object[field]
            }
        })
        return result
    }

    filter(data) {
        if (Array.isArray(data)) {
            data = data.map(object => this.filterObject(object))
        } else {
            data = this.filterObject(data)
        }
        return data;
    }
}

class SerializeProviders extends Serializer {
    constructor(contentType, extraFields) {
        super()
        this.contentType = contentType
        this.publicFields = ["id", "empresa", "categoria"].concat(extraFields || [])
        this.tagSingular = "fornecedor"
        this.tagPlural = "fornecedores"
    }
}

class SerializeError extends Serializer {
    constructor(contentType, extraFields) {
        super()
        this.contentType = contentType
        this.publicFields = ["message", "idError"].concat(extraFields || [])
        this.tag = "erro"
    }
}

module.exports = {
    Serializer: Serializer,
    SerializeProviders: SerializeProviders,
    SerializeError: SerializeError,
    "AcceptFormats": ["application/json", "application/xml"]
}
const Provider = require('../infra/models/providers/agent.js')
const Table = require('../infra/models/providers/table.js')
const { SerializeProviders } = require('../infra/serializer.js')

module.exports = app => {
    app.get("/api/fornecedores", async (request, response) => {
        const results = await Table.list()
        const serializer = new SerializeProviders(response.getHeader("Content-Type"))
        response.status(200).send(serializer.exec(results))
    })

    app.get("/api/fornecedores/:id", async (request, response, middleware) => {
        try {
            const id = request.params.id
            const provider = new Provider({id: id})
            await provider.get()
    
            const serializer = new SerializeProviders(response.getHeader("Content-Type"), ["email", "createdAt", "updatedAt"])
            response.status(200).send(serializer.exec(provider))
        } catch (err) {
            middleware(err)
        }
    })

    app.put("/api/fornecedores/:id", async (request, response, middleware) => {
        try {
            const id = request.params.id
            const data = Object.assign({}, request.body, {id: id})
            const provider = new Provider(data)
    
            await provider.update()
    
            response.status(204).end()
        } catch (err) {
            middleware(err)
        }
    })

    app.post("/api/fornecedores", async (request, response, middleware) => {
        try {
            const provider = new Provider(request.body)
            await provider.create()
    
            const serializer = new SerializeProviders(response.getHeader("Content-Type"))
            response.status(200).send(serializer.exec(provider))
        } catch(err) {
            middleware(err)
        }
    })

    app.delete("/api/fornecedores/:id", async (request, response, middleware) => {
        try {
            const id = request.params.id
            const provider = new Provider({id: id})
            await provider.get()
            await provider.delete()
            response.status(204).end()
        } catch(err) {
            middleware(err)
        }
    })
}
const connection = require("../infra/connection.js")
const moment = require("moment")
const res = require("express/lib/response")

class Service {
    add (_service, response) {
        const dateCreation = moment().format('YYYY-MM-DD HH:mm:ss')
        const date = moment(_service.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

        const validate_date = moment(date).isSameOrAfter(dateCreation)
        const validate_customer = _service.customer.length >= 3

        const validations = [
            {name: "date", message: "Data deve ser válida ou maior que a data atual", valid: validate_date},
            {name: "customer", message: "O cliente deve ter pelo menos 05 caracteres", valid: validate_customer},
        ] 

        const errors = validations.filter(field => !field.valid)
        const isError = errors.length

        if (isError) {
            response.status(400).json(errors)
        } else {
            const serviceDated = {..._service, dateCreation, date}
            const query = "INSERT INTO services SET ?"
    
            connection.query(query, serviceDated, (error, result) => {
                if (error) {
                    response.status(400).json(error)
                } else {
                    response.status(201).json(_service)
                }
            })
        }
    }

    list (response) {
        const query = "SELECT * FROM services"

        connection.query(query, (error, results) => {
            if (error) {
                response.status(400).json(error)
            } else {
                response.status(200).json(results)
            }
        })
    }

    search(id, response) {
        const query = `SELECT * FROM services WHERE ID = ${id}`

        connection.query(query, (error, results) => {
            if (error) {
                response.status(400).json(error)
            } else {
                response.status(200).json(results[0])
            }
        })
    }

    alter(id, values, response) {
        if (values.date) {
            values.date = moment(values.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }
        const query = "UPDATE services SET ? WHERE ID = ?"

        connection.query(query, [values, id], (error, results) => {
            if (error) {
                response.status(400).json(error)
            } else {
                response.status(200).json({id, ...values})
            }
        })
    }

    delete(id, response) {
        const query = "DELETE FROM services WHERE id = ?"

        connection.query(query, id, (error, results) => {
            if (error) {
                response.status(400).json(error)
            } else {
                response.status(200).json({id: id, message: "Cliente removido com sucesso"})
            }
        })
    }
}

module.exports = new Service
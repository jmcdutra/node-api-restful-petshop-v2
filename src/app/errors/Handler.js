const NotFound = require("./404-not-found.js")
const EmptyError = require("./400-empty-fields.js")
const FieldError = require("./400-invalid-fields.js")
const RequestError = require("./406-bad-request.js")

function handleError(err) {
    let status = 500

    if (err instanceof NotFound) status = 404;
    if (err instanceof EmptyError || err instanceof FieldError) status = 400;
    if (err instanceof RequestError) status = 406;

    return status
}

module.exports = handleError
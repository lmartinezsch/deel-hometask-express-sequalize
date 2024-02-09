class ProfileNotFoundError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
        this.statusCode = 404
    }
}

class DepositAmountExceedsLimitError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
        this.statusCode = 400
    }
}

module.exports = {ProfileNotFoundError, DepositAmountExceedsLimitError}
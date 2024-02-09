class NotFoundError extends Error {
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

class UserIsNotClientError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
        this.statusCode = 400
    }
}

class JobAlreadyPaidError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
        this.statusCode = 400
    }
}

class InsufficientBalanceError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
        this.statusCode = 400
    }
}

module.exports = {
    NotFoundError,
    DepositAmountExceedsLimitError,
    UserIsNotClientError,
    JobAlreadyPaidError,
    InsufficientBalanceError,
}
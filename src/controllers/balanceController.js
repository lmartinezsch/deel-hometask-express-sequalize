const {DepositAmountExceedsLimitError, NotFoundError} = require("../errors/errors")

class BalanceController {

    constructor(balanceService) {
        this.balanceService = balanceService
    }

    deposit = async (req, res) => {
        const {userId} = req.params
        const {amount} = req.body

        try {
            await this.balanceService.depositMoney(userId, amount)
            res.status(204).json()
        } catch (error) {
            console.error('Error to deposit:', error)
            if (error instanceof NotFoundError) {
                res.status(error.statusCode).json({error: error.message})
            } else if (error instanceof DepositAmountExceedsLimitError) {
                res.status(error.statusCode).json({error: error.message})
            } else {
                console.error(error)
                res.status(500).json({error: 'Internal server error'})
            }
        }
    }
}

module.exports = BalanceController
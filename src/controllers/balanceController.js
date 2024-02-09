class BalanceController {

    constructor(balanceService) {
        this.balanceService = balanceService
    }

    deposit = async (req, res) => {
        console.log("balance controller")

        const {userId} = req.params
        const {amount} = req.body

        try {
            await this.balanceService.depositMoney(userId, amount)
            res.status(204).json();
        } catch (error) {
            console.error('Error to deposit:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    }
}

module.exports = BalanceController
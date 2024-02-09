const {Profile} = require("../model")
const {DepositAmountExceedsLimitError, NotFoundError} = require("../errors/errors")

class BalanceService {

    constructor(jobRepository) {
        this.jobRepository = jobRepository
    }

    depositMoney = async (clientId, amount) => {

        try {
            const profile = await Profile.findByPk(clientId)
            if (!profile) {
                throw new NotFoundError('Profile not found')
            }

            await this.checkContracts(profile, amount)
            await this.updateBalance(profile, amount)
        } catch (error) {
            throw error
        }
    }

    checkContracts = async (profile, amount) => {
        const totalJobPrices = await this.jobRepository.getTotalJobPricesForProfile(profile)
        const newBalance = profile.balance + amount
        const twentyFivePercent = totalJobPrices * 0.25

        if (newBalance > twentyFivePercent) {
            throw new DepositAmountExceedsLimitError('The deposit amount exceeds 25% of the total job prices')
        }
    }

    updateBalance = async (profile, amount) => {
        profile.balance += amount
        await profile.save()
    }
}

module.exports = BalanceService
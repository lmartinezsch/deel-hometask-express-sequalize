const {Job, Contract} = require('../model')
const {Op} = require("sequelize")
const {ContractStatusEnum} = require("../utils/utils.enum")

class JobRepository {

    findAllUnpaidByUser = async (userId) => {
        return Job.findAll({
            where: {
                paid: null,
                '$Contract.ClientId$': userId,
                '$Contract.status$': ContractStatusEnum.IN_PROGRESS
            },
            include: [{
                model: Contract,
                required: true,
                attributes: [],
            }]
        })
    }

    getTotalJobPricesForProfile = (profile) => {
        return Job.sum('price', {
            include: [{
                model: Contract,
                where: {ClientId: profile.id}
            }]
        })
    }
}

module.exports = JobRepository

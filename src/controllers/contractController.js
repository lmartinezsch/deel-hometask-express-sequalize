const {Contract} = require("../model")
const {Op} = require("sequelize")
const {ContractStatusEnum} = require("../utils/utils.enum")

class ContractController {
    constructor(contractService) {
        this.contractService = contractService
    }

    /**
     * @returns contract by id
     */
    getContractById = async (req, res) => {
        const {id} = req.params
        const clientId = req.profile.id

        try {
            const contract = await this.contractService.getContractsById(id, clientId)
            if (!contract) return res.status(404).end()
            res.json(contract)
        } catch (error) {
            console.error('Error to get specific contract:', error)
            res.status(500).json({error: error.message})
        }
    }

    /**
     * @returns all constracts by cliendId and status not equal to terminated
     */
    getAllContracts = async (req, res) => {
        const {id, type} = req.profile
        const status = {[Op.ne]: ContractStatusEnum.TERMINATED}
        try {
            const contracts = await this.contractService.getContractsBy(id, type, status)

            res.json(contracts)
        } catch (error) {
            console.error('Error to get contracts:', error)
            res.status(500).json({error: 'Internal server error'})
        }
    }

}


module.exports = ContractController
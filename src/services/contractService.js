const {Contract} = require("../model");
const {ProfileTypesEnum} = require("../utils/utils.enum");

class ContractService {
    getContractsById = async (id, clientId) => {
        const contract = await Contract.findOne({where: {id, 'ClientId': clientId}})
        if (!contract) throw new Error('Contract not found')

        return contract
    }

    getContractsBy = async (userId, type, status) => {
        if (type === ProfileTypesEnum.CLIENT) {
            return Contract.findAll({
                where: {
                    'ClientId': userId,
                    'status': status,
                }
            });
        } else if (type === ProfileTypesEnum.CONTRACTOR) {
            return Contract.findAll({
                where: {
                    'ContractorId': userId,
                    'status': status,
                }
            });
        }
    }

}

module.exports = ContractService
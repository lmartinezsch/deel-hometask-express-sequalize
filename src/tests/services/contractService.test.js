const ContractService = require("../../services/contractService");
const {Contract} = require("../../model");
const {Op} = require("sequelize");

jest.mock("../../model", () => ({
    Contract: {
        findOne: jest.fn(),
        findAll: jest.fn()
    }
}));

describe('ContractService', () => {

    afterEach(() => {
        Contract.findOne.mockClear();
    });

    describe('getContractsById', () => {
        it('Should return contracts by id and clientId successfully', async () => {
            const contractId = 3
            const clientId = 2
            const expectedContract = {
                "id": 3,
                "terms": "bla bla bla",
                "status": "in_progress",
                "ContractorId": 6,
                "ClientId": 2
            }

            Contract.findOne.mockResolvedValueOnce(expectedContract);

            const service = new ContractService()
            const result = await service.getContractsById(contractId, clientId)

            expect(result.id).toEqual(expectedContract.id)
            expect(result.terms).toEqual(expectedContract.terms)
            expect(result.status).toEqual(expectedContract.status)
            expect(Contract.findOne).toHaveBeenCalledWith({where: {id: contractId, 'ClientId': clientId}});
        })

        it('Should throw an error when contract is not found', async () => {
            const contractId = 3
            const clientId = 2

            Contract.findOne.mockResolvedValueOnce(null);

            const service = new ContractService()
            await expect(service.getContractsById(contractId, clientId)).rejects.toThrow('Contract not found');
            expect(Contract.findOne).toHaveBeenCalledWith({where: {id: contractId, 'ClientId': clientId}});
        })
    })

    describe('getContractsBy', () => {

        it('Should return all contracts belong to a client', async () => {
            const userId = 1
            const type = 'client'
            const status = {[Op.ne]: 'terminated'}
            const expectedClientContracts = [
                {
                    "id": 2,
                    "terms": "bla bla bla",
                    "status": "in_progress",
                    "createdAt": "2024-02-07T19:30:25.399Z",
                    "updatedAt": "2024-02-07T19:30:25.399Z",
                    "ContractorId": 6,
                    "ClientId": 1
                },
                {
                    "id": 3,
                    "terms": "bla bla bla",
                    "status": "in_progress",
                    "createdAt": "2024-02-07T19:30:25.399Z",
                    "updatedAt": "2024-02-07T19:30:25.399Z",
                    "ContractorId": 6,
                    "ClientId": 2
                },
            ]

            Contract.findAll.mockResolvedValueOnce(expectedClientContracts);
            const service = new ContractService()

            const result = await service.getContractsBy(userId, type, status)

            expect(result).toEqual(expectedClientContracts)
            expect(Contract.findAll).toHaveBeenCalledWith({where: {"ClientId": userId, 'status': status}});
        })

        it('Should return all contracts belong to a contractor', async () => {
            const userId = 2
            const type = 'contractor'
            const status = {[Op.ne]: 'terminated'}
            const expectedClientContracts = [
                {
                    "id": 4,
                    "terms": "bla bla bla",
                    "status": "in_progress",
                    "createdAt": "2024-02-07T19:30:25.399Z",
                    "updatedAt": "2024-02-07T19:30:25.399Z",
                    "ContractorId": 6,
                    "ClientId": 1
                },
                {
                    "id": 5,
                    "terms": "bla bla bla",
                    "status": "in_progress",
                    "createdAt": "2024-02-07T19:30:25.399Z",
                    "updatedAt": "2024-02-07T19:30:25.399Z",
                    "ContractorId": 6,
                    "ClientId": 2
                },
            ]

            Contract.findAll.mockResolvedValueOnce(expectedClientContracts);
            const service = new ContractService()

            const result = await service.getContractsBy(userId, type, status)

            expect(result).toEqual(expectedClientContracts)
            expect(Contract.findAll).toHaveBeenCalledWith({where: {"ContractorId": userId, 'status': status}});
        })
    })
})

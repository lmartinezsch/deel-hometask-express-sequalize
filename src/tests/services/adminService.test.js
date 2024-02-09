const AdminService = require("../../services/adminService")

describe('AdminService', () => {
    const mockAdminRepository = {
        findMostProfitableProfession: jest.fn(),
        findClientsPaymentsInRange: jest.fn()
    }
    describe('calculateBestEarningProfession', () => {
        it('Should return the best earning profession successfully', async () => {
            const resultProfitableProfession = {
                "profession": "Programmer",
                "totalEarned": 2683
            }
            const startDate = '2019-01-01T19:30:25.400Z'
            const endDate = '2021-02-07T19:30:25.400Z'
            mockAdminRepository.findMostProfitableProfession.mockResolvedValue(resultProfitableProfession)
            const adminService = new AdminService(mockAdminRepository)
            const result = await adminService.calculateBestEarningProfession(startDate, endDate)

            expect(result).toEqual(resultProfitableProfession)
        })
    })

    describe('calculateBestPayingClients', () => {
        it('Should return the best paying clients with limit 1', async () => {
            const startDate = '2019-01-01T19:30:25.400Z'
            const endDate = '2021-02-07T19:30:25.400Z'
            const limit = 1
            const resultBestPayingClients = [
                {
                    "id": 4,
                    "fullname": "Ash Kethcum",
                    "paid": 2020
                },
            ]
            mockAdminRepository.findClientsPaymentsInRange.mockResolvedValue(resultBestPayingClients)
            const adminService = new AdminService(mockAdminRepository)
            const result = await adminService.calculateBestPayingClients(startDate, endDate, limit)

            expect(result).toEqual(resultBestPayingClients)
            expect(result.length).toEqual(1)
        })

        it('Should return the best paying clients with limit 3', async () => {
            const startDate = '2019-01-01T19:30:25.400Z'
            const endDate = '2021-02-07T19:30:25.400Z'
            const limit = 3
            const resultBestPayingClients = [
                {
                    "id": 4,
                    "fullname": "Ash Kethcum",
                    "paid": 2020
                },
                {
                    "id": 2,
                    "fullname": "Mr Robot",
                    "paid": 442
                },
                {
                    "id": 1,
                    "fullname": "Harry Potter",
                    "paid": 442
                }
            ]
            mockAdminRepository.findClientsPaymentsInRange.mockResolvedValue(resultBestPayingClients)
            const adminService = new AdminService(mockAdminRepository)
            const result = await adminService.calculateBestPayingClients(startDate, endDate, limit)

            expect(result).toEqual(resultBestPayingClients)
            expect(result.length).toEqual(3)
        })
    })
})
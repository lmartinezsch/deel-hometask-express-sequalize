const JobService = require("../../services/jobService")
const {Contract, Job, Profile} = require("../../model")


jest.mock("../../model", () => ({
    Contract: {
        findByPk: jest.fn(),
    },
    Job: {
        findByPk: jest.fn(),
    },
    Profile: {
        findByPk: jest.fn(),
    },
}))


describe('JobService', () => {

    const mockJobRepository = {
        findAllUnpaidByUser: jest.fn()
    }

    const mockProfileRepository = {
        transferBalance: jest.fn()
    }

    describe('getAllUnpaidJobsByUser', () => {
        const mockUnpaidJobsResult = [
            {
                "id": 3,
                "description": "work",
                "price": 202,
                "paid": null,
                "paymentDate": null,
                "createdAt": "2024-02-07T19:30:25.399Z",
                "updatedAt": "2024-02-07T19:30:25.399Z",
                "ContractId": 3
            },
            {
                "id": 4,
                "description": "work",
                "price": 200,
                "paid": null,
                "paymentDate": null,
                "createdAt": "2024-02-07T19:30:25.399Z",
                "updatedAt": "2024-02-07T19:30:25.399Z",
                "ContractId": 4
            }
        ]
        it('Should return all unpaid jobs by user successfully', async () => {
            const userId = 1
            mockJobRepository.findAllUnpaidByUser.mockReturnValue(mockUnpaidJobsResult)
            const jobService = new JobService(mockJobRepository, mockProfileRepository)
            const result = await jobService.getAllUnpaidJobsByUser(userId)

            expect(result).toEqual(mockUnpaidJobsResult)
            expect(mockJobRepository.findAllUnpaidByUser).toHaveBeenCalledTimes(1)
        })
    })
    describe('payContractorForJob', () => {
        it('Should pay contractor for job successfully', async () => {
            const client = {id: 1, type: 'client'}
            const jobId = 1

            const mockContractResult = {ContractorId: 1}
            const mockJobResult = {
                paid: null,
                price: 10,
                ContractId: 1,
                save: jest.fn()
            }
            const mockProfileResult = {id: 1}

            Contract.findByPk.mockResolvedValueOnce(mockContractResult)
            Job.findByPk.mockResolvedValueOnce(mockJobResult)
            Profile.findByPk.mockResolvedValueOnce(mockProfileResult)
            const jobService = new JobService(mockJobRepository, mockProfileRepository)

            const result = await jobService.payContractorForJob(client, jobId)

            expect(result).toBeUndefined()
            expect(mockJobResult.paid).toBe(true)
            expect(mockJobResult.save).toHaveBeenCalled()
            expect(Contract.findByPk).toHaveBeenCalledTimes(1)
            expect(Contract.findByPk).toHaveBeenCalledWith(1)
            expect(Job.findByPk).toHaveBeenCalledTimes(1)
            expect(Job.findByPk).toHaveBeenCalledWith(1)
            expect(Profile.findByPk).toHaveBeenCalledTimes(1)
            expect(Profile.findByPk).toHaveBeenCalledWith(1)
        })

        it('should throw an error if user is not a client', async () => {
            const client = {id: 1, type: 'contractor'}
            const jobId = 1
            const jobService = new JobService(mockJobRepository, mockProfileRepository)

            await expect(jobService.payContractorForJob(client, jobId)).rejects.toThrow('The user is not a client')
        })

        it('should throw an error if job is not found', async () => {
            const client = {id: 1, type: 'client'}
            const jobId = 1
            const mockProfileResult = {id: 1}

            Job.findByPk.mockResolvedValueOnce(null)
            Profile.findByPk.mockResolvedValueOnce(mockProfileResult)

            const jobService = new JobService(mockJobRepository, mockProfileRepository)

            await expect(jobService.payContractorForJob(client, jobId)).rejects.toThrow('Job not found')
        })

        it('should throw an error if job has already been paid', async () => {
            const client = {id: 1, type: 'client'}
            const jobId = 1
            const mockProfileResult = {id: 1}
            const mockJobResult = {
                paid: true,
                price: 10,
                ContractId: 1,
                save: jest.fn()
            }

            Job.findByPk.mockResolvedValueOnce(mockJobResult)
            Profile.findByPk.mockResolvedValueOnce(mockProfileResult)

            const jobService = new JobService(mockJobRepository, mockProfileRepository)

            await expect(jobService.payContractorForJob(client, jobId)).rejects.toThrow('The work has already been paid previously')
        })

        it('should throw an error if job price is greater than balance', async () => {
            const client = {id: 1, type: 'client', balance: 5}
            const jobId = 1
            const mockProfileResult = {id: 1}
            const mockJobResult = {
                paid: null,
                price: 10,
                ContractId: 1,
                save: jest.fn()
            }

            Job.findByPk.mockResolvedValueOnce(mockJobResult)
            Profile.findByPk.mockResolvedValueOnce(mockProfileResult)

            const jobService = new JobService(mockJobRepository, mockProfileRepository)

            await expect(jobService.payContractorForJob(client, jobId)).rejects.toThrow('The balance is less than the job price')
        })

        it('Should throw an error if the contract was not found', async () => {
            const client = {id: 1, type: 'client', balance: 200}
            const jobId = 1
            const mockProfileResult = {id: 1}
            const mockJobResult = {
                paid: null,
                price: 10,
                ContractId: 1,
                save: jest.fn()
            }

            Job.findByPk.mockResolvedValueOnce(mockJobResult)
            Profile.findByPk.mockResolvedValueOnce(mockProfileResult)
            Contract.findByPk.mockResolvedValueOnce(null)

            const jobService = new JobService(mockJobRepository, mockProfileRepository)

            await expect(jobService.payContractorForJob(client, jobId)).rejects.toThrow('Contract not found')
        })

    })
})
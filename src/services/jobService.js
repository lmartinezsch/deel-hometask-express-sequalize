const {Job, Contract, Profile} = require("../model");
const {ProfileTypesEnum} = require("../utils/utils.enum");

class JobService {

    constructor(repository, profileRepository) {
        this.repository = repository
        this.profileRepository = profileRepository
    }

    getAllUnpaidJobsByUser = async (userId) => {
        return this.repository.findAllUnpaidByUser(userId)
    }

    payContractorForJob = async (client, jobId) => {

        const {type, balance} = client

        if (type !== ProfileTypesEnum.CLIENT) {
            throw new Error('The user is not a client')
        }

        const job = await Job.findByPk(jobId);
        if (!job) {
            throw new Error('Job not found');
        }

        if (job.paid === true) {
            throw new Error('The work has already been paid previously')
        }

        if (job.price > balance) {
            throw new Error('The balance is less than the job price')
        }

        const contract = await Contract.findByPk(job.ContractId);

        if (!contract) {
            throw new Error('Contract not found');
        }

        const contractorProfile = await Profile.findByPk(contract.ContractorId);

        if (!contractorProfile) {
            throw new Error('Contractor profile not found');
        }

        await this.profileRepository.transferBalance(client.id, contractorProfile.id, job.price)

        // Mark job as paid
        job.paid = true;
        await job.save();
    }
}

module.exports = JobService
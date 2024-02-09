const {ProfileTypesEnum} = require("../utils/utils.enum");

class JobController {

    constructor(service) {
        this.service = service
    }

    getUnpaidJobs = async (req, res) => {
        const userId = req.profile.id

        try {
            const jobs = await this.service.getAllUnpaidJobsByUser(userId)
            res.json(jobs)
        } catch (error) {
            console.error('Error to get unpiad jobs:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    }

    generatePay = async (req, res) => {
        const {id} = req.params

        try {
            await this.service.payContractorForJob(req.profile, id)
            res.status(204).json();
        } catch (error) {
            console.error('Error to pay for a job:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    }

}

module.exports = JobController

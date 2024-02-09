const {ProfileTypesEnum} = require("../utils/utils.enum")
const {NotFoundError, JobAlreadyPaidError, InsufficientBalanceError} = require("../errors/errors");

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
            console.error('Error to get unpiad jobs:', error)
            res.status(500).json({error: 'Internal server error'})
        }
    }

    generatePay = async (req, res) => {
        const {id} = req.params

        try {
            await this.service.payContractorForJob(req.profile, id)
            res.status(204).json()
        } catch (error) {
            console.error('Error to pay for a job:', error)
            if (error instanceof NotFoundError) {
                res.status(error.statusCode).json({error: error.message})
            } else if (error instanceof JobAlreadyPaidError) {
                res.status(error.statusCode).json({error: error.message})
            } else if (error instanceof InsufficientBalanceError) {
                res.status(error.statusCode).json({error: error.message})
            } else {
                res.status(500).json({error: 'Internal server error'})
            }
        }
    }

}

module.exports = JobController

class AdminService {
    constructor(repository) {
        this.repository = repository
    }

    calculateBestEarningProfession = async (start, end) => {
        return this.repository.findMostProfitableProfession(start, end)
    }

    calculateBestPayingClients = async (start, end, limit) => {
        return this.repository.findClientsPaymentsInRange(start, end, limit)
    }
}

module.exports = AdminService
class AdminController {

    constructor(adminService) {
        this.adminService = adminService
    }

    getBestEarningProfession = async (req, res) => {
        const {start, end} = req.query;
        try {
            const result = await this.adminService.calculateBestEarningProfession(start, end)
            res.status(200).json(result);
        } catch (error) {
            console.error('Error to getBestEarningProfession:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    }

    getBestPayingClients = async (req, res) => {
        const {start, end, limit} = req.query;
        const DEFAULT_LIMIT = 2
        try {
            const result = await this.adminService.calculateBestPayingClients(start, end, limit ?? DEFAULT_LIMIT)
            res.status(200).json(result);
        } catch (error) {
            console.error('Error to getBestPayingClients:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    }
}

module.exports = AdminController
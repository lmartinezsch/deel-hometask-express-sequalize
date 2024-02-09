const {sequelize} = require("../model")

class AdminRepository {

    findMostProfitableProfession = async (startDate, endDate) => {
        try {
            const result = await sequelize.query(`
                SELECT p.profession,
                       SUM(j.price) AS totalEarned
                FROM Jobs j
                         INNER JOIN Contracts c ON j.ContractId = c.id
                         INNER JOIN Profiles p ON c.ContractorId = p.id
                WHERE j.paid = true
                  AND j.paymentDate >= :startDate
                  AND j.paymentDate <= :endDate
                GROUP BY p.profession
                ORDER BY totalEarned DESC LIMIT 1
            `, {
                replacements: {startDate, endDate},
                type: sequelize.QueryTypes.SELECT
            })

            return result.length > 0 ? result[0] : null
        } catch (error) {
            console.error('Error to getMostProfitableProfession:', error)
            throw error
        }
    }

    findClientsPaymentsInRange = async (startDate, endDate, limit) => {
        try {
            const result = await sequelize.query(`
                SELECT p.id                                 AS id,
                       CONCAT(p.firstName, ' ', p.lastName) AS fullname,
                       SUM(j.price)                         AS paid
                FROM Jobs j
                         INNER JOIN
                     Contracts c ON j.ContractId = c.id
                         INNER JOIN
                     Profiles p ON c.ClientId = p.id
                WHERE j.paid = true
                  AND j.paymentDate >= :startDate
                  AND j.paymentDate <= :endDate
                GROUP BY p.id
                ORDER BY paid DESC LIMIT :limit
            `, {
                replacements: {startDate, endDate, limit},
                type: sequelize.QueryTypes.SELECT
            })

            return result
        } catch (error) {
            console.error('Error to findClientsPaymentsInRange:', error)
            throw error
        }
    }
}

module.exports = AdminRepository
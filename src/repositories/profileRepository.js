const {Profile, sequelize} = require("../model")

class ProfileRepository {
    transferBalance = async (senderId, receiverId, amount) => {
        try {
            await sequelize.transaction(async (transaction) => {
                const senderProfile = await Profile.findOne({where: {id: senderId}, lock: transaction})
                const receiverProfile = await Profile.findOne({where: {id: receiverId}, lock: transaction})

                if (!senderProfile || !receiverProfile) {
                    throw new Error('Sender or receiver profile not found')
                }

                if (senderProfile.balance < amount) {
                    throw new Error('Insufficient balance')
                }

                senderProfile.balance -= amount
                await senderProfile.save({transaction})

                receiverProfile.balance += amount
                await receiverProfile.save({transaction})
            })
        } catch (error) {
            console.error('Error to transfer balance:', error)
            throw error
        }
    }
}

module.exports = ProfileRepository
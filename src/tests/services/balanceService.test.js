const BalanceService = require('../../services/balanceService');
const {Profile} = require("../../model");

describe('BalanceService', () => {

    const mockJobRepository = {
        getTotalJobPricesForProfile: jest.fn().mockResolvedValue(200)
    };
    const mockProfile = {
        id: 1,
        balance: 20
    };


    describe('depositMoney', () => {
        it('should deposit money to profile balance successfully', async () => {
            const balanceService = new BalanceService(mockJobRepository);
            Profile.findByPk = jest.fn().mockResolvedValue(mockProfile);
            balanceService.updateBalance = jest.fn();
            await balanceService.depositMoney(1, 10);

            expect(balanceService.updateBalance).toHaveBeenCalledWith(mockProfile, 10);
            expect(Profile.findByPk).toHaveBeenCalledWith(1);
            expect(mockJobRepository.getTotalJobPricesForProfile).toHaveBeenCalledTimes(1);
        });

        it('should throw an error if profile is not found', async () => {
            Profile.findByPk = jest.fn().mockResolvedValue(null);
            const balanceService = new BalanceService(mockJobRepository);
            try {
                await balanceService.depositMoney(1, 50);
            } catch (error) {
                expect(error.message).toBe('Profile not found');
            }
        });
    });
});
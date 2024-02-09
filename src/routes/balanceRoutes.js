const express = require('express')
const router = express.Router()
const BalanceController = require("../controllers/balanceController")
const BalanceService = require("../services/balanceService")
const JobRepository = require("../repositories/jobRepository")
const jobRepository = new JobRepository()
const balanceService = new BalanceService(jobRepository)
const balanceController = new BalanceController(balanceService)

router.post('/deposit/:userId', balanceController.deposit)

module.exports = router

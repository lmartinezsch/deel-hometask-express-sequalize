const express = require('express')
const router = express.Router()
const getProfile = require('../middleware/getProfile')
const JobController = require("../controllers/jobController")
const JobService = require("../services/jobService")
const JobRepository = require("../repositories/jobRepository")
const ProfileRepository = require("../repositories/profileRepository")
const jobRepository = new JobRepository()
const profileRepository = new ProfileRepository()
const jobService = new JobService(jobRepository, profileRepository)
const jobController = new JobController(jobService)

router.get('/unpaid', getProfile, jobController.getUnpaidJobs)
router.post('/:id/pay', getProfile, jobController.generatePay)

module.exports = router

const express = require('express')
const router = express.Router()
const getProfile = require('../middleware/getProfile')
const ContractController = require("../controllers/contractController")
const ContractService = require("../services/contractService")
const contractService = new ContractService()
const contractController = new ContractController(contractService)

router.get('/:id', getProfile, contractController.getContractById)
router.get('/', getProfile, contractController.getAllContracts)

module.exports = router

const express = require('express');
const AdminController = require("../controllers/adminController");
const AdminService = require("../services/adminService");
const AdminRepository = require("../repositories/AdminRepository");
const router = express.Router();

const adminRepository = new AdminRepository()
const adminService = new AdminService(adminRepository)
const adminController = new AdminController(adminService)

router.get('/best-profession', adminController.getBestEarningProfession);
router.get('/best-clients', adminController.getBestPayingClients);

module.exports = router;

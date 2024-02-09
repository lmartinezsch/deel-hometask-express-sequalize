const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model')
//const {getProfile} = require('./middleware/getProfile')
const {Op} = require("sequelize");
const contractRoutes = require('./routes/contractRoutes');
const jobRoutes = require('./routes/jobRoutes');
const balanceRoutes = require('./routes/balanceRoutes');
const adminRoutes = require('./routes/adminRoutes');
const {ContractStatusEnum, ProfileTypesEnum} = require("./utils/utils.enum");
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

// Define routes
app.use('/contracts', contractRoutes);
app.use('/jobs', jobRoutes);
app.use('/balances', balanceRoutes);
app.use('/admin', adminRoutes);

//this one can be deleted
app.get('/profiles', async (req, res) => {
    const {Profile} = req.app.get('models')

    try {
        const profiles = await Profile.findAll()
        if (!profiles) return res.status(404).end()
        res.json(profiles)
    } catch (error) {
        console.error('Error to get profiles:', error);
        res.status(500).json({error: 'Internal server error'});
    }
})
app.get('/jobbbs', async (req, res) => {
    const {Job} = req.app.get('models')

    try {
        const jobs = await Job.findAll()
        if (!jobs) return res.status(404).end()
        res.json(jobs)
    } catch (error) {
        console.error('Error to get profiles:', error);
        res.status(500).json({error: 'Internal server error'});
    }
})

module.exports = app;

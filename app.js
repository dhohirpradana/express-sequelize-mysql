// app.js

const express = require('express');
const sequelize = require('./database'); // Import Sequelize instance
const Tabira = require('./tabira'); // Import the Sequelize model

const app = express();

// Set up any other middleware and routes as needed

// Connect to the database and sync the model
async function connectDB() {
    try {
        await sequelize.authenticate();
        await Tabira.sync(); // This will create the "tabira" table if it doesn't exist
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connectDB();

// Define a route to fetch and display the data
app.get('/tabiras', async (req, res) => {
    try {
        const data = await Tabira.findAll();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

// 
app.post('/update-jasas', async (req, res) => {
    const body = req.body;
    var tanggal = body.tanggal;
    // validate tanggal
    if (!tanggal || tanggal === '') {
        res.status(500).json({ error: 'Tanggal is required' });
    }
    // tanggal must be in format YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(tanggal)) {
        res.status(500).json({ error: 'Tanggal must be in format YYYY-MM-DD' });
    }
    // convert tanggal to Date object
    tanggal = new Date(tanggal);
    // const nowDate = new Date();
    const nowDate = tanggal;
    try {
        const data = await Tabira.findAll();
        // loop data
        data.forEach(async (item) => {
            const tgl1 = new Date(item.TGL1);

            // check diff nowDate and TGL1
            const diffTime = Math.abs(nowDate - tgl1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // jasa = diffDays / 365 * SALDOAKHIR * 0.3
            const jasa = diffDays / 365 * item.SALDOAKHIR * 0.03;

            // update jasa
            await Tabira.update({ JASA: jasa }, {
                where: {
                    NOREK: item.NOREK,
                },
            });
        });
        res.json({ message: 'Success update jasas', tanggal: tanggal });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

// Start the Express app
const port = 3000;
app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
});

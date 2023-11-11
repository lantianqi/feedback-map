import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
const app = express();
import FormData from './models/ReactDataSchema';

app.use(json());
app.use(cors());

connect('mongodb://localhost:27017/reactdata', { useNewUrlParser: true });

app.post('/insert', async(req, res) => {
    // const FirstName = req.body.firstName
    // const CompanyRole = req.body.companyRole
    const displayName = req.body.displayName
    const message = req.body.message
    const userLatitude = req.body.userLatitude
    const userLongitude = req.body.userLongitude

    const formData = new FormData({
        // name: FirstName,
        // role: CompanyRole,
        displayName: displayName,
        message: message,
        userLatitude: userLatitude,
        userLongitude: userLongitude
    })

    try {
        await formData.save();
        res.send("inserted data..")
    } catch(err) {
        console.log(err)
    }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
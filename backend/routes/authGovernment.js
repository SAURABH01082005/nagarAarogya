import express from 'express';
import { getHospitalDetails } from '../controllers/governmentController.js';;

const governmentRouter = express.Router();

governmentRouter.get('/hospital-details', getHospitalDetails);

export default governmentRouter;
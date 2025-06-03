import express from 'express';
import { getSandwiches } from '../controller/MenuController/MenuController';

const router = express.Router();

router.get('/showall', getSandwiches);

export default router;

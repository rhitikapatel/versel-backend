import express from 'express';
import { getCompany, getCompanyById } from '../controller/company.controller.js';  

const router=express.Router();

router.get("/",getCompany);
router.get("/:id",getCompanyById);


export default router;

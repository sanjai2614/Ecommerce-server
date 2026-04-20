import express from 'express'
import { deleteContact, getContact, sendContact } from '../controllers/contactController.js'

const router=express.Router()

router.post('/send',sendContact)
router.get('/',getContact)
router.delete('/:id',deleteContact)

export default router
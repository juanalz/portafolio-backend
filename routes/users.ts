import { Router } from 'express';
import { consultUsers, consultUserById, consultUserByNames, saveUsers, updateUser, deleteUser } from '../controllers/users'
import upload from '../helpers/multer';

const router = Router();

router.get('/consultUsers', consultUsers)
router.get('/consultUser/:id', consultUserById)
router.get('/consultUserByNames/:names', consultUserByNames)
router.post('/saveUser', upload.single('file'), saveUsers)
router.put('/updateUser', upload.single('file'), updateUser)
router.delete('/deleteUser/:id', deleteUser)

export default router;
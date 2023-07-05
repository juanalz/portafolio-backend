import { Router } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { consultUsers, consultUserById, consultUserByNames, saveUsers, updateUser, deleteUser } from '../controllers/users'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const randomName = uuidv4();
      cb(null, `${randomName}.${file.mimetype.split("/")[1]}`)
    }
  })
  
const upload = multer({ storage: storage })

const router = Router();

router.get('/consultUsers', consultUsers)
router.get('/consultUser/:id', consultUserById)
router.get('/consultUserByNames/:names', consultUserByNames)
router.post('/saveUser', upload.single('file'), saveUsers)
router.put('/updateUser', updateUser)
router.delete('/deleteUser/:id', deleteUser)

export default router;
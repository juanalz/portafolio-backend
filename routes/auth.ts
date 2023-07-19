import { Router } from 'express';
import { login, logout, validateToken } from '../controllers/auth';
import validateJWT from '../helpers/validate-jwt';

const router = Router();

router.post('/login', login);
router.post('/logout', validateJWT, logout);
router.post('/validate-token', validateJWT, validateToken);

export default router;
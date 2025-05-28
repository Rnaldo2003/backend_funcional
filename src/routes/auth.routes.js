const express = require('express');
const authController = require('../controllers/authController');
const {loginVadatorRules, validate}= require('../middlewares/validator');

const router = express.Router();
router.post('/login', loginVadatorRules(), validate, authController.login);
router.post('/cambiarClave/:id', authController.cambiarclave);
router.post('/cambiarFoto/:id', authController.cambiarFoto);



router.get('/', authController.getAllUsers);
router.get('/:id', authController.getUserById);
router.get('/', authController.createUser);
router.put('/:id', authController.updateUser);
router.delete('/:id', authController.deleteUser);

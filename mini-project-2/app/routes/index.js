const express = require('express')
const merchantRoute = require('../controller/merchant.controller')
const productRoute = require('../controller/product.controller')

const authMiddleware = require('../middlewares/auth.middleware')

const router = express.Router()

// router.get('/', (req, res) => {
//     res.json
// })

router.post('/signup', merchantRoute.signUp)
router.post('/login', merchantRoute.login)
router.delete('/delacc/:id', authMiddleware.isAuthenticate, merchantRoute.deleteAccount)

router.get('/listproduct/:id', authMiddleware.isAuthenticate, productRoute.listProduct)
router.post('/entryproduct/:id', authMiddleware.isAuthenticate, productRoute.entryProduct)
router.put('/entryproduct/:id', authMiddleware.isAuthenticate, productRoute.updateProduct)
router.delete('/entryproduct/:id', authMiddleware.isAuthenticate, productRoute.deleteProduct)

module.exports = router
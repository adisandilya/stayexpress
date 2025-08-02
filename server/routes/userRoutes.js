import express from 'express';
import { protect} from '../middleware/authMiddleware.js';

import { getUserData, storeRecentSearchedCities,  } from '../controllers/userController.js';

const userRouter = express.Router();
// registerUser
userRouter.get('/', protect, getUserData);
// userRouter.post('/register', registerUser);
userRouter.post('/store-recent-search', protect,  storeRecentSearchedCities);



export default userRouter;
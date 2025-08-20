import { Router } from 'express';
import { register, login } from '../../controller/user.js';
import verifyToken from '../../middleware/verifyToken.js';


const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);

userRouter.get('/profile', verifyToken, (req, res) => {
  res.json({
    message: "Access granted to protected profile route ",
    user: req.user  
  });

});

export default userRouter;

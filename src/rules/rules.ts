import { check } from 'express-validator/check';
import  Users  from '../models/users';


const userRules = {
    forRegister: [
      check('email')
      .exists().withMessage('email does not exist')
        .isEmail().withMessage('Invalid email format')
      .custom(email => {return Users.find({email:email}).then(u => { return  u.length ==0})}).withMessage('email already exist'),
       check('password')
      .isLength({ min: 8 }).withMessage('Invalid password min 8'),
      check('name')
      .isLength({min:3,max:15}).withMessage('min 3 max 15')
      
      
      
    ],
    isNew:Boolean
    ,
    
forupdate:[
  check('Myemail')
  .isEmail().withMessage('Invalid email format')
.custom(email => {return Users.find({email:email}).then(u => { return u.length})}).withMessage('email does not exist'),
 check('password')
.isLength({ min: 8 }).withMessage('Invalid password min 8'),
check('name')
.isLength({min:3,max:15}).withMessage('min 3 max 15'),
check('email')
.custom(value=> {
  if (value)
  {
    return check('email').isEmail().withMessage('Invalid emil format');
  }
   
})


]
}

export default userRules
import { check } from 'express-validator/check';
import  Users  from '../models/users';


const userRules = {
    forRegister: [
      check('email')
        .isEmail().withMessage('Invalid email format')
        ,
        //.custom(email => Users.find({ where: { email } }).then(u => {if (u) return false})).withMessage('Email exists'),
     // check('password')
      //  .isLength({ min: 8 }).withMessage('Invalid password min 8'),
      check('name')
      .isLength({min:3,max:15}).withMessage('min 3 max 15')
      
      
      
    ]
}
export default userRules
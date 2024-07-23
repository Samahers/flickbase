const { check, validationResult} = require('express-validator')
const httpStatus = require('http-status')

const addArticleValidator = [
    check('title')
    .trim().not().isEmpty().withMessage('you need to add a title').bail()
    .isLength({min:3}).withMessage('minimum of 3 required'),
    check('director')
    .trim().not().isEmpty().withMessage('you need to add a director').bail()
    .not().isBoolean().withMessage('you cannot add a boolean').bail()
    .isLength({min:3,max:100}).withMessage('check the size').bail(),
    //add more rules to ^ if you want
    (req,res,next)=>{ //the middleware (the function)
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(httpStatus.BAD_REQUEST).json({
                errors: errors.array()
            })
        }
        
        next();
    }


]


module.exports = {
    addArticleValidator
}
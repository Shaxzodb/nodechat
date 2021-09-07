import Joi from 'joi';
// SCHEMA USERS
const UserSchema = Joi.object({
    username:Joi.string().required().min(3),
    email:Joi.string().email().required(),
    password:Joi.string().min(7).required()
});
// SCHEMA MESSAGE
const MessageSchema=Joi.object({
    message:Joi.string().required()
});
// SCHEMA LOGIN
const LoginSchema=Joi.object({
    username:Joi.string().required().min(3),
    password:Joi.string().required().min(7)
})

export {UserSchema,MessageSchema,LoginSchema};

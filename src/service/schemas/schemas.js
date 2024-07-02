import Joi from 'joi'

export const changePasswordSchema = Joi.object({
 Password: Joi.string().min(6).max(32).required().messages({
  'string.min': "Password can't be less than 6 letters!",
  'string.max': "Password can't be more than 32 letters!",
  'any.required': "Password can't be empty!",
  'string.empty': "Password can't be empty!",
 }),
 NewPassword: Joi.string().min(6).max(32).required().messages({
  'string.min': "Password can't be less than 6 letters!",
  'string.max': "Password can't be more than 32 letters!",
  'any.required': "Password can't be empty!",
  'string.empty': "Password can't be empty!",
 }),
 CfNewPassword: Joi.valid(Joi.ref('NewPassword')).messages({
  'any.only': 'Password no match!',
 }),
})

export const loginSchema = Joi.object({
 Username: Joi.string().min(5).max(200).required().label('Username'),
 Password: Joi.string().min(6).max(32).required().label('Password'),
 Latitude: Joi.required(),
 Longitude: Joi.required(),
 LastLoginIP: Joi.required(),
})

export const profileSchema = Joi.object({
 FullName: Joi.string(),
 Bio: Joi.string(),
 BirthDate: Joi.string(),
 BirthPlace: Joi.string(),
 CurrentAdd: Joi.string(),
 Phone: Joi.string().min(10).required(), // Kiểm tra phone có ít nhất 10 số
})

export const postSchema = Joi.object({
    title: Joi.string().required().messages({
      'string.empty': "Title can't be empty!",
      'any.required': "Title is required!"
    }),
    content: Joi.string().required().messages({
      'string.empty': "Content can't be empty!",
      'any.required': "Content is required!"
    })
})


export const registerSchema = Joi.object({
    Username: Joi.string().required(),
    FullName: Joi.string().required(),
    Email: Joi.string().required(),
    Gender: Joi.string().required(),
    Password: Joi.string().min(6).max(32).required().messages({
        'string.min': 'Password can\'t be less than 6 letters!',
        'string.max': 'Password can\'t be more than 32 letters!',
        'any.required': 'Password can\'t be empty!',
        'string.empty': 'Password can\'t be empty!'
    }),

    Latitude: Joi.required().messages({
        'any.required': 'Can\'t identify your geolocation!',
        'string.empty': 'Can\'t identify your geolocation!'
    }),

    Longitude: Joi.required().messages({
        'any.required': 'Can\'t identify your geolocation!',
        'string.empty': 'Can\'t identify your geolocation!'
    }),

    LastLoginIP :Joi.string().required(),
    avatarLink: Joi.string().required(),
    Cf_Password: Joi.valid(Joi.ref('Password')).messages({
        'any.only':'Password no match!'
    })

})


import Joi from 'joi'

export const profileSchema = Joi.object({
 FullName: Joi.string(),
 Bio: Joi.string(),
 BirthDate: Joi.string(),
 BirthPlace: Joi.string(),
 CurrentAdd: Joi.string(),
 Phone: Joi.string(),
 
})

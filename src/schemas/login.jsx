import Joi from 'joi'

const loginSchema = Joi.object({
 Username: Joi.string().min(5).max(200).required().label('Username'),
 Password: Joi.string().min(6).max(32).required().label('Password'),
 Latitude: Joi.required(),
 Longitude: Joi.required(),
 LastLoginIP: Joi.required(),
})

export default loginSchema

const data = {
 "LastLoginIP": "171.229.242.999",
 "Latitude": "40",
 "Longitude": "50",
 "Password": "khatai90",
 "Username": "dangtien",
}

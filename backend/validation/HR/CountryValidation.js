const Joi = require('joi')

 const CountryValidation = Joi.object({
    _id: Joi.optional(),
    CountryID: Joi.optional(),
    CountryName: Joi.string()
      .max(200)
      .required()
  });

  
  module.exports={CountryValidation}
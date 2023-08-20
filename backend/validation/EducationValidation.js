const Joi = require('joi')

 const EducationValidation = Joi.object({
    SchoolUniversity: Joi.string()
    .max(200)
    .required(),
  Degree: Joi.string()
    .max(200)
    .required(),
  Grade: Joi.string()
    .max(50)
    .required(),
  PassingOfYear: Joi.string()
    .max(10)
    .required()
})


module.exports={EducationValidation}
const Joi = require("joi")

const DepartmentValidation = Joi.object({
    DepartmentName: Joi.string()
      .max(200)
      .required(),
    CompanyID: Joi.required()
  });

  
  module.exports={DepartmentValidation}
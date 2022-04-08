/**
 *
 * Author: Menahil
 * Created: 08-04-2022
 * Purpose: This file contains validation logic for education routes (create/update)
 *
 */
const Joi = require("joi");
/**
 * @param req
 * @param res
 * @param next
 * @description This method is responsible for validating user input at the time education resource creation
 */
function validateEducation(req, res, next) {
  let { user_id, degree, institution } = req.body;
  let payload = {
    user_id: user_id ? user_id.toLowerCase().trim() : null,
    degree: degree ? degree.toLowerCase().trim() : null,
    institution: institution ? institution.trim() : null,
  };
  try {
    const schema = Joi.object().keys({
      user_id: Joi.string().required(),
      degree: Joi.string()
        .regex(/^[A-Za-z ]+$/)
        .min(2)
        .max(100)
        .required(),
      institution: Joi.string()
        .regex(/^[A-Za-z ]+$/)
        .min(2)
        .max(100),
    });
    const result = schema.validate(payload);
    if (result.error) {
      {
        return res.status(400).json({
          success: false,
          msg: result.error.details.map((i) => i.message).join(","),
        });
      }
    } else next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
/**
 * @param req
 * @param res
 * @param next
 * @description This method is responsible for validating updated data
 */
function validateEducationUpdate(req, res, next) {
  try {
    const schema = Joi.object().keys({
      degree: Joi.string()
        .regex(/^[A-Za-z ]+$/)
        .min(2)
        .max(100),
      institution: Joi.string()
        .regex(/^[A-Za-z ]+$/)
        .min(2)
        .max(100),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      {
        return res.status(400).json({
          success: false,
          msg: result.error.details.map((i) => i.message).join(","),
        });
      }
    } else next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
module.exports = {
  validateEducation,
  validateEducationUpdate,
};

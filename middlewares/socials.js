/**
 *
 * Author: Menahil
 * Created: 09-04-2022
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
function validateSocial(req, res, next) {
  let { user_id, name, url } = req.body;
  let payload = {
    user_id: user_id ? user_id.toLowerCase().trim() : null,
    name: name ? name.toLowerCase().trim() : null,
    url: url ? url.trim() : null,
  };
  try {
    const schema = Joi.object().keys({
      user_id: Joi.string().required(),
      name: Joi.string()
        .regex(/^[A-Za-z ]+$/)
        .min(2)
        .max(100)
        .required(),
      url: Joi.string().min(2).max(100),
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
function validateSocialUpdate(req, res, next) {
  try {
    const schema = Joi.object().keys({
      name: Joi.string()
        .regex(/^[A-Za-z ]+$/)
        .min(2)
        .max(100),
      url: Joi.string().min(2).max(100),
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
  validateSocial,
  validateSocialUpdate,
};

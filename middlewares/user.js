const Joi = require("joi");
/**
 * @param req
 * @param res
 * @param next
 * @description This method is responsible for validating user's signup information
 */
function validateUser(req, res, next) {
  let { user_id, name, email, password } = req.body;
  let payload = {
    user_id: user_id ? user_id.toLowerCase().trim() : null,
    name: name ? name.toLowerCase().trim() : null,
    email: email ? email.toLowerCase().trim() : null,
    password: password ? password.trim() : null,
  };
  try {
    const schema = Joi.object().keys({
      user_id: Joi.string()
        .regex(/^[A-Za-z0-9-_.]+$/)
        .min(2)
        .max(50)
        .required(),
      name: Joi.string()
        .regex(/^[A-Za-z ]+$/)
        .min(1)
        .max(100)
        .required(),
      email: Joi.string()
        .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .required(),
      password: Joi.string()
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) // Minimum 8 characters & at least one letter & one digit
        .min(8)
        .max(50)
        .required(),
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
function validateUpdationData(req, res, next) {
  try {
    const schema = Joi.object().keys({
      name: Joi.string()
        .regex(/^[A-Za-z ]+$/)
        .min(1)
        .max(150),
      email: Joi.string().regex(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      ),
      password: Joi.string()
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) // Minimum 8 characters & at least one letter & one digit
        .min(8)
        .max(50),
      user_id: Joi.string()
        .regex(/^[A-Za-z0-9-]+$/)
        .min(2)
        .max(50),
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
  validateUser,
  validateUpdationData,
};

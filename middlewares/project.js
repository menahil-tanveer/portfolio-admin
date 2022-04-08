const Joi = require("joi");
/**
 * @param req
 * @param res
 * @param next
 * @description This method is responsible for validating user's signup information
 */
function validateProject(req, res, next) {
  let { user_id, project_name, git_url, project_url } = req.body;
  let payload = {
    user_id: user_id ? user_id.toLowerCase().trim() : null,
    // project_id: project_id ? project_id.toLowerCase().trim() : null,
    project_name: project_name ? project_name.toLowerCase().trim() : null,
    git_url: git_url ? git_url.trim() : null,
    project_url: project_url ? project_url.trim() : null,
  };
  try {
    const schema = Joi.object().keys({
      user_id: Joi.string().required(),
      //   project_id: Joi.string()
      //     .regex(/^[0-9]+$/)
      //     .required(),
      project_name: Joi.string()
        .regex(/^[A-Za-z ]+$/)
        .min(1)
        .max(100)
        .required(),
      git_url: Joi.string(),
      project_url: Joi.string(),
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
function validateProjectUpdate(req, res, next) {
  try {
    const schema = Joi.object().keys({
      user_id: Joi.string().required(),
      //   project_id: Joi.string().regex(/^[0-9]+$/),
      project_name: Joi.string()
        .regex(/^[A-Za-z ]+$/)
        .min(1)
        .max(100),
      git_url: Joi.string().min(4),
      project_url: Joi.string().min(4),
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
  validateProject,
  validateProjectUpdate,
};

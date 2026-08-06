const express = require("express");
const { protect } = require("../middleware/auth.middleware");

// Builds standard REST routes (list/create/get/update/delete) for any crudFactory controller.
// IMPORTANT: creates a fresh Router() per call so routes from different resources don't merge.
const buildCrudRoutes = (controller) => {
  const router = express.Router();
  router.use(protect);
  router.route("/").get(controller.getAll).post(controller.create);
  router.route("/:id").get(controller.getOne).patch(controller.update).delete(controller.remove);
  return router;
};

module.exports = buildCrudRoutes;

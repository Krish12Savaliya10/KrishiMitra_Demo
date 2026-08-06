// Generic CRUD factory scoped to req.user (owner-based access control).
// Every resource in this app belongs to a user, so all queries are filtered by owner.

const crudFactory = (Model) => ({
  create: async (req, res, next) => {
    try {
      const doc = await Model.create({ ...req.body, owner: req.user._id });
      res.status(201).json(doc);
    } catch (err) {
      next(err);
    }
  },

  getAll: async (req, res, next) => {
    try {
      // Only allow known safe filter fields to prevent query injection
      const ALLOWED_FILTERS = ["farm", "cropPlan", "status", "sessionId"];
      const filter = { owner: req.user._id };
      ALLOWED_FILTERS.forEach(key => {
        if (req.query[key] !== undefined) filter[key] = req.query[key];
      });
      const docs = await Model.find(filter).sort({ createdAt: -1 });
      res.json(docs);
    } catch (err) {
      next(err);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const doc = await Model.findOne({ _id: req.params.id, owner: req.user._id });
      if (!doc) return res.status(404).json({ message: "Not found" });
      res.json(doc);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const doc = await Model.findOneAndUpdate(
        { _id: req.params.id, owner: req.user._id },
        req.body,
        { new: true, runValidators: true }
      );
      if (!doc) return res.status(404).json({ message: "Not found" });
      res.json(doc);
    } catch (err) {
      next(err);
    }
  },

  remove: async (req, res, next) => {
    try {
      const doc = await Model.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
      if (!doc) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Deleted" });
    } catch (err) {
      next(err);
    }
  }
});

module.exports = crudFactory;

module.exports = (app) => {
    const student = require("../controllers/student.controller.js");
    var router = require("express").Router();

    router.post("/", student.create);
    router.get("/", student.findAll);
    router.get("/:stu_status", student.findAllStatus);
    router.get("/:id", student.findOne);
    router.put("/:id", student.update);
    router.delete("/:id", student.delete);
    router.delete("/", student.deleteAll);

    app.use('/api/students', router);
};
module.exports = (app) => {
    const student = require("../controllers/student.controller.js");
    var router = require("express").Router();

    router.post("/", student.create);
    router.get("/", student.findAll);
    router.get("/status", student.findAllStatus);
    router.get("/:stu_id", student.findOne);
    router.put("/:stu_id", student.update);
    router.delete("/:stu_id", student.delete);
    router.delete("/", student.deleteAll);

    app.use('/api/students', router);
};
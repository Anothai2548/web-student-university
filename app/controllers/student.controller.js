const db = require("../model");
const Student = db.student;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.stu_name){
        res.status(400).send({
            message: "Content cannot be empty!"
        })
        return;
    }

    const student = {
        stu_name: req.body.stu_name,
        stu_suname: req.body.stu_suname,
        un_name: req.body.un_name,
        stu_status: req.body.stu_status ? req.body.stu_status : false
    }

    Student.create(student)
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: "Error 500!"
            });
        });
};

exports.findAll = (req, res) => {
    const stu_name = req.body.stu_name;
    var condition = stu_name ? {stu_name: {[Op.like]: `%${stu_name}%`}} : null;

    Student.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred!"
            });
        });

};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Student.findByPk(id)
        .then(data => {
            if(data){
                res.send(data);
            }else{
                res.status(404).send({
                    //message: `Error 404 ${id}`
                    message: "Error 404" + id
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: "Error 500" + id
            });
        });
};

exports.findAllStatus = (req, res) => {
    Student.findAll({ where: { stu_status: true }})
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: "Error 500"
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Student.update(req.body, {where: {id:id}})
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Updated successfully."
                });
            }else{
                res.send({
                    message: "Updated failed!"
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: "Error update!"
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Student.destroy({ where: {id:id}})
    .then(num => {
        if(num == 1){
            res.send({
                message: "Deleted successfully."
            })
        }else{
            res.send({
                message: "Delete failed!"
            })
        }
    })
    .catch(error => {
        res.status(500).send({
            message: "Error deleted 500"
        });
    });
};

exports.deleteAll = (req, res) => {
    Student.destroy({
        where:{},
        truncate: false
    })
    .then(num => {
        res.send({ message: "Deleted succesfully."});
    })
    .catch(error => {
        res.status(500).send({
            message: "Error 500!"
        })
    });
};
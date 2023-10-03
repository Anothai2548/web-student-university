module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("students", {
        stu_name: {
            type: Sequelize.STRING
        },
        stu_suname: {
            type: Sequelize.STRING
        },
        un_name: {
            type: Sequelize.STRING
        },
        stu_status: {
            type: Sequelize.BOOLEAN
        },
    });

    return Student;
};
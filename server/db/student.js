const Sequelize = require('sequelize');
const db = require('./database');

module.exports = db.define( 'student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    gpa: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0.0,
            max: 4.0
        },
        defaultValue: 0
    }
})

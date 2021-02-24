const Sequelize = require('sequelize');
const db = require('./database');

module.exports = db.define( 'campus', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        defaultValue: '/images/default_campus.png'
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        },

    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
    }
});

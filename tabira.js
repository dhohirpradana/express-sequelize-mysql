// tabira.js

const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Make sure to set up the database connection

const Tabira = sequelize.define('tabira', {
    NOREK: {
        type: DataTypes.CHAR(10),
        allowNull: false,
        primaryKey: true,
    },
    NIK: {
        type: DataTypes.CHAR(14),
        allowNull: false,
    },
    An: {
        type: DataTypes.CHAR(40),
        allowNull: false,
    },
    SALDOAWAL: {
        type: DataTypes.DECIMAL(20, 0),
        allowNull: false,
    },
    JUMLAH: {
        type: DataTypes.DECIMAL(20, 0),
        allowNull: false,
    },
    SALDOAKHIR: {
        type: DataTypes.DECIMAL(20, 0),
        allowNull: false,
    },
    SALDOJASA: {
        type: DataTypes.DECIMAL(20, 0),
        allowNull: false,
    },
    TGL: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    TGL1: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    JASA: {
        type: DataTypes.DECIMAL(20, 0),
        allowNull: false,
    },
}, {
    tableName: 'tabira',
    timestamps: false, // Set this to false if the table does not have timestamp fields (createdAt and updatedAt).
});

module.exports = Tabira;

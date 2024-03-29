const sequelize = require('../db')
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING(150),
        allowNull: true,
    },
    last_name: {
        type: DataTypes.STRING(150),
        allowNull: true,
    },
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    email: {
        type: DataTypes.TEXT,
        unique: true,
    },
    phone: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING(1),
        allowNull: true,
    },
    password: {
        type: DataTypes.TEXT,
    },
    company_name: {
        type: DataTypes.STRING(150),
        allowNull: true,
    },
}, {
    tableName: 'Users',
    timestamps: false,
});

const ApartmentType = sequelize.define('ApartmentType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
    },
}, {
    tableName: 'ApartmentTypes',
    timestamps: false,
});

const KitchenType = sequelize.define('KitchenType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
    },
}, {
    tableName: 'KitchenTypes',
    timestamps: false,
});

const Region = sequelize.define('Region', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
    },
}, {
    tableName: 'Regions',
    timestamps: false,
});

const City = sequelize.define('City', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
    },
}, {
    tableName: 'Cities',
    timestamps: false,
});
City.belongsTo(Region, { foreignKey: 'id_region', allowNull: true, });

const Currency = sequelize.define('Currency', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(30),
    },
}, {
    tableName: 'Currencies',
    timestamps: false,
});

const BedType = sequelize.define('BedType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(30),
    },
}, {
    tableName: 'BedTypes',
    timestamps: false,
});

const BathroomAmenity = sequelize.define('BathroomAmenity', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(30),
    },
}, {
    tableName: 'BathroomAmenities',
    timestamps: false,
});

const AnotherAmenity = sequelize.define('AnotherAmenity', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(30),
    },
}, {
    tableName: 'AnotherAmenities',
    timestamps: false,
});

const Apartment = sequelize.define('Apartment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    latitude: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    longitude: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    name_street: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    house_number: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    apartment_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    floor_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    floor_house: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    apartment_square: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    bedroom_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    room_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    max_guests: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    is_children: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    nightly_cost: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    listing_status: {
        type: DataTypes.STRING(30),
    },
    bathroom_type: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    check_in_time: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    check_out_time: {
        type: DataTypes.TIME,
        allowNull: true,
    },
}, {
    tableName: 'Apartments',
    timestamps: true,
});

const Photo = sequelize.define('Photo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    path: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: 'Photos',
    timestamps: false,
});
Apartment.hasMany(Photo);
Photo.belongsTo(Apartment, { foreignKey: 'id_apartment' });

Apartment.belongsTo(User, { foreignKey: 'id_user' });
Apartment.belongsTo(ApartmentType, { foreignKey: 'id_apartmentType', allowNull: true, });
Apartment.belongsTo(City, { foreignKey: 'id_city', allowNull: true, });
Apartment.belongsTo(KitchenType, { foreignKey: 'id_kitchenType', allowNull: true, });
Apartment.belongsTo(Currency, { foreignKey: 'id_currency', allowNull: true, });

const Reservation = sequelize.define('Reservation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    start_date: {
        type: DataTypes.DATE,
    },
    end_date: {
        type: DataTypes.DATE,
    },
}, {
    tableName: 'Reservations',
    timestamps: false,
});

Reservation.belongsTo(User, { foreignKey: 'id_user' });
Reservation.belongsTo(Apartment, { foreignKey: 'id_apartment' });

const ApartmentsBathroomAmenity = sequelize.define('ApartmentsBathroomAmenity', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
}, {
    tableName: 'ApartmentsBathroomAmenities',
    timestamps: false,
});

ApartmentsBathroomAmenity.belongsTo(Apartment, { foreignKey: 'id_apartment' });
ApartmentsBathroomAmenity.belongsTo(BathroomAmenity, { foreignKey: 'id_bathroom_amenities' });

const ApartmentsAnotherAmenity = sequelize.define('ApartmentsAnotherAmenity', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
}, {
    tableName: 'ApartmentsAnotherAmenities',
    timestamps: false,
});

ApartmentsAnotherAmenity.belongsTo(Apartment, { foreignKey: 'id_apartment' });
ApartmentsAnotherAmenity.belongsTo(AnotherAmenity, { foreignKey: 'id_another_amenities' });

const ApartmentsBedType = sequelize.define('ApartmentsBedType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    beds_count: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'ApartmentsBedType',
    timestamps: false,
});
Apartment.hasMany(ApartmentsBedType)
BedType.hasMany(ApartmentsBedType)
ApartmentsBedType.belongsTo(Apartment, { foreignKey: 'ApartmentId' });
ApartmentsBedType.belongsTo(BedType, { foreignKey: 'BedTypeId' });

module.exports = {
    User,
    ApartmentType,
    KitchenType,
    Photo,
    City,
    Region,
    Currency,
    BedType,
    BathroomAmenity,
    AnotherAmenity,
    Reservation,
    Apartment,
    ApartmentsBathroomAmenity,
    ApartmentsAnotherAmenity,
    ApartmentsBedType,
};
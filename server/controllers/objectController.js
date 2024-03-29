const ApiError = require('../error/ApiErrors');
const { Op } = require("sequelize");
const { Apartment, Photo, ApartmentsBathroomAmenity, ApartmentsAnotherAmenity, ApartmentsBedType, City, ApartmentType, BedType, KitchenType } = require('../models/models');
const uuid = require('uuid');
const path = require('path');


class ObjectController {
    async create(req, res, next) {
        try {
            const { id_user } = req.body;
            if (!id_user) {
                return next(ApiError.badRequst('Ошибка доступа'));
            }
            const newObject = await Apartment.create({
                id_user,
                listing_status: 'Черновик'
            });
            return res.json(newObject);
        } catch (error) {
            console.error('Error creating object:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async update(req, res, next) {
        try {
            const { id, ...updateParams } = req.body;
            const updatedObject = await Apartment.update(
                updateParams,
                {
                    where: {
                        id: id
                    }
                }
            );

            if (updatedObject[0] === 0 || !id) {
                return next(ApiError.badRequst('Объект не найден'));
            } else {
                /*  if (updateParams.beds !== undefined) {
                     const beds = updateParams.beds;
                     await beds.forEach((item) => {
                         ApartmentsBedType.upsert(
                             {
                                 beds_count: item.count,
                                 ApartmentId: id,
                                 BedTypeId: item.type
                             },
                             {
                                 where: {
                                     ApartmentId: id,
                                     BedTypeId: item.type
                                 }
                             }
                         )
                     });
                 } */
                if (req.files != null) {
                    const { img } = req.files;
                    let fileName = uuid.v4() + '.jpg';
                    img.mv(path.resolve(__dirname, '..', 'static', fileName));

                    const updatePhoto = await Photo.upsert(
                        {
                            path: fileName,
                            ApartmentId: id
                        },
                        {
                            where: {
                                path: fileName,
                                ApartmentId: id
                            }
                        }
                    )
                }
            }
            return res.json(updatedObject);
        } catch (error) {
            console.error('Error updating object:', error);
            return next(ApiError.internal('Объект не найден'));
        }
    }


    async getAll(req, res, next) {
        try {
            const { id_user } = req.query;
            if (!id_user) {
                return next(ApiError.badRequst('Ошибка доступа'));
            }

            const allObjects = await Apartment.findAll({
                attributes: ["id", "name", "updatedAt", "listing_status"],
                where: {
                    id_user: id_user
                },
                order: [
                    ['listing_status', 'DESC'],
                    ['updatedAt', 'DESC'],
                ],
                include: Photo
            });
            return res.json(allObjects);
        } catch (error) {
            console.error('Error getting all objects:', error);
            return next(ApiError.internal('Ошибка доступа'));
        }
    }

    async getOne(req, res) {
        const { id } = req.params;
        const apartment = await Apartment.findOne({
            where: { id },
            include: [Photo, City]
        }
        );
        return res.json(apartment);
    }

    async getOneUpdate(req, res) {
        const { id, id_user } = req.body;
        const apartment = await Apartment.findOne({
            where: {
                id: id,
                id_user: id_user
            },
            include: [Photo, City, ApartmentsBedType]
        }
        );
        return res.json(apartment);
    }

    async delete(req, res, next) {
        try {
            const { id, id_user } = req.params;
            if (!id || !id_user) {
                return next(ApiError.badRequst('Ошибка доступа'));
            }
            const deletedObject = await Apartment.destroy({
                where: {
                    id: id,
                    id_user: id_user
                },
            });

            if (!deletedObject) {
                return next(ApiError.badRequst('Объект не найден'));
            }

            return res.json(deletedObject);
        } catch (error) {
            console.error('Error deleting object:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getAppartTypes(req, res) {
        const types = await ApartmentType.findAll();
        return res.json(types);
    }

    async getBedTypes(req, res) {
        const types = await BedType.findAll();
        return res.json(types);
    }

    async getKitchenTypes(req, res) {
        const types = await KitchenType.findAll();
        return res.json(types);
    }

    async getCities(req, res) {
        const { inputValue } = req.body;
        let citiesSearch = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
        const cities = await City.findAll({
            where: {
                name: { [Op.startsWith]: citiesSearch },
            },
            limit: 10
        });
        return res.json(cities);
    }
}

module.exports = new ObjectController();
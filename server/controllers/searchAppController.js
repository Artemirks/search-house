const { Apartment, Photo, ApartmentsBathroomAmenity, ApartmentsAnotherAmenity, ApartmentsBedType, City } = require('../models/models');
const { Op } = require('sequelize');
const ApiError = require('../error/ApiErrors');
class SearchAppController {
    async getAll(req, res, next) {
        try {
            let { id_city, guests, limit, page, startDate, endDate } = req.body;
            page = page || 1;
            const max_guests = guests || 2;
            limit = limit || 10;
            let offset = page * limit - limit;
            let apartments = [];
            if (!id_city && !max_guests) {
                apartments = await Apartment.findAndCountAll({
                    include: [City, Photo],
                    limit,
                    offset
                });
            } else {
                apartments = await Apartment.findAndCountAll({
                    where: { id_city, max_guests: { [Op.gte]: max_guests } },
                    include: [City, Photo],
                    limit,
                    offset
                })
            }
            return res.json({ ...apartments, guests: max_guests, startDate: startDate, endDate: endDate });
        } catch (error) {
            console.error('Error in getAll:', error);
            return next(ApiError.internal('Ошибка на сервере'));
        }
    }
}

module.exports = new SearchAppController();
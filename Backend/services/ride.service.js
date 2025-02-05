const rideModel = require("../models/ride.model");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/AsyncHandler");
const mapService = require("./maps.service");
const crypto = require("crypto");

const BASE_FARE = {
	auto: 20,
	car: 30,
	moto: 10,
};

const FARE_PER_KM = {
	auto: 8,
	car: 12,
	moto: 6,
};
const perMinuteRate = {
	auto: 2,
	car: 3,
	moto: 1.5,
};

async function getFare(origin, destination) {
	if (!origin || !destination) {
		throw new Error("origin and destination are required");
	}

	const distanceTime = await mapService.getDistanceTime(origin, destination);

	const distance = distanceTime.duration; //in min
	const time = distanceTime.distance; //in km

	const fare = {
		auto: Math.round((BASE_FARE.auto + distance * FARE_PER_KM.auto + time * perMinuteRate.auto)),
		car: Math.round((BASE_FARE.car + distance * FARE_PER_KM.car + time * perMinuteRate.car)),
		moto: Math.round((BASE_FARE.moto + distance * FARE_PER_KM.moto + time * perMinuteRate.moto)),
	};

	return { fare, distance, time };
}

function getOtp(num) {
	function generateOtp(num) {
		const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
		return otp;
	}
	return generateOtp(num);
}

module.exports.createRide = async ({ user, origin, destination, vehicleType, originText, destinationText }) => {
	try {
		if (!user || !origin || !destination || !vehicleType || !originText || !destinationText) {
			throw new ApiError(400, "All fields are required");
		}

		const fare = await getFare(origin, destination);

		const ride = await rideModel.create({
			user,
			origin,
			destination,
			otp: getOtp(6),
			fare: fare.fare[vehicleType],
			originText,
			destinationText,
			distance: fare.distance,
			duration: fare.time,
			status: "pending",
		});

		return ride;
	} catch (error) {
		throw new ApiError(500, "error in createride service", error.message);
	}
};

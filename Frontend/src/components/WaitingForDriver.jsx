/* eslint-disable react/prop-types */

import { ChevronDown, MessageCircleMore } from "lucide-react";
import ChatComponent from "./Chat/ChatComponent";
import { useState } from "react";

const WaitingForDriver = (props) => {
	const [isChatOpen, setIsChatOpen] = useState(false);
	return (
		<div>
			<h5
				className="p-1 text-center w-[93%] absolute top-0 items-center flex justify-center"
				onClick={() => {
					props.setWaitingForDriver(false);
				}}>
				<ChevronDown size={35} strokeWidth={2.1} />
			</h5>
			<div className="flex items-center justify-between">
				<img
					className="h-12"
					src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
					alt=""
				/>
				<div className="text-right">
					<h2 className="text-xl font-medium capitalize">
						{props.ride?.captain.fullname.firstname + " " + props.ride?.captain.fullname.lastname}
					</h2>
					<h4 className="text-lg font-semibold -mt-1 -mb-1">{props.ride?.captain.vehicle.plate}</h4>
					<p className="text-lg text-gray-600">{props.ride?.captain.vehicle.model}</p>
					<h1 className="text-lg font-semibold">OTP: {props.ride?.otp} </h1>
				</div>
			</div>
			<div className="flex gap-2 justify-between flex-col items-center">
				<div className="w-full mt-5">
					<div className="flex items-center gap-5 p-3 border-b-2">
						<i className="ri-map-pin-user-fill"></i>
						<div>
							<h3 className="text-lg font-medium">Pickup</h3>
							<p className="text-sm -mt-1 text-gray-600">{props.ride?.originText}</p>
						</div>
					</div>
					<div className="flex items-center gap-5 p-3 border-b-2">
						<i className="text-lg ri-map-pin-2-fill"></i>
						<div>
							<h3 className="text-lg font-medium">Destination</h3>
							<p className="text-sm -mt-1 text-gray-600">{props.ride?.destinationText}</p>
						</div>
					</div>
					<div className="flex items-center gap-5 p-3">
						<i className="ri-currency-line"></i>
						<div>
							<h3 className="text-lg font-medium">Cash </h3>
							<p className="text-sm -mt-1 text-gray-600">₹{props.ride?.fare} </p>
						</div>
					</div>
				</div>
			</div>
			{/* Chat div */}
			
			<div
				className="p-2 border-2 w-auto  text-bold rounded-lg flex flex-row items-center mx-auto justify-center mt-4"
				onClick={() => setIsChatOpen(true)}>
				<MessageCircleMore className="w-6 h-6 mr-2 text-blue-700" />
				<p>Message To Driver</p>
			</div>
			<ChatComponent
				isOpen={isChatOpen}
				onClose={() => setIsChatOpen(false)}
				Name={`${props.ride?.captain?.fullname?.firstname || "Driver"} ${
					props.ride?.captain?.fullname?.lastname || ""
				}`}
				Image={props.ride?.captain?.profileImage || "default-profile.png"}
				rideId={props.ride?._id}
				recipientId={props.ride?.captain._id}
			/>
		</div>
	);
};
export default WaitingForDriver;

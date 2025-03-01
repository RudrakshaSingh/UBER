/* eslint-disable react/prop-types */
import axios from "axios";
import { MessageCircleMore } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatComponent from "./Chat/ChatComponent";
import toast from "react-hot-toast";
const ConfirmRidePopUp = (props) => {
	const [isChatOpen, setIsChatOpen] = useState(false);
	const [otp, setOtp] = useState("");
	const navigate = useNavigate();
	const submitHander = async (e) => {
		e.preventDefault();
		
	};
	const confirmRide=async()=>{
		const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
			params: {
				rideId: props.ride._id,
				otp: otp,
			},
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		if (response.status === 200) {
			props.setConfirmRidePopupPanel(false);
			props.setRidePopupPanel(false);
			navigate("/captain-riding", { state: { ride: response.data } });
		}else if(response.status===201){
			toast.error(response.data.message);
		}
	}
	return (
		<div>
			<h5
				className=" p-1 text-center w-[93%] absolute top-0"
				onClick={() => {
					props.setRidePopupPanel(false);
				}}>
				<i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
			</h5>
			<h3 className="text-2xl font-semibold mb-5">Confirm this ride to Start</h3>
			<div className="flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4">
				<div className="flex items-center gap-3 ">
					<img className="h-20 rounded-full object-cover w-20" src={props.ride?.user.profileImage} alt="" />
					<h2 className="text-lg font-medium capitalize">{props.ride?.user.fullname.firstname}</h2>
				</div>
				<div>
					<h5 className="text-lg font-semibold">Distance:{props.ride?.distance} KM</h5>
					<h5 className="text-lg font-semibold">Duration:{props.ride?.duration} KM</h5>
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
							<h3 className="text-lg font-medium">Cash0 </h3>
							<p className="text-sm -mt-1 text-gray-600"> ₹{props.ride?.fare}</p>
						</div>
					</div>
				</div>
				<div className="mt-2 w-full">
					<form onSubmit={submitHander}>
						<input
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
							type="text"
							className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3"
							placeholder="Enter OTP"
						/>
						<button onClick={confirmRide} className="w-full mt-3 text-lg flex justify-center bg-green-600 text-white font-semibold p-1 rounded-lg">
							Confirm
						</button>
						<button
							onClick={() => {
								props.setConfirmRidePopupPanel(false);
								props.setRidePopupPanel(false);
							}}
							className="w-full mt-1 bg-red-600 text-lg text-white font-semibold p-1 rounded-lg">
							Cancel
						</button>
					</form>

					<div
						className="p-2 border-2 w-auto  text-bold rounded-lg flex flex-row items-center mx-auto justify-center mt-2"
						onClick={() => setIsChatOpen(true)}>
						<MessageCircleMore className="w-6 h-6 mr-2 text-blue-700" />
						<p>Message User</p>
					</div>
				</div>
			</div>
			<ChatComponent
				isOpen={isChatOpen}
				onClose={() => setIsChatOpen(false)}
				setIsChatOpen = {setIsChatOpen}
				Name={`${props.ride?.user?.fullname?.firstname || "Driver"} ${
					props.ride?.user?.fullname?.lastname || ""
				}`}
				Image={props.ride?.user?.profileImage || "default-profile.png"}
				rideId={props.ride?._id}
				recipientId={props.ride?.user?._id}
			/>
		</div>
	);
};
export default ConfirmRidePopUp;

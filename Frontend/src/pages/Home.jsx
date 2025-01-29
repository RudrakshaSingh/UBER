import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import { ChevronDown } from "lucide-react";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
	const [pickup, setPickup] = useState("");
	const [destination, setDestination] = useState("");

	const [panelOpen, setPanelOpen] = useState(false); //goes up and down
	const [vehiclePanel, setVehiclePanel] = useState(false); //when user clicks on location to select vechile
	const [confirmRidePanel, setConfirmRidePanel] = useState(false);
	const [vehicleFound, setVehicleFound] = useState(false);
	const [waitingForDriver, setWaitingForDriver] = useState(false);

	const vehiclePanelRef = useRef(null);
	const confirmRidePanelRef = useRef(null);
	const panelRef = useRef(null); //used to pick one div by adding ref={panelRef} in that div
	const panelCloseRef = useRef(null);
	const vehicleFoundRef = useRef(null); //foor when pressed looking for a driver
	const waitingForDriverRef = useRef(null);

	const submitHandler = (e) => {
		e.preventDefault();
	};

	useGSAP(
		function () {
			if (panelOpen) {
				gsap.to(panelRef.current, {
					height: "70%",
					padding: 24, // opacity:1
				});
				gsap.to(panelCloseRef.current, {
					//to show arrow down when panel is up
					opacity: 1,
				});
			} else {
				gsap.to(panelRef.current, {
					height: "0%",
					padding: 0,
					// opacity:0
				});
				gsap.to(panelCloseRef.current, {
					opacity: 0,
				});
			}
		},
		[panelOpen]
	);

	useGSAP(
		function () {
			if (vehiclePanel) {
				gsap.to(vehiclePanelRef.current, {
					transform: "translateY(0)",
				});
			} else {
				gsap.to(vehiclePanelRef.current, {
					transform: "translateY(100%)",
				});
			}
		},
		[vehiclePanel]
	);

	useGSAP(
		function () {
			if (confirmRidePanel) {
				gsap.to(confirmRidePanelRef.current, {
					transform: "translateY(0)",
				});
			} else {
				gsap.to(confirmRidePanelRef.current, {
					transform: "translateY(100%)",
				});
			}
		},
		[confirmRidePanel]
	);

	useGSAP(
		function () {
			if (vehicleFound) {
				gsap.to(vehicleFoundRef.current, {
					transform: "translateY(0)",
				});
			} else {
				gsap.to(vehicleFoundRef.current, {
					transform: "translateY(100%)",
				});
			}
		},
		[vehicleFound]
	);

	useGSAP(
		function () {
			if (waitingForDriver) {
				gsap.to(waitingForDriverRef.current, {
					transform: "translateY(0)",
				});
			} else {
				gsap.to(waitingForDriverRef.current, {
					transform: "translateY(100%)",
				});
			}
		},
		[waitingForDriver]
	);

	return (
		<div className="h-screen relative overflow-hidden">
			<img
				className="w-16 absolute left-5 top-5"
				src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
				alt=""
			/>
			<div className="h-screen w-screen">
				{/* image for temporary use  */}
				<img
					className="h-full w-full object-cover"
					src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
					alt=""
				/>
			</div>
			<div className=" flex flex-col justify-end h-screen absolute top-0 w-full">
				<div className="h-[30%] p-6 bg-white relative">
					<h5
						ref={panelCloseRef}
						onClick={() => {
							setPanelOpen(false);
						}}
						className="absolute opacity-0 right-6 top-6 text-2xl">
						<ChevronDown size={35} strokeWidth={2.1} />
					</h5>
					<h4 className="text-2xl font-semibold">Find a trip</h4>
					<form
						className="relative py-3"
						onSubmit={(e) => {
							submitHandler(e);
						}}>
						<div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
						<input
							onClick={() => {
								setPanelOpen(true);
							}}
							value={pickup}
							onChange={(e) => {
								setPickup(e.target.value);
							}}
							className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
							type="text"
							placeholder="Add a pick-up location"
						/>
						<input
							onClick={() => {
								setPanelOpen(true);
							}}
							value={destination}
							onChange={(e) => {
								setDestination(e.target.value);
							}}
							className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3"
							type="text"
							placeholder="Enter your destination"
						/>
					</form>
				</div>
				<div ref={panelRef} className="bg-white h-0">
					<LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
				</div>
			</div>
			<div
				ref={vehiclePanelRef}
				className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
				<VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
			</div>
			<div
				ref={confirmRidePanelRef}
				className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
				<ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
			</div>
			<div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
				<LookingForDriver setVehicleFound={setVehicleFound} />
			</div>
			<div ref={waitingForDriverRef} className="fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12">
				<WaitingForDriver waitingForDriver={waitingForDriver} />
			</div>
		</div>
	);
};

export default Home;

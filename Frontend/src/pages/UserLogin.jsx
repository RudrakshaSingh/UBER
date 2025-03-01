import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { toast } from "react-hot-toast";

function UserLogin() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const { setUser } = useContext(UserDataContext);
	const navigate = useNavigate();

	const submitHandler = async (e) => {
		e.preventDefault();

		if (!email || !password) {
			toast.error("Please fill in all fields");
			return;
		}

		try {
			const response = await toast.promise(
				axios.post(
					`${import.meta.env.VITE_BASE_URL}/users/login`,
					{
						email,
						password,
					},
					{
						withCredentials: true,
					}
				),
				{
					loading: "Logging in...",
					success: "Login successful!",
					error: "Invalid credentials",
				}
			);

			if (response.status === 200) {
				const data = response.data;
				setUser(data.message.user);
				localStorage.setItem("token", data.message.token);

				setEmail("");
				setPassword("");

				navigate("/home");
			}
		} catch (error) {
			console.error("Login error:", error);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
				<div className="flex justify-center mb-8 flex-col items-center">
					<User className="w-20 h-20 text-blue-500" />
					<h1 className="text-3xl font-bold text-gray-900">User Login</h1>
					<p className="text-gray-600 mt-2">Welcome Back </p>
				</div>

				<form onSubmit={submitHandler} className="space-y-6">
					{/* Email Input */}
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
							Email Address
						</label>
						<div className="relative">
							<input
								id="email"
								name="email"
								autoComplete="username"
								required
								className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
								type="email"
								placeholder="email@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
						</div>
					</div>

					{/* Password Input */}
					<div>
						<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
							Password
						</label>
						<div className="relative">
							<input
								id="password"
								name="password"
								autoComplete="current-password"
								required
								className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
								type={showPassword ? "text" : "password"}
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500 focus:outline-none">
								{showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
							</button>
						</div>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg">
						Login
					</button>

					
				</form>
				<div className="mt-6 text-center"><p className="text-center text-sm text-gray-600">
						New here?{" "}
						<Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
							Create new Account
						</Link>
					</p></div>

				<div className="mt-4  border-gray-200 pt-4 mb-6">
					<Link
						to="/captain-login"
						className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center">
						Sign in as Captain
					</Link>
				</div>

				{/* Footer */}
				<div className="text-center border-t border-gray-200 pt-6 pb-4">
					<p className="text-xs text-gray-500 mb-2">© 2025 DriveSphere Rides. All rights reserved.</p>
					<div className="flex justify-center items-center space-x-4 text-xs">
						<Link to="/privacy-policy" className="text-blue-500 hover:text-gray-700 transition-colors">
							Privacy Policy
						</Link>
						<span className="text-gray-300">•</span>
						<Link to="/terms-of-service" className="text-blue-500 hover:text-gray-700 transition-colors">
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserLogin;

import FloatingShape from "./components/FloatingShape";
import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import EmailVerify from "./pages/EmailVerify";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/Loading";
import Home from "./pages/Home";
import ForgotPass from "./pages/ForgotPass";
import ResetPass from "./pages/ResetPass";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();
	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}
	if (!user.isVerified) {
		return <Navigate to="/verify-email" replace />;
	}
	return children;
};

const RedirectionAuth = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();
	if (isAuthenticated && user.isVerified) {
		return <Navigate to="/" replace />;
	}
	return children;
};

function App() {
	const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
			<FloatingShape
				color="bg-green-500"
				size="w-64 h-64"
				top="-5%"
				left="10%"
				delay={0}
			/>
			<FloatingShape
				color="bg-emerald-500"
				size="w-48 h-48"
				top="70%"
				left="80%"
				delay={5}
			/>
			<FloatingShape
				color="bg-lime-500"
				size="w-32 h-32"
				top="40%"
				left="-5%"
				delay={2}
			/>

			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/signup"
					element={
						<RedirectionAuth>
							<SignupPage />
						</RedirectionAuth>
					}
				/>
				<Route
					path="/login"
					element={
						<RedirectionAuth>
							<LoginPage />
						</RedirectionAuth>
					}
				/>
				<Route path="/verify-email" element={<EmailVerify />} />
				<Route
					path="/forgot-password"
					element={
						<RedirectionAuth>
							<ForgotPass />
						</RedirectionAuth>
					}
				/>
				<Route 
					path="/reset-password/:token"  
					element={
						<RedirectionAuth>
							<ResetPass />
						</RedirectionAuth>
					}
				/>
				<Route 
					path="*"  
					element={
						<Navigate to="/" replace />
					}
				/>
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;

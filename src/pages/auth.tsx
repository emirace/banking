import { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import backgroundImage from "../assets/images/auth.avif";
import { Link, useNavigate } from "react-router";
import { useToastNotification } from "../context/toastNotification";
import { loginUser, registerUser } from "../services/auth";
import { useUser } from "../context/user";
import Loading from "./_components/loading";
import logo from "../assets/images/logo.png";

const Auth = () => {
  const { addNotification } = useToastNotification();
  const { getUser } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.password ||
      (!isLogin && !formData.fullName)
    ) {
      addNotification({
        message: "Please fill all required fields.",
        error: true,
      });
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      addNotification({ message: "Passwords do not match.", error: true });
      return;
    }
    try {
      setLoading(true);
      if (isLogin) {
        const res = await loginUser({
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("authToken", res.token);
        await getUser();
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/dashboard");
      } else {
        await registerUser({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        });
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setIsLogin(true);
      }
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-end p-4 md:px-20 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 pt-20 to-black"></div>
      <Link
        to="/"
        className="absolute top-8 left-4 md:left-8 text-white text-xl font-bold"
      >
        <div className="text-2xl font-bold flex items-center gap-2">
          <img src={logo} alt="logo" className="w-auto h-10" />
          <span className="text-white ">TransactSphere</span>
        </div>
      </Link>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl p-10 w-full max-w-md text-white">
        <h2 className="text-3xl font-bold text-center">
          {isLogin ? "Welcome Back!" : "Create an Account"}
        </h2>
        <p className="text-gray-200 text-center mt-2">
          {isLogin ? "Login to continue" : "Sign up to get started"}
        </p>

        <form className="mt-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="relative">
              <FaUser className="absolute left-3 top-4 text-gray-300" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full pl-10 p-3 bg-white/20 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          <div className="relative mt-4">
            <FaEnvelope className="absolute left-3 top-4 text-gray-300" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full pl-10 p-3 bg-white/20 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="relative mt-4">
            <FaLock className="absolute left-3 top-4 text-gray-300" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 p-3 bg-white/20 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {!isLogin && (
            <div className="relative mt-4">
              <FaLock className="absolute left-3 top-4 text-gray-300" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full pl-10 p-3 bg-white/20 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          {isLogin && (
            <div className="text-right text-sm mt-2">
              <a href="#" className="underline">
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 flex items-center justify-center gap-2 text-white p-3 rounded-full font-bold mt-6 hover:bg-blue-700 transition duration-300"
          >
            {loading && <Loading size="sm" />}
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-200">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-bold underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;

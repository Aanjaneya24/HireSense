import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/media/HireSense.png";
import { userService } from "../../services/userService";
import useUpdateUserData from "../../hooks/useUpdateUserData";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const updateUser = useUpdateUserData();

  const [userType, setUserType] = useState("jobSeeker");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const resetErrorMessage = () => {
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

    if (!passwordPattern.test(formData.password)) {
      setErrorMessage(
        "Password must include at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 6 characters long."
      );

      resetErrorMessage();
    } else if (formData.password !== formData.confirmPassword) {
      setErrorMessage(
        "The passwords you entered don't match. Please check and try again."
      );
      resetErrorMessage();
    } else {
      postUserData(formData);
    }
  };

  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const postUserData = async (data) => {
    setLoading(true);
    const { name, email, password } = data;
    const userData = {
      email,
      password,
      role: userType === "employer" ? "employer" : "jobSeeker",
      userProfile: userType === "employer" ? { companyName: name } : { name },
    };

    try {
      const res = await userService.signup(userData);
      // Successfully signed up - show success message and redirect
      setSuccessMessage("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage(error.response?.data?.message || "Signup failed. Please try again.");
      resetErrorMessage();
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="hidden font-semibold text-xl cursor-pointer md:flex items-center text-gray-800 px-16 mt-3">
        <Link to="/" className="flex items-center font-Poppins">
          <img
            src={logo}
            className="w-10 rounded-lg mr-3"
            alt="HireSense Logo"
          />
          / HireSense
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-3/6 sm:h-screen flex items-center justify-center sm:pt-5 sm:pl-5 md:w-3/5 lg:pl-16 lg:pt-5">
          <div className="h-full w-full text-center bg-black sm:pt-24 sm:px-12 text-blue-500 sm:rounded-t-lg lg:pt-44">
            <h2 className="py-4 text-xl sm:text-5xl font-bold sm:mb-5 xl:text-6xl">
              {userType === "jobSeeker"
                ? "Your dream career starts here."
                : userType === "employer" &&
                  "Build your team with top talent."}
            </h2>

            <p className="hidden sm:block font-light sm:text-lg text-white xl:text-xl">
              {userType === "jobSeeker"
                ? "Connect with innovative companies and unlock opportunities that match your potential."
                : "Access a diverse pool of skilled professionals ready to drive your success."}
            </p>
          </div>
        </div>

        <div className="w-full sm:w-3/6 pt-1.5 md:w-2/5">
          <div className="flex flex-col md:flex-row justify-center items-center gap-5 ">
            <div
              onClick={() => setUserType("jobSeeker")}
              className={`rounded-md px-5 py-1 cursor-pointer font-semibold text-gray-600 ${
                userType === "jobSeeker" ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              I am a Job Seeker
            </div>
            <div
              onClick={() => setUserType("employer")}
              className={`rounded-md px-5 py-1 cursor-pointer font-semibold text-gray-600 ${
                userType === "employer" ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              I am an Employer
            </div>
          </div>

          <div className="p-3 sm:p-10 ">
            <h2 className=" text-3xl font-bold ">Create Account</h2>
            <p className="mt-3">
              {userType === "jobSeeker"
                ? "Find your next opportunity!"
                : "Find the best talents!"}
            </p>

            <form className="mt-3" onSubmit={handleFormSubmission}>
              <div className="flex flex-col">
                <label className=" font-semibold">
                  {userType === "employer" ? "Company Name:" : "Full Name:"}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="rounded h-10 text-base pl-5 mb-3 border-x border-y border-gray-400"
                  placeholder={`Enter ${
                    userType === "employer" ? "company name" : "name"
                  }`}
                />

                <label className=" font-semibold">Email Address:</label>
                <input
                  type="text"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="rounded h-10 text-base pl-5 mb-3 border-x border-y border-gray-400"
                  placeholder="user@mail.com"
                />

                <label className=" font-semibold ">Password:</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="rounded h-10 pl-5 text-base mb-3 border-x border-y border-gray-400"
                  placeholder="min 8 characters"
                />

                <label className=" font-semibold">Confirm Password:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="rounded h-10 pl-5 text-base mb-3 border-x border-y border-gray-400"
                  placeholder="confirm password"
                />
                {errorMessage && (
                  <span className="text-red-600 text-sm ml-2">
                    {errorMessage}
                  </span>
                )}
                {successMessage && (
                  <span className="text-blue-600 text-sm ml-2 font-semibold">
                    {successMessage}
                  </span>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-black rounded-md text-white font-normal text-sm h-11 mt-3 hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </form>

            {/* Hidden signup with google */}
            <div className="hidden">
              <div className="flex items-center justify-center gap-5 my-4">
                <div className="bg-gray-400 h-px w-1/4"></div>
                <p className=" text-gray-400 text-sm">or Login with Email</p>
                <div className="bg-gray-400 h-px w-1/4"></div>
              </div>
              <button className="px-10 items-center justify-center gap-2 flex h-11 rounded-md text-black text-sm w-full border-x border-y border-gray-400">
                <img
                  className="w-10 p-1"
                  src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                  alt="Google Sign-In"
                />
                <span className="text-black font-normal">
                  Sign in with Google
                </span>
              </button>
            </div>
            <div className="mt-3">
              <p className=" cursor-pointer text-center">
                Already have an account?
                <Link to="/login" className="underline pl-1">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

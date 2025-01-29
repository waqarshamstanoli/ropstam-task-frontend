import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { tryRegister } from "../../api";
import AlertOne from "../../components/AlertOne";
import { useAuthContext } from "../../context/AuthContext";
import FacebookIcon from "../../assets/facebook.svg"
import GoogleIcon from "../../assets/google.svg"
import appleIcon from "../../assets/apple.svg"
// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
 
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  c_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

function Register() {
  const { saveUser, saveAuthToken } = useAuthContext();
  const navigate = useNavigate();

  // Initialize React Hook Form with Yup validation resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await tryRegister(data);
      saveAuthToken(response.data.token);
      saveUser(response.data.user);
      reset(); // Reset the form after successful registration
      navigate("/login");
    } catch (error) {
      console.error(error); // Handle API errors (you can customize this part)
    }
  };

  return (
    <div className="grid grid-rows-1 min-h-screen bg-black px-2">
      <div className="grid grid-cols-12 gap-2 h-full items-center justify-center">
        <div className="col-span-12 md:col-span-6 signUpBackground"></div>
        <div className="col-span-12 md:col-span-6">
          <div className="card w-full mx-auto p-2 md:p-8 rounded-2xl shadow-lg">
            <h1 className="md:text-4xl text-2xl font-bold font-jakarta text-left">Create an account</h1>
            <h6 className="text-lg font-normal text-gray-500 font-jakarta text-left">
              Create account to manage all your automotive business needs
            </h6>
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="relative mt-6">
                <label className="leading-7 mt-2 text-start text-white font-jakarta text-xl font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-zinc-900 rounded focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-100 py-3 pl-4 leading-8 transition-colors duration-200 ease-in-out"
                  {...register("email")}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div className="relative mt-6">
                <label className="leading-7 text-start text-white font-jakarta text-xl font-medium">
                  Your Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full mt-2 bg-zinc-900 rounded focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-100 py-3 pl-4 leading-8 transition-colors duration-200 ease-in-out"
                  {...register("password")}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              <div className="relative mt-6">
                <label className="leading-7 mt-2 text-start text-white font-jakarta text-xl font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Enter confirm password"
                  className="w-full bg-zinc-900 rounded focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-100 py-3 pl-4 leading-8 transition-colors duration-200 ease-in-out"
                  {...register("c_password")}
                />
                {errors.c_password && <p className="text-red-500 text-sm">{errors.c_password.message}</p>}
              </div>

              
              <button
                className="text-black bg-white w-full border-0 py-4 mx-auto px-6 mt-10 mb-2 rounded font-semibold text-md"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Sign Up"}
              </button>
            </form>
            <p className="text-center text-gray-600 text-2xl font-normal mt-6">Or Sign up with</p>
            <div className="flex justify-center mt-8">
            <img src={FacebookIcon} alt="facebook" width={70}/>
            <img src={GoogleIcon} alt="Google" width={70} className="mx-6" />

            <img src={appleIcon} alt="apple" width={70} />
            </div>
            <p className="leading-7 mt-4 text-center text-gray-100 text-2xl font-jakarta font-normal">
              Have an account? <a href="/login" className="text-blue-700 font-medium">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

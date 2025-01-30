import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import AlertOne from "../../components/AlertOne";
import { useAuthContext } from "../../context/AuthContext";
import { tryLogin } from "../../api";
import FacebookIcon from "../../assets/facebook.svg"
import GoogleIcon from "../../assets/google.svg"
import appleIcon from "../../assets/apple.svg"


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Login() {
  const { saveUser, saveAuthToken } = useAuthContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (formData) => {
    try {
      const { data } = await tryLogin(formData);
      saveAuthToken(data.token);
      saveUser(data.userId);
      navigate("/dashboard");
    } catch (e) {
      setError("email", { message: "Invalid email or password" }); 
    }
  };

  return (
    <div className="grid grid-rows-1 min-h-screen bg-black px-2">
      <div className="grid grid-cols-12 gap-2 h-full items-center justify-center">
        <div className="col-span-12 md:col-span-6 signinBackground hidden md:block"></div>

        <div className="col-span-12 md:col-span-6">
          <div className="card w-full mx-auto p-2 md:p-8 rounded-2xl shadow-lg ">
            <h1 className="md:text-4xl text-2xl font-bold font-jakarta text-left">Welcome back</h1>
            <h6 className="text-lg mt-2 font-normal text-gray-500 font-jakarta text-left">
              Welcome to the login page, please enter your identity to access your account
            </h6>
            <form id="react-login-form" onSubmit={handleSubmit(onSubmit)}>
             
              {errors.email && !errors.password && (
                <AlertOne errors={[errors.email.message]} title="Login Failed" />
              )}

             
              <div className="relative mt-4">
                <label className="leading-7 text-start text-white fmSaira text-lg md:text-xl font-medium">
                  Your Email
                </label>
                <div className="relative mt-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-zinc-900 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-100 py-1 md:py-3 pl-4 leading-8 transition-colors duration-200 ease-in-out"
                    {...register("email")}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div className="relative mt-4">
                <label className="leading-7 text-start text-white fmSaira text-lg md:text-xl font-medium">
                  Your Password
                </label>
                <div className="relative mt-2">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full bg-zinc-900 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-100 py-1 md:py-3 pl-4 leading-8 transition-colors duration-200 ease-in-out"
                    {...register("password")}
                  />
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              
              <button
                className="text-black bg-white w-full border-0 py-2 md:py-4 mx-auto px-6 mb-2 mt-10 rounded font-semibold text-md"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing" : "Login"}
              </button>
            </form>
            <p className="text-center text-gray-600 text-xl md:text-2xl font-normal mt-6">Or login with</p>
            <div className="flex justify-center mt-8">
            <img src={FacebookIcon} alt="facebook" width={70}/>
            <img src={GoogleIcon} alt="Google" width={70} className="mx-6" />

            <img src={appleIcon} alt="apple" width={70} />
            </div>

            <p className="leading-7 mt-8 text-center text-gray-100 text-xl md:text-2xl font-jakarta font-normal">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-700 font-medium">
                Signup
              </a>
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

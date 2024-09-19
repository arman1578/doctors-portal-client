import React  from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GoogleAuthProvider } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import useToken from "../../hooks/useToken";

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn, providerLogin } = useContext(AuthContext) ?? {};
    const [ error, setError ] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname ?? '/';

    if(token){
        navigate('/appointment');
    }

    const handleGoogleSignIn = () => {
      providerLogin?.(new GoogleAuthProvider())
      .then(result => {
          const user = result?.user;
          toast.success('Login Successful');
          navigate(from, {replace: true});
      })
      .catch(error => console.error(error));
  }

    const Submit = (data) => {
        setError('');
        signIn?.(data.email, data.password)
        .then(result => {
            const user = result?.user;
            setLoginUserEmail(data.email);
            fetch('https://doctors-portal-server-kappa-wine.vercel.app/jwt', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({email: user?.email})
            })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('access-token', data.token);
                toast.success('Login Successful');
                navigate(from, {replace: true});
            })
            .catch(error => console.error(error));
        })
        .catch(error => {
            console.error(error);
            setError(error?.message);
        })
        }

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7 shadow-2xl rounded mx-3 bg-base-100">
        <h2 className="text-3xl text-center font-bold mb-10">Login</h2>
        <form onSubmit={handleSubmit(Submit)}>
          <div className="form-control w-full max-w-xs">
            <label className="lable">
                <span className="label-text text-xl">
                    Email
                </span>
            </label>
            <input type="email" placeholder="admin@gmail.com" className="input input-bordered w-full max-w-xs" 
            {...register("email", {required: "Email is required"})}/>
            {errors.email && <p className="text-red-600 mt-1 text-sm font-semibold text-left ml-1">{errors.email.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="lable">
                <span className="label-text text-xl">
                    Password
                </span>
            </label>
            <input type="password" placeholder="admin123" className="input input-bordered w-full max-w-xs"
            {...register("password", {required: "Password is required", minLength: {value: 8, message: "Must be 8 characters or longer" }})}/>
            {errors.password && <p className="text-red-600 mt-1 text-sm font-semibold text-left ml-1">{errors.password.message}</p>}
          </div>
          <label className="label">
            <span className="label-text">
                Forget Password?
            </span>
          </label>
          <input type="submit" className="btn btn-accent w-full max-w-xs mt-5" value="Login" />
          {error && <p className="text-red-600 mt-1 text-sm font-semibold text-left ml-1">{error}</p>}
          <p className="text-center my-3 text-sm">New to Doctors Portal? <Link to="/signup" className="text-secondary">Create New Account</Link></p>
          <div className="divider">
            OR
          </div>
        </form>
        <button onClick={handleGoogleSignIn} className="btn btn-outline btn-accent w-full max-w-xs"><FaGoogle className="mr-2"/>CONTINUE
          WITH GOOGLE</button>
      </div>
    </div>
  );
};

export default Login;

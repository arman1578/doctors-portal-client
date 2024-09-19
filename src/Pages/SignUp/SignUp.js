import React,  {  useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";
import { GoogleAuthProvider } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import useToken from "../../hooks/useToken";



const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, providerLogin, updateUserProfile } = useContext( AuthContext );
    const [ error, setError ] = useState('');
    const location = useLocation();
    const [ createdUserEmail, setCreatedUseremail ] = useState( '' );
    const [ token ] = useToken( createdUserEmail );
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    
    if (token) {
        navigate('/');
    }


    const handleGoogleSignIn = () => {
        providerLogin( new GoogleAuthProvider() )
        .then(result => {
            const user = result.user;
            toast.success('Login Successful');
            navigate(from, {replace: true});
        })
        .catch(error => console.error(error));
    }

    const onSubmit = (data) => {
        setError('');
        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            const profile = {
                displayName: data.name
            }
            updateUserProfile(profile)
            .then(() => {
              saveUser(data.name, data.email);
            })
            .catch(error => console.error(error));
        })
        .catch(error => {
            console.error(error);
            setError(error.message);
            toast.error(error.message);
        })
    }

    const saveUser = (name, email) => {
        const user = { name, email };
        fetch('https://doctors-portal-server-kappa-wine.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUseremail(email);
                if (data.acknowledged) {
                    toast.success('User Created Successfully');
                }
                else {
                    toast.error(data.message);
                    setError(data.message);
                }
            })
            .catch(err => console.error(err));
    }

  return (
    <div className="h-[800px] flex gap-5 justify-center items-center">
      <div className="w-96 p-7 shadow-2xl rounded mx-3 bg-base-100">
        <h2 className="text-3xl text-center font-bold mb-10">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs">
            <label className="lable mb-2">
              <span className="label-text text-xl">Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs mb-5"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-600 mt-1 text-sm font-semibold text-left ml-1">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="lable mb-2">
              <span className="label-text text-xl">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered mb-5 w-full max-w-xs"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-600 mt-1 text-sm font-semibold text-left ml-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="lable mb-2">
              <span className="label-text text-xl">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered mb-5 w-full max-w-xs"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Must be 8 characters or longer",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600 mt-1 text-sm font-semibold text-left ml-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <input
            type="submit"
            className="btn btn-accent w-full max-w-xs mt-5 text-white"
            value="Sign Up"
          />
          {error && <p className="text-red-600 mt-1 text-sm font-semibold text-left ml-1">{error}</p>}
          <p className="text-center my-3 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-secondary">
              Please Login
            </Link>
          </p>
          <div className="divider">OR</div>
        </form>
          <button
            type="submit"
            onClick={handleGoogleSignIn}
            className="btn btn-outline btn-accent w-full max-w-xs mt-5"
          >
            <FaGoogle className="mr-2 text-2xl" />
            Continue with Google
          </button>
      </div>
    </div>
  );
};

export default SignUp;

import Button from '../components/Button';
import { LeftChevron, Logo } from '../Icon/Icon';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Link } from 'react-router-dom';

const Signin = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const navigate = useNavigate();

  const signin = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/auth/login`, { email, password });
      const token = res.data.token;
      localStorage.setItem("token", token);

      // Decode JWT to get role (base64 decode the payload)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role;

      setLoading(false);
      navigate(`/dashboard-${role}`);
    } catch (err: any) {
      setLoading(false);
      if (err.response) {
        setError(err.response.data.message || "Login failed");
      } else {
        setError("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className='flex flex-col md:flex-row min-h-screen w-full'>
      <div className='hidden md:flex flex-col gap-3 items-center justify-center w-1/2 bg-blue-200/50'>
        <div className='text-3xl text-blue-900'>
          <Logo />
        </div>
        <div className='text-4xl text-blue-950 font-bold'>
          Healthcare
        </div>
        <div className='text-blue-950 text-xl font-semibold'>
          Medical App
        </div>
      </div>
      <div className='w-full md:w-1/2 flex flex-col justify-center'>
        <div className='flex flex-col items-center justify-center gap-3 px-6 p-4 '>
          <div className='relative md:w-1/2 w-full flex flex-row items-center justify-center '>
            <div className='absolute left-0 cursor-pointer '>
              <span onClick={() => navigate(-1)}>
                <LeftChevron />
              </span>
            </div>
            <div className='text-center text-2xl mb-4 font-bold text-gray-800'>
              Sign in
            </div>
          </div>
          <div className='w-full max-w-md'>
            <div className='flex gap-4 flex-col'>
              <Input placeholder="Enter Your Email" reference={emailRef} />
              <Input placeholder="Enter Your Password" variant="password" reference={passwordRef} />
            </div>
            <p className=' text-[#407CE2] cursor-pointer  font-semibold text-right my-3'>
              Forget Password?
            </p>
            {error && <p className='text-red-500 text-sm mb-4 text-center font-medium'>{error}</p>}
            <Button innerText="Sign in" variant="primary" onClick={signin} loading={loading} />
            <div className='text-center text-sm text-gray-600 mt-4'>
              Don't have an account?{" "}
              <span className='text-blue-500 font-medium cursor-pointer'>
                <Link to="/select-role">Sign Up</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;

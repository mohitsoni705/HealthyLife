import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { LeftChevron, Logo } from '../Icon/Icon';
import SignUpForm from '../components/SignUpForm';

const Signup = () => {
  const nameRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const role = localStorage.getItem('selectedRole') || 'doctor';

  async function signup() {
    const username = nameRef.current?.value;
    const password = passwordRef.current?.value;
    const email = emailRef.current?.value;

    if (!username || !password || !email) {
      setError("Please fill all fields");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await axios.post(`http://localhost:8000/api/v1/auth/signup`, {
        username,
        password,
        email,
        role
      })
      setLoading(false);
      alert("Account created successfully!");
      navigate("/signin")
    } catch (err: any) {
      setLoading(false);
      if (err.response && err.response.status === 401) {
        setError("User already exists");
      } else {
        setError("Server error. Please try again later.");
      }
    }
  }

  return (
    <div className='flex flex-col md:flex-row min-h-screen w-full'>
      {/* LEFT SIDE */}
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

      {/* RIGHT SIDE */}
      <div className='w-full md:w-1/2 flex flex-col gap-8 items-center justify-center px-6 py-4'>
        <div className='relative md:w-1/2 w-full flex flex-row items-center justify-center '>
          <div className='absolute left-0 cursor-pointer '>
            <span onClick={() => navigate(-1)}>
              <LeftChevron />
            </span>
          </div>
          <div className='text-center text-2xl font-bold text-gray-800'>
            Sign Up
          </div>
        </div>

        <div className='w-full max-w-md'>
          <SignUpForm nameRef={nameRef} passwordRef={passwordRef} emailRef={emailRef} signup={signup} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default Signup;

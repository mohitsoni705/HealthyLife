import { LockIcon, MailIcon, UserIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import Input from './Input'
import Button from './Button'

const SignUpForm = ({ nameRef, passwordRef, emailRef, signup, loading, error }: any) => {
  return (
    <div className='w-full max-w-md space-y-6'>
      <Input
        placeholder="Enter your name"
        leftIcon={<UserIcon />}
        reference={nameRef}
      />
      <Input
        placeholder="Enter your email"
        leftIcon={<MailIcon />}
        reference={emailRef}
      />
      <Input
        variant="password"
        placeholder="Enter your password"
        leftIcon={<LockIcon />}
        reference={passwordRef}
      />
      <div className='flex items-center justify-center gap-3 text-sm text-gray-600'>
        <input type='checkbox' className='mt-1 w-5 h-5 rounded-2xl border-gray-300' />
        <p>
          I agree to the healthcare{" "}
          <span className='text-blue-500 cursor-pointer'>Terms of Service</span>{" "}
          and{" "}
          <span className='text-blue-500 cursor-pointer'>Privacy Policy</span>
        </p>
      </div>
      {error && <p className='text-red-500 text-sm text-center font-medium'>{error}</p>}
      <div>
        <Button innerText="Sign Up" onClick={signup} loading={loading} />
      </div>
      <div className='text-center text-sm text-gray-600'>
        Already have an account?{" "}
        <span className='text-blue-500 font-medium cursor-pointer'>
          <Link to="/signin">Sign In</Link>
        </span>
      </div>
    </div>
  )
}

export default SignUpForm;

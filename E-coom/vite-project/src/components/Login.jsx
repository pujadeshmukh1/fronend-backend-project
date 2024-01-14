import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);

  const validateForm = () => {
    // Simple email validation
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) {
      alert('Please enter a valid email address');
      return false;
    }

    // Simple password validation
    if (!form.password || form.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleOnClick = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      return;
    }

    try {
      // Simulate API call
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({ email: form.email, password: form.password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Authentication FAILED');
      }

      const data = await response.json();
      const token = data.token;
      console.log(form);
      console.log('user logged in with token', token);

      // Redirect to the dashboard upon successful login
      navigate('dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordPopup(true);
  };

  const closeForgotPasswordPopup = () => {
    setShowForgotPasswordPopup(false);
  };

  return (
    <div className='flex ml-1 items-center min-h-screen bg-cover bg-center' style={{ backgroundImage: 'url("./img/image1.png")' }}>
      <div className='flex'>
        <div className='flex-1'>
          <div className='bg-white shadow-md p-6 rounded-md w-96'>
            <div className='flex mx-28'>
              <img className='' src="./img/image2.png" alt="" />
            </div>

            <p className='text-gray-600 mb-6'>Welcome to Digitalflake Admin</p>
            <form>
              <div className="mb-3">
                <label htmlFor='formBasicEmail' className='block text-sm font-medium text-gray-700'>
                  Email address
                </label>
                <input
                  type="email"
                  className='mt-1 p-2 w-full border rounded-md'
                  id="formBasicEmail"
                  placeholder="Enter email"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label htmlFor='formBasicPassword' className='block text-sm font-medium text-gray-700'>
                  Password
                </label>
                <input
                  type="password"
                  className='mt-1 p-2 w-full border rounded-md'
                  id="formBasicPassword"
                  placeholder="Password"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
              <div className='flex justify-end'>
                <p className='text-[#5C218B] cursor-pointer' onClick={handleForgotPasswordClick}>
                  Forgot Password?
                </p>
              </div>

              <button type="submit" className='bg-[#5C218B] text-white w-full mt-5 py-2 rounded-md' onClick={handleOnClick}>
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
      {showForgotPasswordPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md">
            <div className=''>
              <p className='text-[#662671]  text-xl font-semibold'>Did you forget your password?</p>
              <p></p>
            </div>
            <p>Email Address</p>
            <input type="text" className='border 1px solid transferent border-redius-[5px]' />
            <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
            {/* Add your forgot password form or content here */}
            <button className="text-[#5C218B] underline cursor-pointer" onClick={closeForgotPasswordPopup}>
              Back to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;

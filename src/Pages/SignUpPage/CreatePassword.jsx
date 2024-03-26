import React, { useState } from 'react';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom'; // Assuming you are using React Router

const CreatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();

  const { userData } = location.state || {};

  const handleVerify = async () => {
    try {
      // Validate passwords
      if (password !== confirmPassword) {
        setError('Passwords must match');
        return;
      }

      if (password.length < 8) {
        setError('Password must be at least 8 characters');
        return;
      }

      // Make a fetch request to your backend API to verify the OTP
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/app/user/forgetPassword`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile_number: userData?.mobile,
            password: password,
            // Add any other required parameters here
          }),
        }
      );

      if (response.ok) {
        console.log(userData.mobile, password);
        // If registration is successful, you can redirect to the desired page
        alert("Your Password Created Successfully!");
        // Redirect to the home page or any other page after successful registration
        // navigate("/");
      } else {
        // Handle the case where registration failed
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div>
      <section className="">
        <div className="flex flex-col items-center mt-6 px-6 py-2 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create Password
            </h2>
            <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="flex items-start">
                <button
                  type="button"
                  onClick={handleVerify}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreatePassword;

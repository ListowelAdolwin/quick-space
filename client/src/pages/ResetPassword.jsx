// ResetPassword.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { toast, ToastContainer } from 'react-toastify';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords don't match!");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/reset-password`, { token, password });
            //console.log("Response: ", response);
            toast.success("Password reset successful. Please login");
            navigate("/login");
        } catch (error) {
            //console.log("Response: ", response);
            setMessage('Error: ' + error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-blue-800 mb-4">
                        Enter new password
                    </h1>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        {message && (
                            <ErrorMessage errorMessage={message} />
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 font-bold mb-2"
                                    htmlFor="password"
                                >
                                    Password
                                    <p className="font-light text-xs italic">
                                        Enter your new password
                                    </p>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 font-bold mb-2"
                                    htmlFor="password"
                                >
                                    Confirm Password
                                    <p className="font-light text-xs italic">
                                        Re-enter your password to confirm
                                    </p>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
                                    placeholder="Enter confirm password"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Reset password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ResetPassword;

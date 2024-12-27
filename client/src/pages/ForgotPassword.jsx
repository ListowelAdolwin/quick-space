import React, { useState } from 'react';
import axios from 'axios';
import ErrorMessage from '../components/ErrorMessage';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const BASE_URL = import.meta.env.VITE_BASE_URL;
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/forgot-password`, { email });
            toast.info(`Password reset link sent to ${email}`)
        } catch (error) {
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
                        Reset Password
                    </h1>
                    <div className="bg-white p-6 rounded-lg shadow-md">

                        {message && (
                            <ErrorMessage errorMessage={message} />
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 font-bold mb-2"
                                    htmlFor="email"
                                >
                                    Email
                                    <p className="font-light text-xs italic">
                                        Enter the email you used to register your account
                                    </p>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-200 focus:bg-white text-gray-800 p-2 rounded w-full"
                                    placeholder="Enter email"
                                    required
                                />
                            </div>
                            <div className="mb-2 text-blue-600">
                                <Link to="/login">Back to Login</Link>
                            </div>
                            <div className="mb-2">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Send reset link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ForgotPassword;

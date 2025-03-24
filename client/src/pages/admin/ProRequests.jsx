import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const ProRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { currentUser } = useSelector((state) => state.user);

    // Fetch data from the backend
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/users/pro-requests`,
                    {
                        headers: {
                            Authorization: `Bearer ${currentUser?.accessToken}`,
                        },
                    }
                );
                setRequests(response.data);
            } catch (error) {
                console.error("Error fetching vendor requests:", error);
            }
        };

        fetchRequests();
    }, []);

    // Function to handle the search filter
    const handleSearch = () => {
        setRequests((prevRequests) =>
            prevRequests.filter(
                (request) =>
                    request.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    request.school.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    };

    // Function to handle approval
    const handleApprove = async (id) => {
        try {
            await axios.post(`${BASE_URL}/api/users/make-pro/${id}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${currentUser?.accessToken}`,
                    },
                }
            );
            setRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request._id === id ? { ...request, isPro: true } : request
                )
            );
        } catch (error) {
            console.error("Error approving vendor request:", error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 min-h-screen">
            <h2 className="text-3xl font-semibold text-gray-800">Manage Pro Requests</h2>
            <p className="mt-2 text-gray-600">Upgrade vendors to Pro</p>

            {/* Search bar */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex space-x-2 w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search by name, email, or school"
                        className="border border-gray-300 p-2 rounded-md w-full sm:w-80"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white py-2 px-4 rounded-sm hover:bg-blue-700 transition duration-300"
                    >
                        Search
                    </button>
                </div>
                
            </div>
            <div className="mb-3 mt-2"><span className="font-bold">{requests && requests.length}</span> vendors found</div>

            {/* Vendor requests cards */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map((request) => (
                    <div
                        key={request._id}
                        className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                        <h3 className="text-xl font-semibold text-gray-800">{request.vendorName}</h3>
                        <p className="text-gray-500 mt-2">Contact: {request.contact}</p>
                        <p className="text-gray-500 mt-2">Email: {request.email}</p>
                        <p className="text-gray-500 mt-2">School: {request.school}</p>
                        <p className={`text-sm font-semibold mt-4 ${request.isPro ? "text-green-600" : "text-yellow-600"}`}>
                            Status: {request.isPro ? "Active" : "Pending"}
                        </p>
                        {!request.isPro && (
                            <button
                                onClick={() => handleApprove(request._id)}
                                className="mt-4 bg-green-500 text-white p-3 rounded-md w-full hover:bg-green-600 transition duration-300"
                            >
                                Approve
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProRequestsPage;

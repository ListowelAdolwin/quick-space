import React, { useState } from "react";

const ShareProfileButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("Copy URL");

  const profileUrl = window.location.href;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCopyStatus("Copy URL");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl).then(() => {
      setCopyStatus("Copied!");
    });
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
      >
        Share Profile
      </button>

      {/* Modal for Copying URL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-100 rounded-lg p-6 w-80">
            <h3 className="text-lg font-semibold text-star mb-4 text-blue-700">
              Share Your Profile
            </h3>
            <p className="text-sm text-start mb-4 break-all">{profileUrl}</p>
            <button
              onClick={copyToClipboard}
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition duration-300"
            >
              {copyStatus}
            </button>
            <button
              onClick={closeModal}
              className="w-full py-2 mt-2 bg-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-400 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareProfileButton;

import React from "react";

const ShareProfileButton = () => {
  const profileUrl = window.location.href;

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this profile",
        url: profileUrl,
      })
      .then(() => console.log("Profile shared successfully"))
      .catch((error) => console.error("Error sharing profile:", error));
    } else {
      alert("Sharing is not supported on this device/browser.");
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleShareClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
      >
        Share Profile
      </button>
    </div>
  );
};

export default ShareProfileButton;

import React from "react";

const CustomShareButton = () => {
    const profileUrl = window.location.href;

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=Check%20out%20this%20profile:%20${encodeURIComponent(profileUrl)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(profileUrl)}`;

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this profile",
        url: profileUrl,
      })
      .then(() => console.log("Profile shared successfully"))
      .catch((error) => console.error("Error sharing profile:", error));
    } else {
      // Fallback to a custom share link (for desktop or unsupported browsers)
      window.open(twitterShareUrl, "_blank"); // example fallback to Twitter
    }
  };

  return (
    <div className="flex justify-center space-x-4">
      <button
        onClick={handleShareClick}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition duration-300"
      >
        Share Profile
      </button>
      
      {/* Custom Social Media Share Buttons */}
      <div className="flex space-x-4">
        {/* Custom Button for Twitter */}
        <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
            Twitter
          </button>
        </a>

        {/* Custom Button for Facebook */}
        <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer">
          <button className="px-4 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800">
            Facebook
          </button>
        </a>

        {/* Custom Button for WhatsApp */}
        <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
          <button className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600">
            WhatsApp
          </button>
        </a>
      </div>
    </div>
  );
};

export default CustomShareButton;

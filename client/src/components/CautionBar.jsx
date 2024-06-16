const CautionBar = () => {
	return (
		<div
			data-hs-carousel='{
    "loadingClasses": "opacity-0",
    "isAutoPlay": true
  }'
			className="bg-blue-600 text-white mt-2"
		>
			<div className="hs-carousel relative overflow-hidden w-full h-8 md:h-8 md:text-base">
				<div className="hs-carousel-body flex flex-nowrap transition-transform duration-1000 opacity-0 mt-1">
					<div className="hs-carousel-slide text-center">
						<span className="transition duration-1000 text-center">
							Please meet vendors only in open areas
						</span>
					</div>
					<div className="hs-carousel-slide text-center">
						<span className=" transition duration-1000 text-center">
							Never share your personal info with unknown vendors.
						</span>
					</div>
					<div className="hs-carousel-slide text-center">
						<span className=" transition duration-1000 text-center">
							Always verify the vendor&apos;s identity.
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CautionBar;

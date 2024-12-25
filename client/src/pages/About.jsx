import ReactGA from "react-ga4";

const About = () => {
	ReactGA.send({
		hitType: "pageview",
		page: "/about",
		title: "About Page",
	});
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<h1 className="text-3xl font-bold text-blue-800 mb-4">
						About Us
					</h1>
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-semibold text-gray-800">
							Our Mission
						</h2>
						<p className="mt-4 text-gray-600">
							Our mission transcends mere technological
							implementation; it is about creating a holistic
							ecosystem that supports students, nurtures
							entrepreneurship, and paves the way for a brighter
							future. 🚀📚🌟
						</p>
						<h2 className="text-2xl font-semibold text-gray-800 mt-8">
							Our Vision
						</h2>
						<p className="mt-4 text-gray-600">
							Our vision is to be able to create a seamless
							marketplace where buyers and vendors converge
							effortlessly. We empower students to access an
							extensive range of goods and services, all at
							competitive prices. Simultaneously, we provide
							sellers with innovative avenues to connect with
							customers and expand their businesses.
						</p>
						<h2 className="text-2xl font-semibold text-gray-800 mt-8">
							Meet the Team
						</h2>
						<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							<div className="bg-gray-100 p-4 rounded-lg shadow-md">
								<img
									src="https://via.placeholder.com/150"
									alt="Team Member 1"
									className="w-32 h-32 rounded-full mx-auto"
								/>
								<h3 className="text-xl font-semibold text-center text-gray-800 mt-4">
									Kofi Boakye
								</h3>
								<p className="text-center text-gray-600">
									Founder & CEO
								</p>
							</div>
							<div className="bg-gray-100 p-4 rounded-lg shadow-md">
								<img
									src="https://via.placeholder.com/150"
									alt="Team Member 2"
									className="w-32 h-32 rounded-full mx-auto"
								/>
								<h3 className="text-xl font-semibold text-center text-gray-800 mt-4">
									Jane Smith
								</h3>
								<p className="text-center text-gray-600">
									Chief Marketing Officer
								</p>
							</div>
							<div className="bg-gray-100 p-4 rounded-lg shadow-md">
								<img
									src="https://via.placeholder.com/150"
									alt="Team Member 3"
									className="w-32 h-32 rounded-full mx-auto"
								/>
								<h3 className="text-xl font-semibold text-center text-gray-800 mt-4">
									Alice Johnson
								</h3>
								<p className="text-center text-gray-600">
									Head of Customer Support
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default About;

const About = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-4">
						About Us
					</h1>
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-semibold text-gray-800">
							Our Story
						</h2>
						<p className="mt-4 text-gray-600">
							Welcome to our eCommerce store! We started our
							journey in 2021 with the aim of providing
							high-quality products at affordable prices. Our
							mission is to make shopping easy and enjoyable for
							everyone.
						</p>
						<h2 className="text-2xl font-semibold text-gray-800 mt-8">
							Our Values
						</h2>
						<ul className="mt-4 list-disc list-inside text-gray-600">
							<li>
								Customer Satisfaction: We prioritize our
								customers and strive to provide the best service
								possible.
							</li>
							<li>
								Quality Products: We ensure that all our
								products meet high standards of quality.
							</li>
							<li>
								Integrity: We believe in honest and transparent
								business practices.
							</li>
						</ul>
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
									John Doe
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

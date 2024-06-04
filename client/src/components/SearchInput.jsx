import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SearchInput() {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchData, setSearchData] = useState({
		searchTerm: "",
		price: "",
		category: "",
		school: "",
	});

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const searchTermFromUrl = urlParams.get("searchTerm") || "";
		const categoryFromUrl = urlParams.get("category") || "";
		const priceFromUrl = urlParams.get("price") || "";
		const schoolFromUrl = urlParams.get("school") || "";
		if (schoolFromUrl === "all") {
			urlParams.set("school", "");
		}

		setSearchData({
			price: priceFromUrl,
			category: categoryFromUrl,
			school: schoolFromUrl,
		});

		setSearchTerm(searchTermFromUrl)

	}, [location.search]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const urlParams = new URLSearchParams({
			searchTerm: searchTerm,
			price: searchData.price,
			category: searchData.category,
			school: searchData.school,
		});
		const searchQuery = urlParams.toString();
		console.log(searchQuery);
		navigate(`/search?${searchQuery}`);
	};

	// const handleSearchChange = (e) => {
	// 	setSearchTerm(e.target.value);
	// };

	// const handleSubmit = (e) => {
	// 	e.preventDefault()
	// 	navigate(`/search?searchTerm=${searchTerm}`);
	// };

	return (
		<div className="mx-auto w-full mt-2 px-2 inline-block md:hidden">
			<form onSubmit={handleSubmit} className="flex items-center">
				<input
					type="text"
					id="searchTerm"
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value);
					}}
					className=" border border-blue-500 text-sm rounded-s-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					placeholder="Search by product or business name"
				/>
				<button
					type="submit"
					className="border border-blue-500 px-3 py-3 rounded-e-lg text-blue-800 focus:ring-blue-500 focus:border-blue-500 hover:opacity-75"
				>
					<svg
						className="w-4 h-4"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
						/>
					</svg>
				</button>
			</form>
		</div>
	);
}

export default SearchInput;

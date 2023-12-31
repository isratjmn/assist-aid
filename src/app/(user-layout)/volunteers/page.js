"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import teamWork from "../../../../public/groupImage.gif";
const imgToken = process.env.NEXT_PUBLIC_IMGBB_API_Token;

//---- For Getting the environment variables we have to use [process.env.key_name] instead of [import.meta.env.key_name] in NEXT JS -source NEXT JS  Environment Variables Docs----//
// For Names we have to use NEXT_PUBLIC_Key_name, Exceptions only to db name and password

const Volunteers = () => {
	const img_hosting_URl = `https://api.imgbb.com/1/upload?key=${imgToken}`;

	const handleVolunteers = async (event) => {
		event.preventDefault();
		const form = event.target;
		const name = form.name.value;
		const email = form.email.value;
		const designation = form.designation.value;
		const bloodGroup = form.bloodGroup.value;
		const phoneNumber = form.phoneNumber.value;
		const workPlace = form.workPlace.value;

		const formData = new FormData();
		formData.append("image", form.imageURL.files[0]);

		const imgRes = await fetch(img_hosting_URl, {
			method: "POST",
			body: formData,
		});
		const imageResponse = await imgRes.json();

		if (imageResponse.success) {
			const imageURL = imageResponse.data.display_url;
			const volunteerData = {
				name,
				email,
				designation,
				imageURL,
				bloodGroup,
				phoneNumber: parseInt(phoneNumber),
				workPlace,
			};
			// console.log({ volunteerData });
			let result = await fetch("/api/volunteers", {
				method: "POST",
				body: JSON.stringify(volunteerData),
			});
			result = await result.json();
			if (result.success) {
				toast.success("Successfully Added!");
			}
		}
	};

	return (
		<section className="bg-gray-100 min-h-screen pt-8 mt-14">
			<div className="border rounded-lg m-10 md:m-16 lg:mt-10 lg:mb-20 lg:mx-52 lg:px-20 lg:py-14 md:p-16 p-10 bg-white shadow-lg">
				<h2 className="text-center font-bold text-4xl text-emerald-600 mb-2">
					Become a Volunteer
				</h2>
				<p className="text-center text-sm mb-5 lg:mb-10">
					If you want to be a Volunteer then fill up this form
				</p>

				<div className="flex flex-col lg:flex-row justify-center items-center gap-20">
					<div className="w-full lg:w-1/2">
						<Image src={teamWork} width={500} alt="Nothing here" />
					</div>
					<div className="w-full lg:w-1/2 border border-emerald-600 rounded-lg p-8">
						<form onSubmit={handleVolunteers} className="space-y-4">
							<div className="relative z-0">
								<input
									type="text"
									className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
									placeholder="Name"
									required
								/>
								<label
									htmlFor="name"
									className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300  -translate-y-6  top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-400 peer-focus:dark:text-green-400  peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
								></label>
							</div>
							<div className="relative z-0 w-full mb-6 group">
								<input
									type="email"
									name="email"
									id="email"
									className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-400 peer"
									placeholder="Email"
									required
								/>
								<label
									htmlFor="email"
									className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300  -translate-y-6 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-400 peer-focus:dark:text-green-400  peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
								></label>
							</div>
							<div className="relative z-0 w-full mb-6 group">
								<input
									type="file"
									name="imageURL"
									id="imageURL"
									className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
									placeholder="Image"
									required
								/>
								<label
									htmlFor="imageURL"
									className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300  -translate-y-6 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-400 peer-focus:dark:text-green-400  peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
								></label>
							</div>
							<div className="grid md:grid-cols-2 md:gap-6">
								<div className="relative z-0 w-full mb-6 group">
									<input
										defaultValue="volunteer"
										type="text"
										name="designation"
										id="designation"
										className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
										placeholder="Designation"
										readOnly
									/>
									<label
										htmlFor="designation"
										className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300  -translate-y-6 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-400 peer-focus:dark:text-green-400  peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
									></label>
								</div>
								<div className="relative z-0 w-full mb-6 group">
									<input
										type="text"
										name="bloodGroup"
										id="bloodGroup"
										className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
										placeholder="Blood Group"
										required
									/>
									<label
										htmlFor="bloodGroup"
										className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300  -translate-y-6 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-400 peer-focus:dark:text-green-400  peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
									></label>
								</div>
							</div>

							<div className="relative z-0 w-full mb-6 group">
								<input
									type="number"
									name="phoneNumber"
									id="phoneNumber"
									className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
									placeholder="Phone number (+8801xxxxxxxxx)"
									required
								/>
								<label
									htmlhtmlFor="phoneNumber"
									className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300  -translate-y-6 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-400 peer-focus:dark:text-green-400  peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
								></label>
							</div>
							<div className="relative z-0 w-full mb-6 group">
								<input
									type="text"
									name="workPlace"
									id="workPlace"
									className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
									placeholder="Work Place"
									required
								/>
								<label
									htmlFor="workPlace"
									className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300  -translate-y-6 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-400 peer-focus:dark:text-green-400  peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6"
								></label>
							</div>

							<button
								type="submit"
								className="text-white bg-green-500 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-500"
							>
								Submit
							</button>
						</form>
					</div>
				</div>
				<h2 className="text-center md:text-end lg:text-end md:text-xs lg:text-xs md:mx-10 lg:mx-10 my-5 text-emerald-600">
					(*Please Wait some moment to upload the image)
				</h2>
			</div>
		</section>
	);
};

export default Volunteers;

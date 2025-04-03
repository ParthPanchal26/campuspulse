import { useState } from "react"
import { Button, FormHeading, InputBox, TextArea, DropDown, RequestLogin } from "../components"
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const CreateEvent = () => {

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [venue, setVenue] = useState('');
	const [organizedBy, setOrganizedBy] = useState('');
	const [price, setPrice] = useState('');
	const [totalSeats, setTotalSeats] = useState('');
	const [availableSeats, setAvailableSeats] = useState('');
	const [category, setCategory] = useState('');
	const [registrationDeadline, setRegistrationDeadline] = useState('');
	const [contactEmail, setContactEmail] = useState('');
	const [contactPhone, setContactPhone] = useState('');
	const [tags, setTags] = useState([]);

	const server_uri = import.meta.env.VITE_SERVER_URI;
	const token = useSelector((state) => state?.auth?.token);
	
	const navigate = useNavigate();

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(`${server_uri}/events/`, {
				name,
				description,
				date,
				time,
				venue,
				organizedBy,
				price,
				totalSeats,
				availableSeats,
				category,
				registrationDeadline,
				contactEmail,
				contactPhone,
				tags
			}, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				withCredentials: true,
			})

			const { message } = response.data;

			toast.success(message);

			navigate("/campuspulse/events");

		} catch (error) {
			toast.error(error.response.data.message)
		}

	}


	return (
		<>
			{token
				? <>
					<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
						<FormHeading heading="Create an Event" />

						<div className="mt-5 sm:mx-auto sm:w-[1080px]">
							<form onSubmit={submitHandler} method="POST" className="space-y-6">

								<InputBox label="Name" value={name} placeholder='Event Name' setValue={setName} id="e_name" name="name" type="text" />

								<TextArea label="Description" value={description} rows={5} placeholder='Event Description' setValue={setDescription} id="e_desc" name="description" type="textarea" />

								<div className="sm:flex gap-5">
									<InputBox label="date" value={date} setValue={setDate} id="e_date" name="date" type="date" />
									<InputBox label="Time" value={time} setValue={setTime} id="e_time" name="time" type="time" />
									<InputBox label="Venue" value={venue} placeholder='Venue' setValue={setVenue} id="e_venue" name="venue" type="text" />
									<InputBox label="Organized By" value={organizedBy} placeholder='Organizer Name' setValue={setOrganizedBy} id="e_org_by" name="organizedBy" type="text" />
									<InputBox label="Price" value={price} setValue={setPrice} placeholder="1234" id="e_price" name="price" type="number" min="0" />
									<InputBox label="Total Seats" value={totalSeats} setValue={setTotalSeats} placeholder="1234" id="e_totalSeats" name="totalSeats" type="number" min="0" />
								</div>

								<div className="sm:flex gap-5">
									<InputBox label="Available Seats" value={availableSeats} setValue={setAvailableSeats} placeholder="1234" id="e_availableSeats" name="availableSeats" type="number" min="0" />
									<InputBox label="Registration Deadline" value={registrationDeadline} setValue={setRegistrationDeadline} id="e_registrationDeadline" name="registrationDeadline" type="date" />

									<DropDown label="Category" value={category} setValue={setCategory} id="e_category" name="category" className="mt-1 py-2 transition-all hover:bg-slate-100" />

									<InputBox label="Contact Email" value={contactEmail} placeholder="example@gmail.com" setValue={setContactEmail} id="e_contactEmail" name="contactEmail" type="email" />
									<InputBox label="Contact Phone" value={contactPhone} placeholder="123-456-7890" setValue={setContactPhone} id="e_contactPhone" name="contactPhone" type="text" pattern="[0-9]*" inputMode="numeric" />
									<InputBox label="Tags" value={tags} placeholder="#tag1 #tag2 #tag3 ..." setValue={setTags} id="e_tags" name="tags" type="text" />

								</div>

								<Button type="submit" value="Create Event" />
							</form>
						</div>
					</div>
				</>
				: <RequestLogin />
			}
		</>
	)
}

export default CreateEvent
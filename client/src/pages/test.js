import React from 'react';
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import { MdOutlineGrade } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { axios } from '../axios';
import { useState } from 'react';
import Navbar from '../components/Navbar/HomeNav';

function test() {
	const [data, setData] = useState('');
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [email, setEmail] = useState('');
	const [grade, setGrade] = useState('');
	const [password, setPassword] = useState('');
	const [cpassword, setCpassword] = useState('');
	const [error, setError] = useState('');
	const submit = (e) => {
		e.preventDefault();
		if (cpassword === password) {
			const data = {
				firstname: fname,
				lastname: lname,
				email,
				password,
				grade,
			};
			axios
				.post('/auth/signup', data)
				.then((res) => {
					window.location.replace('/checkemail');
				})
				.catch((err) => {
					console.log(err?.response?.data?.message);
					setError(err?.response?.data?.message);
					console.log(error);
				});
		}
	};
	return (
		<div className="flex">
			<div className="h-screen w-[50%] bg-primary-500"></div>
			<div className="h-screen w-[50%] flex flex-col justify-center items-center p-10">
				<div className='flex flex-col justify-center items-center space-y-4 p-4'>
                    <h1 className='text-3xl font-semibold text-primary-500'>Welcome To</h1>
					<img src="../logo.svg" className="w-20" />
                </div>
                <div className='my-2'>
                    <h2 className='text-xl font-semibold text-primary-500'>Create New Account</h2>
                </div>
                <div>
					<form className="flex flex-col justify-center items-center">
						{/* icons */}
						{/*  */}
						<div className="p-5 flex items-center">
							<div>
								<AiOutlineUser className="text-primary-400 text-3xl" />
							</div>
							<div className="w-96 relative group ">
								<input
									type="text"
									name="firstname"
									required
									className="w-full h-10 px-4 text-sm peer border-b-2 border-primary-200 outline-none bg-transparent"
									onChange={(e) => setFname(e.target.value)}
								/>
								<label className="transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 text-primary-500">
									First Name
								</label>
							</div>
						</div>

						<div className="p-5 flex items-center">
							<div>
								<AiOutlineUser className="text-primary-400 text-3xl" />
							</div>
							<div className="w-96 relative group">
								<input
									type="text"
									name="lastname"
									required
									className="w-full h-10 px-4 text-sm peer border-b-2 border-primary-200 outline-none bg-transparent"
									onChange={(e) => setLname(e.target.value)}
								/>
								<label className="transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 text-primary-500">
									Last Name
								</label>
							</div>
						</div>

						<div className="p-5 flex items-center">
							<div>
								<AiOutlineMail className="text-primary-400 text-3xl" />
							</div>
							<div className="w-96 relative group">
								<input
									type="emial"
									name="email"
									required
									className="w-full h-10 px-4 text-sm peer border-b-2 border-primary-200 outline-none bg-transparent"
									onChange={(e) => setEmail(e.target.value)}
								/>
								<label className="transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 text-primary-500">
									Email
								</label>
							</div>
						</div>

						<div className="p-5 flex items-center">
							<div>
								<MdOutlineGrade className="text-primary-400 text-3xl" />
							</div>
							<div className="w-96 relative group">
								<input
									type="text"
									name="grade"
									required
									className="w-full h-10 px-4 text-sm peer border-b-2 border-primary-200 outline-none bg-transparent"
									onChange={(e) => setGrade(e.target.value)}
								/>
								<label className="transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 text-primary-500">
									Grade
								</label>
							</div>
						</div>

						<div className="p-5 flex items-center">
							<div>
								<RiLockPasswordLine className="text-primary-400 text-3xl" />
							</div>
							<div className="w-96 relative group">
								<input
									type="password"
									name="password"
									required
									className="w-full h-10 px-4 text-sm peer border-b-2 border-primary-200 outline-none bg-transparent"
									onChange={(e) => setPassword(e.target.value)}
								/>
								<label className="transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 text-primary-500">
									Password
								</label>
							</div>
						</div>

						<div className="p-5 flex items-center">
							<div>
								<RiLockPasswordLine className="text-primary-400 text-3xl" />
							</div>
							<div className="w-96 relative group">
								<input
									type="password"
									name="conpassword"
									required
									className="w-full h-10 px-4 text-sm peer border-b-2 border-primary-200 outline-none bg-transparent"
									onChange={(e) => setCpassword(e.target.value)}
								/>
								<label className="transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 text-primary-500">
									Confirm Password
								</label>
							</div>
						</div>

						<button
							onClick={submit}
							type="submit"
							className="relative border-2 text-center mt-4 p-2 rounded-md w-full"
						>
							<h2 className="font-semibold">Create Account</h2>
							<div className=" rounded-md absolute top-[-15%] left-[-2%] bg-primary-500/[0.2] w-full h-full hover:top-0 hover:left-0 transition transform duration-200 ease-in-out"></div>
						</button>
						<p className="text-sm ">
							Do you have already have account ?{' '}
							<a className="text-primary-500 cursor-pointer" href="/signin">
								LOGIN
							</a>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}

export default test;

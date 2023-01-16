import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineClose, AiOutlineUser } from 'react-icons/ai';
const ISSERVER = typeof window === 'undefined';
import {checkUser} from '../../utils/checkLocalStorage'

function HomeNav() {
	const [user, setUser] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const menu = (
		<nav className="p-10 absolute top-10 space-y-10 text-2xl flex flex-col items-center h-screen mt-10 lg:hidden  bg-white w-full">
			<p className="active cursor-pointer">Home</p>
			<p className="cursor-pointer">About Us</p>
			<p className="cursor-pointer">Pricing</p>
			<p className="cursor-pointer">
				<Link href={'./signup'}>Sign Up</Link>
			</p>
			<p className="cursor-pointer">
				<Link href={'./signin'}>Login</Link>
			</p>
		</nav>
	);
	useEffect(() => {
		setUser(checkUser())
	});
	return (
		<div className="sticky top-0 bg-white">
			<div className="flex justify-between items-center py-4 px-8">
				<nav className="space-x-10 text-2xl hidden lg:inline-flex">
					<p className="active cursor-pointer">Home</p>
					<p className="cursor-pointer">About Us</p>
					<p className="cursor-pointer">Pricing</p>
				</nav>
				{/* Logo */}

				<div>
					<img src="../logo.svg" className="w-60" />
				</div>

				{/* Sign up and Sign in or account */}
				<div className="space-x-10 text-2xl items-center hidden lg:inline-flex">
					{user ? (
						<div className="bg-primary-500 rounded-full p-1 text-white cursor-pointer hover:shadow-md active:scale-95 transition-transform delay-150 ease-in-out">
							<AiOutlineUser className=" w-6 h-6 lg:w-10 lg:h-10" />
						</div>
					) : (
						<div className="flex space-x-10">
							<Link href={'./signup'}>
								<div className="cursor-pointer px-7 py-1 rounded-xl hover:shadow-md active:scale-95 transition-transform duration-150 ease-in-out">
									Sign Up
								</div>
							</Link>
							<Link href={'/signin'}>
								<div className="bg-primary-500 text-white px-7 py-1 rounded-xl cursor-pointer hover:shadow-md active:scale-95 transition-transform duration-150 ease-in-out">
									Login
								</div>
							</Link>
						</div>
					)}
				</div>
				<div className="lg:hidden" onClick={() => setShowMenu(!showMenu)}>
					{showMenu ? (
						<AiOutlineClose className="w-10 h-10 text-primary-400" />
					) : (
						<AiOutlineMenu className="w-10 h-10 text-primary-400" />
					)}
				</div>
			</div>
			{showMenu ? menu : null}
		</div>
	);
}

export default HomeNav;

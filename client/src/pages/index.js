import { Input } from '@material-tailwind/react';
import Head from 'next/head';
import Image from 'next/image';
import HomeNav from '../components/Navbar/HomeNav';
import Hero from '../components/LandingPage/Hero';

export default function Home() {
	return (
		<div className="">
			<Head>
				<title>Welcome to tibeb</title>
			</Head>

			<HomeNav />
			<Hero />
		</div>
	);
}

'use client';


import { useTranslations } from "next-intl";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Error() {
	const t = useTranslations('Home');

	return (
		<>
			<Navbar/>
			<div className="w-11/12 md:w-4/5 lg:w-3/5 mx-auto mt-20 py-20 flex justify-center">
				<div className="text-lg text-center">Error Occured !</div>
			</div>
			<Footer/>
		</>
		
	);
}

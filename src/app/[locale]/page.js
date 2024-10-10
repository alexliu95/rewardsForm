'use client';
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter } from "next/navigation";

export default function Home() {
	const t = useTranslations('Home');
	const router = useRouter();
	
	const searchParams = useSearchParams();
	const productId = searchParams.get('productId');
	const productName = searchParams.get('productName');
	const productQuantity = searchParams.get('quantity');
	const productDate = searchParams.get('attribute_departure-date');
	const productCity = searchParams.get('attribute_departure-city');

	const [passengerNumber, setPassengerNumber] = useState(1);
	const [passengers, setPassengers] = useState([{},{},{},{},{},{}]);
	const [billing, setBilling] = useState({});
	const [emergency, setEmergency] = useState({roomtype: '', firstname: '', phonenumber: '', email: '', terms: false});
	const [curStep, setCurStep] = useState(0);
	const [confirmNo, setConfirmNo] = useState(null);
	const [errors, setErrors] = useState([]);
	const [billErrors, setBillErrors] = useState([]);
	const [emergencyErrors, setEmergencyErrors] = useState({terms: false});
	const [honeypot, setHoneypot] = useState('');

	// 当页面加载时，检查 localStorage 中是否有数据
	useEffect(() => {
		const savedPassengers = localStorage.getItem('passengerData');
		const savedPassengerNumber = localStorage.getItem('passengerNumber');
		const savedBilling = localStorage.getItem('billing');
		const savedEmergency = localStorage.getItem('emergency');
		if (savedPassengers) {
		  setPassengers(JSON.parse(savedPassengers)); // 从 localStorage 中恢复乘客数据
		  setPassengerNumber(savedPassengerNumber);
		}
		if (savedBilling) {
			setBilling(JSON.parse(savedBilling));
		}
		if (savedEmergency) {
			setEmergency(JSON.parse(savedEmergency));
		}
	}, []);

	useEffect(() => {
		if (!productName) {
			window.location.href = 'https://rewardsholiday.com';
		}
		if (productQuantity) {
			setPassengerNumber(productQuantity);
		}
	}, [productId]);

	const validateForm = () => {
		const requiredFields = ['firstname', 'lastname', 'passportnumber', 'passportexpiry', 'dob', 'nationality', 'phonenumber', 'email'];
		const newErrors = [];
	
		for (let i = 0; i < passengerNumber; i++) {
			const passengerErrors = {};
			
			requiredFields.forEach(field => {
				if (!passengers[i]?.[field]) {
					passengerErrors[field] = true;
				}
			});

			// 验证 email 格式（可选）
			if (passengers[i].email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passengers[i].email)) {
				passengerErrors.email = 'invalid';
			}
	
			newErrors[i] = passengerErrors;
		}
	
		setErrors(newErrors);
	
		// 检查是否所有必填字段都已填写
		return newErrors.every(passengerError => 
			Object.keys(passengerError).length === 0
		);
	};

	const validateBillingForm = () => {
		const requiredFields = ['firstname', 'lastname', 'address', 'city', 'state', 'zipcode', 'country', 'phonenumber', 'email'];
	
		const newErrors = {};
		let isValid = true;
	
		requiredFields.forEach(field => {
			if (!billing[field]) {
				newErrors[field] = true;
				isValid = false;
			}
		});

		// 验证 email 格式（可选）
		if (billing.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billing.email)) {
			newErrors.email = 'invalid';
			isValid = false;
		}
	
		setBillErrors(newErrors);
		return isValid;
	};

	const validateOptionForm = () => {
		const requiredFields = ['roomtype', 'firstname', 'phonenumber', 'email'];
	
		const newErrors = {};
		let isValid = true;
	
		// 验证普通字段
		requiredFields.forEach(field => {
			if (!emergency[field]) {
				newErrors[field] = true;
				isValid = false;
			}
		});
		
		// 验证 email 格式（可选）
		if (emergency.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emergency.email)) {
			newErrors.email = 'invalid';
			isValid = false;
		}
		
		// 验证 terms checkbox
		if (!emergency.terms) {
			newErrors.terms = true;
			isValid = false;
		}
		
		setEmergencyErrors(newErrors);
		return isValid;
	};

	const removePassenger = () => {
		setPassengerNumber(preState => {
			if (preState > 1) {
				return preState -= 1;
			} else {
				return preState;
			}
		})
	};
	const addPassenger = () => {
		setPassengerNumber(preState => {
			if ( preState < 6 ) {
				return preState += 1;
			} else {
				return preState;
			}
		})
	};
	const handlePassengerChange = (index, e) => {
		const { name, value } = e.target;
		const fieldName = name.split('.')[1];
		
		// 更新乘客数据
		const newPassengers = [...passengers];
		if (!newPassengers[index]) {
			newPassengers[index] = {};
		}
		newPassengers[index] = {
			...newPassengers[index],
			[fieldName]: value
		};
		setPassengers(newPassengers);
		
		// 如果该字段有错误，在用户输入时清除错误
		if (errors[index]?.[fieldName]) {
			const newErrors = [...errors];
			if (!newErrors[index]) {
				newErrors[index] = {};
			}
			newErrors[index] = {
				...newErrors[index],
				[fieldName]: false
			};
			setErrors(newErrors);
		}
	};
	const handleBillingChange = (e) => {
		const { name, value } = e.target;
		const fieldName = name.split('.')[1];
		setBilling(prev => ({
			...prev,
			[fieldName]: value
		}));
	
		// 清除错误
		if (errors[fieldName]) {
			setErrors(prev => ({
				...prev,
				[fieldName]: false
			}));
		}
	};
	const handleEmergencyChange = (e) => {
		const { name, value } = e.target;
		const fieldName = name.split('.')[1];

		setEmergency(prev => ({
			...prev,
			[fieldName]: value
		}));
		console.log('fieldname: ', fieldName);
		console.log('value: ', value);

		if (emergencyErrors[fieldName]) {
			setEmergencyErrors(prev => ({
				...prev,
				[fieldName]: false
			}));
		}
	}
	const handleSave = () => {
		localStorage.setItem('passengerData', JSON.stringify(passengers));
		localStorage.setItem('passengerNumber', passengerNumber);
		localStorage.setItem('billing', JSON.stringify(billing));
		localStorage.setItem('emergency', JSON.stringify(emergency));
    	alert("Data saved to localStorage!");
	};

	const handleCheckboxChange = (e) => {
		e.stopPropagation();
		setEmergency(prev => ({
			...prev,
			terms: !prev.terms
		}));
		
		if (emergencyErrors["terms"]) {
			setEmergencyErrors(prev => ({
				...prev,
				terms: false
			}));
		}
	};

	const handleNext = () => {
		const isValid = validateForm();
		const isValidBilling = validateBillingForm();
		const isValidEmergency = validateOptionForm();
		if ((isValid && curStep == 0) || (isValidBilling && curStep == 1) || (isValidEmergency && curStep == 2)) {
			setCurStep(preState => {
				if (preState < 3) {
					return preState += 1;
				} else {
					return preState;
				}
			})
		}
	};
	const handlePrev = () => {
		setCurStep(preState => {
			if (preState > 0) {
				return preState -= 1;
			} else {
				return preState;
			}
		})
	}
	const handleSubmit = async () => {
		if (honeypot) {
			router.push('./en/error');
			return; // 终止提交逻辑
		}
		const isValidEmergency = validateOptionForm();
		if (isValidEmergency) {
			setCurStep(4);
			try {
				const response = await fetch('/api/retrieveConfirmation', {
					method: 'POST',
					headers: {
					'Content-Type': 'application/json',
					},
					body: JSON.stringify({ tourInfo: {productId, productName, productDate, productCity}, passengerNumber: passengerNumber, passengers: passengers, emergency: emergency, billing: billing })
				});
				const data = await response.json();
				console.log('data: ', data);
				if (data.success) {
					setConfirmNo(data.confirmNo);
				} else {
					router.push('./en/error');
				}
				
			} catch (error) {
				router.push('./en/error');
			}
			setCurStep(3);
		}
	}

	return (
		<>
			<Navbar/>
			<div className="w-11/12 md:w-4/5 lg:w-3/5 mx-auto mt-20">
				<div className="grid grid-cols-4">
					<div className="w-full relative">
						<div className={`${curStep == 0 ? 'bg-cyan-800' : 'bg-gray-300'} w-full py-1`}></div>
						{curStep == 0 ?
							<div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white rounded-full border-2 border-cyan-800 p-1">
								<svg width="24px" height="24px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#155e75" d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"></path></g></svg>
							</div>
						: <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white rounded-full border-2 border-gray-400 p-4">{""}</div>}
					</div>
					<div className="w-full relative">
						<div className={`${curStep == 1 ? 'bg-cyan-800' : 'bg-gray-300'} w-full py-1`}></div>
						{curStep == 1 ?
							<div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white rounded-full border-2 border-cyan-800 p-1">
								<svg width="24px" height="24px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#155e75" d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"></path></g></svg>
							</div>
						: <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white rounded-full border-2 border-gray-400 p-4">{""}</div>}
					</div>
					<div className="w-full relative">
						<div className={`${curStep == 2 ? 'bg-cyan-800' : 'bg-gray-300'} w-full py-1`}></div>
						{curStep == 2 ?
							<div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white rounded-full border-2 border-cyan-800 p-1">
								<svg width="24px" height="24px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#155e75" d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"></path></g></svg>
							</div>
						: <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white rounded-full border-2 border-gray-400 p-4">{""}</div>}
					</div>
					<div className="w-full relative">
						<div className={`${curStep == 3 ? 'bg-cyan-800' : 'bg-gray-300'} w-full py-1`}></div>
						{curStep == 3 ?
							<div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white rounded-full border-2 border-cyan-800 p-1">
								<svg width="24px" height="24px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#155e75" d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"></path></g></svg>
							</div>
						: <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white rounded-full border-2 border-gray-400 p-4">{""}</div>}
					</div>
				</div>
				<div className="grid grid-cols-4 text-center mt-6 text-sm md:text-lg">
					<div>Booking Info</div>
					<div>Billing Info</div>
					<div>Other Options</div>
					<div>Confirm Order</div>
				</div>
				{curStep == 0 &&
				<div className="mt-20">
					<div className="md:flex items-center content-end gap-4 py-4 border-t-2 border-b-2 border-gray-300">
						<div className="text-xl text-gray-600 font-semibold">{productName}</div>
						<div className="text-md text-gray-400 font-semibold">{productDate}</div>
						<div className="flex items-center">
							<div className="p-2 border-2 rounded-l cursor-pointer font-bold text-cyan-900 hover:bg-cyan-100 active:bg-cyan-600 active:text-white select-none" onClick={removePassenger}>
								<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z" fill="#0F0F0F"/>
								</svg>
							</div>
							<div className="p-2 border-t-2 border-b-2 text-cyan-700 font-bold select-none">{passengerNumber} Passengers</div>
							<div className="p-2 border-2 rounded-r cursor-pointer font-bold text-cyan-900 hover:bg-cyan-100 active:bg-cyan-600 active:text-white select-none" onClick={addPassenger}>
								<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="#0F0F0F"/>
								</svg>
							</div>
						</div>
					</div>
					<div className="text-xs text-gray-600">* Please enter the following information as shown in your Passport. Providing inaccurate passenger information may cause problems in air ticket or hotel booking.</div>
				</div>}
				{curStep == 0 && <div>
					{Array.from({ length: passengerNumber }).map((_, index) => (
						<div className="my-8" key={index}>
							<div className="text-xl text-cyan-800 font-bold py-2">Passenger {index + 1}</div>
							<div className="grid grid-cols-2 gap-4 text-gray-600">
								<div className="w-full">
									<div>First Name</div>
									<input type="text" name={`passengers[${index}].firstname`} value={passengers[index].firstname || ''} className={`border-2 px-3 py-2 w-full rounded ${errors[index]?.firstname ? 'border-red-500' : ''}`} placeholder="First Name" onChange={(e) => handlePassengerChange(index, e)} />
								</div>
								<div className="w-full">
									<div>Last Name</div>
									<input type="text" name={`passenger[${index}].lastname`} value={passengers[index].lastname || ''} className={`border-2 px-3 py-2 w-full rounded ${errors[index]?.lastname ? 'border-red-500' : ''}`} placeholder="Last Name" onChange={(e) => handlePassengerChange(index, e)} />
								</div>
								<div className="w-full">
									<div>Middle Name (optional)</div>
									<input type="text" name={`passenger[${index}].middlename`} value={passengers[index].middlename || ''} className={`border-2 px-3 py-2 w-full rounded ${errors[index]?.middlename ? 'border-red-500' : ''}`} placeholder="Middle Name" onChange={(e) => handlePassengerChange(index, e)} />
								</div>
								<div className="w-full">
									<div>Passport Number</div>
									<input type="text" name={`passenger[${index}].passportnumber`} value={passengers[index].passportnumber || ''} className={`border-2 px-3 py-2 w-full rounded ${errors[index]?.passportnumber ? 'border-red-500' : ''}`} placeholder="Passport Number" onChange={(e) => handlePassengerChange(index, e)} />
								</div>
								<div className="w-full">
									<div>Passport Expiry Date</div>
									<input type="Date" name={`passenger[${index}].passportexpiry`} value={passengers[index].passportexpiry || ''} className={`border-2 px-3 py-2 w-full rounded ${errors[index]?.passportexpiry ? 'border-red-500' : ''}`} placeholder="1999-12-12" onChange={(e) => handlePassengerChange(index, e)} />
								</div>
								<div className="w-full">
									<div>Gender</div>
									<input type="text" name={`passenger[${index}].gender`} value={passengers[index].gender || ''} className={`border-2 px-3 py-2 w-full rounded ${errors[index]?.gender ? 'border-red-500' : ''}`} placeholder="Gender" onChange={(e) => handlePassengerChange(index, e)} />
								</div>
								<div className="w-full">
									<div>Date of Birth</div>
									<input type="Date" name={`passenger[${index}].dob`} value={passengers[index].dob || ''} className={`border-2 px-3 py-2 w-full rounded ${errors[index]?.dob ? 'border-red-500' : ''}`} placeholder="1999-12-12" onChange={(e) => handlePassengerChange(index, e)} />
								</div>
								<div className="w-full">
									<div>Nationality</div>
									<input type="text" name={`passenger[${index}].nationality`} value={passengers[index].nationality || ''} className={`border-2 px-3 py-2 w-full rounded ${errors[index]?.nationality ? 'border-red-500' : ''}`} placeholder="Country" onChange={(e) => handlePassengerChange(index, e)} />
								</div>
								<div className="w-full">
									<div>Phone Number</div>
									<input type="text" name={`passenger[${index}].phonenumber`} value={passengers[index].phonenumber || ''} className={`border-2 px-3 py-2 w-full rounded ${errors[index]?.phonenumber ? 'border-red-500' : ''}`} placeholder="eg. 800-123-4567" onChange={(e) => handlePassengerChange(index, e)} />
								</div>
								<div className="w-full">
									<div>Email</div>
									<input type="text" name={`passenger[${index}].email`} value={passengers[index].email || ''} className={`border-2 px-3 py-2 w-full rounded ${errors[index]?.email ? 'border-red-500' : ''}`} placeholder="Email" onChange={(e) => handlePassengerChange(index, e)} />
								</div>
							</div>
						</div>
					))}
				</div>}
				{curStep == 1 && <div>
					<div className="my-8">
						<div className="text-xl text-cyan-800 font-bold py-2">Billing </div>
						<div className="grid grid-cols-2 gap-4 text-gray-600">
							<div className="w-full">
								<div>First Name</div>
								<input type="text" name={`billing.firstname`} value={billing.firstname || ''} className={`border-2 px-3 py-2 w-full rounded ${billErrors.firstname ? 'border-red-500' : ''}`} placeholder="First Name" onChange={(e) => handleBillingChange(e)} />
							</div>
							<div className="w-full">
								<div>Last Name</div>
								<input type="text" name={`billing.lastname`} value={billing.lastname || ''} className={`border-2 px-3 py-2 w-full rounded ${billErrors.lastname ? 'border-red-500' : ''}`} placeholder="Last Name" onChange={(e) => handleBillingChange(e)} />
							</div>
							<div className="w-full col-span-2">
								<div>Company Name (optional)</div>
								<input type="text" name={`billing.company`} value={billing.company || ''} className="border-2 px-3 py-2 w-full rounded" placeholder="Middle Name" onChange={(e) => handleBillingChange(e)} />
							</div>
							<div className="w-full col-span-2">
								<div>Street Address</div>
								<input type="text" name={`billing.address`} value={billing.address || ''} className={`border-2 px-3 py-2 w-full rounded ${billErrors.address ? 'border-red-500' : ''}`} placeholder="House number and street name" onChange={(e) => handleBillingChange(e)} />
								<input type="text" name={`billing.apartment`} value={billing.apartment || ''} className="border-2 px-3 py-2 w-full rounded" placeholder="Apartment, suite, unit, etc. (optional)" onChange={(e) => handleBillingChange(e)} />
							</div>
							<div className="w-full">
								<div>Town / City</div>
								<input type="text" name={`billing.city`} value={billing.city || ''} className={`border-2 px-3 py-2 w-full rounded ${billErrors.city ? 'border-red-500' : ''}`} placeholder="City" onChange={(e) => handleBillingChange(e)} />
							</div>
							<div className="w-full">
								<div>State</div>
								<input type="text" name={`billing.state`} value={billing.state || ''} className={`border-2 px-3 py-2 w-full rounded ${billErrors.state ? 'border-red-500' : ''}`} placeholder="" onChange={(e) => handleBillingChange(e)} />
							</div>
							<div className="w-full">
								<div>Zip Code</div>
								<input type="text" name={`billing.zipcode`} value={billing.zipcode || ''} className={`border-2 px-3 py-2 w-full rounded ${billErrors.zipcode ? 'border-red-500' : ''}`} placeholder="zipcode" onChange={(e) => handleBillingChange(e)} />
							</div>
							<div className="w-full">
								<div>Country</div>
								<input type="text" name={`billing.country`} value={billing.country || ''} className={`border-2 px-3 py-2 w-full rounded ${billErrors.country ? 'border-red-500' : ''}`} placeholder="country" onChange={(e) => handleBillingChange(e)} />
							</div>
							<div className="w-full">
								<div>Phone Number</div>
								<input type="text" name={`billing.phonenumber`} value={billing.phonenumber || ''} className={`border-2 px-3 py-2 w-full rounded ${billErrors.phonenumber ? 'border-red-500' : ''}`} placeholder="eg. 800-123-4567" onChange={(e) => handleBillingChange(e)} />
							</div>
							<div className="w-full">
								<div>Email Address</div>
								<input type="text" name={`billing.email`} value={billing.email || ''} className={`border-2 px-3 py-2 w-full rounded ${billErrors.email ? 'border-red-500' : ''}`} placeholder="Email" onChange={(e) => handleBillingChange(e)} />
							</div>
						</div>
					</div>
				</div>}
				{curStep == 2 && <div>
					<div className="my-8">
						<div className="text-xl text-cyan-800 font-bold py-2">Room Type</div>
						<div className="flex items-center text-gray-600 gap-2">
							<div>Room</div>
							<ul className="flex gap-2">
								<li>
									<input type="radio" id="hosting-small" name="emergency.roomtype" value="KingBedRoom" className="hidden peer" onChange={(e) => handleEmergencyChange(e)} checked={emergency.roomtype === 'KingBedRoom'}/>
									<label htmlFor="hosting-small" className="inline-flex items-center justify-between w-full px-2 py-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-cyan-800 peer-checked:text-cyan-800 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
										<div className="flex gap-2">
											<div className="w-full text-md font-semibold select-none">{t("KingBedRoom")}</div>
										</div>
									</label>
								</li>
								<li>
									<input type="radio" id="hosting-big" name="emergency.roomtype" value="TwinBedsRoom" className="hidden peer" onChange={(e) => handleEmergencyChange(e)} checked={emergency.roomtype === 'TwinBedsRoom'}/>
									<label htmlFor="hosting-big" className="inline-flex items-center justify-between w-full px-2 py-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-cyan-800 peer-checked:text-cyan-800 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
										<div className="flex gap-2">
											<div className="w-full text-md font-semibold select-none">{t("TwinBedsRoom")}</div>
										</div>
									</label>
								</li>
							</ul>
						</div>
						<div className='flex px-4'>
							
						</div>
					</div>
					<div className="my-8">
						<div className="text-xl text-cyan-800 font-bold py-2">Emergency Contact</div>
						<div className="grid grid-cols-2 gap-4 text-gray-600">
							<div className="w-full">
								<div>Contact Name</div>
								<input type="text" name={`emergency.firstname`} value={emergency.firstname} className={`border-2 px-3 py-2 w-full rounded ${emergencyErrors.firstname ? 'border-red-500' : ''}`} placeholder="Name" onChange={(e) => handleEmergencyChange(e)}/>
							</div>
							<div className="w-full">
								<div>Phone Number</div>
								<input type="text" name={`emergency.phonenumber`} value={emergency.phonenumber} className={`border-2 px-3 py-2 w-full rounded ${emergencyErrors.phonenumber ? 'border-red-500' : ''}`} placeholder="eg. 800-123-4567" onChange={(e) => handleEmergencyChange(e)}/>
							</div>
							<div className="w-full">
								<div>Email</div>
								<input type="text" name={`emergency.email`} value={emergency.email} className={`border-2 px-3 py-2 w-full rounded ${emergencyErrors.email ? 'border-red-500' : ''}`} placeholder="Email" onChange={(e) => handleEmergencyChange(e)}/>
							</div>
						</div>
						<div className="my-3 text-sm text-slate-500 inline-flex">
							<div className="flex items-center h-5">
								{console.log('emergency: ', emergency)}
								{console.log('checkbox: ', emergency.terms)}
								<input type="checkbox" name="emergency.terms" checked={emergency.terms} onChange={handleCheckboxChange} className="hidden" />
								<div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${emergency.terms ? 'bg-blue-500 border-blue-500' : 'border-gray-400'} ${emergencyErrors.terms ? 'border-red-500' : ''}`} onClick={handleCheckboxChange}>
									{emergency.terms && (
										<svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
											<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
										</svg>
									)}
								</div>
							</div>
							<label htmlFor="emergency-terms" className="ml-2 text-sm text-gray-600">{t('Iwouldtakefully')}</label>
						</div>
						<div>
							<input type="text" name="honeypot" className="hidden" onChange={(e) => setHoneypot(e.target.value)} value={honeypot || ''}/>
						</div>
					</div>
					
				</div>}
				{curStep == 4 && <div className="my-8">
					<div className="flex justify-center my-20">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200" height="200" style={{shapeRendering: "auto", display: "block", background: "rgb(255, 255, 255)"}} xmlnsXlink="http://www.w3.org/1999/xlink"><g><g transform="translate(0 -7.5)">
						<circle fill="#fe718d" r="10" cy="41" cx="50">
							<animateTransform values="0 50 50;360 50 50" keyTimes="0;1" repeatCount="indefinite" dur="1s" type="rotate" attributeName="transform"></animateTransform>
							<animate keySplines="0.2 0 0.8 1;0.2 0 0.8 1" values="0;15;0" keyTimes="0;0.5;1" calcMode="spline" repeatCount="indefinite" dur="1s" attributeName="r"></animate>
						</circle>
						<circle fill="#46dff0" r="10" cy="41" cx="50">
							<animateTransform values="180 50 50;540 50 50" keyTimes="0;1" repeatCount="indefinite" dur="1s" type="rotate" attributeName="transform"></animateTransform>
							<animate keySplines="0.2 0 0.8 1;0.2 0 0.8 1" values="15;0;15" keyTimes="0;0.5;1" calcMode="spline" repeatCount="indefinite" dur="1s" attributeName="r"></animate>
						</circle>
						</g><g></g></g></svg>
					</div>
				</div>}
				{curStep == 3 && <div className="my-8">
					<div>
						<div className="text-3xl text-center">Congratulations!</div>
						<div className="my-6">Your booking has been successfully completed! Thank you for choosing us for your travel experience. A confirmation email with the details will be sent to you shortly. We look forward to making your journey unforgettable.</div>
					</div>
					<div className="text-xl text-cyan-800 font-bold py-2">Review</div>
					<table className="border-collapse border border-slate-400 w-full">
						<thead>
							<tr>
								<th colSpan={2} className="border border-slate-300">Tour Info</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border border-slate-300 pl-3">
									Tour Package
								</td>
								<td className="border border-slate-300 pl-3 py-2">
									<div className="grid grid-cols-8">
										<div className="text-gray-400">Name</div>
										<div className="col-span-3">Spain in 9 Days</div>
										<div className="text-gray-400">Depart Date</div>
										<div className="col-span-3">Sep 25th, 2024</div>
										<div className="text-gray-400">Confirm No.</div>
										<div className="col-span-3 font-semibold text-green-700">{confirmNo}</div>
									</div>
								</td>
							</tr>
						</tbody>
						<thead>
							<tr>
								<th colSpan={2} className="border border-slate-300">Passenger Info</th>
							</tr>
						</thead>
						<tbody>
							{Array.from({ length: passengerNumber }).map((_, index) => (
								<tr key={index}>
									<td className="border border-slate-300 pl-3">Passenger {index + 1}</td>
									<td className="border border-slate-300 pl-3 py-2">
										<div className="grid grid-cols-8">
											<div className="text-gray-400">Name:</div>
											<div className="col-span-7">{passengers[index].firstname} {passengers[index].middlename} {passengers[index].lastname}</div>
										</div>
										<div className="grid grid-cols-8">
											<div className="text-gray-400">Gender:</div>
											<div className="col-span-3">
												{passengers[index].gender}</div> 
											<div className="text-gray-400">Date of Birth:</div> 
											<div className="col-span-3">{passengers[index].dob}</div>
										</div>
										<div className="grid grid-cols-8">
											<div className="text-gray-400">Passport:</div>
											<div className="col-span-3">{passengers[index].passportnumber}</div>
											<div className="text-gray-400">Expiry Date:</div>
											<div className="col-span-3">{passengers[index].passportexpiry}</div>
										</div>
										<div className="grid grid-cols-8">
											<div className="text-gray-400">Nationality:</div>
											<div className="col-span-3">{passengers[index].nationality}</div>
										</div>
										<div className="grid grid-cols-8">
											<div className="text-gray-400">Phone Number:</div>
											<div className="col-span-3">{passengers[index].phonenumber}</div>
											<div className="text-gray-400">Email:</div>
											<div className="col-span-3">{passengers[index].email}</div>
										</div>
									</td>
								</tr>
							))}
						</tbody>
						<thead>
							<tr>
								<th colSpan={2} className="border border-slate-300">Billing Info</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border border-slate-300 pl-3">Billing</td>
								<td className="border border-slate-300 pl-3 py-2">
									<div className="grid grid-cols-8">
										<div className="text-gray-400">Name:</div>
										<div className="col-span-7">{billing.firstname} {billing.lastname}</div>
									</div>
									<div className="grid grid-cols-8">
										<div className="text-gray-400">Company:</div>
										<div className="col-span-3">
											{billing.company}</div> 
									</div>
									<div className="grid grid-cols-8">
										<div className="text-gray-400">Street:</div>
										<div className="col-span-3">{billing.address}</div>
										<div className="text-gray-400">Apartment:</div>
										<div className="col-span-3">{billing.apartment}</div>
									</div>
									<div className="grid grid-cols-8">
										<div className="text-gray-400">City:</div>
										<div className="col-span-3">{billing.city}</div>
										<div className="text-gray-400">State:</div>
										<div className="col-span-3">{billing.state}</div>
									</div>
									<div className="grid grid-cols-8">
										<div className="text-gray-400">Zip Code:</div>
										<div className="col-span-3">{billing.zipcode}</div>
										<div className="text-gray-400">Country:</div>
										<div className="col-span-3">{billing.country}</div>
									</div>
									<div className="grid grid-cols-8">
										<div className="text-gray-400">Phone:</div>
										<div className="col-span-3">{billing.phonenumber}</div>
										<div className="text-gray-400">Email:</div>
										<div className="col-span-3">{billing.email}</div>
									</div>
								</td>
							</tr>
						</tbody>
						<thead>
							<tr>
								<th colSpan={2} className="border border-slate-300">Other Info</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border border-slate-300 pl-3">Addition</td>
								<td className="border border-slate-300 pl-3 py-2">
									<div className="grid grid-cols-8">
										<div className="text-gray-400">Room Type:</div>
										<div className="col-span-7">{t(emergency.roomtype)}</div>
									</div>
									<div className="grid grid-cols-8">
										<div className="text-gray-400">Contact Name:</div>
										<div className="col-span-3">
											{emergency.firstname}</div> 
									</div>
									<div className="grid grid-cols-8">
										<div className="text-gray-400">Phone:</div>
										<div className="col-span-3">{emergency.phonenumber}</div>
										<div className="text-gray-400">Email:</div>
										<div className="col-span-3">{emergency.email}</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>}
				<div className="flex gap-2 text-white mb-20">
					{curStep < 3 && <div className="px-4 py-2 rounded bg-emerald-400 cursor-pointer select-none hover:bg-emerald-500 active:bg-emerald-800" onClick={handleSave}>Save</div>}
					{curStep < 3 && <div className="px-4 py-2 rounded bg-slate-700 cursor-pointer select-none hover:bg-slate-800 active:bg-slate-900" onClick={handlePrev}>Previous</div>}
					{curStep < 2 && <div className="px-4 py-2 rounded bg-slate-700 cursor-pointer select-none hover:bg-slate-800 active:bg-slate-900" onClick={handleNext}>Next</div>}
					{curStep == 2 && <div className="px-4 py-2 rounded bg-rose-500 cursor-pointer select-none hover:bg-rose-600 active:bg-rose-900" onClick={handleSubmit}>Submit</div>}
				</div>
			</div>
			<Footer/>
		</>
		
	);
}

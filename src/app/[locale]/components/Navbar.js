'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Navbar() {
    const t = useTranslations('Navbar');
    const pathname = usePathname();
    const [isMobileMenuShow, setIsMobileMenuShow] = useState(false);
    const [isUserMenuShown, setIsUserMenuShown] = useState(false);
    const [locale, setLocale] = useState()
    const [newUrl, setNewUrl] = useState('/')
    const mobileMenuRef = useRef();

    return (
        <div className="bg-[#313232] w-full">
            <Link href="https://rewardsholiday.com" className="md:hidden py-4 flex justify-center items-center cursor-pointer mx-auto">
                <Image src="/logo.png" width="180" height="55" alt="RTC"/>
            </Link>
            <div className="flex gap-2 md:grid md:grid-cols-12 lg:grid-cols-12 items-center w-full py-5 px-9 text-white">
                <Link href="https://rewardsholiday.com" className="hidden justify-center items-center md:block md:col-span-3 lg:col-span-2 cursor-pointer mx-auto">
                    <Image src="/logo.png" width="130" height="45" alt="RTC"/>
                </Link>
                <div className="md:block md:col-span-3 lg:hidden hover:bg-white hover:fill-white active:bg-gray-400" onClick={()=>setIsMobileMenuShow(!isMobileMenuShow)}>
                    <svg width="30px" height="30px" fill="#000000" viewBox="0 0 24 24" id="menu-alt-3" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" className="icon flat-color hover:fill-white"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><rect id="primary" x="2" y="2" width="20" height="20" rx="2" style={{fill: "#000000"}}></rect><path id="secondary" d="M17,17H7a1,1,0,0,1,0-2H17a1,1,0,0,1,0,2Zm0-4H7a1,1,0,0,1,0-2H17a1,1,0,0,1,0,2Zm0-4H7A1,1,0,0,1,7,7H17a1,1,0,0,1,0,2Z" style={{fill: "#c4c4c4"}}></path></g></svg>
                </div>
                <div className="hidden lg:block lg:col-span-6 font-roboto text-[0.8em] ml-20 font-bold cursor-pointer">
                    <ul className="flex gap-8">
                        <li><Link className="hover:text-gray-400 transition select-none" href="https://rewardsholiday.com">{t('HOME')}</Link></li>
                        <li><Link className="hover:text-gray-400 transition select-none" href="https://rewardsholiday.com/?page_id=2611">{t('ABOUTUS')}</Link></li>
                        <li><Link className="hover:text-gray-400 transition select-none" href="https://rewardsholiday.com/?page_id=2639">{t('TOURPACKAGES')}</Link></li>
                        <li><Link className="hover:text-gray-400 transition select-none" href="https://rewardsholiday.com/?page_id=2624">{t('INSURANCE')}</Link></li>
                        <li><Link className="hover:text-gray-400 transition select-none" href="https://rewardsholiday.com/?page_id=3554">{t('REFERAFRIEND')}</Link></li>
                        <li><Link className="hover:text-gray-400 transition select-none" href="https://rewardsholiday.com/?page_id=21">{t('CUSTOMERLOGIN')}</Link></li>
                    </ul>                   
                </div>
                <div className='md:col-span-4 lg:col-span-3 text-center font-semibold'>
                    <div className="md:text-md lg:text-lg font-bold">{t('TOLLFREE')} 1-877-618-3886</div>
                    <div className="text-xs md:text-sm">{t('MONTOFRI')} 9:30am to 6:30pm EST</div>
                </div>
                <div className='flex items-center gap-4 mx-auto'>
                    <div className="w-[1.2em] h-[1.2em]">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 3H4.5L6.5 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM6.07142 14H18L21 5H4.78571M11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 17.8954 7.89543 17 9 17C10.1046 17 11 17.8954 11 19Z" stroke="#69727d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </div>
                    <div className="flex items-center gap-2">
                        <div><Image src="/flag-us.png" width="32" height="32" alt="RTC"/></div>
                        <div>US</div>
                        <div className="w-[2em] h-[2em]">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.8079 14.7695L8.09346 10.3121C7.65924 9.79109 8.02976 9 8.70803 9L15.292 9C15.9702 9 16.3408 9.79108 15.9065 10.3121L12.1921 14.7695C12.0921 14.8895 11.9079 14.8895 11.8079 14.7695Z" fill="#000000"></path> </g></svg>
                        </div>
                    </div>
                </div>
            </div>
            {isMobileMenuShow && 
                <div className="relative text-[14px] font-[Roboto] font-medium text-gray-800">
                    <ul className="absolute bg-gray-100 z-20 w-full md:hidden">
                        <li className="px-6 py-2 hover:bg-[#33373d] hover:text-gray-100 transition"><Link href="https://rewardsholiday.com">{t('HOME')}</Link></li>
                        <li className="px-6 py-2 hover:bg-[#33373d] hover:text-gray-100 transition"><Link href="https://rewardsholiday.com/?page_id=2611">{t('ABOUTUS')}</Link></li>
                        <li className="px-6 py-2 hover:bg-[#33373d] hover:text-gray-100 transition"><Link href="https://rewardsholiday.com/?page_id=2639">{t('TOURPACKAGES')}</Link></li>
                        <li className="px-6 py-2 hover:bg-[#33373d] hover:text-gray-100 transition"><Link href="https://rewardsholiday.com/?page_id=2624">{t('INSURANCE')}</Link></li>
                        <li className="px-6 py-2 hover:bg-[#33373d] hover:text-gray-100 transition"><Link href="https://rewardsholiday.com/?page_id=3554">{t('REFERAFRIEND')}</Link></li>
                        <li className="px-6 py-2 hover:bg-[#33373d] hover:text-gray-100 transition"><Link href="https://rewardsholiday.com/?page_id=21">{t('CUSTOMERLOGIN')}</Link></li>
                    </ul>   
                </div>}
        </div>
    );
}
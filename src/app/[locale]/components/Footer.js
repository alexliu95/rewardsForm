'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('Footer');
    const pathname = usePathname();
    const [isMobileMenuShow, setIsMobileMenuShow] = useState(false);
    const [isUserMenuShown, setIsUserMenuShown] = useState(false);
    const [locale, setLocale] = useState()
    const [newUrl, setNewUrl] = useState('/')
    const mobileMenuRef = useRef();

    return (
        <>
        <div className="flex justify-center bg-[#FBFBFB] py-8">
            <div className="md:grid md:grid-cols-2 lg:grid lg:grid-cols-4 md:gap-4 lg:gap-8 text-[14px] text-[#54595F]">
                <div className="max-w-[285px]">
                    <div className="text-[#FF6600] text-[18px] py-4">{t('SERVICE')}</div>
                    <div className="flex gap-2 items-center">
                        <div className="min-w-[17px] h-[17px]">
                            <svg aria-hidden="true" className="e-font-icon-svg e-fas-check" style={{fill: '#FF7B00'}} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
                        </div>
                        <div>{t('Wetreatourclients')}</div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="min-w-[17px] min-h-[17px]">
                            <svg aria-hidden="true" className="e-font-icon-svg e-fas-check" style={{fill: '#FF7B00'}} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
                        </div>
                        <div>{t('Wewillwalkyou')}</div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="min-w-[17px] h-[17px]">
                            <svg aria-hidden="true" className="e-font-icon-svg e-fas-check" style={{fill: '#FF7B00'}} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
                        </div>
                        <div>{t('Fullsupport')}</div>
                    </div>
                </div>
                <div className="max-w-[285px]">
                    <div className="text-[#FF6600] text-[18px] py-4">{t('QUALITY')}</div>
                    <div className="flex gap-2 items-center">
                        <div className="min-w-[17px] h-[17px]">
                            <svg aria-hidden="true" className="e-font-icon-svg e-fas-check" style={{fill: '#FF7B00'}} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
                        </div>
                        <div>{t('Wecarefullyselect')}</div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="min-w-[17px] h-[17px]">
                            <svg aria-hidden="true" className="e-font-icon-svg e-fas-check" style={{fill: '#FF7B00'}} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
                        </div>
                        <div>{t('Weuseprofessional')}</div>
                    </div>
                </div>
                <div className="max-w-[285px]">
                    <div className="text-[#FF6600] text-[18px] py-4">{t('AUTHENTIC')}</div>
                    <div className="flex gap-2 items-center">
                        <div className="min-w-[17px] h-[17px]">
                            <svg aria-hidden="true" className="e-font-icon-svg e-fas-check" style={{fill: '#FF7B00'}} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
                        </div>
                        <div>{t('Wechoosebest')}</div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="min-w-[17px] h-[17px]">
                            <svg aria-hidden="true" className="e-font-icon-svg e-fas-check" style={{fill: '#FF7B00'}} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
                        </div>
                        <div>{t('Experiencereallocal')}</div>
                    </div>
                </div>
                <div className="max-w-[285px]">
                    <div className="text-[#FF6600] text-[18px] py-4">{t('VALUE')}</div>
                    <div className="flex gap-2 items-center">
                        <div className="min-w-[17px] h-[17px]">
                            <svg aria-hidden="true" className="e-font-icon-svg e-fas-check" style={{fill: '#FF7B00'}} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
                        </div>
                        <div>{t('Saveupto')}</div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="min-w-[17px] h-[17px] ">
                            <svg aria-hidden="true" className="e-font-icon-svg e-fas-check" style={{fill: '#FF7B00'}} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
                        </div>
                        <div>{t('Bestvalueof')}</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-[#313232]">
            <div className="flex justify-center py-8 lg:w-3/5 mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid lg:grid-cols-5 text-[14px] md:gap-5 text-[#F3F3F3] font-sans">
                    <div className="w-full">
                        <div className="text-white font-semibold my-3">{t('CompanyInfo')}</div>
                        <div>
                            <div className="hover:text-gray-500 transition "><Link href="https://rewardsholiday.com/?page_id=2611">{t('AboutUs')}</Link></div>
                            <div className="hover:text-gray-500 transition "><Link href="https://rewardsholiday.com/?page_id=3694">{t('CustomerReviews')}</Link></div>
                        </div>
                    </div>
                    <div>
                        <div className="text-white font-semibold my-3">{t('SecurityPrivacy')}</div>
                        <div>
                            <div className="hover:text-gray-500 transition "><Link href="https://rewardsholiday.com/?page_id=535">{t('SecurityPolicy')}</Link></div>
                            <div className="hover:text-gray-500 transition "><Link href="https://rewardsholiday.com/?page_id=3400">{t('TermsConditions')}</Link></div>
                            <div className="hover:text-gray-500 transition "><Link href="https://rewardsholiday.com/?page_id=3487">{t('CreditAuthentication')}</Link></div>
                        </div>
                    </div>
                    <div>
                        <div className="text-white font-semibold my-3">{t('ServiceSupport')}</div>
                        <div>
                            <div className="hover:text-gray-500 transition "><Link href="https://rewardsholiday.com/?page_id=3305">{t('AgentPortal')}</Link></div>
                            <div className="hover:text-gray-500 transition "><Link href="https://rewardsholiday.com/?page_id=3938">{t('FAQs')}</Link></div>
                        </div>
                    </div>
                    <div>
                        <div className="text-white font-semibold my-3">{t('JoinUs')}</div>
                        <div>
                            <div className="hover:text-gray-500 transition "><Link href="https://rewardsholiday.com/?page_id=3608">{t('Employment')}</Link></div>
                            <div className="hover:text-gray-500 transition "><Link href="https://rewardsholiday.com/?page_id=2886">{t('ContactUs')}</Link></div>
                        </div>
                    </div>
                    <div>
                        <div className="text-white font-semibold my-3">{t('ServiceSupport')}</div>
                        <div>
                            <div>{t('TollFree')}: 1-877-618-3886</div>
                            <div>{t('Email')}: info@rewardsholiday.com</div>
                            <div>{t('MonFri')}: 9:30 am - 6:30 pm EST</div>
                            <div>{t('OnlineChat')}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:grid md:grid-cols-12 justify-center md:justify-start md:gap-10 items-center lg:w-3/5 mx-auto">
                <Link href="https://rewardsholiday.com" className="items-center flex justify-center cursor-pointer md:col-span-3 mx-auto">
                    <Image src="/logo.png" width="180" height="63" alt="RTC"/>
                </Link>
                <div className="mx-auto my-4 flex justify-center md:col-span-6">
                    <div className="flex items-center gap-4 mx-auto">
                        <div>
                            <Image src="/ico017.png" width="67" height="38" alt="RTC"/>
                        </div>
                        <div>
                            <Image src="/ico016.png" width="99" height="38" alt="RTC"/>
                        </div>
                        <div>
                            <Image src="/ico015.png" width="38" height="38" alt="RTC"/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center md:justify-items-end items-center gap-6">
                    <div className="min-w-[42px] min-h-[42px]">
                        <svg aria-hidden="true" className="e-font-icon-svg e-fab-instagram" fill="#fff" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
                    </div>
                    <div className="min-w-[42px] min-h-[42px]">
                        <svg aria-hidden="true" className="e-font-icon-svg e-fab-facebook-square" fill="#fff" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"></path></svg>
                    </div>
                    <div className="min-w-[54px] min-h-[42px]">
                        <svg aria-hidden="true" className="e-font-icon-svg e-fab-cc-visa" fill="#fff" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path d="M470.1 231.3s7.6 37.2 9.3 45H446c3.3-8.9 16-43.5 16-43.5-.2.3 3.3-9.1 5.3-14.9l2.8 13.4zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM152.5 331.2L215.7 176h-42.5l-39.3 106-4.3-21.5-14-71.4c-2.3-9.9-9.4-12.7-18.2-13.1H32.7l-.7 3.1c15.8 4 29.9 9.8 42.2 17.1l35.8 135h42.5zm94.4.2L272.1 176h-40.2l-25.1 155.4h40.1zm139.9-50.8c.2-17.7-10.6-31.2-33.7-42.3-14.1-7.1-22.7-11.9-22.7-19.2.2-6.6 7.3-13.4 23.1-13.4 13.1-.3 22.7 2.8 29.9 5.9l3.6 1.7 5.5-33.6c-7.9-3.1-20.5-6.6-36-6.6-39.7 0-67.6 21.2-67.8 51.4-.3 22.3 20 34.7 35.2 42.2 15.5 7.6 20.8 12.6 20.8 19.3-.2 10.4-12.6 15.2-24.1 15.2-16 0-24.6-2.5-37.7-8.3l-5.3-2.5-5.6 34.9c9.4 4.3 26.8 8.1 44.8 8.3 42.2.1 69.7-20.8 70-53zM528 331.4L495.6 176h-31.1c-9.6 0-16.9 2.8-21 12.9l-59.7 142.5H426s6.9-19.2 8.4-23.3H486c1.2 5.5 4.8 23.3 4.8 23.3H528z"></path></svg>
                    </div>
                    <div className="min-w-[54px] min-h-[42px]">
                        <svg aria-hidden="true" className="e-font-icon-svg e-fab-cc-mastercard" fill="#fff" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path d="M482.9 410.3c0 6.8-4.6 11.7-11.2 11.7-6.8 0-11.2-5.2-11.2-11.7 0-6.5 4.4-11.7 11.2-11.7 6.6 0 11.2 5.2 11.2 11.7zm-310.8-11.7c-7.1 0-11.2 5.2-11.2 11.7 0 6.5 4.1 11.7 11.2 11.7 6.5 0 10.9-4.9 10.9-11.7-.1-6.5-4.4-11.7-10.9-11.7zm117.5-.3c-5.4 0-8.7 3.5-9.5 8.7h19.1c-.9-5.7-4.4-8.7-9.6-8.7zm107.8.3c-6.8 0-10.9 5.2-10.9 11.7 0 6.5 4.1 11.7 10.9 11.7 6.8 0 11.2-4.9 11.2-11.7 0-6.5-4.4-11.7-11.2-11.7zm105.9 26.1c0 .3.3.5.3 1.1 0 .3-.3.5-.3 1.1-.3.3-.3.5-.5.8-.3.3-.5.5-1.1.5-.3.3-.5.3-1.1.3-.3 0-.5 0-1.1-.3-.3 0-.5-.3-.8-.5-.3-.3-.5-.5-.5-.8-.3-.5-.3-.8-.3-1.1 0-.5 0-.8.3-1.1 0-.5.3-.8.5-1.1.3-.3.5-.3.8-.5.5-.3.8-.3 1.1-.3.5 0 .8 0 1.1.3.5.3.8.3 1.1.5s.2.6.5 1.1zm-2.2 1.4c.5 0 .5-.3.8-.3.3-.3.3-.5.3-.8 0-.3 0-.5-.3-.8-.3 0-.5-.3-1.1-.3h-1.6v3.5h.8V426h.3l1.1 1.4h.8l-1.1-1.3zM576 81v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V81c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM64 220.6c0 76.5 62.1 138.5 138.5 138.5 27.2 0 53.9-8.2 76.5-23.1-72.9-59.3-72.4-171.2 0-230.5-22.6-15-49.3-23.1-76.5-23.1-76.4-.1-138.5 62-138.5 138.2zm224 108.8c70.5-55 70.2-162.2 0-217.5-70.2 55.3-70.5 162.6 0 217.5zm-142.3 76.3c0-8.7-5.7-14.4-14.7-14.7-4.6 0-9.5 1.4-12.8 6.5-2.4-4.1-6.5-6.5-12.2-6.5-3.8 0-7.6 1.4-10.6 5.4V392h-8.2v36.7h8.2c0-18.9-2.5-30.2 9-30.2 10.2 0 8.2 10.2 8.2 30.2h7.9c0-18.3-2.5-30.2 9-30.2 10.2 0 8.2 10 8.2 30.2h8.2v-23zm44.9-13.7h-7.9v4.4c-2.7-3.3-6.5-5.4-11.7-5.4-10.3 0-18.2 8.2-18.2 19.3 0 11.2 7.9 19.3 18.2 19.3 5.2 0 9-1.9 11.7-5.4v4.6h7.9V392zm40.5 25.6c0-15-22.9-8.2-22.9-15.2 0-5.7 11.9-4.8 18.5-1.1l3.3-6.5c-9.4-6.1-30.2-6-30.2 8.2 0 14.3 22.9 8.3 22.9 15 0 6.3-13.5 5.8-20.7.8l-3.5 6.3c11.2 7.6 32.6 6 32.6-7.5zm35.4 9.3l-2.2-6.8c-3.8 2.1-12.2 4.4-12.2-4.1v-16.6h13.1V392h-13.1v-11.2h-8.2V392h-7.6v7.3h7.6V416c0 17.6 17.3 14.4 22.6 10.9zm13.3-13.4h27.5c0-16.2-7.4-22.6-17.4-22.6-10.6 0-18.2 7.9-18.2 19.3 0 20.5 22.6 23.9 33.8 14.2l-3.8-6c-7.8 6.4-19.6 5.8-21.9-4.9zm59.1-21.5c-4.6-2-11.6-1.8-15.2 4.4V392h-8.2v36.7h8.2V408c0-11.6 9.5-10.1 12.8-8.4l2.4-7.6zm10.6 18.3c0-11.4 11.6-15.1 20.7-8.4l3.8-6.5c-11.6-9.1-32.7-4.1-32.7 15 0 19.8 22.4 23.8 32.7 15l-3.8-6.5c-9.2 6.5-20.7 2.6-20.7-8.6zm66.7-18.3H408v4.4c-8.3-11-29.9-4.8-29.9 13.9 0 19.2 22.4 24.7 29.9 13.9v4.6h8.2V392zm33.7 0c-2.4-1.2-11-2.9-15.2 4.4V392h-7.9v36.7h7.9V408c0-11 9-10.3 12.8-8.4l2.4-7.6zm40.3-14.9h-7.9v19.3c-8.2-10.9-29.9-5.1-29.9 13.9 0 19.4 22.5 24.6 29.9 13.9v4.6h7.9v-51.7zm7.6-75.1v4.6h.8V302h1.9v-.8h-4.6v.8h1.9zm6.6 123.8c0-.5 0-1.1-.3-1.6-.3-.3-.5-.8-.8-1.1-.3-.3-.8-.5-1.1-.8-.5 0-1.1-.3-1.6-.3-.3 0-.8.3-1.4.3-.5.3-.8.5-1.1.8-.5.3-.8.8-.8 1.1-.3.5-.3 1.1-.3 1.6 0 .3 0 .8.3 1.4 0 .3.3.8.8 1.1.3.3.5.5 1.1.8.5.3 1.1.3 1.4.3.5 0 1.1 0 1.6-.3.3-.3.8-.5 1.1-.8.3-.3.5-.8.8-1.1.3-.6.3-1.1.3-1.4zm3.2-124.7h-1.4l-1.6 3.5-1.6-3.5h-1.4v5.4h.8v-4.1l1.6 3.5h1.1l1.4-3.5v4.1h1.1v-5.4zm4.4-80.5c0-76.2-62.1-138.3-138.5-138.3-27.2 0-53.9 8.2-76.5 23.1 72.1 59.3 73.2 171.5 0 230.5 22.6 15 49.5 23.1 76.5 23.1 76.4.1 138.5-61.9 138.5-138.4z"></path></svg>
                    </div>
                </div>
            </div>
            <div className="text-center text-white text-[12px] pt-10 pb-16 bg-[#313232] mx-4">
                Rewards Holiday. All Rights Reserved. HST# 82110 5806 RT0001 | TICO# 50019248 | Wholesale License # 50021849
            </div>
        </div>
        </>
    );
}
import React, { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { useAppDispatch, useAppSelector } from '../../../';
import { getFilterJobs, clearGetFilterJobsSlice } from '../../../store/reducers/jobs/GetFilterJobs';
import { getTotalYearsExpList } from '../../utils/utils';
import JobCard from './JobCard';
import compenyBrand from '../../../assets/png/companyBrand.png';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import BMWIcon from '../../../assets/svg/BMWIcon.svg';
import PandaIcon from '../../../assets/svg/PandaIcon.svg';
import DoleIcon from '../../../assets/svg/DoleIcon.svg';
import BelleIcon from '../../../assets/svg/BelleIcon.svg';
import DominousIcon from '../../../assets/svg/DominousIcon.svg';
import GoproIcon from '../../../assets/svg/GoproIcon.svg';
import Rectangle_19 from '../../../assets/svg/Rectangle-19.svg';
import { BiSearch } from 'react-icons/bi';

const AllJobs = () => {
    const dispatch = useAppDispatch();
    const { success, allJobs, loading } = useAppSelector((state) => state.getFilterJobs);
    const [jobCard, setJobCard] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [toggleDispach, setToggleDispach] = useState(true);
    const [totalExpYear, setTotalExpYear] = useState(0);
    const [filtersData, setFiltersData] = useState<any>({
        expYear: []
    })

    useEffect(() => {
        window.addEventListener("scroll", handelInfiniteScroll);
        return () => window.removeEventListener("scroll", handelInfiniteScroll);
    }, []);

    useEffect(() => {
        if (toggleDispach && filtersData?.expYear?.length !== 0) {
            dispatch(getFilterJobs({ page, data: filtersData }));
        }
    }, [filtersData])

    useEffect(() => {
        if (toggleDispach && filtersData?.expYear?.length !== 0) {
            dispatch(getFilterJobs({ page, data: filtersData }));
        } else {
            dispatch(getFilterJobs({ page }));
        }
    }, [dispatch, page]);

    useEffect(() => {
        if (success) {
            if (filtersData?.expYear?.length !== 0) {
                setJobCard((prev: any) => [...prev, ...allJobs]);
            } else {
                if (allJobs.length !== 0) {
                    setJobCard((prev: any) => [...prev, ...allJobs]);
                } else {
                    setToggleDispach(false);
                }
            }
            dispatch(clearGetFilterJobsSlice());
        }
    }, [success]);

    const handelInfiniteScroll = async () => {
        try {
            if (
                window.innerHeight + document.documentElement.scrollTop + 1 >=
                document.documentElement.scrollHeight
            ) {
                setPage((prev) => prev + 1);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleTotalExpYearChange = () => {
        (async () => {
            const experienceYearsList = await getTotalYearsExpList();
            if (Object.keys(experienceYearsList)?.length) {
                const experienceYearsData = experienceYearsList?.filter((item: any) => {
                    let data = item?.title?.split('');
                    let splitVal = data?.slice(0, data.length - 5);
                    let joinedVal = parseInt(splitVal?.join(''));
                    if (joinedVal <= totalExpYear) {
                        return item
                    }
                })
                setFiltersData((preValue: any) => {
                    return {
                        ...preValue,
                        expYear: experienceYearsData?.map((item: any) => item?.id)
                    }
                });
                setJobCard([]);
                setPage(1);
            }
        })();
    };

    const onClickJobCard = (jobId: any) => {
        window.open(`/allJobs/jobDescription/${jobId}`, '_blank');
    }

    return (
        <>
            <div className="h-[10%] w-full"></div>
            <div className="grid grid-cols-12 gap-10 px-32 bg-[#F8FAFC] py-6">
                <div className="col-start-1 col-end-4">
                    <div className="bg-[#FFF] rounded-xl p-4 sticky top-[13%]">
                        <h1 className="flex justify-between items-center leading-none"><span className="text-[#475569] font-bold">Filters</span><span className="bg-[#F8FAFC] rounded px-2 py-1 text-[#4F46E5]">4</span></h1>
                        <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-semibold">Experience</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-12">
                                            <div className="relative mb-3">
                                                <span id="inputRangeSelector" className="bg-[#C7D2FE] w-10 text-xs h-10 rounded-full text-[#312E81] absolute -top-1 -translate-y-full -translate-x-1/2 leading-none cursor-pointer after:content-normal after:border-t-[18px] after:border-t-[#C7D2FE] after:border-l-[17px] after:border-l-white after:border-r-[17px] after:border-r-white after:absolute after:top-[80%] after:left-1/2 after:-translate-x-1/2 flex justify-center items-center" style={{ left: `${totalExpYear * 2}%` }}>{totalExpYear}</span>
                                                <input className="w-full h-1 rounded-lg cursor-pointer overflow-hidden appearance-none bg-[#C7D2FE]"
                                                    type="range"
                                                    min="0"
                                                    max="50"
                                                    value={totalExpYear}
                                                    onMouseUp={handleTotalExpYearChange}
                                                    onChange={(event: React.FormEvent<HTMLInputElement> | any) => {
                                                        setTotalExpYear(event.target.value);
                                                    }}
                                                />
                                            </div>
                                            <div className="flex justify-between items-center text-[#64748B] text-xs">
                                                <span>0 Yrs</span>
                                                <span>30+ Yrs</span>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-semibold">Department</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-5">
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Engineering</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">IT and Information</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={true} />
                                                <label className="ml-2">Consulting</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Marketing</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Sales</label>
                                            </div>
                                            <button className="text-[#4F46E5]">View all...</button>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-semibold">Location</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel>
                                            <div className="relative flex items-center w-full py-1.5 border border-[#E0E7FF] rounded-lg overflow-hidden my-5">
                                                <div className="grid place-items-center h-full w-12 text-gray-300">
                                                    <BiSearch className="h-5 w-5" />
                                                </div>
                                                <input
                                                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                                                    type="text"
                                                    id="search"
                                                    placeholder="Search something.." />
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">New Delhi</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Bangalore</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={true} />
                                                <label className="ml-2">Hyderabad</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Noida</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Mumbai</label>
                                            </div>
                                            <button className="text-[#4F46E5]">View all...</button>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-semibold">Work Mode</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-5">
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">On-site</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Remote</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={true} />
                                                <label className="ml-2">Hybrid</label>
                                            </div>
                                            <div className="text-[#475569]">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Temp. Remote</label>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-semibold">Salary</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-12">
                                            <div className="relative mb-3">
                                                <span id="inputRangeSelector" className="bg-[#C7D2FE] w-10 text-xs h-10 rounded-full text-[#312E81] absolute -top-1 -translate-y-full -translate-x-1/2 leading-none cursor-pointer after:content-normal after:border-t-[18px] after:border-t-[#C7D2FE] after:border-l-[17px] after:border-l-white after:border-r-[17px] after:border-r-white after:absolute after:top-[80%] after:left-1/2 after:-translate-x-1/2 flex justify-center items-center"></span>
                                                <input className="w-full h-1 rounded-lg cursor-pointer overflow-hidden appearance-none bg-[#C7D2FE]"
                                                    type="range"
                                                    min="0"
                                                    max="50"
                                                />
                                            </div>
                                            <div className="flex justify-between items-center text-[#64748B] text-xs">
                                                <span>4 LPA</span>
                                                <span>50+ LPA</span>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-semibold">Company Type</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-5">
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Engineering</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">IT and Information</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={true} />
                                                <label className="ml-2">Consulting</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Marketing</label>
                                            </div>
                                            <div className="text-[#475569]">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Sales</label>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-semibold">Role Category</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-5">
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Engineering</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">IT and Information</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={true} />
                                                <label className="ml-2">Consulting</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Marketing</label>
                                            </div>
                                            <div className="text-[#475569]">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Sales</label>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-semibold">Education</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-5">
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Engineering</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">IT and Information</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={true} />
                                                <label className="ml-2">Consulting</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Marketing</label>
                                            </div>
                                            <div className="text-[#475569]">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Sales</label>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-semibold">Posted By</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-5">
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Engineering</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">IT and Information</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={true} />
                                                <label className="ml-2">Consulting</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Marketing</label>
                                            </div>
                                            <div className="text-[#475569]">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Sales</label>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-semibold">Industry</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-5">
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Engineering</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">IT and Information</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={true} />
                                                <label className="ml-2">Consulting</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Marketing</label>
                                            </div>
                                            <div className="text-[#475569]">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Sales</label>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-semibold">Top Companies</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-5">
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Engineering</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">IT and Information</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={true} />
                                                <label className="ml-2">Consulting</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Marketing</label>
                                            </div>
                                            <div className="text-[#475569]">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Sales</label>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-semibold">Posting Date</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-5">
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Engineering</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">IT and Information</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={true} />
                                                <label className="ml-2">Consulting</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Marketing</label>
                                            </div>
                                            <div className="text-[#475569]">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Sales</label>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                    </div>
                </div>
                <div className="col-start-4 col-end-11">
                    <JobCard onClickJobCard={onClickJobCard} jobCard={jobCard} loading={loading} />
                </div>
                <div className="col-start-11 col-end-13">
                    <div className="bg-[#F1F5F9] rounded-xl w-full p-5 sticky top-[13%]">
                        <h1 className="leading-none mb-3">Top Companies</h1>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex justify-center items-center">
                                <img src={PandaIcon} alt="PandaIcon" />
                            </div>
                            <div className="flex justify-center items-center">
                                <img src={DoleIcon} alt="DoleIcon" />
                            </div>
                            <div className="flex justify-center items-center">
                                <img src={BMWIcon} alt="BMWIcon" />
                            </div>
                            <div className="flex justify-center items-center">
                                <img src={BelleIcon} alt="BelleIcon" />
                            </div>
                            <div className="flex justify-center items-center">
                                <img src={DominousIcon} alt="DominousIcon" />
                            </div>
                            <div className="flex justify-center items-center">
                                <img src={GoproIcon} alt="GoproIcon" />
                            </div>
                            <div className="flex justify-center items-center">
                                <img src={Rectangle_19} alt="Rectangle_19" />
                            </div>
                            <div className="flex justify-center items-center">
                                <img src={compenyBrand} alt="compenyBrand" />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default AllJobs
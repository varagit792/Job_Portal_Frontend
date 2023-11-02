import { useEffect, useState } from "react";
import { Tab } from '@headlessui/react';
import ReactPaginateItems from '../../../commonComponents/ReactPaginate';
import { useAppDispatch, useAppSelector } from '../../../../';
import { getEmployerCompanyList } from "../../../../store/reducers/companies/employerCompanyList";
import { formatDistanceToNow, format, add, differenceInMilliseconds, parseISO, differenceInDays, isAfter, getMonth } from 'date-fns';
import NoRecords from "../../../commonComponents/NoRecords";
import Cookies from "js-cookie";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const RecruiterJobList = () => {
    const dispatch = useAppDispatch();
    const { success,
        companyDetails
    } = useAppSelector((state) => state.getEmployerCompanyList);
    const [page, setPage] = useState(1);
    let [categories, setCategories] = useState({
        All: [],
        Open: [],
        Drafts: [],
        Closed: [],
    });
    // using for pagination
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage: number = 5;
    const endOffset = itemOffset + itemsPerPage;
    const userId = Cookies.get('userId');

    useEffect(() => {
        dispatch(getEmployerCompanyList({ page, data: { user: { id: userId } } }));
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            setCategories((preValue: any) => {
                return {
                    ...preValue,
                    All: companyDetails[0]?.jobs
                }
            })
        }
    }, [success]);

    return (
        <>
            <div className="h-[10%] w-full"></div>
            <div className="w-full px-32 py-8 bg-[#F8FAFC]">
                <Tab.Group>
                    <Tab.List className="flex">
                        {Object.keys(categories).map((category) => (
                            <Tab
                                key={category}
                                className={({ selected }) =>
                                    classNames('w-full outline-none leading-10 font-bold border-b', selected ? 'border-[#4F46E5] text-[#4F46E5]' : 'border-[#E0E7FF] text-[#64748B]')
                                }
                            >
                                {category}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className="w-full">
                        {Object.values(categories).map((posts, idx) => {
                            const currentItems = posts?.slice(itemOffset, endOffset);
                            return (
                                <Tab.Panel key={idx}>
                                    <div className="flex justify-between items-center mt-8 mb-8">
                                        <div>
                                            <h1 className="text-lg font-bold">All Job Posting</h1>
                                            <p className="text-[#64748B]">Showing list of all the jobs posted</p>
                                        </div>
                                        <div>
                                            <button className=" text-white bg-[#4F46E5] rounded-lg px-6 py-2 font-semibold">Post a Job</button>
                                        </div>
                                    </div>
                                    {currentItems !== undefined && currentItems?.length !== 0 ?
                                        <>
                                            <div className="bg-white rounded-xl overflow-hidden w-full border border-[#E0E7FF]">
                                                <table className="w-full table-auto">
                                                    <thead>
                                                        <tr className="leading-normal border-b border-[#E0E7FF]">
                                                            <th className="py-3 px-6 text-left">Job title</th>
                                                            <th className="py-3 px-6 text-left">Deadline</th>
                                                            <th className="py-3 px-6 text-left">Posted</th>
                                                            <th className="py-3 px-6 text-left">Applicants</th>
                                                            <th className="py-3 px-6 text-left">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {currentItems?.length !== 0 ? currentItems?.map((post: any, index) => {

                                                            let deadline: string;
                                                            // Set the deadline date
                                                            const createdDate = new Date(post?.createdAt);
                                                            const deadlineDate = add(createdDate, { days: post?.jobExpiry?.numberOfDays });
                                                            // Format the deadline date as a string
                                                            const formattedDate = format(deadlineDate, 'dd-MMMM-yyyy');
                                                            // Calculate the time remaining until the deadline
                                                            const currentTime = new Date();
                                                            const timeRemaining = differenceInMilliseconds(deadlineDate, currentTime);
                                                            const daysRemaining = Math.floor(timeRemaining / (24 * 60 * 60 * 1000));
                                                            if (timeRemaining > 0) {
                                                                if (daysRemaining === 0) {
                                                                    deadline = "Today"
                                                                } else if (daysRemaining === 1) {
                                                                    deadline = "Tomorrow"
                                                                } else {
                                                                    deadline = formattedDate;
                                                                }
                                                            } else {
                                                                deadline = 'The deadline has passed.';
                                                            }

                                                            return (
                                                                <>
                                                                    <tr className={currentItems?.length - 1 !== index ? "border-b-2 border-[#F1F5F9]" : ""}>
                                                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                                                            <div>{post?.title}</div>
                                                                            <div className="text-[#64748B] text-xs">
                                                                                <span>Full-time</span>
                                                                                <span className=" border-l border-[#E0E7FF] h-1 mx-2"></span>
                                                                                <span>Hybrid</span>
                                                                            </div>
                                                                        </td>
                                                                        <td className={daysRemaining < 2 ? "py-3 px-6 text-left text-[#ED0A34]" : "py-3 px-6 text-left"}>
                                                                            {deadline}
                                                                        </td>
                                                                        <td className="py-3 px-6 text-left text-[#64748B]">
                                                                            {formatDistanceToNow(new Date(post?.createdAt), { addSuffix: true })}
                                                                        </td>
                                                                        <td className="py-3 px-6 text-left">
                                                                            53
                                                                        </td>
                                                                        <td className="py-3 px-6 text-left">
                                                                            {post?.jobStatus?.title === "Open" && < button className="bg-[#F0FFF5] text-[#16A34A] rounded px-3 py-1 flex justify-center items-center">{post?.jobStatus?.title}</button>}
                                                                            {post?.jobStatus?.title === "Pending" && < button className="bg-[#FFFAF2] text-[#EA580C] rounded px-3 py-1 flex justify-center items-center">{post?.jobStatus?.title}</button>}
                                                                            {post?.jobStatus?.title === "Close" && < button className="bg-[#fadee3] text-[#ED0A34] rounded px-3 py-1 flex justify-center items-center">{post?.jobStatus?.title}</button>}
                                                                        </td>
                                                                    </tr >
                                                                </>
                                                            )
                                                        })
                                                            :
                                                            <tr>
                                                                <td colSpan={5} className="py-3 px-6">
                                                                    <h1 className="text-center">No record</h1>
                                                                </td>
                                                            </tr>
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <ReactPaginateItems itemsPerPage={itemsPerPage} items={posts} itemOffset={itemOffset} setItemOffset={setItemOffset} />
                                        </>
                                        : <NoRecords />
                                    }
                                </Tab.Panel>
                            )
                        })}
                    </Tab.Panels>
                </Tab.Group>
            </div >
        </>
    )
}

export default RecruiterJobList;
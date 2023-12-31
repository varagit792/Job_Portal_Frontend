import Loader from '../../commonComponents/Loader';
import NoRecords from '../../commonComponents/NoRecords';
import ThreeDots from '../../../assets/svg/threeDots.svg';
import BookMark from '../../../assets/svg/bookMark.svg';
import MoneyIcon from '../../../assets/svg/MoneyIcon.svg';
import ExperienceIcon from '../../../assets/svg/ExperienceIcon.svg';
import LocationIcon from '../../../assets/svg/LocationIcon.svg';
import compenyBrand from '../../../assets/png/companyBrand.png';
import { formatDistanceToNow } from 'date-fns';

const JobCard = ({ onClickJobCard, jobCard, loading }: any) => {
    return (
        <>
            {jobCard.length ? jobCard?.map((item: any) => (
                <div className="py-5 px-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mb-5 cursor-pointer" onClick={() => onClickJobCard(item.id)} key={item.id}>
                    <div className="flex items-start justify-between">
                        <div className="flex justify-start items-start h-full">
                            <img src={compenyBrand} alt="compenyBrand" />
                            <div className="ml-5">
                                <h1 className="text-lg font-bold">{item?.title}</h1>
                                <span className="text-[#94A3B8] text-sm">{item?.company?.title}</span>
                            </div>
                        </div>
                        <div>
                            <button className="px-1">
                                <img src={BookMark} alt="BookMark" className=" h-4 w-4" />
                            </button>
                            <button className="px-2">
                                <img src={ThreeDots} alt="ThreeDots" className=" h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <hr className="my-5 bg-[#E0E7FF]" />
                    <div className="flex justify-start items-center mb-5">
                        {(item?.totalExpYearStart?.title && item?.totalExpYearEnd?.title) &&
                            < div className=" flex justify-start items-center text-[#64748B] text-sm">
                                <img src={ExperienceIcon} alt="ExperienceIcon" width="15rem" height="15rem" />
                                <span className="ml-2 leading-none">{item?.totalExpYearStart?.title} - {item?.totalExpYearEnd?.title}</span>
                            </div>
                        }
                        {item?.payScaleUpperRange?.title && item?.payScaleLowerRange?.title && item?.recurrence?.title && item?.numberSystem?.title && <div className=" flex justify-start items-center ml-5 text-[#64748B] text-sm">
                            <img src={MoneyIcon} alt="MoneyIcon" width="15rem" height="15rem" /><span className="ml-2 leading-none">{item?.payScaleLowerRange?.title} {item?.numberSystem?.title} - {item?.payScaleUpperRange?.title} {item?.numberSystem?.title} {item?.recurrence?.title}</span>
                        </div>}
                        {item?.jobsLocation?.title && <div className=" flex justify-start items-center ml-5 text-[#64748B] text-sm">
                            <img src={LocationIcon} alt="LocationIcon" width="15rem" height="15rem" /><span className="ml-2 leading-none">{item?.jobsLocation?.title}</span>
                        </div>}
                    </div>
                    {item?.jobDescription &&
                        <div className="mb-5">
                            <ul className="list-disc text-[#94A3B8] text-sm pl-5">
                                <li>
                                    <span className="line-clamp-3 list-inside">{item?.jobDescription}</span>
                                </li>
                            </ul>
                        </div>
                    }
                    <div className="flex items-center justify-start">
                        <button className="bg-[#FFFAF2] text-[#EA580C] px-3 py-1.5 rounded-lg mr-5 text-sm">{item?.workMode?.title}</button>
                        <button className="bg-[#F0FFF5] text-[#16A34A] px-3 py-1.5 rounded-lg mr-5 text-sm">Full-time</button>
                        <span className="text-[#94A3B8] text-sm">Posted {formatDistanceToNow(new Date(item?.createdAt), { addSuffix: true })}</span>
                    </div>
                </div >
            )) : !loading && <NoRecords />}
            {loading && <Loader />}
        </>
    )
}

export default JobCard;
import LocationIcon from '../../assets/svg/LocationIcon.svg';
import companyBrand from '../../assets/png/companyBrand.png';
import ThreeDots from '../../assets/svg/threeDots.svg';
import BookMark from '../../assets/svg/bookMark.svg';
import MoneyIcon from '../../assets/svg/MoneyIcon.svg';
import ExperienceIcon from '../../assets/svg/ExperienceIcon.svg';

const JobListItem = () => {
  return (
    <div className="p-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mr-4 mb-5">
      <div className="flex items-start justify-between mb-3">
        <img src={companyBrand} alt="companyBrand" />
        <div>
          <button className="p-2">
            <img src={BookMark} alt="BookMark" />
          </button>
          <button className="p-2">
            <img src={ThreeDots} alt="ThreeDots" />
          </button>
        </div>
      </div>
      <h1 className="text-base font-bold">Dot net developer</h1>
      <span className="text-[#94A3B8] text-sm">Ratna Global Tech</span>
      <hr className="my-5" />
      <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
        <img src={ExperienceIcon} alt="ExperienceIcon" width="15rem" height="15rem" /><span className="ml-2">6+ yrs exp.</span>
      </div>
      <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
        <img src={MoneyIcon} alt="MoneyIcon" width="15rem" height="15rem" /><span className="ml-2">12 LPA</span>
      </div>
      <div className="mb-5 text-[#475569] text-xs flex justify-start items-center">
        <img src={LocationIcon} alt="LocationIcon" width="15rem" height="15rem" /><span className="ml-2">Hyderabad, Delhi, Mumbai</span>
      </div>
      <div className="flex">
        <button className="bg-[#FFFAF2] text-[#EA580C] px-3 py-2 rounded-lg mr-2 text-sm">Remote</button>
        <button className="bg-[#F0FFF5] text-[#16A34A] px-3 py-2 rounded-lg text-sm">Full-time</button>
      </div>
    </div>
  )
}

export default JobListItem
import React, { useEffect, useState } from 'react'
import Carousel from "react-multi-carousel";
import ArrowRight from '../../../assets/svg/ArrowRight.svg';
import { FiChevronLeft } from 'react-icons/fi';
import { BiChevronRight } from 'react-icons/bi';
import CompanyListItem from '../../commonComponents/CompanyListItem';
import { Link } from 'react-router-dom';
import { getCompanyList } from '../../utils/utils';
import NoRecords from '../../commonComponents/NoRecords';
import { useDispatch } from 'react-redux';
import { getAllCompanies, clearGetAllCompaniesSlice } from '../../../store/reducers/companies/getAllCompanies';
import { useAppDispatch, useAppSelector } from '../../..';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
    slidesToSlide: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3.5,
    slidesToSlide: 2
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};
const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
  const { carouselState: { currentSlide } } = rest;
  return (
    <div className="carousel-button-group gap-2 flex justify-end 
        items-center w-full">
      <button className='block p-3 bg-[#818CF8] text-white rounded-l-md' onClick={() =>
        previous()}> <FiChevronLeft /></button>
      <button onClick={() => next()}><span className='block p-3 bg-[#818CF8] text-white rounded-r-md' ><BiChevronRight /></span></button>
    </div>
  );
};
interface Companies {
  title?: string;
  viewLabel?: string;
}
const TopCompaniesHiring = ({title, viewLabel}:Companies) => {
  const dispatch = useAppDispatch();
  
  const [companyList, setCompanyList] = useState([]);
  const [page, setPage] = useState(1);

  const { success, allCompanies } = useAppSelector((state) => state.getAllCompanies);

  useEffect(() => {
    dispatch(getAllCompanies({ page } as any));
  }, [dispatch, page])
  
  useEffect(() => {
    setCompanyList(allCompanies as any)
  },[success])
  
  return (
    <>
      {companyList?.length ? 
      <div>
      <div className="flex justify-between items-center mb-10 font-bold">
        <h1 className="text-xl">{title}</h1>
        <Link to="/allCompanies" className="text-base flex justify-center items-center text-[#312E81]">
          <span className="mr-2">{viewLabel}</span>
          <img src={ArrowRight} alt="ArrowRight" />
        </Link>
      </div>
        <Carousel
        shouldResetAutoplay
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        customTransition="all .5s ease-in-out"
        transitionDuration={500}
        arrows={false}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {companyList?.slice(0,8)?.map((item, index) => index <= 7 && <CompanyListItem item={ item } />)}
        </Carousel>
        </div>
        : <>No Companies to list</>
     }
    </>
  )
}

export default TopCompaniesHiring
import { useEffect, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppSelector } from '../../..';
import { clearLogOutSlice, logOutUser } from '../../../store/reducers/logout';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { Menu, Transition } from '@headlessui/react';
import { getFirstLetterOfName } from '../../utils/filterArray';
import ellipse32 from '../../../assets/svg/ellipse32.svg';
import bell_Icons from '../../../assets/svg/bellIcons.svg';
import EmployerJobLink from './EmployerJobLink';
import EmployerPopoverHover from '../../commonComponents/EmployerPopoverHover';
import PopoverHover from '../../commonComponents/PopoverHover';
import JobCategory from './JobCategory';
import SearchFilters from './SearchFilters';

const Header = () => {
    const [auth, setAuth] = useState(false)
    const [name, setName] = useState('');
    const [userType, setUserType] = useState('');

    const { success: loginSuccess, login } = useAppSelector((state) => state.login);
    const { success: registerSuccess, user } = useAppSelector((state) => state.register);
    const { success: logOutSuccess } = useAppSelector((state) => state.logOut);

    //let userName: string;
    const userName = Cookies.get('name');
    const userTypes = Cookies.get('userType');
    const token = Cookies.get('token');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (logOutSuccess) {
            dispatch(clearLogOutSlice())
            Cookies.remove("name");
            Cookies.remove("userType");
            Cookies.remove("token");
            setName('')
            setAuth(false)
            window.location.reload()
            //navigate('/')
        }
    }, [logOutSuccess])

    useEffect(() => {
        setName(userName as any);
        setUserType(userTypes as any)
        setAuth(token as any)
    }, [loginSuccess, registerSuccess])

    const logout = () => {
        dispatch(logOutUser() as any);
    }

    const handlePopover = () => {
        navigate("/allJobs");
    }

    return (
        <>
            <nav className="h-[10%] w-full bg-[#fff] font-sans border-b border-[#E0E1E6] px-32 flex items-center justify-between box-border fixed top-0 z-50">
                <div className="flex space-x-6 items-center h-full">
                    <Link className="text-[#4F46E5] border border-[#4F46E5] p-1 rounded-md font-semibold" to={`${auth}` ? `${userType === 'jobSeeker' ? "/homePage" : "/employerDashboard"}` : "/"}>JOB PORTAL</Link>
                    <div className="border border-gray-200 h-8"></div>
                    {/* Navigation Link*/}
                    {userType === 'employer' ?
                        <div className="flex space-x-6 items-center h-full">
                            <span className="text-[#312E81] h-full">
                                <EmployerPopoverHover title="Jobs and Responses" body={<EmployerJobLink />} />
                            </span>
                            <Link to="#" className="text-[#312E81]">Resdex</Link>
                            <Link to="#" className="text-[#312E81]">Analytics</Link>
                        </div>
                        :
                        <div className="flex space-x-6 items-center h-full">
                            <span className="text-[#312E81] h-full">
                                <PopoverHover title="Jobs" handlePopover={handlePopover} body={<JobCategory />} />
                            </span>
                            <Link to="/allCompanies" className="text-[#312E81]">Companies</Link>
                            <Link to="#" className="text-[#312E81]">Services</Link>
                        </div>
                    }
                </div>
                <div className="flex space-x-6 items-center">
                    <SearchFilters />
                    <div className="border border-gray-200 h-8"></div>
                    {auth && <div className='float-left'>
                        <img className='float-right' src={ellipse32} alt="image" />
                        <img src={bell_Icons} alt="image" />
                    </div>}
                    <div className="text-[#312E81]">
                        {auth ?
                            <>
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button className="inline-flex w-full justify-center items-center text-[#312E81] m-0 p-0.5">
                                            <div className="w-9 h-9 bg-green-600 text-lg text-white rounded-full pt-1">{getFirstLetterOfName(name)}</div>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="px-1 py-1 ">
                                                {userType !== 'employer' && <>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                            >
                                                                <Link to="/saveJobs">Applied Job</Link>
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                            >
                                                                <Link to="/saveJobs">Saved Job</Link>
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </>}
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() => logout()}
                                                            className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                        >
                                                            Logout
                                                        </button>
                                                    )}
                                                </Menu.Item>

                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </> : <div className="justify-start items-start flex">
                                <div className="w-[72px] p-3 rounded-lg justify-center items-center gap-3 flex">
                                    <Link to="/login" className="text-indigo-900 text-base font-medium leading-snug tracking-tight">Log In</Link>
                                </div>
                                <div className="w-[86px] p-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex">
                                    <Link to="/registration" className="text-indigo-900 text-base font-medium leading-snug tracking-tight">Sign Up</Link>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </nav >
        </>
    )
}

export default Header;
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegHeart, FaRegUserCircle } from 'react-icons/fa'
import { IoIosAddCircleOutline, IoIosLogIn } from 'react-icons/io'
import { BsPersonPlus } from 'react-icons/bs'
import { IoInformationCircleOutline, IoHomeOutline } from 'react-icons/io5'
import { MdAdminPanelSettings } from 'react-icons/md'
import { CiShoppingTag } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { updateSchool } from '../redux/features/user/userSlice'
import { schools } from '../data/schools'

const formattedSchools = [
  { value: '', label: 'All Schools' },
  ...Object.keys(schools).map(key => ({
    value: key,
    label: schools[key]
  }))
];

const Header = () => {
  const { currentSchool } = useSelector(state => state.user)

  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSchool, setSelectedSchool] = useState({
    value: currentSchool,
    label: currentSchool ? currentSchool.toUpperCase() : 'All Schools'
  })
  const [school, setSchool] = useState(currentSchool)

  const dispatch = useDispatch()

  const { currentUser } = useSelector(state => state.user)
  const navigate = useNavigate()
  const path = location.pathname

  const handleOverlayClick = () => {
    setIsOpen(false)
  }

  const handleMenuClick = event => {
    if (event.target.tagName === 'A') {
      setIsOpen(false)
    }
  }

  const handleSchoolChange = selectedOption => {
    setSelectedSchool(selectedOption)
    setSchool(selectedOption.value)
    dispatch(updateSchool({ school: selectedOption.value }))
    window.location.reload()
    // navigate(
    // 	`/search?school=${selectedOption.value}&&searchTerm=${searchTerm}`
    // );
  }

  const handleSearchChange = e => {
    setSearchTerm(e.target.value)
    navigate(`/search?searchTerm=${e.target.value}&&school=${school}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)

    const searchTerm = urlParams.get('searchTerm')
    const schoolValue = urlParams.get('school')
    const selectedSchool = formattedSchools.find(school => school.value === schoolValue)

    setSearchTerm(searchTerm || '')
    setSelectedSchool(selectedSchool || null)
  }, [location.search])

  const customStyles = {
    control: base => ({
      ...base,
      borderTopRightRadius: '0px',
      borderBottomRightRadius: '0px',
      borderColor: 'rgb(59, 130, 246)',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'rgb(37, 99, 235)'
      }
    })
  }

  return (
    <nav className='bg-white shadow-md w-full z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <Link to='/' className='flex items-center'>
            <img
              className='hidden sm:inline-block sm:w-32 sm:h-auto md:w-40 md:h-16'
              src='/logo-desktop.png'
              alt='Logo'
            />
            <img
              className='sm:hidden w-12 h-12'
              src='/logo-mobile.png'
              alt='Logo'
            />
          </Link>
          <div className='flex items-center text-gray-800 font-medium border border-blue-300 text-sm rounded-lg z-20'>
            <Select
              className='min-w-40'
              styles={customStyles}
              options={formattedSchools}
              defaultValue={selectedSchool}
              onChange={handleSchoolChange}
              placeholder='Select school'
            />
            <input
              onChange={handleSearchChange}
              type='text'
              value={searchTerm}
              placeholder='Search product'
              className='hidden md:flex border border-blue-500 focus:ring-1 focus:ring-blue-600 focus:outline-none text-sm rounded-e-md w-full py-2 pl-2'
            />
          </div>

          <div className='hidden lg:block'>
            <div className='ml-10 flex items-baseline space-x-4'>
              {currentUser?.role === 'admin' && (
                <a
                  href='/admin/dashboard'
                  className='text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium'
                >
                  Admin Panel
                </a>
              )}
              <Link
                to='/'
                className='text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium'
              >
                Home
              </Link>
              <Link
                to='/shop'
                className='text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium'
              >
                Shop
              </Link>
              <Link
                to='/about'
                className='text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium'
              >
                About
              </Link>
              {currentUser ? (
                <div className='flex items-center space-x-4'>
                  <Link
                    to='/add-product'
                    className='text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium'
                  >
                    Add Product
                  </Link>
                  <Link
                    to='/favourites'
                    className='text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium'
                  >
                    <FaRegHeart className='inline-block' size={20} />
                  </Link>
                  <Link
                    to={`/profile/${currentUser._id}`}
                    className='text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium'
                  >
                    <FaRegUserCircle className='inline-block' size={20} />
                  </Link>
                </div>
              ) : (
                <div className='flex items-center space-x-4'>
                  <Link
                    to='login'
                    className='text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium'
                  >
                    Login
                  </Link>
                  <Link
                    to='register'
                    className='text-gray-800 border border-blue-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium'
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className='-mr-2 flex lg:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type='button'
              className='z-50 inline-flex items-center justify-center p-2 rounded-md text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white  hover:outline-none hover:ring-1 hover:ring-offset-1 hover:ring-offset-blue-800 hover:ring-white'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16m-7 6h7'
                />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay to close mobile view menu */}
      {isOpen && (
        <div className='fixed inset-0 z-40 flex'>
          <div
            className='bg-black bg-opacity-50 flex-grow'
            onClick={handleOverlayClick}
          ></div>
          <div
            onClick={handleMenuClick}
            className='bg-white w-3/4 max-w-sm shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out pt-4 overflow-scroll'
          >
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
              {currentUser?.role === 'admin' && (
                <a
                  href='/admin/dashboard'
                  className='flex items-center gap-2 text-blue-800 hover:text-blue-600 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium'
                >
                  <MdAdminPanelSettings className='inline-block' size={20} />
                  Admin Panel
                </a>
              )}
              <a
                href='/'
                className={`${
                  path === '/' ? 'bg-gray-200' : ''
                } flex items-center gap-2 text-blue-800 hover:text-blue-600 hover:bg-gray-200 px-3 py-2 rounded-md text-base font-medium`}
              >
                <IoHomeOutline className='inline-block' size={20} />
                Home
              </a>
              <Link
                to='/shop'
                className={`${
                  path === '/shop' ? 'bg-gray-200' : ''
                } flex items-center gap-2 text-blue-800 hover:text-blue-600 hover:bg-gray-200 px-3 py-2 rounded-md text-base font-medium`}
              >
                <CiShoppingTag className='inline-block' size={20} />
                Shop
              </Link>
              <Link
                to='/about'
                className={`${
                  path === '/about' ? 'bg-gray-200' : ''
                } flex items-center gap-2 text-blue-800 hover:text-blue-600 hover:bg-gray-200 px-3 py-2 rounded-md text-base font-medium`}
              >
                <IoInformationCircleOutline
                  className='inline-block'
                  size={20}
                />
                About
              </Link>
              {currentUser ? (
                <div className='flex flex-col space-y-1'>
                  <Link
                    to='/add-product'
                    className={`${
                      path === '/add-product' ? 'bg-gray-200' : ''
                    } flex items-center gap-2 text-blue-800 hover:text-blue-600 hover:bg-gray-200 px-3 py-2 rounded-md text-base font-medium`}
                  >
                    <IoIosAddCircleOutline className='inline-block' size={20} />
                    Add Product
                  </Link>
                  <Link
                    to='/favourites'
                    className={`${
                      path === '/favourites' ? 'bg-gray-200' : ''
                    } flex items-center gap-2 text-blue-800 hover:text-blue-600 hover:bg-gray-200 px-3 py-2 rounded-md text-base font-medium`}
                  >
                    <FaRegHeart className='inline-block' size={20} />
                    Favorites
                  </Link>
                  <Link
                    to={`/profile/${currentUser._id}`}
                    className={`${
                      path.startsWith('/profile') ? 'bg-gray-200' : ''
                    } flex items-center gap-2 text-blue-800 hover:text-blue-600 hover:bg-gray-200 px-3 py-2 rounded-md text-base font-medium`}
                  >
                    <FaRegUserCircle className='inline-block' size={20} />
                    Profile
                  </Link>
                </div>
              ) : (
                <div className='flex flex-col space-y-1'>
                  <Link
                    to='login'
                    className='flex items-center gap-2 text-blue-800 hover:text-blue-600 hover:bg-gray-200 px-3 py-2 rounded-md text-base font-medium'
                  >
                    <IoIosLogIn className='inline-block' size={20} />
                    Login
                  </Link>
                  <Link
                    to='register'
                    className='flex items-center gap-2 text-blue-800 hover:text-blue-600 hover:bg-gray-200 px-3 py-2 rounded-md text-base font-medium'
                  >
                    <BsPersonPlus className='inline-block' size={20} />
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header

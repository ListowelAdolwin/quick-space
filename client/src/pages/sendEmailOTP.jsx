import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import ReactGA from 'react-ga4'

const SendEmailOTP = () => {
  ReactGA.send({
    hitType: 'pageview',
    page: '/register',
    title: 'Register Page'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  const BASE_URL = import.meta.env.VITE_BASE_URL

  const handleSubmit = async e => {
    e.preventDefault()

    setIsLoading(true)
    setErrorMessage('')

    try {
      setIsLoading(true)
      const response = await axios.post(`${BASE_URL}/api/auth/send-otp-code`, {
        contact: email
      })

      if (response.status === 200) {
        navigate('/reset-password')
      } else {
        setErrorMessage(response.data.message)
      }
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response?.data?.message || 'An error occurred')
      console.error('Error sending OTP: ', error.response)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-grow'>
        <ToastContainer />
        <div className='max-w-3xl mx-auto px-0 sm:px-6 lg:px-8 py-8'>
          <h1 className='text-3xl font-bold text-blue-800 mb-4 px-4'>
            Reset Password
          </h1>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
            <form onSubmit={handleSubmit}>
              <div>
                <div className='mb-4'>
                  <label
                    className='block text-gray-700 font-bold mb-2'
                    htmlFor='email'
                  >
                    Email
                    <div className='font-thin text-xs'>
                      Kindly enter the contact number you used to register your
                      account below to recover your password
                    </div>
                  </label>
                  <input
                    type='text'
                    name='email'
                    id='email'
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value)
                    }}
                    className='bg-gray-200 focus:bg-white text-gray-800 p-2 rounded focus:border focus:border-blue-700 w-full'
                    placeholder='Enter email address'
                    required
                  />
                </div>
              </div>
              {isLoading ? (
                <Spinner />
              ) : (
                <div className='mb-2'>
                  <button
                    type='submit'
                    className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  >
                    Send Reset Code
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SendEmailOTP

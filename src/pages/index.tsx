import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import axios from 'axios';

interface FormData {
  name: string;
  sector: string;
  agree: boolean;
}
interface UserDetails {
  name: string;
  sector: number; 
}
import { bottomRightBox, leftBox, rightBox, topRightBox } from '../svgs/home';

const Home: FC = () => {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);
  const [userIdForEdit, setUserIdForEdit] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sectors, setSectors] = useState<
      { label: string; value: number }[] | undefined
    >();
   const [user, setUser] = useState<UserDetails>({
     name: '',
     sector: 0, // Initial sector value, adjust as needed
   });

  const router = useRouter();

  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

 
  const getSectors = async () => {
    try {
      const response = await axios.get('/api/sectors');
      const data = response.data?.map(
        (el: { name: string; sector_id: number }) => ({
          label: el.name,
          value: el.sector_id,
        })
      );
      setSectors(data);
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get('/api/user?userId=6');
      const data = response.data?.data;
      console.log('user', data);
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
    }
  };

  //   const handleInputChange = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = event.target;
  //   setUser({
  //     ...user,
  //     [name]: value,
  //   });
  // };


  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const payload = {
        name: 'eewrrewjosh',
        sectors: [1, 19],
      };

      const response = await axios.post('/api/user', payload);
      const { userId } = response.data;

      if (response.status === 200) {
        setTimeout(() => {
          addToast('Form saved successfully!', {
            appearance: 'success',
            autoDismiss: true,
            autoDismissTimeout: 2000,
          });
          reset();
        }, 1000);
      }
      setIsFormVisible(false);
      setUserIdForEdit(userId);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setTimeout(() => {
        addToast('Failed, Try again later', {
          appearance: 'error',
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
      }, 1000);
    }
    console.log(data);
  };

  useEffect(() => {
    getSectors();
    getUserDetails();
  }, []);
 

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen font-poppins backdrop-blur-lg bg-gradient-to-r from-slate-950 to-primary">
      <div className="flex justify-center max-w-6xl px-5 items-centerll item md:mx-auto">
        {isFormVisible ? (
          <div className="w-full max-h-[400px]  rounded px-6 py-7">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-[350px] sm:w-[559px] mx-auto"
            >
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-white">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter full name"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full h-12 px-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="sector" className="block mb-2 text-white">
                  Sector:
                </label>        

                <select
                  id="sector"
                  {...register('sector', { required: 'Sector is required' })}
                  className="w-full h-12 px-1 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500"
                >
                  <option value="">Select a sector</option>
                  {sectors &&
                    sectors.map((sector) => (
                      <option key={sector.value} value={sector.value}>
                        {sector.label}
                      </option>
                    ))}
                </select>
                
                {errors.sector && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.sector.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="agree" className="flex items-center">
                  <input
                    type="checkbox"
                    id="agree"
                    {...register('agree', {
                      required: 'You must agree to terms',
                    })}
                    className="mr-2 border-gray-300 rounded focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="text-white">Agree to terms</span>
                </label>
                {errors.agree && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.agree.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 px-4 py-2 text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
              >
                {isLoading && (
                  <svg
                    className="absolute w-5 h-5 mr-2 -mt-2 text-white animate-spin left-3 top-1/2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.101A4.001 4.001 0 008 12H6v5.291z"
                    ></path>
                  </svg>
                )}
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center">
              <p className="mb-5 text-sm font-semibold text-center text-white">
                Thank you, your data has been saved<br/>
              Click to edit your details
            </p>
            <div className="flex gap-5">
              <button
                onClick={() => router.push(`/edit/userId=${userIdForEdit}`)}
                className="w-full bg-indigo-500 max-w-[100px] text-white  py-4 px-5 rounded hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="hidden md:block">
        <div className="absolute top-0 right-0">{rightBox}</div>
        <div className="absolute bottom-0 left-0">{leftBox}</div>
        <div className="absolute top-[25%] right-[25%]">{topRightBox}</div>
        <div className="absolute bottom-0 right-32">{bottomRightBox}</div>
      </div>
    </div>
  );
};

export default Home;

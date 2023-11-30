import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import axios from 'axios';

interface FormData {
  name: string;
  sector: string;
  agree: boolean;
}
import { bottomRightBox, leftBox, rightBox, topRightBox } from '../svgs/home';

const Home: FC = () => {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);
  const router = useRouter();
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        'https://example.com/api/saveUserDetails',
        data
      );
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
      console.log(data);
    } catch (error) {
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
                  <p className="text-red-500 text-sm mt-1">
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
                  className=" border-gray-300 w-full h-12 px-1 rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500"
                >
                  <option value="">Select a sector</option>
                  <option value="sector1">Sector 1</option>
                  <option value="sector2">Sector 2</option>
                  <option value="sector3">Sector 3</option>
                </select>
                {errors.sector && (
                  <p className="text-red-500 text-sm mt-1">
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.agree.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-500 text-white h-12 py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
              >
                Save
              </button>
            </form>
          </div>
        ) : (
          <div className="flex items-center flex-col">
            <p className="text-center font-semibold text-lg mb-5 text-white">
              Click to edit detail
            </p>
            <button
              onClick={() => router.push('/edit')}
              className="w-full bg-indigo-500 max-w-[100px] text-white h-12 py-2 px-5 rounded hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              Edit
            </button>
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

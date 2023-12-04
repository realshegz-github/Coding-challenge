import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';

interface UserDetails {
  name: string;
  sector: number; // Assuming sector is a number, adjust as needed
}

interface FormData {
  name: string;
  sector: string;
}

const EditUser: FC = () => {
  const router = useRouter();
  const { userId } = router.query; // Retrieve userId from URL
  const [showCommonDetails, setShowCommonDetails] = useState<boolean>(false);
  const [user, setUser] = useState<UserDetails>({
    name: '',
    sector: 0, 
  });
  const { addToast } = useToasts();
  const [sectors, setSectors] = useState<
    { label: string; value: number }[] | undefined
  >();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    if (userId) {
      getUserDetails(userId);
      getSectors();
    }
  }, [userId]);

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
      console.error('Error fetching sectors:', error);
    }
  };

  const getUserDetails = async (id: string | string[]) => {
    try {
      const response = await axios.get(`/api/user?userId=${id}`);
      const userData = response.data?.data;
      if (userData) {
        setUser({
          name: userData.name || '',
          sector: userData.sector || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const onSubmit = async (data: FormData) => {
    try {
      await axios.put(`/api/user/${userId}`, data);

      // Update state to show common details when form is successfully submitted
      setShowCommonDetails(true);

      addToast('Form saved successfully!', {
        appearance: 'success',
        autoDismiss: true,
        autoDismissTimeout: 2000,
      });
    } catch (error) {
      setTimeout(() => {
        addToast('Failed, Try again later', {
          appearance: 'error',
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mx-auto font-poppins backdrop-blur-lg bg-gradient-to-r from-slate-950 to-primary">
      <div className="flex flex-col gap-5 px-8 pt-6 pb-8 mb-4 sm:flex-row sm:gap-9 ">
        {showCommonDetails && (
          <div className="mb-4">
            <h2 className="mb-4 text-xl font-bold text-white">
              Current Details
            </h2>
            <div className="text-white">
              <p className="mb-4 text-base">
                <strong className="text-sm">Name:</strong> {user.name}
              </p>
              <p>
                <strong className="text-sm">Sector:</strong> {user.sector}
              </p>
            </div>
          </div>
        )}

        <div>
          <h1 className="mb-4 text-xl font-bold text-white">
            Edit User Details
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="pb-8 mb-4 rounded "
          >
            <div className="mb-4">
              <label className="block mb-2 text-white" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full h-12 px-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-500"
                placeholder="Enter full name"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-white" htmlFor="sector">
                Sector
              </label>
              <select
                name="sector"
                id="sector"
                value={user.sector}
                onChange={handleInputChange}
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
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;

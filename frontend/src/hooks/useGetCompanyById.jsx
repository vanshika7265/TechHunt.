import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!companyId) return;

    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
          withCredentials: true
        });

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    };

    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;

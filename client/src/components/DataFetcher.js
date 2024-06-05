import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchData } from '@leagacy/mock/data';
import { setLeagues } from '@leagacy/redux/appSlice';

function DataFetcher() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('mockData')) {
      fetchData().then(data => {
        dispatch(setLeagues(data));
      });
    }
  }, [location, dispatch]);

  return null; // This component doesn't render anything
}

export default DataFetcher;
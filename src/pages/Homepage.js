import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as missionActionCreators } from '../state/missions/actions';
import Loading from '../components/Loading';

export default function Launches() {
  const url = 'https://api.spacexdata.com/v3/launches';
  const dispatch = useDispatch();
  const missionData = useSelector((state) => state.missions.missions);
  const didItFetch = useSelector((state) => state.missions.didItFetch);

  useEffect(() => {
    const getData = async () => {
      if (didItFetch) {
        return;
      }
      const res = await fetch(url);
      const data = await res.json();
      dispatch(missionActionCreators.setMissions(data));
      dispatch(missionActionCreators.setFetched(true));
    };
    getData();
  }, [dispatch, didItFetch]);

  return (
    <>
      {!missionData ? (
        <Loading />
      ) : (
        <section class='py-32 max-width'>
          <h1 class='heading text-center mb-10'>Launches</h1>

          <div className='max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5'>
            {missionData.map(
              ({ flight_number, mission_name, links, details }) => (
                <Link
                  to={`/launches/${flight_number}`}
                  key={flight_number}
                  className='p-5 bg-gray-800 rounded'
                >
                  <img src={links.mission_patch} alt={mission_name} />
                  <h2 className='font-bold text-white mt-5 mb-3 text-xl '>
                    {mission_name}
                  </h2>
                  {details && (
                    <p className='text-white opacity-50'>{`${details.substring(
                      0,
                      50
                    )}...`}</p>
                  )}
                </Link>
              )
            )}
          </div>
        </section>
      )}
    </>
  );
}

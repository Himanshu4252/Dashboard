"use client"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchNews } from '../store/slices/newsSlice';

const NewsBox = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { news, loading, error } = useSelector((state: RootState) => state.news);

  useEffect(() => {
      dispatch(fetchNews()); // update the API call later
  }, [dispatch]);

  return (
    <div className='w-full h-[500px] border-2 border-black rounded-2 flex flex-col p-2 gap-2 mt-4 overflow-y-auto'>
      {loading && <p>Loading news...</p>}
      {error && <p className='text-red-500'>Error: {error}</p>}
      {!loading && !error && news.length > 0 && (
        news.map((article, index) => (
          <div key={index} className='border-b-2 pb-2'>
            <h3 className='font-bold'>{article.title}</h3>
            <p className='text-sm'>
              {article.description ? article.description.slice(0, 100) : 'No description available.'}
            </p>
            <a href={article.url} target='_blank' rel='noopener noreferrer' className='text-blue-500'>
              Read more on source site...
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default NewsBox;


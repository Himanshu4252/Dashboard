import React, { useEffect, useState } from 'react';

interface Article {
    title: string;
    description: string;
    url: string;
  }

const NewsBox = () => {
  const [news, setNews] = useState<Article[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_NEWS_API;
        if(!API_URL){
          throw new Error("API URL is not defined");
        }
        const response = await fetch(API_URL);
        const data = await response.json();
        setNews(data.articles || []); 
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className='w-full h-[500px] border-2 border-black rounded-2 flex flex-col p-2 gap-2 mt-4 overflow-y-auto'>
      {news.length > 0 ? (
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
      ) : (
        <p>Loading news...</p>
      )}
    </div>
  );
};

export default NewsBox;

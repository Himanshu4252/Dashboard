'use client'
import React, { useState, ChangeEvent, useEffect } from 'react';
import supabase from '../../lib/supabase.js';

const SearchPanel = () => {
	const [input, setInput] = useState<string>('');
	const [results, setResults] = useState<{ id: number; userName: string }[]>([]);
	const [hasSearched, setHasSearched] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	useEffect(() => {
		const query = input.trim();
		if (query === '') {
			setResults([]);
			setHasSearched(false);
			setIsLoading(false);
			return;
		}

		setIsLoading(true);

		const ApiDebounce = setTimeout(() => {
			(async () => {
				const { data, error } = await supabase
					.from('users')
					.select('id, userName')
					.ilike('userName', `%${query}%`);

				if (error) {
					console.error('Error fetching users:', error.message);
					setResults([]);
					setIsLoading(false);
					return;
				}

				setResults(data || []);
				setHasSearched(true);
				setIsLoading(false);
			})();
		}, 800);

		return () => clearTimeout(ApiDebounce);
	}, [input]);

	return (
		<>
			<div className='absolute border-2 border-[#717171] h-[45vh] w-full bg-[#e6e6e6] dark:bg-[#101215] z-50 p-[10px] flex flex-col gap-[10px]'>
				<input
					type='text'
					className='h-[35px] w-[95%] text-black rounded-[5px] px-[10px] bg-white dark:bg-[#7d7d7] focus:outline-none border-2 border-[#c4c4c4]'
					placeholder='enter the userName here!'
					value={input}
					onChange={inputHandler}
				/>

				<div className='h-[90%] w-full bg-grey overflow-y-auto'>
					{isLoading ? (
						<p className='text-sm text-gray-500'>Searching...</p>
					) : !hasSearched ? (
						<p className='text-sm text-gray-500'>search and connect!</p>
					) : results.length > 0 ? (
						results.map((user) => (
							<div key={user.id} className='p-2 bg-white dark:bg-[#2c2c2c] rounded-md mb-1'>
								{user.userName}
							</div>
						))
					) : (
						<p className='text-sm text-gray-500'>no results found!</p>
					)}
				</div>
			</div>
		</>
	);
};

export default SearchPanel;


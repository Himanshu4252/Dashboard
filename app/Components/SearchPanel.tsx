import react, { useState } from 'react'

const SearchPanel =() =>{
	return(<>
		<div className='absolute border-2 border-[#717171] h-[45vh] w-full bg-[#e6e6e6] dark:bg-[#101215] z-50 p-[10px] flex flex-col gap-[10px]'>
			<input type='text' className='h-[35px] w-[95%] text-black rounded-[5px] px-[10px] bg-white dark:bg-[#7d7d7] focus:outline-none border-2 border-[#c4c4c4]' placeholder='enter the userName here!'/>
			<div className='h-[90%] w-full bg-grey border-2 border-grey-500'>
				search and connect!
			</div>
		</div>
	</>)
}
 
export default SearchPanel;

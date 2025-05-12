
export default function Home() {
  return (
    <main>
	<div className='h-[10vh] w-full flex justify-between items-center px-[20px]'>

	<div className='h-full w-[130px] flex justify-center items-center text-[20px] font-bold'>Buddy App</div>
<div className='h-full w-[120px] flex flex-row justify-between items-center font-semibold text-[15px]'>
					<a> About </a>
					<a> Docs </a>
				</div>
	<div className='h-full w-[80px] flex justify-center items-center '>
					<a className='border-[#5e00ac] border-2 bg-[#7400ff] text-white h-[35px] w-[75px] flex justify-center items-center rounded-[10px] font-bold' href='/signup'>Sign In</a>
				</div>
      	</div>
	<div className='h-[90vh] w-[100vw] flex flex-col items-center'>
				<p className='text-black font-normal text-[24px] leading-[28px] mt-[90px]'>All-in-One Dashboard </p>
				<h3 className='font-bold text-[52px] leading-[52px] mt-[30px]'> Stay Informed and Organized</h3>
				<h3 className='font-bold text-[52px] leading-[52px] mt-[20px]'>Save hours switching between apps</h3>
				<div className='w-[80vw] mt-[40px]'>
					<p className='font-normal text-[18px] leading-[28px] text-[#474544]'>Get instant access to weather updates, top news, and essential tools in one place. Project Buddy keeps your day structured and stress-free—so you can focus on what matters.</p>
				</div>
				<div className='text-[15px] text-green-500 mt-[40px]'> Compatible for mobile phones and laptops</div>
			<a className='border-[#5e00ac] border-2 bg-[#7400ff] text-white h-[55px] w-[340px] flex justify-center items-center rounded-[15px] font-bold mt-[60px] tex-[19px]' href='/signup'>Start your Journey </a>
			</div>
    </main>
  );
}

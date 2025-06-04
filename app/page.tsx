
export default function Home() {
  return (
    <main className="relative">
      {/* Background SVG */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect fill="#FFFFFF" width="200" height="200" />
          <defs>
            <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="88" y1="88" x2="0" y2="0">
              <stop offset="0" stopColor="#008198" />
              <stop offset="1" stopColor="#00cde4" />
            </linearGradient>
            <linearGradient id="b" gradientUnits="userSpaceOnUse" x1="75" y1="76" x2="168" y2="160">
              <stop offset="0" stopColor="#868686" />
              <stop offset="0.09" stopColor="#ababab" />
              <stop offset="0.18" stopColor="#c4c4c4" />
              <stop offset="0.31" stopColor="#d7d7d7" />
              <stop offset="0.44" stopColor="#e5e5e5" />
              <stop offset="0.59" stopColor="#f1f1f1" />
              <stop offset="0.75" stopColor="#f9f9f9" />
              <stop offset="1" stopColor="#FFFFFF" />
            </linearGradient>
            <filter id="c" x="0" y="0" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
            </filter>
          </defs>
          <polygon fill="url(#a)" points="0 174 0 0 174 0" />
          <path
            fill="#000"
            fillOpacity=".5"
            filter="url(#c)"
            d="M121.8 174C59.2 153.1 0 174 0 174s63.5-73.8 87-94c24.4-20.9 87-80 87-80S107.9 104.4 121.8 174z"
          />
          <path
            fill="url(#b)"
            d="M142.7 142.7C59.2 142.7 0 174 0 174s42-66.3 74.9-99.3S174 0 174 0S142.7 62.6 142.7 142.7z"
          />
        </svg>
      </div>

      {/* Header */}
      <div className="h-[10vh] w-full flex justify-between items-center px-[20px] relative z-10">
        <div className="h-full w-[130px] flex justify-center items-center text-[20px] font-bold">
          Buddy App
        </div>
        <div className="h-full w-[120px] flex flex-row justify-between items-center font-semibold text-[15px]">
          <a>About</a>
          <a>Docs</a>
        </div>
        <div className="h-full w-[80px] flex justify-center items-center">
          <a
            className="border-[#5e00ac] border-2 bg-[#7400ff] text-white h-[35px] w-[75px] flex justify-center items-center rounded-[10px] font-bold"
            href="/signup"
          >
            Sign In
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[90vh] w-[100vw] flex flex-col items-center relative z-10">
        <p className="text-black font-normal text-[24px] leading-[28px] mt-[90px]">
          All-in-One Dashboard
        </p>
        <h3 className="font-bold text-[52px] leading-[52px] mt-[30px]">
          Stay Informed and Organized
        </h3>
        <h3 className="font-bold text-[52px] leading-[52px] mt-[20px]">
          Save hours switching between apps
        </h3>
        <div className="w-[80vw] mt-[40px]">
          <p className="font-normal text-[18px] leading-[28px] text-[#474544]">
            Get instant access to weather updates, top news, and essential tools in one place. Project Buddy keeps your day structured and stress-free—so you can focus on what matters.
          </p>
        </div>
        <div className="text-[15px] text-green-500 mt-[40px]">
          Compatible for mobile phones and laptops
        </div>
        <a
          className="border-[#5e00ac] border-2 bg-[#7400ff] text-white h-[55px] w-[340px] flex justify-center items-center rounded-[15px] font-bold mt-[60px] text-[19px]"
          href="/signup"
        >
          Start your Journey
        </a>
      </div>
    </main>
  );
}


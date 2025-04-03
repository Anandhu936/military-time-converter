
import { useState } from "react";

const HeroSection = () => {
    const [isMilitaryActive, setIsMilitaryActive] = useState(true);
    const [militaryTime, setMilitaryTime] = useState("");
    const [standardTime, setStandardTime] = useState("");
    const [militaryTimeError, setMilitaryTimeError] = useState("");
    const [standardTimeError, setStandardTimeError] = useState("");
  
    const convertToStandardTime = (time) => {
      if (!/^\d{4}$/.test(time) || Number(time) > 2400 || Number(time) < 0) {
        return "Invalid time";
      }
      let hours = parseInt(time.slice(0, 2), 10);
      const minutes = time.slice(2, 4);
  
      if (minutes > "59") {
        return "Invalid time";
      }
      const suffix = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      return `${hours}:${minutes} ${suffix}`;
    };
  
    const convertToMilitaryTime = (time) => {
      const timeFormat = /^(1[0-2]|0?[1-9]):([0-5][0-9])\s?(AM|PM)$/i;
      if (!timeFormat.test(time)) {
        return "Invalid time";
      }
  
      const timeMatch = time.match(/\d+/g);
      if (!timeMatch) {
        return "Invalid time";
      }
  
      let [hours] = timeMatch.map(Number);
      const minutes = timeMatch[1];
  
      const periodMatch = time.match(/AM|PM/i);
      if (!periodMatch) {
        return "Invalid time";
      }
  
      const period = periodMatch[0].toUpperCase();
  
      if (period === "PM" && hours !== 12) {
        hours = (hours ?? 0) + 12;
      } else if (period === "AM" && hours === 12) {
        hours = 0;
      }
  
      const formattedHours = hours?.toString().padStart(2, "0");
      const formattedMinutes = minutes?.toString().padStart(2, "0");
  
      return `${formattedHours}${formattedMinutes}`;
    };
  
    const handleTimeChange = (e) => {
      const time = e.target.value;
      if (isMilitaryActive) {
        setMilitaryTime(time);
        const convertedTime = convertToStandardTime(time);
        if (convertedTime === "Invalid time") {
          setMilitaryTimeError("Enter a valid input");
          setStandardTime("");
        } else {
          setMilitaryTimeError("");
          setStandardTime(convertedTime);
        }
      } else {
        setStandardTime(time);
        const convertedTime = convertToMilitaryTime(time);
        if (convertedTime === "Invalid time") {
          setStandardTimeError("Enter a valid input");
          setMilitaryTime("");
        } else {
          setStandardTimeError("");
          setMilitaryTime(convertedTime);
        }
      }
    };
  
    const handleMilitaryClick = () => {
      setIsMilitaryActive(true);
    };
  
    const handleStandardClick = () => {
      setIsMilitaryActive(false);
      document.getElementById("standard-time")?.removeAttribute("readonly");
    };
  

  return (

    <div className='max-md:ml-[5px] max-md:mr-[5px]'>
       <div className="absolute left-0 right-0 top-0 h-auto">
        
      </div>
      <div className="relative overflow-hidden text-center md:max-w-[675px] mx-auto mt-[60px]">
        <h1 className="text-[36px] md:text-[48px] leading-[1.2em] tracking-[.02em] font-semibold mb-6 text-white font-dm-sans">
          Military time converter
        </h1>
        <p className="text-base mb-12  md:leading-[1.583em] text-[#B7B4C7]">
          Not sure how to write military time or convert it to standard time? This tool easily converts military time to standard time, and vice versa.
        </p>
      </div>
      <div className="flex justify-center relative z-10 mb-[60px]">
        <div className="rounded-[20px] bg-[#FFFFFF0A] border border-[#FFFFFF29]">
          <div className="mt-[80px] max-lg:mt-[60px] max-md:mt-[50px] max-sm:mt-[40px]  mb-[80px] max-lg:mb-[70px] max-md:mb-[50px] max-sm:mb-[40px] ml-[67px] max-lg:ml-[47px] max-md:ml-[37px] max-sm:ml-[15px] mr-[67px] max-lg:mr-[47px] max-md:mr-[37px] max-sm:mr-[15px]">
            <div className="flex justify-center">
              <div className="flex rounded-[6px] px-1 py-1  bg-[#131115] ">
                <div>
                  <button
                    type="button"
                    onClick={handleMilitaryClick}
                    className={`rounded-[6px] px-2 py-1 font-normal text-base max-sm:text-sm font-inter text-[#d1ccf0] shadow-sm ${isMilitaryActive ? "bg-[#FFFFFF0F]" : "bg-[#131115]"
                      } `}
                  >
                    Military time
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleStandardClick}
                    className={`rounded-[6px] px-2 py-1 font-normal text-base max-sm:text-sm font-inter text-[#d1ccf0] shadow-sm ${!isMilitaryActive ? "bg-[#FFFFFF0F]" : "bg-[#131115]"
                      } `}
                  >
                    Standard time 
                  </button>

                </div>
              </div>
            </div>
            <div className="mt-[30px] max-md:mt-[20px] flex gap-[46px] max-md:gap-[20px]">
              {isMilitaryActive ? (
                <>
                  <div className="flex flex-col  ">
                    <h4 className="text-[#d1ccf0] font-normal lg:text-center max-lg:text-sm font-inter flex gap-2 max-md:justify-center">Military Time </h4>
                    <input
                      type="text"
                      name="military-time"
                      id="military-time"
                      placeholder="1430"
                      value={militaryTime}
                      onChange={handleTimeChange}
                      className={`bg-[#FFFFFF0A] placeholder:text-[#FFFFFF29] text-[#FFFFFFEB] text-center rounded-[12px] border focus:outline-none ${militaryTimeError ? 'border-[#FC8181]' : 'border-[#ffffff29]'} font-inter  text-[40px] max-md:text-[24px]  font-normal leading-[48px] w-[233px] max-lg:w-[190px] max-md:w-[170px] max-sm:w-[150px]  h-[80px]  max-md:h-[50px] p-[16px] max-md:p-[10px] px-[24px] max-md:px-[18px] gap-[8px] max-md:gap-[5px]  mt-[4px]`}
                      onKeyDown={(e) => {
                        const allowedKeys = ['Delete', 'Backspace', 'ArrowLeft', 'ArrowRight'];
                        if (!e.key.match(/[0-9]/) && !allowedKeys.includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {militaryTimeError && <div className="text-[#FC8181] text-sm">{militaryTimeError}</div>}
                  </div>
                  <div className=" items-end  hidden md:flex">
                    <button>
                      <svg
                        width="74"
                        height="74"
                        viewBox="0 0 74 74"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g filter="url(#filter0_ddi_77_69)">
                          <circle
                            cx="37"
                            cy="33"
                            r="32"
                            fill="white"
                            fillOpacity="0.04"
                          />
                        </g>
                        <path
                          d="M20.5 26.9512C20.5 26.1228 21.1716 25.4512 22 25.4512H52C52.8284 25.4512 53.5 26.1228 53.5 26.9512C53.5 27.7797 52.8284 28.4512 52 28.4512H22C21.1716 28.4512 20.5 27.7797 20.5 26.9512Z"
                          fill="white"
                          fillOpacity="0.36"
                        />
                        <path
                          d="M20.5 38.0005C20.5 37.1721 21.1716 36.5005 22 36.5005H52C52.8284 36.5005 53.5 37.1721 53.5 38.0005C53.5 38.8289 52.8284 39.5005 52 39.5005H22C21.1716 39.5005 20.5 38.8289 20.5 38.0005Z"
                          fill="white"
                          fillOpacity="0.36"
                        />
                        <defs>
                          <filter
                            id="filter0_ddi_77_69"
                            x="0"
                            y="0"
                            width="74"
                            height="74"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feMorphology
                              radius="1"
                              operator="erode"
                              in="SourceAlpha"
                              result="effect1_dropShadow_77_69"
                            />
                            <feOffset dy="2" />
                            <feGaussianBlur stdDeviation="2" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_77_69"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feMorphology
                              radius="1"
                              operator="erode"
                              in="SourceAlpha"
                              result="effect2_dropShadow_77_69"
                            />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="3" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="effect1_dropShadow_77_69"
                              result="effect2_dropShadow_77_69"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect2_dropShadow_77_69"
                              result="shape"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="1" />
                            <feComposite
                              in2="hardAlpha"
                              operator="arithmetic"
                              k2="-1"
                              k3="1"
                            />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="shape"
                              result="effect3_innerShadow_77_69"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-col  ">
                    <h4 className="text-[#d1ccf0] font-normal lg:text-center max-lg:text-sm font-inter flex gap-2 max-md:justify-center ">Standard Time </h4>  
                    <input
                      type="text"
                      name="standard-time"
                      id="standard-time"
                      placeholder="2:30PM"
                      value={standardTime}
                      readOnly
                      className="bg-[#FFFFFF0A] placeholder:text-[#FFFFFF29]  text-[#FFFFFFEB] focus:outline-none text-center rounded-[12px] border border-[#FFFFFF29] font-inter text-[40px] max-md:text-[24px]   font-normal leading-[48px] w-[233px] max-lg:w-[190px] max-md:w-[170px] max-sm:w-[150px]  h-[80px]  max-md:h-[50px] p-[16px] max-md:p-[10px] px-[24px] max-md:px-[18px] gap-[8px] max-md:gap-[5px]  mt-[4px]"
                    />
                  </div>
                  
                </>
              ) : (
                <>
                  <div className="flex flex-col  ">
                    <h4 className="text-[#B7B4C7] font-normal lg:text-base max-lg:text-sm font-inter flex gap-2 max-md:justify-center">Standard Time </h4> 
                    <input
                      type="text"
                      name="standard-time"
                      id="standard-time"
                      placeholder="2:30PM"
                      value={standardTime}
                      onChange={handleTimeChange}
                      className={`bg-[#FFFFFF0A] placeholder:text-[#FFFFFF29] text-[#FFFFFFEB] text-center rounded-[12px] border focus:outline-none ${standardTimeError ? 'border-[#FC8181]' : 'border-[#ffffff29]'} font-inter text-[40px] max-md:text-[24px]  font-normal leading-[48px] w-[233px] max-lg:w-[190px] max-md:w-[170px]  max-sm:w-[150px]   h-[80px]  max-md:h-[50px] p-[16px] max-md:p-[10px] px-[24px] max-md:px-[18px] gap-[8px] max-md:gap-[5px]  mt-[4px]`}
                      onKeyDown={(e) => {
                        const allowedKeys = ['Delete', 'Backspace', 'ArrowLeft', 'ArrowRight'];
                        const allowedChars = ['1', '2', '3', '4', '5', '6', '7', '8', '9','0', 'a', 'm', 'p', ':'];
                        if (!allowedKeys.includes(e.key) && !allowedChars.includes(e.key.toLowerCase())) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {standardTimeError && <div className="text-[#FC8181] text-sm">{standardTimeError}</div>}
                  </div>
                  <div className="hidden md:flex items-end">
                    <button>
                      <svg
                        width="74"
                        height="74"
                        viewBox="0 0 74 74"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g filter="url(#filter0_ddi_77_69)">
                          <circle
                            cx="37"
                            cy="33"
                            r="32"
                            fill="white"
                            fillOpacity="0.04"
                          />
                        </g>
                        <path
                          d="M20.5 26.9512C20.5 26.1228 21.1716 25.4512 22 25.4512H52C52.8284 25.4512 53.5 26.1228 53.5 26.9512C53.5 27.7797 52.8284 28.4512 52 28.4512H22C21.1716 28.4512 20.5 27.7797 20.5 26.9512Z"
                          fill="white"
                          fillOpacity="0.36"
                        />
                        <path
                          d="M20.5 38.0005C20.5 37.1721 21.1716 36.5005 22 36.5005H52C52.8284 36.5005 53.5 37.1721 53.5 38.0005C53.5 38.8289 52.8284 39.5005 52 39.5005H22C21.1716 39.5005 20.5 38.8289 20.5 38.0005Z"
                          fill="white"
                          fillOpacity="0.36"
                        />
                        <defs>
                          <filter
                            id="filter0_ddi_77_69"
                            x="0"
                            y="0"
                            width="74"
                            height="74"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feMorphology
                              radius="1"
                              operator="erode"
                              in="SourceAlpha"
                              result="effect1_dropShadow_77_69"
                            />
                            <feOffset dy="2" />
                            <feGaussianBlur stdDeviation="2" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_77_69"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feMorphology
                              radius="1"
                              operator="erode"
                              in="SourceAlpha"
                              result="effect2_dropShadow_77_69"
                            />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="3" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="effect1_dropShadow_77_69"
                              result="effect2_dropShadow_77_69"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect2_dropShadow_77_69"
                              result="shape"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="1" />
                            <feComposite
                              in2="hardAlpha"
                              operator="arithmetic"
                              k2="-1"
                              k3="1"
                            />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="shape"
                              result="effect3_innerShadow_77_69"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[#B7B4C7] font-normal lg:text-base max-lg:text-sm font-inter flex gap-2 max-md:justify-center">Military Time </h4> 
                    <input
                      type="text"
                      name="military-time"
                      id="military-time"
                      placeholder="1430"
                      value={militaryTime}
                      readOnly
                      className="bg-[#FFFFFF0A] placeholder:text-[#FFFFFF29] text-[#FFFFFFEB] focus:outline-none text-center rounded-[12px] border border-[#FFFFFF29] font-inter text-[40px] max-md:text-[24px]   font-normal leading-[48px] w-[233px] max-lg:w-[190px] max-md:w-[170px] max-sm:w-[150px]   h-[80px]  max-md:h-[50px] p-[16px] max-md:p-[10px] px-[24px] max-md:px-[18px] gap-[8px] max-md:gap-[5px] mt-[4px]"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
export default function Experience() {
    return(
        <div className="w-full bg-[#E8E4DC] py-20">
            <div className="w-11/12 container mx-auto flex flex-col gap-[41px] justify-center items-center">
            <div className=' text-center  '>
                <h1 className="epilogue text-[32px] lg:text-[66px] ">My Experience</h1>
                {/* <div className='flex flex-col'>
                    <p className="epilogue1 md:w-[73%] lg:w-[88%] xl:w-[65%] mx-auto lg:text-[24px]">My journey started with curiosity — the need to understand how the web works and how people use it. That curiosity grew into late nights, debugging sessions, and real products that made me better.</p>
                </div> */}
            </div>
                <div className='lg:w-[60%] mx-auto bg-white/60 rounded-[42px] '>
                    <div className='flex flex-col pt-[39px] items-center gap-2'>
                        <h3 className='lg:text-[26px] font-extrabold'>Tech Studio Academy (Intern)</h3>
                    <p className='text-[18px]'>May 1st - July  30th, 2025.</p>
                    </div>
                    <div className='flex flex-col bg-white rounded-[42px] m-[32px]'>
                       <div className='px-[32px] py-[59px] flex flex-col gap-[40px]'>
                         <div>
                            <h2 className='epilogue2 text-[32px]'> Nrc </h2>
                            <div className='epilogue1 text-[13px] lg:text-[18px]'>
                                <ul className="flex flex-col gap-2">
                                    <li>Collaborated with a cross-functional team to enhance and revitalize the existing NRC railway platform, delivering a seamless booking experience for tickets, train tracking, and journey management.</li>
                                    <li>
                                        Built a fully responsive interface with real-time seat availability and interactive booking flows, ensuring consistent functionality across desktop, tablet, and mobile devices.</li>
                                    <li>Participated in daily standups, code reviews, and sprint planning sessions while actively learning and applying frontend best practices under senior developer mentorship.</li>
                                    <li> I made Use next.js, Zustand, Tailwind CSS,</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h2 className='epilogue2 text-[32px]'>NIS</h2>
                            <div className='epilogue1 text-[13px] lg:text-[18px]'>
                                <ul className="flex flex-col gap-2">
                                    <li>Collaborated closely with designers, backend developers, and frontend interns to enhance the existing Nigeria Immigration Service digital platform, refining the user experience for visa applications and application status tracking.</li>
                                    <li>Implemented responsive interface enhancements and streamlined application workflows to ensure seamless data synchronization and optimal display across all devices.</li>
                                    <li>Participated in agile development processes including team meetings and code reviews while receiving continuous mentorship from senior developers.</li>
                                    <li> Technologies Used: React, Zustand, Tailwind CSS,</li>
                                </ul>
                            </div>
                        </div>
                       </div>
                    </div>
                    <div className='flex flex-col md:flex-row items-center justify-center gap-[12px] pb-[32px]'>
                        <a href='https://drive.google.com/file/d/13My7bjQvZPhqf_hp9g9WIQ8BpexHlUUA/view?usp=drivesdk'  className=' bg-[#35CDFF] text-white py-2 px-4 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl  transform order-2 lg:order-1 '>
                            <p className="font-medium text-sm whitespace-nowrap">
                                View my Recommendation Letter
                            </p>
                        </a>
                        <a href='https://drive.google.com/file/d/1rBWzk_hsGT-Yxq8vvYdx0zt_5CCZLOL9/view?usp=sharing'  className='bg-cyan-400/10  text-[#35CDFF]  py-2 px-4 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl  transform border border-[#35CDFF1A] lg:order-2 order-1 '>
                            <p className="font-medium text-sm whitespace-nowrap">
                                View C.v
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

// bg-cyan-400/10 
// 'https://drive.google.com/file/d/1rBWzk_hsGT-Yxq8vvYdx0zt_5CCZLOL9/view?usp=sharing'
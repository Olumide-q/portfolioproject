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
                            <p className='epilogue1 text-sm lg:text-[18px]'>Collaborated closely with a designer, a backend developer, a senior developer, and frontend interns during my internship to enhance and revitalize the existing NRC railway platform. Identified improvement opportunities and contributed to developing a seamless booking experience for tickets, train tracking, and journey management. Participated in daily standups, code reviews, and sprint planning sessions while working to deliver a fully responsive interface with real-time seat availability and interactive booking flows, actively learning best practices and receiving mentorship throughout the development process.</p>
                        </div>
                        <div>
                            <h2 className='epilogue2 text-[32px]'>NIS</h2>
                            <p className='epilogue1 text-sm lg:text-[18px]'>Built upon and enhanced an existing digital platform for the Nigeria Immigration Service during my internship, working collaboratively with designers, backend developers, and frontend interns. Identified areas for improvement and contributed to refining the user experience for accessing immigration services, submitting visa applications, and tracking application status. Participated in agile development processes including team meetings and code reviews while implementing enhancements to improve the interface's responsiveness across all devices and streamline application processes, receiving guidance and mentorship throughout the project.</p>
                        </div>
                       </div>
                    </div>
                    <div className='flex flex-col md:flex-row items-center justify-center gap-[12px] pb-[32px]'>
                        <a href='https://drive.google.com/file/d/13My7bjQvZPhqf_hp9g9WIQ8BpexHlUUA/view?usp=drivesdk'  className=' bg-[#35CDFF] text-white py-2 px-4 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl  transform '>
                            <p className="font-medium text-sm whitespace-nowrap">
                                View my Recommendation Letter
                            </p>
                        </a>
                        <div  className=' text-[#35CDFF] bg-cyan-400/10 py-2 px-4 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl  transform '>
                            <p className="font-medium text-sm whitespace-nowrap">
                                View C.v
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


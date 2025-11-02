// "use client"
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useGSAP } from '@gsap/react';
// import { useEffect, useRef, useCallback, useState } from 'react';
// import Image from 'next/image';
// import snake from '../../asset/icons/Vector (13).svg'
// import line from '../../asset/icons/Group 6.svg'
// import img from '../../asset/images/Frame 50.svg'
// import img1 from '../../asset/images/Frame 50 (1).svg'

// // Register ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// export default function Hero() {
//     const [showEmailOptions, setShowEmailOptions] = useState(false);
//     const [copiedEmail, setCopiedEmail] = useState(false);
//     const [copiedPhone, setCopiedPhone] = useState(false);
//       const [isScrolled, setIsScrolled] = useState(false);

//        useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//     const containerRef = useRef(null);
//     const snakeImageRef = useRef(null);
//     const workTextRef = useRef(null);
//     const lineImageRef = useRef(null);
//     const contactTextRef = useRef(null);
//     const morphCircleRef = useRef(null);
//     const circlePathRef = useRef(null);
//     const mainImageRef = useRef(null);
//     const mainImageMobileRef = useRef(null);
//     const tag1Ref = useRef(null);
//     const tag2Ref = useRef(null);
//     const heroTextRef = useRef(null);
//     const emailDropdownRef = useRef(null);

//     // Navigation section ref for ScrollTrigger
//     const navSectionRef = useRef(null);
//     // Image section ref for ScrollTrigger
//     const imageSectionRef = useRef(null);
//     // Hero text section ref for ScrollTrigger
//     const heroSectionRef = useRef(null);

//     // Memoize the top section animation
//     const animateTopSection = useCallback(() => {
//         if (!snakeImageRef.current || !workTextRef.current || !lineImageRef.current || !contactTextRef.current) {
//             return;
//         }

//         // Set initial states
//         gsap.set([snakeImageRef.current, lineImageRef.current], {
//             scaleX: 0,
//             transformOrigin: "left center"
//         });

//         gsap.set([workTextRef.current, contactTextRef.current], {
//             opacity: 0,
//             y: -20
//         });

//         // Animation timeline
//         const tl = gsap.timeline({ paused: true });

//         tl.to(snakeImageRef.current, {
//             scaleX: 1,
//             duration: 1.5,
//             ease: "power2.inOut"
//         })
//         .to(workTextRef.current, {
//             opacity: 1,
//             y: 0,
//             duration: 0.8,
//             ease: "power2.out"
//         }, "-=1.0")
//         .to(lineImageRef.current, {
//             scaleX: 1,
//             duration: 1.5,
//             ease: "power2.inOut"
//         }, "-=1.2")
//         .to(contactTextRef.current, {
//             opacity: 1,
//             y: 0,
//             duration: 0.8,
//             ease: "power2.out"
//         }, "-=1.0");

//         return tl;
//     }, []);

//     // Main hero text animation with progressive drawing circle
//     const animateHeroText = useCallback(() => {
//         if (!heroTextRef.current || !morphCircleRef.current || !circlePathRef.current) return;

//         gsap.set(heroTextRef.current, {
//             opacity: 0,
//             y: 50
//         });

//         gsap.set(morphCircleRef.current, {
//             opacity: 0,
//         });

//         // Calculate circle circumference for stroke animation
//         const circleElement = circlePathRef.current;
//         const circumference = 2 * Math.PI * Math.sqrt((280 * 280 + 45 * 45) / 2);

//         // Set initial stroke dash properties for drawing animation
//         gsap.set(circlePathRef.current, {
//             strokeDasharray: circumference,
//             strokeDashoffset: circumference,
//         });

//         const tl = gsap.timeline({ paused: true });

//         tl.to(heroTextRef.current, {
//             opacity: 1,
//             y: 0,
//             duration: 1,
//             ease: "power2.out"
//         })
//         .to(morphCircleRef.current, {
//             opacity: 1,
//             duration: 0.3,
//             ease: "power2.out",
//         }, "-=0.3")
//         .to(circlePathRef.current, {
//             strokeDashoffset: 0,
//             duration: 2,
//             ease: "power2.inOut",
//         }, "-=0.1")
//         .to(circlePathRef.current, {
//             strokeWidth: 10,
//             duration: 0.3,
//             ease: "power2.inOut",
//             yoyo: true,
//             repeat: 1,
//         }, "+=0.5");

//         return tl;
//     }, []);

//     // Image and tags animation
//     const animateImageSection = useCallback(() => {
//         if (!mainImageRef.current && !mainImageMobileRef.current) return;
//         if (!tag1Ref.current || !tag2Ref.current) return;

//         const imageToAnimate = mainImageRef.current || mainImageMobileRef.current;

//         gsap.set(imageToAnimate, {
//             scale: 0.8,
//             opacity: 0
//         });

//         gsap.set([tag1Ref.current, tag2Ref.current], {
//             opacity: 0,
//             scale: 0,
//             transformOrigin: "center center"
//         });

//         const tl = gsap.timeline({ paused: true });

//         tl.to(imageToAnimate, {
//             scale: 1,
//             opacity: 1,
//             duration: 1,
//             ease: "power2.out",
//         })
//         .to(tag1Ref.current, {
//             opacity: 1,
//             scale: 1,
//             duration: 0.6,
//             ease: "back.out(1.7)"
//         }, "-=0.5")
//         .to(tag2Ref.current, {
//             opacity: 1,
//             scale: 1,
//             duration: 0.6,
//             ease: "back.out(1.7)"
//         }, "-=0.3");

//         return tl;
//     }, []);

//     // Shake animation for tags
//     const shakeAnimation = useCallback((target) => {
//         return gsap.to(target, {
//             x: -5,
//             y: -5,
//             rotation: 5,
//             duration: 0.4,
//             repeat: -1,
//             yoyo: true,
//             ease: "power1.inOut",
//             paused: true,
//         });
//     }, []);

//     // Copy email to clipboard
//     const handleCopyEmail = () => {
//         navigator.clipboard.writeText('abdulquadriogunlana@gmail.com');
//         setCopiedEmail(true);
//         setTimeout(() => {
//             setCopiedEmail(false);
//             setShowEmailOptions(false);
//         }, 2000);
//     };

//     // Copy phone to clipboard
//     const handleCopyPhone = () => {
//         navigator.clipboard.writeText('+2347011126831');
//         setCopiedPhone(true);
//         setTimeout(() => {
//             setCopiedPhone(false);
//             setShowEmailOptions(false);
//         }, 2000);
//     };

//     // Close dropdown when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (emailDropdownRef.current && !emailDropdownRef.current.contains(event.target)) {
//                 setShowEmailOptions(false);
//                 setCopiedEmail(false);
//                 setCopiedPhone(false);
//             }
//         };

//         if (showEmailOptions) {
//             document.addEventListener('mousedown', handleClickOutside);
//         }

//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [showEmailOptions]);

//     useEffect(() => {
//         const tag1 = tag1Ref.current;
//         const tag2 = tag2Ref.current;
//         const mainImage = mainImageRef.current;
//         const mainImageMobile = mainImageMobileRef.current;

//         if (!tag1 || !tag2) return;

//         const tag1Shake = shakeAnimation(tag1);
//         const tag2Shake = shakeAnimation(tag2);

//         const handleMouseEnter = () => {
//             tag1Shake.play();
//             tag2Shake.play();
//         };

//         const handleMouseLeave = () => {
//             tag1Shake.pause(0).seek(0);
//             tag2Shake.pause(0).seek(0);
//             gsap.to([tag1, tag2], { x: 0, y: 0, rotation: 0, duration: 0.2, ease: "power1.out" });
//         };

//         // Add listeners to both images
//         if (mainImage) {
//             mainImage.addEventListener('mouseenter', handleMouseEnter);
//             mainImage.addEventListener('mouseleave', handleMouseLeave);
//         }
        
//         if (mainImageMobile) {
//             mainImageMobile.addEventListener('mouseenter', handleMouseEnter);
//             mainImageMobile.addEventListener('mouseleave', handleMouseLeave);
//         }

//         return () => {
//             if (mainImage) {
//                 mainImage.removeEventListener('mouseenter', handleMouseEnter);
//                 mainImage.removeEventListener('mouseleave', handleMouseLeave);
//             }
//             if (mainImageMobile) {
//                 mainImageMobile.removeEventListener('mouseenter', handleMouseEnter);
//                 mainImageMobile.removeEventListener('mouseleave', handleMouseLeave);
//             }
//             tag1Shake.kill();
//             tag2Shake.kill();
//         };
//     }, [shakeAnimation]);

//     useGSAP(() => {
//         // Create animation timelines
//         const topTl = animateTopSection();
//         const imageTl = animateImageSection();
//         const heroTl = animateHeroText();

//         // ScrollTrigger for navigation section
//         if (topTl && navSectionRef.current) {
//             ScrollTrigger.create({
//                 trigger: navSectionRef.current,
//                 start: "top 80%",
//                 end: "bottom 20%",
//                 onEnter: () => topTl.restart(),
//                 onEnterBack: () => topTl.restart(),
//             });
//         }

//         // ScrollTrigger for image section
//         if (imageTl && imageSectionRef.current) {
//             ScrollTrigger.create({
//                 trigger: imageSectionRef.current,
//                 start: "top 70%",
//                 end: "bottom 30%",
//                 onEnter: () => imageTl.restart(),
//                 onEnterBack: () => imageTl.restart(),
//             });
//         }

//         // ScrollTrigger for hero text section
//         if (heroTl && heroSectionRef.current) {
//             ScrollTrigger.create({
//                 trigger: heroSectionRef.current,
//                 start: "top 60%",
//                 end: "bottom 40%",
//                 onEnter: () => heroTl.restart(),
//                 onEnterBack: () => heroTl.restart(),
//             });
//         }

//         // Refresh ScrollTrigger on component mount to ensure proper calculation
//         ScrollTrigger.refresh();

//         // Cleanup function
//         return () => {
//             ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//         };
//     }, { scope: containerRef });

//     return (
//         <div id="home" className="w-full pt-5 bg-[#E8E4DC] ">
//             <div 
//                 ref={containerRef} 
//                 className="w-11/12 container mx-auto  bg-black rounded-[32px] text-white overflow-hidden"
//             >
//                 {/* Top Navigation Section */}
//                 <div 
//                     ref={navSectionRef}
//                     className="flex justify-between items-center px-6 py-12 font-serif"
//                 >
//                     {/* Work Section with Snake Arrow */}
//                     <div className="flex items-center relative cursor-pointer"
//                     onClick={() => scrollToSection('stacking')}
//                     >
//                         <div className="relative">
//                             <Image 
//                                 ref={snakeImageRef}
//                                 className="w-full h-auto max-w-[200px]" 
//                                 alt="Snake curve" 
//                                 src={snake}
//                                 priority
//                             />
//                             <div 
//                                 ref={workTextRef}
//                                 className="absolute top-2/3 left-4 transform -translate-y-1/2 z-10"
//                             >
//                                 <h2 className="text-2xl md:text-4xl font-semibold">
//                                     Work
//                                 </h2>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Contact Me Section - With email options */}
//                     <div ref={emailDropdownRef} className="relative"
//                     onClick={() => scrollToSection('footer')}
//                     >
//                         <button 
//                             onClick={() => setShowEmailOptions(!showEmailOptions)}
//                             className="flex flex-col items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
//                         >
//                             <h2 
//                                 ref={contactTextRef}
//                                 className="text-xl md:text-2xl xl:text-3xl text-white mb-2 whitespace-nowrap"
//                             >
//                                 Contact Me
//                             </h2>
//                             <Image 
//                                 ref={lineImageRef}
//                                 className="w-full h-auto max-w-[150px]" 
//                                 alt="Decorative line" 
//                                 src={line} 
//                             />
//                         </button>

//                         {/* Email Options Dropdown */}
//                         {showEmailOptions && (
//                             <div className="absolute top-full right-0 mt-4 bg-white rounded-lg shadow-xl p-4 min-w-[280px] z-50">
//                                 <div className="space-y-3">
//                                     {/* Send Email Option */}
//                                     <a
//                                         href="mailto:abdulquadriogunlana@gmail.com"
//                                         className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-900"
//                                         onClick={() => setShowEmailOptions(false)}
//                                     >
//                                         <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                                         </svg>
//                                         <div>
//                                             <p className="font-medium text-sm">Send Email</p>
//                                             <p className="text-xs text-gray-500">Open in email app</p>
//                                         </div>
//                                     </a>

//                                     {/* Copy Email Option */}
//                                     <button
//                                         onClick={handleCopyEmail}
//                                         className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-900"
//                                     >
//                                         <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                                         </svg>
//                                         <div className="text-left">
//                                             <p className="font-medium text-sm">
//                                                 {copiedEmail ? 'Copied!' : 'Copy Email'}
//                                             </p>
//                                             <p className="text-xs text-gray-500">
//                                                 {copiedEmail ? '✓ abdulquadriogunlana@gmail.com' : 'abdulquadriogunlana@gmail.com'}
//                                             </p>
//                                         </div>
//                                     </button>

//                                     {/* Copy Phone Option */}
//                                     {/* <button
//                                         onClick={handleCopyPhone}
//                                         className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-900"
//                                     >
//                                         <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                                         </svg>
//                                         <div className="text-left">
//                                             <p className="font-medium text-sm">
//                                                 {copiedPhone ? 'Copied!' : 'Copy Phone'}
//                                             </p>
//                                             <p className="text-xs text-gray-500">
//                                                 {copiedPhone ? '✓ +234 7011126831' : '07011126831'}
//                                             </p>
//                                         </div>
//                                     </button> */}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
                
//                 {/* Main Image Section */}
//                 <div 
//                     ref={imageSectionRef}
//                     className='w-full max-w-md mx-auto cursor-pointer flex items-center justify-center px-6 mb-12'
//                 >
//                     <div className='relative'>
//                         <Image 
//                             ref={mainImageRef}
//                             className="w-full h-auto rounded-2xl hidden lg:block" 
//                             alt="Hero image" 
//                             src={img}
//                             priority
//                         />
//                         <Image 
//                             ref={mainImageMobileRef}
//                             className="w-full h-auto rounded-2xl lg:hidden" 
//                             alt="Hero image" 
//                             src={img1}
//                             priority
//                         />
//                         {/* Floating Tags */}
//                         <div 
//                             ref={tag1Ref}
//                             className='absolute top-4 -left-4 md:-left-8 bg-[#35CDFF] py-2 px-2 md:px-4 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl shadow-lg transform -translate-x-1/2'
//                         >
//                             <p className="font-medium text-sm whitespace-nowrap">
//                                 Animate smoothly
//                             </p>
//                         </div>
//                         <div 
//                             ref={tag2Ref}
//                             className='absolute bottom-5 -right-5 md:-right-8 bg-[#35CDFF] py-2 px-2 md:px-4 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl shadow-lg transform translate-x-1/2'
//                         >
//                             <p className="font-medium text-sm whitespace-nowrap">
//                                 Code Neatly
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Hero Text Section */}
//                 <div 
//                     ref={heroSectionRef}
//                     className="px-6 pb-12"
//                 >
//                     <div ref={heroTextRef} className="text-center max-w-6xl mx-auto">
//                         {/* Hello World Header */}
//                         <div className="mb-4 lg:mb-8">
//                             <span className="text-lg md:text-xl font-mono">
//                                 &lt; Hello World/&gt;
//                             </span>
//                         </div>
                        
//                         {/* Main Hero Text */}
//                         <div className="space-y-4">
//                             <h1 className="text-white text-xl lg:text-5xl xl:text-6xl font-bold leading-tight">
//                                 I'm <span className="text-white">Abdulquadri</span>, a{' '}
//                                 <span className="lorat font-light">
//                                     &lt;front-end Developer/&gt;
//                                 </span>
//                             </h1>
                            
//                             <div className="relative inline-block">
//                                 <h2 className="text-white text-xl lg:text-5xl xl:text-6xl">
//                                     &gt; who love's{' '}
//                                     <span className="relative inline-block">
//                                         <span className="relative z-10 font-bold">Building</span>
//                                         {/* Morphing SVG Animation with drawing effect */}
//                                         <svg 
//                                             ref={morphCircleRef}
//                                             className=" hidden md:block absolute inset-0 w-full h-full pointer-events-none"
//                                             viewBox="0 0 290 120"
//                                             style={{
//                                                 transform: 'translate(-35%, -30%)',
//                                                 width: '500%',
//                                                 height: '180%'
//                                             }}
//                                         >
//                                             {/* The drawing ellipse with ref */}
//                                             <ellipse 
//                                                 ref={circlePathRef}
//                                                 cx="300" 
//                                                 cy="70" 
//                                                 rx="280" 
//                                                 ry="45"
//                                                 fill="none"
//                                                 stroke="#FFA500"
//                                                 strokeWidth="8"
//                                                 strokeLinecap="round"
//                                                 opacity="0.9"
//                                             />
//                                         </svg>
//                                         <svg 
//                                             ref={morphCircleRef}
//                                             className=" md:hidden absolute inset-0 w-full h-full pointer-events-none"
//                                             viewBox="0 0 290 120"
//                                             style={{
//                                                 transform: 'translate(-35%, -30%)',
//                                                 width: '500%',
//                                                 height: '180%'
//                                             }}
//                                         >
//                                             {/* The drawing ellipse with ref */}
//                                             <ellipse 
//                                                 ref={circlePathRef}
//                                                 cx="30" 
//                                                 cy="70" 
//                                                 rx="200" 
//                                                 ry="45"
//                                                 fill="none"
//                                                 stroke="#FFA500"
//                                                 strokeWidth="8"
//                                                 strokeLinecap="round"
//                                                 opacity="0.9"
//                                             />
//                                         </svg>
//                                     </span>
//                                     {' '}
//                                     <span className="lorat font-light">
//                                         the Most delightful experiences on the web.
//                                     </span>
//                                 </h2>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client"
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useEffect, useRef, useCallback, useState } from 'react';
import Image from 'next/image';
import snake from '../../asset/icons/Vector (13).svg'
import line from '../../asset/icons/Group 6.svg'
import img from '../../asset/images/Frame 50.svg'
import img1 from '../../asset/images/Frame 50 (1).svg'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const containerRef = useRef(null);
    const snakeImageRef = useRef(null);
    const workTextRef = useRef(null);
    const lineImageRef = useRef(null);
    const contactTextRef = useRef(null);
    const morphCircleRef = useRef(null);
    const circlePathRef = useRef(null);
    const mainImageRef = useRef(null);
    const mainImageMobileRef = useRef(null);
    const tag1Ref = useRef(null);
    const tag2Ref = useRef(null);
    const heroTextRef = useRef(null);

    // Navigation section ref for ScrollTrigger
    const navSectionRef = useRef(null);
    // Image section ref for ScrollTrigger
    const imageSectionRef = useRef(null);
    // Hero text section ref for ScrollTrigger
    const heroSectionRef = useRef(null);

    // Memoize the top section animation
    const animateTopSection = useCallback(() => {
        if (!snakeImageRef.current || !workTextRef.current || !lineImageRef.current || !contactTextRef.current) {
            return;
        }

        // Set initial states
        gsap.set([snakeImageRef.current, lineImageRef.current], {
            scaleX: 0,
            transformOrigin: "left center"
        });

        gsap.set([workTextRef.current, contactTextRef.current], {
            opacity: 0,
            y: -20
        });

        // Animation timeline
        const tl = gsap.timeline({ paused: true });

        tl.to(snakeImageRef.current, {
            scaleX: 1,
            duration: 1.5,
            ease: "power2.inOut"
        })
        .to(workTextRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=1.0")
        .to(lineImageRef.current, {
            scaleX: 1,
            duration: 1.5,
            ease: "power2.inOut"
        }, "-=1.2")
        .to(contactTextRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=1.0");

        return tl;
    }, []);

    // Main hero text animation with progressive drawing circle
    const animateHeroText = useCallback(() => {
        if (!heroTextRef.current || !morphCircleRef.current || !circlePathRef.current) return;

        gsap.set(heroTextRef.current, {
            opacity: 0,
            y: 50
        });

        gsap.set(morphCircleRef.current, {
            opacity: 0,
        });

        // Calculate circle circumference for stroke animation
        const circleElement = circlePathRef.current;
        const circumference = 2 * Math.PI * Math.sqrt((280 * 280 + 45 * 45) / 2);

        // Set initial stroke dash properties for drawing animation
        gsap.set(circlePathRef.current, {
            strokeDasharray: circumference,
            strokeDashoffset: circumference,
        });

        const tl = gsap.timeline({ paused: true });

        tl.to(heroTextRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        })
        .to(morphCircleRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
        }, "-=0.3")
        .to(circlePathRef.current, {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.inOut",
        }, "-=0.1")
        .to(circlePathRef.current, {
            strokeWidth: 10,
            duration: 0.3,
            ease: "power2.inOut",
            yoyo: true,
            repeat: 1,
        }, "+=0.5");

        return tl;
    }, []);

    // Image and tags animation
    const animateImageSection = useCallback(() => {
        if (!mainImageRef.current && !mainImageMobileRef.current) return;
        if (!tag1Ref.current || !tag2Ref.current) return;

        const imageToAnimate = mainImageRef.current || mainImageMobileRef.current;

        gsap.set(imageToAnimate, {
            scale: 0.8,
            opacity: 0
        });

        gsap.set([tag1Ref.current, tag2Ref.current], {
            opacity: 0,
            scale: 0,
            transformOrigin: "center center"
        });

        const tl = gsap.timeline({ paused: true });

        tl.to(imageToAnimate, {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
        })
        .to(tag1Ref.current, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)"
        }, "-=0.5")
        .to(tag2Ref.current, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)"
        }, "-=0.3");

        return tl;
    }, []);

    // Shake animation for tags
    const shakeAnimation = useCallback((target) => {
        return gsap.to(target, {
            x: -5,
            y: -5,
            rotation: 5,
            duration: 0.4,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            paused: true,
        });
    }, []);

    useEffect(() => {
        const tag1 = tag1Ref.current;
        const tag2 = tag2Ref.current;
        const mainImage = mainImageRef.current;
        const mainImageMobile = mainImageMobileRef.current;

        if (!tag1 || !tag2) return;

        const tag1Shake = shakeAnimation(tag1);
        const tag2Shake = shakeAnimation(tag2);

        const handleMouseEnter = () => {
            tag1Shake.play();
            tag2Shake.play();
        };

        const handleMouseLeave = () => {
            tag1Shake.pause(0).seek(0);
            tag2Shake.pause(0).seek(0);
            gsap.to([tag1, tag2], { x: 0, y: 0, rotation: 0, duration: 0.2, ease: "power1.out" });
        };

        // Add listeners to both images
        if (mainImage) {
            mainImage.addEventListener('mouseenter', handleMouseEnter);
            mainImage.addEventListener('mouseleave', handleMouseLeave);
        }
        
        if (mainImageMobile) {
            mainImageMobile.addEventListener('mouseenter', handleMouseEnter);
            mainImageMobile.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (mainImage) {
                mainImage.removeEventListener('mouseenter', handleMouseEnter);
                mainImage.removeEventListener('mouseleave', handleMouseLeave);
            }
            if (mainImageMobile) {
                mainImageMobile.removeEventListener('mouseenter', handleMouseEnter);
                mainImageMobile.removeEventListener('mouseleave', handleMouseLeave);
            }
            tag1Shake.kill();
            tag2Shake.kill();
        };
    }, [shakeAnimation]);

    useGSAP(() => {
        // Create animation timelines
        const topTl = animateTopSection();
        const imageTl = animateImageSection();
        const heroTl = animateHeroText();

        // ScrollTrigger for navigation section
        if (topTl && navSectionRef.current) {
            ScrollTrigger.create({
                trigger: navSectionRef.current,
                start: "top 80%",
                end: "bottom 20%",
                onEnter: () => topTl.restart(),
                onEnterBack: () => topTl.restart(),
            });
        }

        // ScrollTrigger for image section
        if (imageTl && imageSectionRef.current) {
            ScrollTrigger.create({
                trigger: imageSectionRef.current,
                start: "top 70%",
                end: "bottom 30%",
                onEnter: () => imageTl.restart(),
                onEnterBack: () => imageTl.restart(),
            });
        }

        // ScrollTrigger for hero text section
        if (heroTl && heroSectionRef.current) {
            ScrollTrigger.create({
                trigger: heroSectionRef.current,
                start: "top 60%",
                end: "bottom 40%",
                onEnter: () => heroTl.restart(),
                onEnterBack: () => heroTl.restart(),
            });
        }

        // Refresh ScrollTrigger on component mount to ensure proper calculation
        ScrollTrigger.refresh();

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, { scope: containerRef });

    return (
        <div id="home" className="w-full pt-5 bg-[#E8E4DC] ">
            <div 
                ref={containerRef} 
                className="w-11/12 container mx-auto  bg-black rounded-[32px] text-white overflow-hidden"
            >
                {/* Top Navigation Section */}
                <div 
                    ref={navSectionRef}
                    className="flex justify-between items-center px-6 py-12 font-serif"
                >
                    {/* Work Section with Snake Arrow */}
                    <div 
                        className="flex items-center relative cursor-pointer"
                        onClick={() => scrollToSection('stacking')}
                    >
                        <div className="relative">
                            <Image 
                                ref={snakeImageRef}
                                className="w-full h-auto max-w-[200px]" 
                                alt="Snake curve" 
                                src={snake}
                                priority
                            />
                            <div 
                                ref={workTextRef}
                                className="absolute top-2/3 left-4 transform -translate-y-1/2 z-10"
                            >
                                <h2 className="text-2xl md:text-4xl font-semibold">
                                    Work
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* Contact Me Section - Simple scroll trigger */}
                    <div 
                        className="flex flex-col items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => scrollToSection('footer')}
                    >
                        <h2 
                            ref={contactTextRef}
                            className="text-xl md:text-2xl xl:text-3xl text-white mb-2 whitespace-nowrap"
                        >
                            Contact Me
                        </h2>
                        <Image 
                            ref={lineImageRef}
                            className="w-full h-auto max-w-[150px]" 
                            alt="Decorative line" 
                            src={line} 
                        />
                    </div>
                </div>
                
                {/* Main Image Section */}
                <div 
                    ref={imageSectionRef}
                    className='w-full max-w-md mx-auto cursor-pointer flex items-center justify-center px-6 mb-12'
                >
                    <div className='relative'>
                        <Image 
                            ref={mainImageRef}
                            className="w-full h-auto rounded-2xl hidden lg:block" 
                            alt="Hero image" 
                            src={img}
                            priority
                        />
                        <Image 
                            ref={mainImageMobileRef}
                            className="w-full h-auto rounded-2xl lg:hidden" 
                            alt="Hero image" 
                            src={img1}
                            priority
                        />
                        {/* Floating Tags */}
                        <div 
                            ref={tag1Ref}
                            className='absolute top-4 -left-4 md:-left-8 bg-[#35CDFF] py-2 px-2 md:px-4 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl shadow-lg transform -translate-x-1/2'
                        >
                            <p className="font-medium text-sm whitespace-nowrap">
                                Animate smoothly
                            </p>
                        </div>
                        <div 
                            ref={tag2Ref}
                            className='absolute bottom-5 -right-5 md:-right-8 bg-[#35CDFF] py-2 px-2 md:px-4 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl shadow-lg transform translate-x-1/2'
                        >
                            <p className="font-medium text-sm whitespace-nowrap">
                                Code Neatly
                            </p>
                        </div>
                    </div>
                </div>

                {/* Hero Text Section */}
                <div 
                    ref={heroSectionRef}
                    className="px-6 pb-12"
                >
                    <div ref={heroTextRef} className="text-center max-w-6xl mx-auto">
                        {/* Hello World Header */}
                        <div className="mb-4 lg:mb-8">
                            <span className="text-lg md:text-xl font-mono">
                                &lt; Hello World/&gt;
                            </span>
                        </div>
                        
                        {/* Main Hero Text */}
                        <div className="space-y-4">
                            <h1 className="text-white text-xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                                I'm <span className="text-white">Abdulquadri</span>, a{' '}
                                <span className="lorat font-light">
                                    &lt;front-end Developer/&gt;
                                </span>
                            </h1>
                            
                            <div className="relative inline-block">
                                <h2 className="text-white text-xl lg:text-5xl xl:text-6xl">
                                    &gt; who love's{' '}
                                    <span className="relative inline-block">
                                        <span className="relative z-10 font-bold">Building</span>
                                        {/* Morphing SVG Animation with drawing effect */}
                                        <svg 
                                            ref={morphCircleRef}
                                            className=" hidden md:block absolute inset-0 w-full h-full pointer-events-none"
                                            viewBox="0 0 290 120"
                                            style={{
                                                transform: 'translate(-35%, -30%)',
                                                width: '500%',
                                                height: '180%'
                                            }}
                                        >
                                            {/* The drawing ellipse with ref */}
                                            <ellipse 
                                                ref={circlePathRef}
                                                cx="300" 
                                                cy="70" 
                                                rx="280" 
                                                ry="45"
                                                fill="none"
                                                stroke="#FFA500"
                                                strokeWidth="8"
                                                strokeLinecap="round"
                                                opacity="0.9"
                                            />
                                        </svg>
                                        <svg 
                                            ref={morphCircleRef}
                                            className=" md:hidden absolute inset-0 w-full h-full pointer-events-none"
                                            viewBox="0 0 290 120"
                                            style={{
                                                transform: 'translate(-35%, -30%)',
                                                width: '500%',
                                                height: '180%'
                                            }}
                                        >
                                            {/* The drawing ellipse with ref */}
                                            <ellipse 
                                                ref={circlePathRef}
                                                cx="30" 
                                                cy="70" 
                                                rx="200" 
                                                ry="45"
                                                fill="none"
                                                stroke="#FFA500"
                                                strokeWidth="8"
                                                strokeLinecap="round"
                                                opacity="0.9"
                                            />
                                        </svg>
                                    </span>
                                    {' '}
                                    <span className="lorat font-light">
                                        the Most delightful experiences on the web.
                                    </span>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
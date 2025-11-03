"use client"
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import img from '../../asset/icons/image 2 (2).svg'
import img1 from '../../asset/icons/image 3 (1).svg'
import img2 from '../../asset/icons/image 9.svg'
import img3 from '../../asset/icons/Logo.svg.svg'
import img4 from '../../asset/icons/tailwind_css_logo.svg.svg'
import img5 from '../../asset/icons/Page-1.svg'
// import img6 from '../../asset/icons/redux-icon.svg'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
    const morphCircleRef = useRef(null);
    const circlePathRef = useRef(null);
    const heroTextRef = useRef(null);
    const heroSectionRef = useRef(null);

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

        // Calculate ellipse circumference properly: C ≈ π × (3(a + b) - √((3a + b)(a + 3b)))
        const rx = 95;
        const ry = 35;
        const circumference = Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));

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

    useEffect(() => {
        const heroTl = animateHeroText();

        // ScrollTrigger for hero text section
        if (heroTl && heroSectionRef.current) {
            ScrollTrigger.create({
                trigger: heroSectionRef.current,
                start: "top 60%",
                end: "bottom 40%",
                onEnter: () => heroTl.restart(),
                onEnterBack: () => heroTl.restart(),
                // markers: true, // Uncomment for debugging
                // id: "hero-section"
            });
        }

        // Refresh ScrollTrigger on component mount
        ScrollTrigger.refresh();

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            if (heroTl) heroTl.kill();
        };
    }, [animateHeroText]);

    return (
        <div className='w-full pt-5 pb-20 lg:py-20 bg-black '>
            <div className='w-11/12 container mx-auto flex flex-col gap-10'>
                <div 
                    ref={heroSectionRef}
                    className=" flex items-center justify-center"
                >
                    <div ref={heroTextRef} className="text-center  ">
                        {/* Main Hero Text */}
                        <div className="space-y-3">
                            <h1 className="text-white text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                                I'm part of a <span className="lorat font-light">new wave</span> of
                            </h1>
                            
                            <div className="relative">
                                <h2 className="text-white text-2xl md:text-4xl lg:text-6xl xl:text-7xl leading-tight">
                                    front-end{' '}
                                    <span className="relative inline-block mx-2">
                                        <span className="epilogue relative z-10 font-bold">developers</span>
                                        {/* Morphing SVG Animation with drawing effect */}
                                        <svg 
                                            ref={morphCircleRef}
                                            className="absolute pointer-events-none"
                                            style={{
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                width: '150%',
                                                height: '140%'
                                            }}
                                            viewBox="0 0 200 80"
                                            preserveAspectRatio="none"
                                        >
                                            <ellipse 
                                                ref={circlePathRef}
                                                cx="100" 
                                                cy="40" 
                                                rx="95" 
                                                ry="35"
                                                fill="none"
                                                stroke="#FFA500"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                opacity="0.9"
                                            />
                                        </svg>
                                    </span>
                                    {' '}who
                                </h2>
                                <h2 className="text-white text-2xl md:text-4xl lg:text-6xl xl:text-7xl leading-tight mt-2">
                                    mix <span className="lorat font-light">logic, curiosity,</span> and
                                </h2>
                                <h2 className="text-white text-2xl md:text-4xl lg:text-6xl xl:text-7xl leading-tight mt-2">
                                    <span className="font-bold epilogue">creativity.</span>{' '}
                                    <span className="lorat font-light">not to brag!</span>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex gap-10 justify-center'>
                    <marquee behavior="scroll" direction="left" scrollamount="8">
                        <div className="flex justify-between gap-10">
                            <Image className="w-15 lg:w-30" alt="vector" src={img} />
                            <Image className="w-15 lg:w-30" alt="vector" src={img1} />
                            <Image className="w-15 lg:w-30" alt="vector" src={img2} />
                            <Image className="w-15 lg:w-30" alt="vector" src={img3} />
                            <Image className="w-15 lg:w-30" alt="vector" src={img4} />
                            <Image className="w-15 lg:w-30" alt="vector" src={img5} />
                            {/* <Image className="w-15 lg:w-30" alt="vector" src={img6} /> */}
                        </div>
                    </marquee>
                </div>
            </div>
        </div>
    );
}
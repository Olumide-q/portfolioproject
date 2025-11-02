"use client"
import Image from "next/image"
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import flower from '../../asset/images/image 1 (9).svg'
import img from '../../asset/images/Frame 22 (1).svg'
import img1 from '../../asset/images/Frame 23 (3).svg'
import img2 from '../../asset/images/Frame 15 (1).svg'


// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Realistic Zinnia Flower SVG Component
const ZinniaFlower = ({ id }) => (
    <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
            {/* Orange gradient for outer petals */}
            <radialGradient id={`orange-gradient-${id}`} cx="50%" cy="30%">
                <stop offset="0%" style={{ stopColor: '#FF6B35', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#FF4500', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#E63946', stopOpacity: 1 }} />
            </radialGradient>
            {/* Yellow gradient for center */}
            <radialGradient id={`yellow-gradient-${id}`} cx="50%" cy="50%">
                <stop offset="0%" style={{ stopColor: '#FFD60A', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#FFA500', stopOpacity: 1 }} />
            </radialGradient>
            {/* Dark red center */}
            <radialGradient id={`center-gradient-${id}`} cx="50%" cy="50%">
                <stop offset="0%" style={{ stopColor: '#8B0000', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#5C0000', stopOpacity: 1 }} />
            </radialGradient>
        </defs>
        
        {/* Outer layer petals (16 petals) */}
        {[...Array(16)].map((_, i) => {
            const angle = (i * 360) / 16;
            return (
                <ellipse
                    key={`outer-${i}`}
                    cx="100"
                    cy="100"
                    rx="15"
                    ry="45"
                    fill={`url(#orange-gradient-${id})`}
                    opacity="0.95"
                    transform={`rotate(${angle} 100 100)`}
                    stroke="#D84315"
                    strokeWidth="0.5"
                />
            );
        })}
        
        {/* Middle layer petals (12 petals) - slightly smaller */}
        {[...Array(12)].map((_, i) => {
            const angle = (i * 360) / 12 + 15;
            return (
                <ellipse
                    key={`middle-${i}`}
                    cx="100"
                    cy="100"
                    rx="12"
                    ry="35"
                    fill={`url(#orange-gradient-${id})`}
                    opacity="0.9"
                    transform={`rotate(${angle} 100 100)`}
                    stroke="#D84315"
                    strokeWidth="0.5"
                />
            );
        })}
        
        {/* Inner yellow ring with small florets */}
        <circle cx="100" cy="100" r="20" fill={`url(#yellow-gradient-${id})`} />
        
        {/* Small yellow florets around center */}
        {[...Array(12)].map((_, i) => {
            const angle = (i * 360) / 12;
            const x = 100 + 16 * Math.cos((angle * Math.PI) / 180);
            const y = 100 + 16 * Math.sin((angle * Math.PI) / 180);
            return (
                <g key={`floret-${i}`}>
                    <circle cx={x} cy={y} r="3" fill="#FFD60A" />
                    <circle cx={x} cy={y} r="1.5" fill="#FFA500" />
                </g>
            );
        })}
        
        {/* Dark red center */}
        <circle cx="100" cy="100" r="12" fill={`url(#center-gradient-${id})`} />
        
        {/* Center texture details */}
        {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8;
            const x1 = 100;
            const y1 = 100;
            const x2 = 100 + 10 * Math.cos((angle * Math.PI) / 180);
            const y2 = 100 + 10 * Math.sin((angle * Math.PI) / 180);
            return (
                <line
                    key={`center-line-${i}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#2D0000"
                    strokeWidth="1"
                    opacity="0.6"
                />
            );
        })}
    </svg>
);

export default function Tiltled() {
    const textRef = useRef(null);
    const paragraphRef = useRef(null);
    const bottomParagraphRef = useRef(null);
    const sectionRef = useRef(null);
    const animationsRef = useRef({ initialized: false });
    
    // Flower refs for rotation
    const topLeftFlowerRef = useRef(null);
    const topRightFlowerRef = useRef(null);
    const bottomLeftFlowerRef = useRef(null);
    const bottomRightFlowerRef = useRef(null);
    const containerRef = useRef(null);
    const mainImageRef = useRef(null);
    
    // Desktop image refs
    const desktopImg1Ref = useRef(null);
    const desktopImg2Ref = useRef(null);
    const desktopImg3Ref = useRef(null);
    const desktopImg4Ref = useRef(null);
    
    // Desktop label refs
    const label1Ref = useRef(null);
    const label2Ref = useRef(null);
    const label3Ref = useRef(null);
    const label4Ref = useRef(null);

    const setupTextElements = () => {
        const text = "We wanna be where the people are";
        const highlightStart = text.indexOf("the people are");
        
        // Create letters for main text
        if (textRef.current) {
            textRef.current.innerHTML = '';
            
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const span = document.createElement('span');
                
                if (char === ' ') {
                    span.className = 'inline-block opacity-0 transform translate-y-12';
                    span.innerHTML = '&nbsp;';
                } else {
                    const colorClass = i >= highlightStart ? 'text-[#F8A929]' : 'text-white';
                    span.className = `inline-block opacity-0 transform translate-y-12 ${colorClass}`;
                    span.textContent = char;
                    span.style.transformOrigin = 'center bottom';
                }
                
                textRef.current.appendChild(span);
            }
        }

        // Create words for first paragraph
        const paragraphText = "I learn best when I’m surrounded by people building cool stuff. I’m currently part of a small circle of young devs exploring the edge of front-end innovation — from React performance tuning to Next.js SSR magic.";
        
        if (paragraphRef.current) {
            paragraphRef.current.innerHTML = '';
            
            const words = paragraphText.split(' ');
            
            words.forEach((word, index) => {
                const wordSpan = document.createElement('span');
                wordSpan.className = 'inline-block overflow-hidden';
                
                const innerSpan = document.createElement('span');
                innerSpan.className = 'inline-block opacity-0 transform translate-y-full';
                innerSpan.textContent = word;
                innerSpan.style.transformOrigin = 'center bottom';
                
                wordSpan.appendChild(innerSpan);
                paragraphRef.current.appendChild(wordSpan);
                
                // Add space after each word except the last
                if (index < words.length - 1) {
                    const spaceSpan = document.createElement('span');
                    spaceSpan.innerHTML = '&nbsp;';
                    paragraphRef.current.appendChild(spaceSpan);
                }
            });
        }

        // Create words for bottom paragraph
        const bottomText = "I believe in learning through collaboration — building things that challenge the way we code and design. I’m part of a small, future-focused group of devs exploring what’s next for front-end craft. Together, we’re not just shipping projects — we’re learning how to think sharper and build faster.";
        
        if (bottomParagraphRef.current) {
            bottomParagraphRef.current.innerHTML = '';
            
            const words = bottomText.split(' ');
            
            words.forEach((word, index) => {
                const wordSpan = document.createElement('span');
                wordSpan.className = 'inline-block overflow-hidden';
                wordSpan.style.display = 'inline-block';
                
                const innerSpan = document.createElement('span');
                innerSpan.className = 'inline-block opacity-0 transform translate-y-full bottom-word';
                innerSpan.textContent = word;
                innerSpan.style.transformOrigin = 'center bottom';
                
                wordSpan.appendChild(innerSpan);
                bottomParagraphRef.current.appendChild(wordSpan);
                
                // Add space after each word except the last
                if (index < words.length - 1) {
                    const spaceSpan = document.createElement('span');
                    spaceSpan.innerHTML = '&nbsp;';
                    bottomParagraphRef.current.appendChild(spaceSpan);
                }
            });
        }
    };

    const runAnimations = () => {
        // Prevent multiple simultaneous animations
        if (animationsRef.current.running) return;
        animationsRef.current.running = true;
        
        const letters = textRef.current?.querySelectorAll('span');
        const wordSpans = paragraphRef.current?.querySelectorAll('span span');
        
        if (!letters || !wordSpans) {
            animationsRef.current.running = false;
            return;
        }
        
        // Reset elements to initial state
        gsap.set(letters, {
            opacity: 0,
            y: 48,
            rotateX: 90,
            scale: 1
        });
        
        gsap.set(wordSpans, {
            opacity: 0,
            y: '100%'
        });
        
        // Create master timeline
        const masterTl = gsap.timeline({
            onComplete: () => {
                animationsRef.current.running = false;
            }
        });
        
        // Animate main text letters
        masterTl.to(letters, {
            duration: 0.6,
            opacity: 1,
            y: 0,
            rotateX: 0,
            ease: "back.out(1.7)",
            stagger: {
                amount: 2.5,
                from: "end"
            }
        })
        .to(letters, {
            duration: 0.3,
            scale: 1.1,
            ease: "power2.out",
            stagger: {
                amount: 0.5,
                from: "end"
            }
        }, "-=1.5")
        .to(letters, {
            duration: 0.2,
            scale: 1,
            ease: "power2.out",
            stagger: {
                amount: 0.3,
                from: "end"
            }
        }, "-=0.1")
        // Animate paragraph words
        .to(wordSpans, {
            duration: 1,
            opacity: 1,
            y: 0,
            ease: "power2.out",
            stagger: {
                amount: 1.5,
                from: "start"
            }
        }, "-=0.5");
    };

    const runBottomParagraphAnimation = () => {
        const bottomWords = bottomParagraphRef.current?.querySelectorAll('.bottom-word');
        if (!bottomWords) return;

        // Reset to initial state
        gsap.set(bottomWords, {
            opacity: 0,
            y: '100%'
        });

        // Animate
        gsap.to(bottomWords, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: 'power3.out',
        });
    };

    useEffect(() => {
        // Setup text elements
        setupTextElements();
        animationsRef.current.initialized = true;
        
        // Create ScrollTrigger for main text animation
        const scrollTrigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: runAnimations,
            onEnterBack: runAnimations,
        });

        // Animate bottom paragraph with ScrollTrigger
        const bottomScrollTrigger = ScrollTrigger.create({
            trigger: bottomParagraphRef.current,
            start: 'top 85%',
            end: 'top -10%',
            // markers: true, // Uncomment to debug trigger points
            onEnter: () => {
                runBottomParagraphAnimation();
            },
            onEnterBack: () => {
                runBottomParagraphAnimation();
            },
            onLeave: () => {
                const bottomWords = bottomParagraphRef.current?.querySelectorAll('.bottom-word');
                if (bottomWords) {
                    gsap.set(bottomWords, { opacity: 0, y: '100%' });
                }
            },
            onLeaveBack: () => {
                const bottomWords = bottomParagraphRef.current?.querySelectorAll('.bottom-word');
                if (bottomWords) {
                    gsap.set(bottomWords, { opacity: 0, y: '100%' });
                }
            }
        });
        
        // Setup flower entrance animations with ScrollTrigger
        const flowerRefs = [
            topLeftFlowerRef,
            topRightFlowerRef,
            bottomLeftFlowerRef,
            bottomRightFlowerRef
        ];

        // Set initial states for flowers
        gsap.set(flowerRefs.map(ref => ref.current).filter(Boolean), {
            scale: 0,
            rotation: -180,
            opacity: 0
        });

        // Set initial state for main image
        gsap.set(mainImageRef.current, {
            scale: 0,
            rotation: -15,
            opacity: 0
        });

        // Create entrance timeline for main image and flowers
        const entranceTl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate main image first with tilt effect
        if (mainImageRef.current) {
            entranceTl.to(mainImageRef.current, {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 1,
                ease: "back.out(1.4)"
            });
        }

        // Then animate flowers in sequence with bloom effect
        if (topLeftFlowerRef.current) {
            entranceTl.to(topLeftFlowerRef.current, {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 0.6,
                ease: "back.out(1.7)"
            }, "-=0.4");
        }

        if (topRightFlowerRef.current) {
            entranceTl.to(topRightFlowerRef.current, {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 0.6,
                ease: "back.out(1.7)"
            }, "-=0.4");
        }

        if (bottomLeftFlowerRef.current) {
            entranceTl.to(bottomLeftFlowerRef.current, {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 0.6,
                ease: "back.out(1.7)"
            }, "-=0.4");
        }

        if (bottomRightFlowerRef.current) {
            entranceTl.to(bottomRightFlowerRef.current, {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
                onComplete: () => {
                    // Start continuous rotation after entrance animation completes
                    startFlowerRotations();
                }
            }, "-=0.4");
        }

        const startFlowerRotations = () => {
            if (topLeftFlowerRef.current) {
                gsap.to(topLeftFlowerRef.current, {
                    rotation: 360,
                    duration: 8,
                    ease: 'linear',
                    repeat: -1,
                    transformOrigin: 'center center'
                });
            }

            if (topRightFlowerRef.current) {
                gsap.to(topRightFlowerRef.current, {
                    rotation: -360,
                    duration: 10,
                    ease: 'linear',
                    repeat: -1,
                    transformOrigin: 'center center'
                });
            }

            if (bottomLeftFlowerRef.current) {
                gsap.to(bottomLeftFlowerRef.current, {
                    rotation: 360,
                    duration: 9,
                    ease: 'linear',
                    repeat: -1,
                    transformOrigin: 'center center'
                });
            }

            if (bottomRightFlowerRef.current) {
                gsap.to(bottomRightFlowerRef.current, {
                    rotation: -360,
                    duration: 7,
                    ease: 'linear',
                    repeat: -1,
                    transformOrigin: 'center center'
                });
            }
        };
        
        // Refresh ScrollTrigger to ensure proper calculation
        ScrollTrigger.refresh();
        
        // Cleanup function
        return () => {
            scrollTrigger.kill();
            bottomScrollTrigger.kill();
            // Kill any running animations
            gsap.killTweensOf([
                textRef.current?.querySelectorAll('span'),
                paragraphRef.current?.querySelectorAll('span span'),
                bottomParagraphRef.current?.querySelectorAll('.bottom-word'),
                topLeftFlowerRef.current,
                topRightFlowerRef.current,
                bottomLeftFlowerRef.current,
                bottomRightFlowerRef.current,
                mainImageRef.current
            ]);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const handleFlowerHover = (ref, scale) => {
        if (ref.current) {
            gsap.to(ref.current, {
                scale: scale,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    };

    // Handle desktop image hover with ease in/out
    const handleImageHover = (imgRef, labelRef, isEnter) => {
        if (isEnter) {
            // Ease in animation
            if (imgRef.current) {
                gsap.to(imgRef.current, {
                    scale: 1.05,
                    duration: 0.4,
                    ease: 'power2.inOut'
                });
            }
            // Shake animation for label
            if (labelRef.current) {
                gsap.to(labelRef.current, {
                    rotation: 3,
                    duration: 0.1,
                    ease: 'power2.inOut',
                    yoyo: true,
                    repeat: 5
                });
            }
        } else {
            // Ease out animation
            if (imgRef.current) {
                gsap.to(imgRef.current, {
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.inOut'
                });
            }
            // Reset label rotation
            if (labelRef.current) {
                gsap.to(labelRef.current, {
                    rotation: 0,
                    duration: 0.2,
                    ease: 'power2.inOut'
                });
            }
        }
    };

    return (
        <div ref={sectionRef} className="w-full  py-20 bg-[#000000] ">
            <div className="w-11/12 container mx-auto flex flex-col gap-[40px] lg:gap-[81px]">
                <div className="md:w-[79%] mx-auto flex flex-col gap-[16px] lg:gap-[28px] items-center justify-center text-center pb-16 lg:pb-18">
                    <div className="epilogue  text-white text-[20px] md:text-[32px] lg:text-[39px] xl:text-[60px] leading-tight">
                        <p ref={textRef}>
                            {/* Letters will be dynamically inserted here by GSAP */}
                        </p>
                    </div>
                    <div className="text-white px-4 lg:px-[125px] xl:px-[245px] text-[14px]  md:text-[18px]  epilogue1 ">
                        <p ref={paragraphRef}>
                            {/* Words will be dynamically inserted here by GSAP */}
                        </p>
                    </div>
                </div>
                <div className=" ">
                    <div className="relative flex hidden lg:block">
                         <Image className=" "  alt="vector" src={flower} />
                        <div 
                            ref={label1Ref}
                            className='absolute z-10 text-white lg:-top-4 lg:left-8 xl:-top-6 xl:left-18 bg-[#35CDFF] py-2 px-4 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl shadow-lg transform '
                        >
                            <p className="font-medium text-[15px] xl:text-[20px] whitespace-nowrap">
                                Building in public
                            </p>
                        </div>
                        <div className="absolute lg:bottom-20 xl:bottom-28 lg:left-30 xl:left-45">
                             <div 
                                ref={desktopImg1Ref}
                                className="group cursor-pointer"
                                onMouseEnter={() => handleImageHover(desktopImg1Ref, label1Ref, true)}
                                onMouseLeave={() => handleImageHover(desktopImg1Ref, label1Ref, false)}
                             >
                                <Image className="transition-transform duration-500 ease-in-out group-hover:scale-110"  alt="vector" src={img2} />
                             </div>
                             <div className="absolute lg:-bottom-20 xl:-bottom-22 lg:-right-50 xl:-right-65">
                                <div 
                                    ref={desktopImg2Ref}
                                    className="group cursor-pointer"
                                    onMouseEnter={() => handleImageHover(desktopImg2Ref, label2Ref, true)}
                                    onMouseLeave={() => handleImageHover(desktopImg2Ref, label2Ref, false)}
                                >
                                    <Image className="transition-transform duration-500 ease-in-out group-hover:scale-110"  alt="vector" src={img} />
                                </div>
                                <div 
                                    ref={label2Ref}
                                    className='absolute z-10 text-white lg:-bottom-4 left-19 xl:-bottom-6  bg-[#F8A929] py-2 px-4 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl shadow-lg transform '
                                >
                                    <p className="font-medium text-[15px] xl:text-[20px]whitespace-nowrap">
                                        Music Lover
                                    </p>
                                </div>
                                <div className="absolute lg:bottom-18 xl:bottom-24 lg:-right-60 xl:-right-65">
                                    <div 
                                        ref={desktopImg3Ref}
                                        className="group cursor-pointer"
                                        onMouseEnter={() => handleImageHover(desktopImg3Ref, label3Ref, true)}
                                        onMouseLeave={() => handleImageHover(desktopImg3Ref, label3Ref, false)}
                                    >
                                        <Image className="transition-transform duration-500 ease-in-out group-hover:scale-110"  alt="vector" src={img1} />
                                    </div>
                                    <div 
                                        ref={label3Ref}
                                        className='absolute z-10 text-white lg:top-4 lg:-left-18 xl:top-4 xl:-left-24 bg-[#FC8C1C] py-2 px-4 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl shadow-lg transform '
                                    >
                                        <p className="font-medium text-[15px] xl:text-[20px] whitespace-nowrap">
                                            Learning new programming Languages
                                        </p>
                                    </div>
                                    <div className="absolute hidden xl:block -bottom-22 -right-65">
                                        <div 
                                            ref={desktopImg4Ref}
                                            className="group cursor-pointer"
                                            onMouseEnter={() => handleImageHover(desktopImg4Ref, label4Ref, true)}
                                            onMouseLeave={() => handleImageHover(desktopImg4Ref, label4Ref, false)}
                                        >
                                            <Image className="transition-transform duration-500 ease-in-out group-hover:scale-110"  alt="vector" src={img1} />
                                        </div>
                                        <div 
                                            ref={label4Ref}
                                            className='absolute z-10 text-white  top-6 -right-10 bg-[#35CDFF] py-2 px-4 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl shadow-lg transform '
                                        >
                                            <p className="font-medium text-[20px] whitespace-nowrap">
                                                Exploring new activities
                                            </p>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                    
                    {/* Mobile Image with Rotating Flowers - Half Outside */}
                    <div ref={containerRef} className="lg:hidden relative w-[70%] md:w-[50%] mx-auto">
                        <div className="relative overflow-visible">
                            <div ref={mainImageRef}>
                                <Image className="w-full"  alt="vector" src={img2} />
                            </div>
                            
                            {/* Top Left Flower - Half outside */}
                            <div 
                                ref={topLeftFlowerRef}
                                className="absolute w-24 h-24 md:w-32 md:h-32"
                                style={{ 
                                    top: '-12%',
                                    left: '-12%',
                                    filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4))'
                                }}
                                onMouseEnter={() => handleFlowerHover(topLeftFlowerRef, 1.15)}
                                onMouseLeave={() => handleFlowerHover(topLeftFlowerRef, 1)}
                            >
                                <ZinniaFlower id="tl" />
                            </div>

                            {/* Top Right Flower - Half outside */}
                            <div 
                                ref={topRightFlowerRef}
                                className="absolute w-24 h-24 md:w-32 md:h-32"
                                style={{ 
                                    top: '-12%',
                                    right: '-12%',
                                    filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4))'
                                }}
                                onMouseEnter={() => handleFlowerHover(topRightFlowerRef, 1.15)}
                                onMouseLeave={() => handleFlowerHover(topRightFlowerRef, 1)}
                            >
                                <ZinniaFlower id="tr" />
                            </div>

                            {/* Bottom Left Flower - Half outside */}
                            <div 
                                ref={bottomLeftFlowerRef}
                                className="absolute w-24 h-24 md:w-32 md:h-32"
                                style={{ 
                                    bottom: '-12%',
                                    left: '-12%',
                                    filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4))'
                                }}
                                onMouseEnter={() => handleFlowerHover(bottomLeftFlowerRef, 1.15)}
                                onMouseLeave={() => handleFlowerHover(bottomLeftFlowerRef, 1)}
                            >
                                <ZinniaFlower id="bl" />
                            </div>

                            {/* Bottom Right Flower - Half outside */}
                            <div 
                                ref={bottomRightFlowerRef}
                                className="absolute w-24 h-24 md:w-32 md:h-32"
                                style={{ 
                                    bottom: '-12%',
                                    right: '-12%',
                                    filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4))'
                                }}
                                onMouseEnter={() => handleFlowerHover(bottomRightFlowerRef, 1.15)}
                                onMouseLeave={() => handleFlowerHover(bottomRightFlowerRef, 1)}
                            >
                                <ZinniaFlower id="br" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-white text-center px-4 lg:px-[125px] xl:px-[245px] text-[15px] md:text-[18px] epilogue1">
                    <p ref={bottomParagraphRef} style={{ perspective: '1000px' }} className="block">
                        {/* Words will be dynamically inserted here by GSAP */}
                    </p>
                </div>
            </div>
        </div>
    );
}
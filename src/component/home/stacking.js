"use client"
import Image from "next/image"
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import nrc from '../../asset/images/24F12D7A-52E0-49CD-8808-85E9A10EF55C.jpeg'
import NIS from '../../asset/images/Screenshot 2025-09-18 at 10.51.01.png'
import araile from '../../asset/images/Screenshot 2025-09-18 at 10.57.15.png'
import stinohotels from '../../asset/images/1528F23D-77A5-4BC2-AABC-0C2AE2DA2750.jpeg'
import betahouse from '../../asset/images/Screenshot 2025-09-29 at 07.47.09.png'

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Stacking() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const paragraphRef = useRef(null);
    const stackingContainerRef = useRef(null);
    const cardsRef = useRef([]);

    const addToCardsRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    useEffect(() => {
        let splitTitle, splitParagraph;

        let ctx = gsap.context(() => {
            // Header text animation setup
            if (titleRef.current && paragraphRef.current) {
                splitTitle = new SplitText(titleRef.current, { type: "chars" });
                splitParagraph = new SplitText(paragraphRef.current, { type: "words" });

                const headerTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "top 20%",
                        toggleActions: "play reverse play reverse",
                    }
                });

                headerTl.from(splitTitle.chars, {
                    duration: 0.6,
                    opacity: 0,
                    y: 48,
                    rotateX: 90,
                    ease: "back.out(1.7)",
                    stagger: {
                        amount: 1.5,
                        from: "start"
                    }
                })
                .to(splitTitle.chars, {
                    duration: 0.3,
                    scale: 1.1,
                    ease: "power2.out",
                    stagger: {
                        amount: 0.5,
                        from: "start"
                    }
                }, "-=1.2")
                .to(splitTitle.chars, {
                    duration: 0.2,
                    scale: 1,
                    ease: "power2.out",
                    stagger: {
                        amount: 0.3,
                        from: "start"
                    }
                }, "-=0.1")
                .from(splitParagraph.words, {
                    duration: 1,
                    opacity: 0,
                    y: '100%',
                    ease: "power2.out",
                    stagger: {
                        amount: 1.5,
                        from: "start"
                    }
                }, "-=1.5");
            }

            // Stacking animation for cards
            const cards = cardsRef.current;

            if (cards.length > 0) {
                // Set initial positions for cards - all cards stick at the same position
                cards.forEach((card, index) => {
                    gsap.set(card, {
                        position: 'sticky',
                        top: '100px',
                        zIndex: index + 1,
                    });
                });

                // Create stacking animation for each card
                cards.forEach((card, index) => {
                    // Initial entrance animation
                    gsap.from(card, {
                        y: 100,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            end: "top 60%",
                            toggleActions: "play none none reverse",
                        }
                    });

                    // Stacking animation (except for the last card)
                    if (index < cards.length - 1) {
                        const nextCard = cards[index + 1];
                        
                        ScrollTrigger.create({
                            trigger: nextCard,
                            start: 'top 100px',
                            end: 'top -50px',
                            scrub: 0.5,
                            onUpdate: (self) => {
                                const progress = self.progress;
                                // Fade out current card as next card comes in
                                const opacity = 1 - progress;
                                const scale = 1 - (progress * 0.1);
                                
                                gsap.to(card, {
                                    scale: scale,
                                    opacity: opacity,
                                    transformOrigin: 'center top',
                                    duration: 0.1,
                                    ease: 'none'
                                });
                            },
                            onLeave: () => {
                                // Ensure card is completely hidden when scroll trigger ends
                                gsap.to(card, { 
                                    opacity: 0, 
                                    scale: 0.9,
                                    duration: 0.3,
                                    ease: 'power2.out'
                                });
                            },
                            onEnterBack: () => {
                                // Smoothly fade back in when scrolling back up
                                gsap.to(card, { 
                                    opacity: 1, 
                                    scale: 1,
                                    duration: 0.3,
                                    ease: 'power2.out'
                                });
                            }
                        });
                    }
                    
                    // Add fade out for cards when their next card is visible (scrolling back up)
                    if (index > 0) {
                        ScrollTrigger.create({
                            trigger: card,
                            start: 'top 100px',
                            end: 'top -50px',
                            scrub: 0.5,
                            onEnter: () => {
                                // When entering this card, fade out the previous one
                                const prevCard = cards[index - 1];
                                gsap.to(prevCard, {
                                    opacity: 0,
                                    scale: 0.9,
                                    duration: 0.5,
                                    ease: 'power2.out'
                                });
                            },
                            onLeaveBack: () => {
                                // When leaving back, fade in the previous card
                                const prevCard = cards[index - 1];
                                gsap.to(prevCard, {
                                    opacity: 1,
                                    scale: 1,
                                    duration: 0.5,
                                    ease: 'power2.out'
                                });
                            }
                        });
                    }
                });
            }

        }, sectionRef);

        return () => {
            if (splitTitle) splitTitle.revert();
            if (splitParagraph) splitParagraph.revert();
            ctx.revert();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };

    }, []);

    return (
        <div id="stacking" ref={sectionRef} className="w-full bg-[#E8E4DC]  " style={{ minHeight: '230vh' }}>
            <div className="w-11/12 container mx-auto">
                <div className="md:w-[70%] mx-auto flex flex-col gap-[16px] lg:gap-[28px] items-center justify-center text-center">
                    <div className="epilogue text-[22px] md:text-[29px] lg:text-[40px] xl:text-[60px] leading-tight">
                        <p ref={titleRef} className="text-[#000000]">My Completed Projects</p>
                    </div>
                    <div className="px-4 lg:px-[125px] xl:px-[245px] text-[15px] md:text-[18px] epilogue1 leading-relaxed">
                        <p ref={paragraphRef}>A few projects that helped me grow as a developer — learning how to think in components, write cleaner code, and ship experiences that actually work.</p>
                    </div>
                </div>
                
                <div ref={stackingContainerRef} className="mt-10 flex flex-col gap-[32px]" style={{ paddingBottom: '10vh' }}>
                    {/* NRC Transport Card */}
                    <div ref={addToCardsRefs} className='bg-[#FFFFFF] shadow rounded-[32px] py-[20px] xl:py-[80px] '>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-[16px] lg:gap-[115px] px-[26px] items-center '>
                            <div className='flex flex-col gap-10 lg:gap-[100px] xl:gap-[200px] py-[20px] order-2 lg:order-1'>
                                <div className=" ">
                                    <h2 className='epilogue text-[26px] md:text-[32px]'>Nrc Transport</h2>
                                    <p className='epilogue1 md:w-[80%] xl:w-[60%] text-[15px] md:text-[18px]'>Audiences are more scattered and more reachable than ever.
                                        We help brands become leaders on the channels of the new mainstream.</p>
                                </div>
                                <div className="">
                                    <a href="https://nrc-gray.vercel.app/" className="bg-black text-white py-2 px-4 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl shadow-lg transform items-center gap-2">
                                        View Live Site
                                    </a>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <Image className="rounded-xl" alt="NRC Transport" src={nrc} />
                            </div>
                        </div>
                    </div>
                    
                    {/* Araile Card */}
                    <div ref={addToCardsRefs} className='bg-[#FFFFFF] shadow rounded-[32px] py-[20px]  '>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-[16px] lg:gap-[115px] px-[26px] items-center'>
                            <div className='flex flex-col gap-10 lg:gap-[100px] xl:gap-[300px] py-[20px] order-2 lg:order-1'>
                                <div>
                                    <h2 className='epilogue text-[26px] md:text-[32px]'>Araile</h2>
                                    <p className='epilogue1 md:w-[80%] xl:w-[60%] text-[15px] md:text-[18px]'>Audiences are more scattered and more reachable than ever.
                                        We help brands become leaders on the channels of the new mainstream.</p>
                                </div>
                                <div>
                                    <a href="https://araile-3zkb.vercel.app/" className="bg-black text-white py-2 px-4 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl shadow-lg transform items-center gap-2">
                                        View Live Site
                                    </a>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <Image className="rounded-xl" alt="Araile" src={araile} />
                            </div>
                        </div>
                    </div>
                    
                    {/* NIS Card */}
                    <div ref={addToCardsRefs} className='bg-[#FFFFFF] shadow rounded-[32px] py-[20px] '>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-[16px] lg:gap-[115px] px-[26px] items-center '>
                            <div className='flex flex-col gap-10 lg:gap-[100px] xl:gap-[300px] py-[20px] order-2 lg:order-1'>
                                <div>
                                    <h2 className='epilogue text-[26px] md:text-[32px]'>NIS</h2>
                                    <p className='epilogue1 md:w-[80%] xl:w-[60%] text-[15px] md:text-[18px]'>Audiences are more scattered and more reachable than ever.
                                        We help brands become leaders on the channels of the new mainstream.</p>
                                </div>
                                <div>
                                    <a href="https://nigeria-immigration-service.vercel.app/" className="bg-black text-white py-2 px-4 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl shadow-lg transform items-center gap-2">
                                        View Live Site
                                    </a>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <Image className="rounded-xl" alt="NIS" src={NIS} />
                            </div>
                        </div>
                    </div>

                    {/* Stino Hotels Card */}
                    <div ref={addToCardsRefs} className='bg-[#FFFFFF] shadow rounded-[32px] py-[20px] xl:py-[80px]'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-[16px] lg:gap-[115px] px-[26px] items-center'>
                            <div className='flex flex-col gap-10 lg:gap-[100px] xl:gap-[200px] py-[20px] order-2 lg:order-1'>
                                <div>
                                    <h2 className='epilogue text-[26px] md:text-[32px]'>Stino Hotels</h2>
                                    <p className='epilogue1 md:w-[80%] xl:w-[60%] text-[15px] md:text-[18px]'>Audiences are more scattered and more reachable than ever.
                                        We help brands become leaders on the channels of the new mainstream.</p>
                                </div>
                                <div>
                                    <a href="https://stinohotels-qzam.vercel.app/" className="bg-black text-white py-2 px-4 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl shadow-lg transform items-center gap-2">
                                        View Live Site
                                    </a>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <Image className="rounded-xl" alt="Stino Hotels" src={stinohotels} />
                            </div>
                        </div>
                    </div>

                    {/* Beta House Card */}
                    <div ref={addToCardsRefs} className='bg-[#FFFFFF] shadow rounded-[32px] py-[20px] xl:py-[80px]'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-[16px] lg:gap-[115px] px-[26px] items-center'>
                            <div className='flex flex-col gap-10 lg:gap-[100px] xl:gap-[200px] py-[20px] order-2 lg:order-1'>
                                <div>
                                    <h2 className='epilogue text-[26px] md:text-[32px]'>Beta House</h2>
                                    <p className='epilogue1 md:w-[80%] xl:w-[60%] text-[15px] md:text-[18px]'>Audiences are more scattered and more reachable than ever.
                                        We help brands become leaders on the channels of the new mainstream.</p>
                                </div>
                                <div>
                                    <a href="https://betahouse-kappa.vercel.app/" className="bg-black text-white py-2 px-4 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl shadow-lg transform items-center gap-2">
                                        View Live Site
                                    </a>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <Image className="rounded-xl" alt="Beta House" src={betahouse} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
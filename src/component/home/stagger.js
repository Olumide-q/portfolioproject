"use client"
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Stagger() {
    const textRef = useRef(null);
    const paragraphRef = useRef(null);
    const sectionRef = useRef(null);
    const animationsRef = useRef({ initialized: false });

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
                    const colorClass = i >= highlightStart ? 'text-[#F8A929]' : 'text-[#000000]';
                    span.className = `inline-block opacity-0 transform translate-y-12 ${colorClass}`;
                    span.textContent = char;
                    span.style.transformOrigin = 'center bottom';
                }
                
                textRef.current.appendChild(span);
            }
        }

        // Create words for paragraph
        const paragraphText = "I believe great products start with empathy — understanding the people who’ll actually use them.That’s why every project I build begins with a simple question: “What would make this experience feel effortless?”";
        
        if (paragraphRef.current) {
            paragraphRef.current.innerHTML = '';
            
            // Split into words
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
    };

    const runAnimations = () => {
        // Prevent multiple simultaneous animations
        if (animationsRef.current.running) return;
        animationsRef.current.running = true;
        
        // Get elements
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
        }, "-=1.5") // Start slightly before the previous animation ends
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
        }, "-=0.5"); // Start before the scale animation completes
    };

    useEffect(() => {
        // Setup text elements
        setupTextElements();
        animationsRef.current.initialized = true;
        
        // Create ScrollTrigger after elements are set up
        const scrollTrigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: runAnimations,
            onEnterBack: runAnimations,
            // Uncomment for debugging
            // markers: true,
            // id: "stagger-section"
        });
        
        // Refresh ScrollTrigger to ensure proper calculation
        ScrollTrigger.refresh();
        
        // Cleanup function
        return () => {
            scrollTrigger.kill();
            // Kill any running animations
            gsap.killTweensOf([
                textRef.current?.querySelectorAll('span'),
                paragraphRef.current?.querySelectorAll('span span')
            ]);
        };
    }, []);

    return (
        <div ref={sectionRef} className="w-full bg-[#E8E4DC] py-20">
            <div className="w-11/12 container mx-auto">
                <div className="md:w-[79%] mx-auto flex flex-col gap-[16px] lg:gap-[28px] items-center justify-center text-center">
                    <div className="epilogue text-[20px] md:text-[29px] lg:text-[39px] xl:text-[60px] leading-tight">
                        <p ref={textRef}>
                            {/* Letters will be dynamically inserted here by GSAP */}
                        </p>
                    </div>
                    <div className="px-4 lg:px-[125px] xl:px-[245px] text-[15px]  md:text-[18px]  epilogue1 ">
                        <p ref={paragraphRef}>
                            {/* Words will be dynamically inserted here by GSAP */}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
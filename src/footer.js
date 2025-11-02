"use client"
import { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import line from './asset/icons/Group 6.svg'
import twitter from './asset/icons/Group 34.svg'
import linkdin from './asset/icons/Group 35.svg'
import git from './asset/icons/Group 36.svg'
import insta from './asset/icons/Group 37.svg'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const lineImageRef = useRef(null);
  const contactTextRef = useRef(null);
  const navSectionRef = useRef(null);
  const containerRef = useRef(null);
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

  const animateTopSection = useCallback(() => {
    if (!lineImageRef.current || !contactTextRef.current) {
        return;
    }

    // Set initial states
    gsap.set(lineImageRef.current, {
        scaleX: 0,
        transformOrigin: "left center"
    });

    gsap.set(contactTextRef.current, {
        opacity: 0,
        y: -20
    });

    // Animation timeline
    const tl = gsap.timeline({ paused: true });

    tl.to(lineImageRef.current, {
        scaleX: 1,
        duration: 1.5,
        ease: "power2.inOut"
    })
    .to(contactTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=1.0");

    return tl;
  }, []);

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  useGSAP(() => {
    const topTl = animateTopSection();

    if (topTl && navSectionRef.current) {
      ScrollTrigger.create({
        trigger: navSectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => topTl.restart(),
        onEnterBack: () => topTl.restart(),
      });
    }

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: containerRef });

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setLoading(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/mgvpzypd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
   <div id="footer" ref={containerRef} className='w-full bg-[#E8E4DC] pb-10 '>
    <div className='w-11/12 mx-auto bg-black flex flex-col py-10 px-4 md:px-15 gap-[100px] rounded-[32px]'>
      <div className='flex justify-between text-white '>
        <div className='flex flex-col justify-center'>
            <h1 className='epilogue text-[32px] lg:text-[65px] xl:text-[120px]'>Con<span className='text-zinc-600'>tact me</span></h1>
            <p className='epilogue1 lg:text-[32px]'>Love my work? Lets build cool, functional stuff!!!</p>
        </div>
        <div 
          ref={navSectionRef}
          className="flex justify-end items-center px-6 py-12 font-serif"
        >
          <div 
            className="flex flex-col items-center justify-center cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <h2 
              ref={contactTextRef}
              className="text-xl md:text-2xl xl:text-3xl text-white mb-2 whitespace-nowrap"
            >
              Scroll back
            </h2>
            <Image 
              ref={lineImageRef}
              className="w-full h-auto max-w-[150px]" 
              alt="Decorative line" 
              src={line} 
            />
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col gap-8">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="flex flex-col">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-white text-white placeholder-white px-0 py-3 focus:outline-none focus:border-[#FFFF]transition-colors"
              />
              {errors.name && (
                <span className="text-red-400 text-sm mt-2">{errors.name}</span>
              )}
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-white text-white placeholder-white px-0 py-3 focus:outline-none focus:border-[#FFFF]transition-colors [color-scheme:dark]"
                style={{ backgroundColor: 'transparent' }}
              />
              {errors.email && (
                <span className="text-red-400 text-sm mt-2">{errors.email}</span>
              )}
            </div>
          </div>

          {/* Message Field */}
          <div className="flex flex-col">
            <textarea
              id="message"
              name="message"
              rows="1"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="bg-transparent border-b-2 border-white text-white placeholder-white px-0 py-3 focus:outline-none focus:border-[#FFFF] transition-colors resize-none"
            ></textarea>
            {errors.message && (
              <span className="text-red-400 text-sm mt-2">{errors.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center lg:justify-end mt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`bg-[#35CDFF] text-white py-2 px-4 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl font-semibold text-lg transition-all ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#35CDFF] hover:scale-105'
              }`}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="text-[#35CDFF] text-center font-medium">
              Message sent successfully! We'll get back to you soon.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="text-red-400 text-center font-medium">
              Failed to send message. Please try again.
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-[14px] justify-center lg:justify-start ">
                            <a href="https://github.com/Olumide-q?tab=repositories" className=" ">
                            <Image className=" "  alt="Logo" src={git} />
                            </a>
                            <a href="https://github.com/Olumide-q/Country-Api-Project.git" className=" ">
                            <Image className=""  alt="Logo" src={linkdin} />
                            </a>
                            <a href="https://github.com/Olumide-q/Country-Api-Project.git" className="">
                            <Image className=" "  alt="Logo" src={twitter} />
                            </a>
                            <a href="https://github.com/Olumide-q/Country-Api-Project.git" className=" ">
                            <Image className=" "  alt="Logo" src={insta} />
                            </a>
                        </div>
    </div>
   </div>
  );
}
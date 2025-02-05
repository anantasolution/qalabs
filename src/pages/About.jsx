import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import TEAM from '../assets/TeamWork.jpeg'


function About() {
    const services = [
        'Custom Solutions',
        'Cutting-Edge Design',
        'SEO Optimization',
        'Responsive Design',
        'Innovative Technology',
        'Security and Reliability'
      ];
    
      const stats = [
        { value: '27K+', label: 'Project Done' },
        { value: '4K+', label: 'Happy Client' },
        { value: '4.7', label: 'Client Reviews' }
      ];
    
      // Add company logos array
      const logos = [
        'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_6.png',
        'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_7.png',
        'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_5.png',
        'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_8.png',
        'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_3.png',
      ];
    
      const [animatedStats, setAnimatedStats] = useState(stats);
    
      useEffect(() => {
        const animateStats = () => {
          const newStats = stats.map((stat) => {
            let endValue = stat.value.replace('+', '');
            let isDecimal = endValue.includes('.');
            endValue = parseFloat(endValue);
            const duration = Math.max(5000, (endValue / 100) * 1000);
    
            return {
              ...stat,
              value: 0,
              duration,
              isDecimal,
              endValue
            };
          });
    
          setAnimatedStats(newStats);
    
          newStats.forEach((stat, index) => {
            let currentValue = 0;
            const interval = setInterval(() => {
              currentValue = currentValue + (stat.endValue / stat.duration) * 50;
              if (currentValue >= stat.endValue) {
                clearInterval(interval);
                currentValue = stat.endValue;
              }
              setAnimatedStats((prevStats) => {
                const newStats = [...prevStats];
                newStats[index] = { ...newStats[index], value: currentValue };
                return newStats;
              });
            }, 50);
          });
        };
    
        animateStats();
      }, []);
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
    {/* About Us Section */}
    <section className="min-h-[400px] bg-[#1a1a1a] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="relative z-10 text-center space-y-4 px-4">
        <h1 className="text-6xl md:text-7xl font-bold">
          <span className="text-[#7CD7F9]">About </span>
          <span className="text-[#5CDA92]">us</span>
        </h1>
        <p className="text-white text-xl md:text-2xl font-light">Your Partner in Innovative Web Design.</p>
      </div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -right-20 -bottom-40 w-96 h-96 bg-gradient-to-br from-gray-700 to-transparent transform rotate-45"></div>
        <div className="absolute -left-20 -top-40 w-96 h-96 bg-gradient-to-br from-gray-800 to-transparent transform -rotate-45"></div>
      </div>
    </section>

    {/* Main Content */}
    <div className="max-w-7xl mx-auto px-6 mt-24 bg-[#151515] text-white min-h-screen">
      <div className="grid grid-cols-2 gap-12 h-full">
        {/* Left Side - Image with Services Overlay */}
        <div className="relative">
          <img src={TEAM || "/placeholder.svg"} alt="Team working" className="w-full rounded-lg" />
          <div className="absolute -bottom-8 -left-4 bg-black/80 rounded-lg p-6 w-[80%]">
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="bg-emerald-400/10 rounded-full p-1">
                    <Check className="h-5 w-5 text-emerald-400" />
                  </div>
                  <span className="text-white text-sm font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="space-y-8 ml-12">
          <h3 className="text-emerald-400 font-medium">WHO WE ARE</h3>
          <h2 className="text-5xl font-bold text-white leading-tight">
            Innovative Solutions for Your{' '}
            <span className="text-cyan-400">Online Success.</span>
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Sem iaculis facilisis convallis ex aliquam massa a venenatis blandit
            pede rhoncus. Euismod consectetuer nostra etiam lectus potenti
            accumsan pellentesque venenatis.
          </p>

          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-800">
            {animatedStats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl font-bold text-white">
                  {stat.isDecimal ? stat.value.toFixed(1) : Math.round(stat.value)}{' '}
                  {stat.value === 0 ? '' : '+'}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <button className="px-6 py-3 bg-emerald-400 text-gray-900 rounded-full font-medium hover:bg-emerald-500 transition-colors">
            Discover more
          </button>
        </div>
      </div>
    </div>

    {/* Horizontal White Line */}
    <div className="border-t-2 border-white my-16 mx-6"></div>

    {/* Logo Marquee Section */}
    <div className="w-full bg-[#1a1a1a] overflow-hidden py-8">
      <div className="relative flex items-center">
        {/* First set of logos */}
        <div
          className="flex whitespace-nowrap"
          style={{
            animation: 'marquee 25s linear infinite',
          }}
        >
          {logos.map((logo, index) => (
            <div key={index} className="mx-8 flex items-center justify-center">
              <img
                src={logo || "/placeholder.svg"}
                alt={`Company logo ${index + 1}`}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
          ))}
        </div>

        {/* Duplicate set for seamless loop */}
        <div
          className="flex absolute top-0 whitespace-nowrap"
          style={{
            animation: 'marquee2 25s linear infinite',
          }}
        >
          {logos.map((logo, index) => (
            <div key={index} className="mx-8 flex items-center justify-center">
              <img
                src={logo || "/placeholder.svg"}
                alt={`Company logo ${index + 1}`}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Hero Section */}
    <div className="bg-cover bg-center h-screen w-screen relative" style={{ backgroundImage: `url('https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/young-web-designers-working-together-at-modern-office.jpg')` }}>
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-center text-white px-6 md:px-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Ready to Start? Let's Build<br />
            Something Great<br />
            Together!
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            Maecenas tempor ligula phasellus per hac nisi. Facilisi curae<br />
            nunc hendrerit vestibulum lobortis commodo lacus sagmis<br />
            feugiat. Est sollicitudin convallis diam.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Start Your Journey
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
          @keyframes marquee2 {
            0% { transform: translateX(100%); }
            100% { transform: translateX(0%); }
          }
        `}
      </style>
    </div>
  </div>
  )
}

export default About



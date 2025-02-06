import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import TEAM from '../assets/TeamWork.jpeg';
import { motion } from 'framer-motion';

// HeroSection Component
const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/young-web-designers-working-together-at-modern-office.jpg')`
        }}
      />
      {/* Content Container */}
      <div className="relative h-full flex items-center justify-center px-4 sm:px-10">
        <div className="bg-[#1a1a1a]/70 p-10 max-w-xl ml-0 sm:ml-16 rounded-lg">
          <div className="space-y-4">
            <h1 className="text-white text-3xl sm:text-5xl font-semibold leading-tight">
              Ready to Start? Let's Build
              <br />
              <span className="bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">
                Something Great
              </span>
              <br />
              Together!
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Maecenas tempor ligula phasellus per hac nisi. Facilisi curae
              <br />
              nunc hendrerit vestibulum lobortis commodo lacus sagittis
              <br />
              feugiat. Est sollicitudin convallis diam.
            </p>
            <button className="mt-6 bg-emerald-300 hover:bg-emerald-400 text-black text-sm sm:text-base font-medium px-8 py-3 rounded-full transition-colors duration-200">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const services = [
    'Custom Solutions',
    'Cutting-Edge Design',
    'SEO Optimization',
    'Responsive Design',
    'Innovative Technology',
    'Security and Reliability'
  ];

  const stats = [
    { value: 27000, label: 'Projects Done' },
    { value: 4000, label: 'Happy Clients' },
    { value: 4.7, label: 'Client Reviews' }
  ];

  const logos = [
    'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_6.png',
    'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_7.png',
    'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_5.png',
    'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_8.png',
    'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_3.png',
  ];

  const [animatedStats, setAnimatedStats] = useState(
    stats.map(stat => ({ ...stat, value: 0 }))
  );

  useEffect(() => {
    const updateStats = () => {
      stats.forEach((stat, index) => {
        let count = 0;
        const step = stat.value / 100;
        const interval = setInterval(() => {
          count += step;
          setAnimatedStats(prevStats => {
            const newStats = [...prevStats];
            newStats[index] = {
              ...newStats[index],
              value: count >= stat.value ? stat.value : count
            };
            return newStats;
          });
          if (count >= stat.value) clearInterval(interval);
        }, 50);
      });
    };
    updateStats();
  }, []);

  return (
    // Removed top padding so that the background image of the About Us section starts at the very top.
    <div className="min-h-screen bg-[#151515] text-white">
      {/* --- Modified About Us Section (Upper Side) with Background Image starting at the top --- */}
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/3d-black-paper-craft-cubic-patterned-background.jpg')"
        }}
      >
        <section className="text-center py-16">
          <motion.h1
            className="text-4xl sm:text-6xl font-bold text-[#7CD7F9]"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            About <span className="text-[#5CDA92]">Us</span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl font-light mt-4"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Your Partner in Innovative Web Design.
          </motion.p>
        </section>
      </div>
      {/* ------------------------------------------------ */}

      {/* Content Section with extra top margin */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 sm:grid-cols-2 gap-12 mt-16">
        {/* Image & Services */}
        <div className="relative">
          <img src={TEAM} alt="Team Work" className="w-full rounded-lg" />
          <div className="absolute -bottom-8 left-4 bg-[#1a1a1a]/80 rounded-lg p-6 w-[80%]">
            {services.map((service, index) => (
              <div key={index} className="flex items-center space-x-3 my-2">
                <Check className="h-5 w-5 text-emerald-400" />
                <span className="text-sm sm:text-base font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Text & Stats */}
        <div className="space-y-8">
          <h3 className="text-emerald-400 font-medium">WHO WE ARE</h3>
          <h2 className="text-3xl sm:text-5xl font-bold">
            Innovative Solutions for Your <span className="text-[#7CD7F9]">Online Success</span>.
          </h2>
          <p className="text-gray-400">
            We deliver cutting-edge digital solutions tailored to your needs, ensuring
            seamless user experiences and impactful online presence.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-gray-800 pt-6">
            {animatedStats.map((stat, index) => (
              <div key={index} className="text-center">
                <span className="text-3xl sm:text-4xl font-bold">
                  {stat.label === 'Projects Done' || stat.label === 'Happy Clients'
                    ? Math.floor(stat.value)
                    : stat.value.toFixed(1)}
                  +
                </span>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
          <button className="px-6 py-3 bg-emerald-400 text-gray-900 rounded-full font-medium hover:bg-emerald-500 transition">
            Discover More
          </button>
        </div>
      </div>

      {/* Logo Marquee */}
      <div className="overflow-hidden py-8 bg-[#151515] mt-16">
        <div className="flex items-center justify-center space-x-12 animate-marquee">
          {logos.concat(logos).map((logo, index) => (
            <img key={index} src={logo} alt="Company Logo" className="h-12 brightness-0 invert" />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Team Section */}
      <div className="bg-[#151515] py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-emerald-400 font-medium mb-4">MEET OUR TEAM</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
              We talk a lot about <span className="text-emerald-400">hope</span> helping
              <br />
              and <span className="text-cyan-400">teamwork</span>.
            </h2>
          </div>
          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 1, name: 'David Mitchell', role: 'Founder', image: 'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/11.jpg' },
              { id: 2, name: 'Robert Collins', role: 'Co-Founder', image: 'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/6.jpg' },
              { id: 3, name: 'Sarah Parker', role: 'Business Manager', image: 'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/13-300x300.jpg' },
              { id: 4, name: 'Michael Wilson', role: 'Marketing Manager', image: 'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/9-300x300.jpg' }
            ].map((member) => (
              <div key={member.id} className="relative group">
                <div className="bg-[#202020] rounded-lg overflow-hidden">
                  <div className="relative group-hover:grayscale-0 group-hover:brightness-100 grayscale brightness-50 transition-all duration-1000">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-[300px] object-cover rounded-lg transition-all duration-500"
                    />
                  </div>
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-white text-lg">{member.name}</h3>
                  <p className="text-gray-400">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

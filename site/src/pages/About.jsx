import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import TEAM from "../assets/TeamWork.jpeg";
import BI from "../assets/background.jpeg";
import { motion, useAnimation } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const HeroSection = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-cover bg-center mt-10"
      style={{
        backgroundImage:
          "url('https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/young-web-designers-working-together-at-modern-office.jpg')",
      }}
    >
      {/* Semi-transparent overlay */}
      <motion.div
        className="absolute inset-0 bg-black/50"
        ref={ref}
        initial={{ y: -100, opacity: 0 }}
        animate={controls}
        variants={{
          visible: { y: 0, opacity: 1, transition: { duration: 1.5 } },
        }}
      ></motion.div>

      {/* Content Container */}
      <motion.div
        className="relative h-full flex items-center px-8 md:px-16 max-w-7xl mx-auto"
        ref={ref}
        initial={{ y: -100, opacity: 0 }}
        animate={controls}
        variants={{
          visible: { y: 0, opacity: 1, transition: { duration: 1.5 } },
        }}
      >
        <div className="bg-[#151515]/80 p-8 md:p-12 rounded-lg max-w-2xl backdrop-blur-sm">
          <h1 className="text-white text-4xl md:text-5xl font-semibold leading-tight mb-4">
            Ready to Start? Let's Build
            <div className="bg-gradient-to-r from-[#7CD7F9] to-[#5CDA92] bg-clip-text text-transparent">
              Something Great
            </div>
            Together!
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
            Maecenas tempor ligula phasellus per hac nisi. Facilisi curae nunc
            hendrerit vestibulum lobortis commodo lacus sagittis feugiat. Est
            sollicitudin convallis diam.
          </p>
          <button className="bg-[#5CDA92] hover:bg-[#4bc583] text-black font-medium px-8 py-3 rounded-full transition-colors duration-300 text-sm md:text-base">
            Start Your Journey
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const About = () => {
  const services = [
    "Custom Solutions",
    "Cutting-Edge Design",
    "SEO Optimization",
    "Responsive Design",
    "Innovative Technology",
    "Security and Reliability",
  ];

  const [stats, setStats] = useState([
    { value: 0, endValue: 27, label: "Project Done", suffix: "K+" },
    { value: 0, endValue: 4, label: "Happy Client", suffix: "K+" },
    { value: 0, endValue: 4.7, label: "Client Reviews", suffix: "+" },
  ]);

  useEffect(() => {
    const duration = 3000; // duration of the animation in milliseconds
    const intervalTime = 50; // interval time in milliseconds
    const steps = duration / intervalTime;

    const incrementValues = stats.map(
      (stat) => (stat.endValue - stat.value) / steps
    );

    const interval = setInterval(() => {
      setStats((prevStats) =>
        prevStats.map((stat, index) => ({
          ...stat,
          value:
            stat.value < stat.endValue
              ? stat.value + incrementValues[index]
              : stat.endValue,
        }))
      );
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  const logos = [
    "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_6.png",
    "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_7.png",
    "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_5.png",
    "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_8.png",
    "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_3.png",
  ];

  const teamMembers = [
    {
      id: 1,
      name: "David Mitchell",
      role: "Founder",
      image:
        "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/11.jpg",
    },
    {
      id: 2,
      name: "Robert Collins",
      role: "Co-Founder",
      image:
        "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/6.jpg",
    },
    {
      id: 3,
      name: "Sarah Parker",
      role: "Business Manager",
      image:
        "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/13-300x300.jpg",
    },
    {
      id: 4,
      name: "Michael Wilson",
      role: "Marketing Manager",
      image:
        "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/9-300x300.jpg",
    },
  ];

  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const teamControls = useAnimation();
  const { ref: teamRef, inView: teamInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (teamInView) {
      teamControls.start("visible");
    }
  }, [teamControls, teamInView]);

  const servicesControls = useAnimation();
  const { ref: servicesRef, inView: servicesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (servicesInView) {
      servicesControls.start("visible");
    }
  }, [servicesControls, servicesInView]);

  return (
    <div className="min-h-screen bg-[#151515] text-white">
      {/* --- About Us Section with Background Image starting from the very top and extra margin from nav --- */}
       <div
             className="relative min-h-[50vh] md:min-h-[60vh]  bg-cover bg-center"
             style={{ backgroundImage: `url(${BI})` }}
           >
        <section className="text-center py-32">
          <motion.h1
            className="text-4xl sm:text-6xl font-bold text-[#7CD7F9]"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            About <span className="text-[#5CDA92]">Us</span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl font-light mt-4"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Your Partner in Innovative Web Design.
          </motion.p>
        </section>
      </div>

      {/* Who We Are Section */}
      <div className="bg-[#151515] p-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-center">
          <motion.div
            className="lg:w-1/2 relative"
            ref={ref}
            initial={{ x: -100, opacity: 0 }}
            animate={controls}
            variants={{
              visible: { x: 0, opacity: 1, transition: { duration: 1.5 } },
            }}
          >
            <motion.div
              className="bg-black/80 p-6 rounded-lg absolute left-[-50px] bottom-[-50px] z-10"
              ref={servicesRef}
              initial={{ y: 100, opacity: 0 }}
              animate={servicesControls}
              variants={{
                visible: { y: 0, opacity: 1, transition: { duration: 1.5 } },
              }}
            >
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-400 rounded-full p-1">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-white">{service}</span>
                </div>
              ))}
            </motion.div>
            <img
              src={TEAM || "/placeholder.svg"}
              alt="Team working together"
              className="rounded-lg grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>

          <motion.div
            className="lg:w-1/2 bg-[#151515] p-8 rounded-lg"
            ref={ref}
            initial={{ x: 100, opacity: 0 }}
            animate={controls}
            variants={{
              visible: { x: 0, opacity: 1, transition: { duration: 1.5 } },
            }}
          >
            <h3 className="text-emerald-400 font-medium mb-4">WHO WE ARE</h3>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">Innovative Solutions for Your </span>
              <span className="bg-gradient-to-r from-[#00ffff] via-[#00ccff] to-[#00ff8a] bg-clip-text text-transparent">
                Online Success.
              </span>
            </h2>
            <p className="text-gray-400 mb-8">
              Sem iaculis facilisis convallis ex aliquam massa a venenatis
              blandit pede rhoncus. Euismod consectetuer nostra etiam lectus
              potenti accumsan pellentesque venenatis.
            </p>

            <div className="grid grid-cols-3 gap-8 mb-8">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-white text-3xl lg:text-4xl font-bold mb-2">
                    {stat.label === "Client Reviews"
                      ? stat.value.toFixed(1)
                      : Math.round(stat.value)}
                    {stat.suffix || ""}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            <motion.button
              className="bg-gradient-to-r from-[#00ff8a] to-[#00ccff] text-black px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1.5 }}
            >
              Discover more
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* <HeroSection className="border border-red-500 relative" /> */}

      {/* White Line */}
      <div className="border-t border-white my-8"></div>

      {/* Logo Marquee */}
      <div className="bg-[#151515] py-8 overflow-hidden flex justify-center items-center">
        <div className="flex animate-marquee space-x-12">
          {logos.concat(logos).map((logo, index) => (
            <img
              key={index}
              src={logo || "/placeholder.svg"}
              alt="Company Logo"
              className="h-12 brightness-0 invert"
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Team Section */}
      <div className="bg-[#151515] py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            ref={teamRef}
            initial={{ y: 100, opacity: 0 }}
            animate={teamControls}
            variants={{
              visible: { y: 0, opacity: 1, transition: { duration: 1.5 } },
            }}
          >
            <p className="text-emerald-400 font-medium mb-4">MEET OUR TEAM</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
              We talk a lot about <span className="text-emerald-400">hope</span>{" "}
              helping
              <br />
              and <span className="text-cyan-400">teamwork</span>.
            </h2>
          </motion.div>
          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                className="group"
                initial={{ opacity: 0 }}
                animate={teamControls}
                variants={{
                  visible: { opacity: 1, transition: { duration: 1.5 } },
                }}
              >
                <div className="relative overflow-hidden rounded-lg bg-[#1A1A1A]">
                  {/* Image Container */}
                  <div className="relative aspect-square">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:filter-none filter grayscale"
                    />
                    {/* Social Media Overlay */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 transition-opacity duration-300">
                      <a
                        href="#"
                        className="bg-[#151515] text-emerald-400 p-2 rounded-full hover:bg-emerald-400 hover:text-[#151515] transition-colors"
                      >
                        <FaFacebookF className="w-4 h-4" />
                      </a>
                      <a
                        href="#"
                        className="bg-[#151515] text-cyan-400 p-2 rounded-full hover:bg-cyan-400 hover:text-[#151515] transition-colors"
                      >
                        <FaTwitter className="w-4 h-4" />
                      </a>
                      <a
                        href="#"
                        className="bg-[#151515] text-emerald-400 p-2 rounded-full hover:bg-emerald-400 hover:text-[#151515] transition-colors"
                      >
                        <FaLinkedinIn className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-4 bg-[#1A1A1A] p-4 rounded-lg text-center">
                  <h3 className="text-white text-lg font-medium">
                    {member.name}
                  </h3>
                  <p className="text-emerald-400">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

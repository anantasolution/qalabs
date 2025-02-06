import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import TEAM from "../assets/TeamWork.jpeg"
import { motion } from "framer-motion"

const HeroSection = () => {
  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/young-web-designers-working-together-at-modern-office.jpg')",
      }} // Replace with your image path
    >
      {/* Semi-transparent overlay for the whole section */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content Container */}
      <div className="relative h-full flex items-center px-8 md:px-16 max-w-7xl mx-auto">
        <div className="bg-[#151515]/80 p-8 md:p-12 rounded-lg max-w-2xl backdrop-blur-sm">
          <h1 className="text-white text-4xl md:text-5xl font-semibold leading-tight mb-4">
            Ready to Start? Let's Build
            <div className="bg-gradient-to-r from-[#7CD7F9] to-[#5CDA92] bg-clip-text text-transparent">
              Something Great
            </div>
            Together!
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
            Maecenas tempor ligula phasellus per hac nisi. Facilisi curae nunc hendrerit vestibulum lobortis commodo
            lacus sagittis feugiat. Est sollicitudin convallis diam.
          </p>
          <button className="bg-[#5CDA92] hover:bg-[#4bc583] text-black font-medium px-8 py-3 rounded-full transition-colors duration-300 text-sm md:text-base">
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  )
}

const About = () => {
  const services = [
    "Custom Solutions",
    "Cutting-Edge Design",
    "SEO Optimization",
    "Responsive Design",
    "Innovative Technology",
    "Security and Reliability",
  ]

  const [stats, setStats] = useState([
    { value: 0, endValue: 27, label: "Project Done", suffix: "K+" },
    { value: 0, endValue: 4, label: "Happy Client", suffix: "K+" },
    { value: 4.7, label: "Client Reviews" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) =>
        prevStats.map((stat) => ({
          ...stat,
          value: stat.value < stat.endValue ? stat.value + 1 : stat.value,
        })),
      )
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const logos = [
    "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_6.png",
    "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_7.png",
    "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_5.png",
    "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_8.png",
    "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_3.png",
  ]

  return (
    <div className="min-h-screen bg-[#151515] text-white">
      {/* Background Image Section */}
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/3d-black-paper-craft-cubic-patterned-background.jpg')",
        }}
      >
        <section className="text-center py-32">
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

      {/* Who We Are Section */}
      <div className="bg-black p-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-center">
          {/* Left Column */}
          <div className="lg:w-1/2 relative">
            <div className="bg-black/80 p-6 rounded-lg absolute left-0 top-0 z-10">
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-400 rounded-full p-1">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-white">{service}</span>
                </div>
              ))}
            </div>
            <img src={TEAM || "/placeholder.svg"} alt="Team working together" className="rounded-lg" />
          </div>

          {/* Right Column */}
          <div className="lg:w-1/2">
            <h3 className="text-emerald-400 font-medium mb-4">WHO WE ARE</h3>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">Innovative Solutions for Your </span>
              <span className="text-emerald-400">Online Success.</span>
            </h2>
            <p className="text-gray-400 mb-8">
              Sem iaculis facilisis convallis ex aliquam massa a venenatis blandit pede rhoncus. Euismod consectetuer
              nostra etiam lectus potenti accumsan pellentesque venenatis.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-8 mb-8">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-white text-3xl lg:text-4xl font-bold mb-2">
                    {stat.value}
                    {stat.suffix || ""}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            <button className="bg-emerald-400 text-black px-6 py-3 rounded-full hover:bg-emerald-500 transition-colors">
              Discover more
            </button>
          </div>
        </div>
      </div>

      {/* Logo Marquee */}
      <div className="overflow-hidden py-8 bg-[#151515] mt-16">
        <div className="flex items-center justify-center space-x-12 animate-marquee">
          {logos.concat(logos).map((logo, index) => (
            <img key={index} src={logo || "/placeholder.svg"} alt="Company Logo" className="h-12 brightness-0 invert" />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Team Section */}
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
              {
                id: 1,
                name: "David Mitchell",
                role: "Founder",
                image: "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/11.jpg",
              },
              {
                id: 2,
                name: "Robert Collins",
                role: "Co-Founder",
                image: "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/6.jpg",
              },
              {
                id: 3,
                name: "Sarah Parker",
                role: "Business Manager",
                image: "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/13-300x300.jpg",
              },
              {
                id: 4,
                name: "Michael Wilson",
                role: "Marketing Manager",
                image: "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/9-300x300.jpg",
              },
            ].map((member) => (
              <div key={member.id} className="relative group">
                <div className="bg-[#202020] rounded-lg overflow-hidden">
                  <div className="relative group-hover:grayscale-0 group-hover:brightness-100 grayscale brightness-50 transition-all duration-1000">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-[300px] object-cover rounded-lg transition-all duration-500"
                    />
                  </div>
                </div>
                {/* Social Media Icons */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <a
                    href="#"
                    className="bg-[#151515] text-emerald-400 p-2 rounded-full hover:bg-emerald-400 hover:text-[#151515] transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.293H9.847v-3.62h2.973V8.413c0-2.947 1.798-4.552 4.422-4.552 1.26 0 2.342.094 2.656.136v3.076h-1.822c-1.43 0-1.708.68-1.708 1.676v2.199h3.417l-.445 3.62h-2.972V24h5.827C23.407 24 24 23.407 24 22.676V1.325C24 .593 23.407 0 22.675 0z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-[#151515] text-cyan-400 p-2 rounded-full hover:bg-cyan-400 hover:text-[#151515] transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195A4.92 4.92 0 0016.847 3c-2.706 0-4.918 2.211-4.918 4.917 0 .385.045.762.127 1.124C7.728 8.842 4.1 6.881 1.671 3.149a4.822 4.822 0 00-.666 2.475 4.918 4.918 0 002.188 4.1A4.902 4.902 0 01.964 9.23v.062a4.922 4.922 0 003.946 4.83 4.9 4.9 0 01-2.212.084 4.928 4.928 0 004.6 3.417A9.868 9.868 0 010 21.542a13.94 13.94 0 007.548 2.211c9.058 0 14.01-7.512 14.01-14.012 0-.213-.005-.425-.014-.636A10.025 10.025 0 0024 4.557z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-[#151515] text-emerald-400 p-2 rounded-full hover:bg-emerald-400 hover:text-[#151515] transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zm-7 19H8v-7h4v7zm-2-8.062c-1.188 0-2.145-.961-2.145-2.146 0-1.188.957-2.145 2.145-2.145s2.145.957 2.145 2.145c0 1.185-.957 2.146-2.145 2.146zm9 8.062h-4v-4.518c0-1.154-.021-2.641-1.609-2.641-1.611 0-1.859 1.259-1.859 2.56V19h-4v-7h3.668v.951h.048c.511-.963 1.764-1.977 3.632-1.977 3.88 0 4.598 2.553 4.598 5.871V19z" />
                    </svg>
                  </a>
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
  )
}

export default About
import React from 'react';
import FOOT from '../assets/footer.png';

// Import icons
import { FacebookOutlined, YouTube } from '@mui/icons-material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';

const Footer = () => {
    const services = [
        { name: 'Web Design', href: '/' },
        { name: 'Web Development', href: '#' },
        { name: 'SEO & Digital Marketing', href: '#' },
        { name: 'Branding & Visual Identity', href: '#' },
        { name: 'Consultation & Strategy', href: '#' },
        { name: 'Maintenance & Support', href: '#' }
    ];

    const support = [
        { name: 'Help Center', href: '#' },
        { name: 'Ticket Support', href: '#' },
        { name: 'Contact us', href: '/contactus' },
        { name: 'Customer Support', href: '#' },
        { name: 'Forum Community', href: '#' }
    ];

    const company = [
        { name: 'About us', href: '#' },
        { name: 'Leadership', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Article & News', href: '#' },
        { name: 'Legal Notices', href: '#' }
    ];

    return (
        <footer className="bg-[#242424] text-gray-300 px-6 md:px-12 lg:px-24 pt-16">
            <div className="container mx-auto flex flex-col md:flex-row md:items-start md:justify-between space-y-12 md:space-y-0">
                {/* Logo Section */}
                <div className="text-center md:text-left md:w-1/4">
                    <span className="mx-auto md:mx-0 text-[#71ECB6] text-3xl" >Zyinex</span>
                    {/* <span className="mx-auto md:mx-0 text-blue-300 text-3xl" >ex</span> */}
                    <p className="text-[#717171] mt-2 text-sm">
                        402, Shangrila Arcade <br /> Ahmedabad - India
                    </p>
                    {/* Social Media Icons */}
                    <div className="flex justify-center md:justify-start space-x-4 mt-4">
                        {[FacebookOutlined, InstagramIcon, TwitterIcon, YouTube].map((Icon, index) => (
                            <span
                                key={index}
                                className="w-8 h-8 rounded-full bg-[#494949] flex items-center justify-center hover:bg-[#71ECB6] transition-colors cursor-pointer"
                            >
                                <Icon className="hover:text-black hover:scale-105" />
                            </span>
                        ))}
                    </div>
                </div>

                {/* Services, Support, and Company Sections in One Row for Desktop */}
                <div className="flex flex-col md:flex-row md:w-3/4 justify-between text-center md:text-left">
                    {[{ title: 'Services', links: services }, { title: 'Support', links: support }, { title: 'Company', links: company }].map((section) => (
                        <div key={section.title} className="md:w-1/3">
                            <h3 className="text-white font-semibold text-lg mb-4 pt-5 md:pt-0">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((item) => (
                                    <li key={item.name}>
                                        <Link to={item.href}  className="text-sm text-[#717171] hover:text-[#BAFE6D] transition-colors">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Divider Line */}
            <div className="w-full border-t border-[#717171] mt-12"></div>

            {/* Copyright and Policies */}
            <div className="flex flex-col md:flex-row justify-between items-center w-full text-sm text-[#717171] space-y-4 md:space-y-0 mt-8 px-6 pb-5 sm:pb-10 ">
                <p>Copyright ©️ 2024 Qalabz, All rights reserved.</p>
                <div className="flex space-x-6">
                    <a href="#" className="hover:text-white transition-colors">Term of Use</a>
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

const SocialShare = () => {
    return (
        <div className="flex items-center gap-3 p-4 py-6 border-t border-b border-[#3A3A3A] text-white w-full mx-auto">
            <span className="text-lg">Share it :</span>
            <a
                href="https://www.facebook.com/sharer/sharer.php?u=YOUR_URL"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 p-2 rounded-full hover:opacity-80 transition"
            >
                <FaFacebookF className="text-white" />
            </a>
            <a
                href="https://twitter.com/intent/tweet?url=YOUR_URL"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 p-2 rounded-full hover:opacity-80 transition"
            >
                <FaTwitter className="text-white" />
            </a>
            <a
                href="https://www.linkedin.com/shareArticle?mini=true&url=YOUR_URL"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 p-2 rounded-full hover:opacity-80 transition"
            >
                <FaLinkedinIn className="text-white" />
            </a>
            <a
                href="https://api.whatsapp.com/send?text=YOUR_URL"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 p-2 rounded-full hover:opacity-80 transition"
            >
                <FaWhatsapp className="text-white" />
            </a>
        </div>
    );
};

export default SocialShare;
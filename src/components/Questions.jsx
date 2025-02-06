import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from "lucide-react";

const Questions = () => {
  const faqs = [
    {
      question: "Congue venenatis iaculis gravida ex etiam bibendum?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Suspendisse eros magnis lacinia pulvinar tellus?",
      answer:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      question: "Tincidunt imperdiet mus senectus?",
      answer:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      question: "Maximus curabitur nullam euismod orci tempor?",
      answer:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      question:
        "Ac turpis nascetur integer mus praesent dapibus convallis volutpat?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Suspendisse eros magnis lacinia pulvinar tellus?",
      answer:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  const fadeInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5 } }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5 } }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <p className="text-lime-300 uppercase mb-4">PAYMENT & ORDER</p>
          <h1 className="text-4xl font-bold text-white">
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text font-semibold text-4xl">
              Most Popular Questions
            </span>
          </h1>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInLeft}
            className="space-y-4"
          >
            {faqs.slice(0, 6).map((faq, index) => (
              <FAQ key={`left-${index}`} {...faq} />
            ))}
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInRight}
            className="space-y-4"
          >
            {faqs.slice().map((faq, index) => (
              <FAQ key={`right-${index}`} {...faq} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-4 text-left rounded-lg flex justify-between items-center transition-colors duration-200 ${
          isOpen
            ? "bg-gradient-to-r from-blue-400 to-green-400 text-black"
            : "bg-gray-800 hover:bg-gray-700 text-white"
        }`}
      >
        <span>{question}</span>
        <ChevronDown
          className={`transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-700 rounded-lg text-gray-200">
          {answer}
        </div>
      )}
    </div>
  );
};

export default Questions;
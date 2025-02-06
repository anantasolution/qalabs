import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const Questions = () => {
  const [leftOpenIndex, setLeftOpenIndex] = useState(null);
  const [rightOpenIndex, setRightOpenIndex] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const faqData = [
    {
      question: "Congue venenatis iaculis gravida ex etiam bibendum?",
      answer:
        "Auctor phasellus hendrerit risus pretium ullamcorper malesuada sed interdum elementum nunc. Potenti consequat consectetuer venenatis blandit purus tempor adipiscing fringilla. Risus orci conubia aptent sollicitudin nibh justo eu.",
    },
    {
      question: "Suspendisse eros magnis lacinia pulvinar tellus?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Tincidunt imperdiet mus senectus?",
      answer:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      question: "Maximus curabitur nullam euismod orci tempor?",
      answer:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      question:
        "Ac turpis nascetur integer mus praesent dapibus convallis volutpat?",
      answer:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      question: "Urna lacus sociosqu tortor in nisl?",
      answer:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 1000); // Ensures animation happens only once

    return () => clearTimeout(timer);
  }, []);

  const AccordionColumn = ({ data, openIndex, setOpenIndex, fromLeft = true }) => (
    <motion.div 
      initial={!hasLoaded ? { 
        opacity: 0, 
        x: fromLeft ? -100 : 100 
      } : false}
      animate={!hasLoaded ? { 
        opacity: 1, 
        x: 0 
      } : false}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        duration: 0.8
      }}
      className="w-full space-y-4"
    >
      {data.map((item, index) => (
        <div 
          key={index}
          className="rounded-lg overflow-hidden"
        >
          {/* QUESTION BUTTON */}
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className={`w-full px-6 py-4 flex justify-between items-center text-left transition-colors duration-200
              ${
                openIndex === index
                  ? "bg-gradient-to-r from-blue-400 to-green-400 text-black"
                  : "bg-zinc-800  text-white"
              }`}
          >
            <span className="font-medium">{item.question}</span>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-black" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {/* ANSWER SECTION */}
          <motion.div
            initial={false}
            animate={{ 
              height: openIndex === index ? 'auto' : 0, 
              opacity: openIndex === index ? 1 : 0 
            }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-zinc-800 text-white">
              {item.answer}
            </div>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-neutral p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-lime-300 mb-2">PAYMENT & ORDER</p>
          <h1 className="text-4xl font-bold text-white">
            Most{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text font-semibold text-4xl">
              Popular
            </span>{" "}
            Questions
          </h1>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <AccordionColumn
            data={faqData}
            openIndex={leftOpenIndex}
            setOpenIndex={setLeftOpenIndex}
            fromLeft={true}
          />
          <AccordionColumn
            data={faqData}
            openIndex={rightOpenIndex}
            setOpenIndex={setRightOpenIndex}
            fromLeft={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Questions;
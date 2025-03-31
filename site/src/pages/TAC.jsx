import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import BI from '../assets/background.jpeg'
const TAC = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#151515] text-white min-h-screen">

      {/* Hero Section with animation */}
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
            Tearms And <span className="text-[#5CDA92]">Condition</span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl font-light mt-4"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Your Digital Partner for Future-Ready Solutions
          </motion.p>
        </section>
      </div>

      {/* Content with stagger animation */}
      <motion.div 
        className="container mx-auto px-4 py-16"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {[
          {
            title: "1. Introduction",
            content: "These Terms and Conditions govern the use of Zyinex.ai, a product of Ananta Solution. By creating an account and using our services, you agree to abide by these terms."
          },
          {
            title: "2. Service Description",
            content: "Zyinex.ai provides AI-generated photoshoots using AI models. The models used in our services are not real humans, eliminating copyright concerns. We use advanced artificial intelligence to generate realistic images based on user-provided input. By using our platform, you acknowledge that:",
            list: [
              "The AI-generated images are based on computational models and are not actual photographs.",
              "The final output may vary depending on the input quality and AI interpretation.",
              "Zyinex.ai is not responsible for the subjective satisfaction of the user."
            ]
          },
          {
            title: "3. Pricing & Payment",
            content: "Our services operate on a coin-based payment system, allowing users flexibility in purchasing and using our features. Please note:",
            list: [
              "Pricing differs for single-photo output and multiple-photo output.",
              "Payment must be made before using our services.",
              "Additional features may be subject to separate charges.",
              "Users are responsible for maintaining sufficient balance in their accounts.",
              "Subscription-based services, if available, will be billed periodically per the selected plan."
            ]
          },
          {
            title: "4. Refund Policy",
            content: "We strive to offer a seamless experience, but we acknowledge that issues may arise. Our refund policy ensures fairness for both users and the company. Refund requests are handled as follows:",
            list: [
              "Refunds are provided only if we fail to deliver the requested AI-generated photos.",
              "If we successfully deliver the output but the client is unsatisfied with the results, no refund will be issued.",
              "Refund requests must be submitted within a specified timeframe after order completion.",
              "We do not refund unused credits or balances in a user's account.",
              "In case of service interruptions, partial refunds may be issued at our discretion."
            ]
          },
          {
            title: "5. Account Security",
            content: "Users are responsible for maintaining the security of their accounts. We recommend:",
            list: [
              "Using strong, unique passwords for your Zyinex.ai account",
              "Not sharing account credentials with third parties",
              "Logging out of your account when using shared devices",
              "Notifying us immediately if you suspect unauthorized access"
            ]
          },
          {
            title: "6. Prohibited Activities",
            content: "When using our services, the following activities are strictly prohibited:",
            list: [
              "Using our AI to generate illegal, offensive, or harmful content",
              "Attempting to reverse engineer our AI models",
              "Scraping or harvesting data from our platform",
              "Disrupting or interfering with the service's normal operation",
              "Using automated systems to access the service without explicit permission"
            ]
          },
          {
            title: "7. Service Availability",
            content: "While we strive to provide uninterrupted service, we do not guarantee 24/7 availability. We reserve the right to modify, suspend, or discontinue the service temporarily or permanently with or without notice. We will not be liable for any service interruptions or data loss resulting from such actions."
          },
          {
            title: "8. Limitation of Liability",
            content: "To the maximum extent permitted by law, Ananta Solution and Zyinex.ai shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service, regardless of whether such damages are based on warranty, contract, tort, or any other legal theory."
          },
          {
            title: "9. Governing Law",
            content: "These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which Ananta Solution operates, without regard to its conflict of law provisions."
          },
          {
            title: "10. Contact Us",
            content: "For any questions or concerns regarding these terms, contact us at: info@anantasolution.com"
          }
        ].map((section, index) => (
          <motion.section 
            key={index} 
            className="mb-10"
            variants={slideUp}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 
              className="text-2xl font-bold mb-4"
              whileInView={{ scale: [0.95, 1] }}
              transition={{ duration: 0.5 }}
            >
              {section.title}
            </motion.h2>
            <motion.p className="mb-4">
              {section.content}
            </motion.p>
            {section.list && (
              <motion.ul 
                className="list-disc pl-6 mb-4 space-y-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {section.list.map((item, i) => (
                  <motion.li 
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                    }}
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.section>
        ))}
      </motion.div>
    </div>
  );
};

export default TAC;
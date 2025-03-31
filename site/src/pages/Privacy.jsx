import React from 'react';
import { motion } from 'framer-motion';
import BI from "../assets/background.jpeg";

const Privacy = () => {
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
            Privacy and <span className="text-[#5CDA92]">Policy</span>
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
            content: "Welcome to Zyinex.ai, a product by Ananta Solution. We are committed to protecting your privacy and ensuring that your data is handled securely and transparently. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our AI-based photoshoot service."
          },
          {
            title: "2. Information We Collect",
            content: "To provide you with the best possible experience, we collect various types of information when you interact with our services. This includes personal details you provide, data about your interactions with our platform, and technical information that helps us enhance our services. The types of data we collect include:",
            list: [
              "Personal Information: Name, email address, and payment details.",
              "Uploaded Images: The photos you upload for AI processing.",
              "Usage Data: Information related to how you interact with our platform.",
              "Device Information: We may collect data such as your device type, operating system, browser type, and IP address for analytical and security purposes.",
              "Transactional Data: Records of purchases, completed orders, refunds, and usage of our services.",
              "Communication Data: Any messages, emails, or support requests you send to us."
            ]
          },
          {
            title: "3. How We Use Your Information",
            content: "Your information is used to improve and customize your experience, enhance the functionality of our services, and ensure compliance with legal obligations. Specifically, we use the collected data to:",
            list: [
              "Provide AI-generated photoshoots as per your request.",
              "Process payments and refunds where applicable.",
              "Improve our services based on usage patterns.",
              "Comply with legal and regulatory requirements.",
              "Provide customer support and respond to inquiries.",
              "Enhance our AI models and improve the accuracy of our services (without compromising user privacy).",
              "Prevent fraud, security breaches, and unauthorized access.",
              "Offer promotional offers or discounts based on user preferences and history (only if consented)."
            ]
          },
          {
            title: "4. Data Privacy and Security",
            content: "We take the privacy and security of your data seriously. We implement industry-standard measures to protect your information from unauthorized access, loss, or misuse. Our security practices include:",
            list: [
              "We do not share or use your data for marketing purposes unless you give us explicit permission.",
              "Your data remains private, and we ensure the highest security measures to protect it.",
              "Upon request, we will permanently delete all your data from our servers.",
              "We use encryption protocols to protect your information from unauthorized access.",
              "Our servers and databases are regularly updated with security patches to prevent breaches.",
              "We restrict internal access to your data to only authorized personnel who require it for operational purposes."
            ]
          },
          {
            title: "5. Data Retention",
            content: "To ensure compliance with legal requirements and service optimization, we retain user data only for the necessary period. After this period, all information is securely deleted. Specifically:",
            list: [
              "Data is retained only as long as necessary to fulfill your requests or comply with legal obligations.",
              "Data associated with inactive accounts may be deleted after a certain period of time.",
              "Backup copies may exist for operational recovery but are deleted periodically."
            ]
          },
          {
            title: "6. Your Rights",
            content: "We respect your rights over your personal data and provide several options to control and manage your information. As a user, you have the right to:",
            list: [
              "Request access, correction, or deletion of your data at any time.",
              "Opt out of marketing communications if you have previously given permission.",
              "Request a copy of your data stored in our system.",
              "Withdraw your consent for data processing, where applicable."
            ]
          },
          {
            title: "7. Cookies and Tracking Technologies",
            content: "To improve user experience and enhance service efficiency, we use cookies and similar tracking technologies. These technologies help us gather valuable insights into user behavior. You should be aware of the following:",
            list: [
              "We use cookies and similar tracking technologies to enhance your user experience.",
              "You can control cookie preferences via your browser settings.",
              "Some essential cookies are necessary for the platform to function correctly."
            ]
          },
          {
            title: "8. Changes to This Policy",
            content: "To keep up with evolving technology and regulatory standards, we may update this Privacy Policy from time to time. We encourage you to review it periodically. Continued use of our services after modifications constitutes acceptance of the updated policy."
          },
          {
            title: "9. Contact Us",
            content: "For any questions or concerns regarding this policy, contact us at: info@anantasolution.com"
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

export default Privacy;
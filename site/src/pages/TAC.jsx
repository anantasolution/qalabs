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
            title: "1. Relationship",
            content: "ZyinexWeb acknowledges that its relationship with the Client is that of an independent contractor. Acceptance of work does not establish a joint venture, partnership, or employer-employee relationship between ZyinexWeb and the Client. Accordingly, ZyinexWeb is not entitled to any employee benefits and is not authorized to make any representation, contract, or commitment on behalf of the Client unless explicitly authorized in writing. Both parties agree that neither holds the authority to legally bind the other in agreements with third parties."
          },
          {
            title: "2. Services",
            content: "ZyinexWeb shall develop a website and/or application in accordance with the specifications mutually agreed upon with the Client, ensuring compliance with applicable laws and prevailing industry standards in all material aspects.",
          },
          {
            title: "3. Payment Terms",
            content: "As compensation for the services rendered, the Client agrees to pay ZyinexWeb a service fee equal to the total system cost specified in the formal proposal shared with the Client. If there are substantial changes to the project scope or requirements after the agreement has been executed, the service fee may be adjusted through mutual negotiation between both parties.",
          },
          {
            title: "4. Client Responsibilities",
            content: "The Client agrees to provide all necessary information and support reasonably required by ZyinexWeb in a timely manner. Timely completion of third-party services, where required, also falls under the Client’s responsibility. Additionally, the Client is responsible for:",
            list: [
              "Registering the website’s domain name,",
              "Selecting a web hosting provider and covering related fees,",
              "Managing any other external services or expenses connected to the project.",
            ]
          },
          {
            title: "5. Approvals & Modifications",
            content: "ZyinexWeb follows a structured methodology for system design and development, with client feedback being integral at each project stage. Client approvals will be requested at various milestones. If the Client fails to respond to feedback requests or queries within 10 calendar days, ZyinexWeb may place the project on hold and reassign the development team to other internal projects. Resuming the project may involve an updated quote and revised timeline. Any changes to previously approved elements that result in rework may incur additional charges.",
          },
          {
            title: "6. Termination",
            content: "Either party may terminate this agreement by providing written notice under the following circumstances:",
            list: [
              "If the other party breaches any material terms of this agreement and fails to remedy the breach within 10 business days of receiving written notice,",
              "If the other party is unable to pay debts as they become due."
            ]
          },
          {
            title: "7. Intellectual Property & Ownership",
            content: `The Client guarantees that all materials (e.g., text, graphics, trademarks, images, and logos) provided to ZyinexWeb are either owned by the Client or the Client has permission to use them. The Client agrees to indemnify and hold ZyinexWeb and its subcontractors harmless against any claims or disputes related to these materials. Upon successful completion of the project and full payment, the Client will be granted complete ownership rights of the final product, including design, graphics, and textual content. However, ownership of source code, images, development files, and backend programming remains with ZyinexWeb until all outstanding payments are settled in full. ZyinexWeb reserves the right to showcase portions of the project in its portfolio.`
          },
          {
            title: "8. Non-Disclosure Agreement (NDA)",
            content: "ZyinexWeb respects the confidentiality of the Client’s concepts and ideas. The company upholds ethical standards to ensure all sensitive and proprietary information received from the Client is protected. A formal NDA can be provided upon request to further safeguard confidential data and project-related information."
          },
          {
            title: "9. Liability & Dispute Reimbursement",
            content: "ZyinexWeb shall not be held liable for any financial, reputational, or data-related losses resulting from the development or use of the software, website, or application. Any damages, disputes, or claims arising during the course of development shall not be subject to reimbursement by ZyinexWeb."
          },
          {
            title: "10. Change Requests",
            content: "Any request for changes in scope, design, or functionality during or after project execution must be submitted in writing or via email. Such changes may be treated as a new phase of work and charged separately. ZyinexWeb makes no guarantee that the original timeline will remain intact following change requests."
          },
          {
            title: "11. Disclaimer & Limitation of Liability",
            content: "ZyinexWeb does not guarantee that the delivered system or website will be error-free or meet all client expectations. All software is provided “as-is,” and the Client assumes full responsibility for its usage and performance. ZyinexWeb shall not be liable for any indirect, incidental, or consequential damages, including but not limited to loss of profits, savings, or data, even if the company has been advised of such risks. If any clause of this agreement is found unenforceable, the remaining clauses shall remain in full force and effect."
          },
          {
            title: "12. Governing Law",
            content: "This agreement shall be governed by and construed in accordance with the laws of the Government of Gujarat, India. Any legal matters arising under this agreement shall be subject to the jurisdiction of the courts located in Gujarat."
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
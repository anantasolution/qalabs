import React, { useEffect, useState } from "react";

const logos = [
  "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_6.png",
  "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_7.png",
  "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_5.png",
  "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_8.png",
  "https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/logo_3.png",
];

const CompanySlider = () => {
  const [logoList, setLogoList] = useState(logos);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeout(() => {
        setLogoList((prevlogos) => {
          const firstLogo = prevlogos[0]; // Get first logo
          return [...prevlogos.slice(1), firstLogo]; // Move it to the end
        });
      }, 2000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <hr
        style={{
          border: "1px solid",
          color: "#f8f8f8",
          width: "100%",
          opacity: "0.5",
        }}
      />
      <div className="overflow-hidden bg-[#151515] py-4 my-4 ">
        <div
          className={`flex transition-transform duration-500 ease-in-out justify-center items-center`}
        >
          {logoList.map((logo, index) => (
            <img
              key={index}
              src={logo}
              className="h-10 mx-4 brightness-0 invert"
              alt={`Logo ${index}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};


export default CompanySlider
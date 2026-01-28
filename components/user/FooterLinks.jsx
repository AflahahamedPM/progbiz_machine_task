import React from "react";

const FooterLinks = ({ data }) => {
  return (
    <div className="flex gap-24">
      {data?.map((section) => (
        <div key={section?.title} className="flex flex-col gap-3">
          <h3 className="text-[#1F221E] font-semibold">{section?.title}</h3>
          <ul className="flex flex-col gap-2 text-sm text-[#777E90]">
            {section?.links.map((link) => (
              <li
                key={link}
                className="hover:text-black cursor-pointer transition"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterLinks;

import React from "react";

const FooterBottom = ({icons}) => {
  return (
    <div className="flex justify-between items-center pt-6">
      <p className="text-sm text-[#777E90]">© Copyright Reppoo</p>

      <div className="flex gap-4">
        {icons.map(({ Icon }, idx) => (
          <div
            key={idx}
            className="p-2 border rounded-full hover:bg-gray-100 cursor-pointer transition"
          >
            <Icon size={18} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterBottom
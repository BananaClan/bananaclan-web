import React, { useState } from "react";
import { faqData } from "../../services/products";

const FAQItem = ({ question, answer, isOpen, toggleOpen }) => (
  <div className="border-b border-gray-200 py-4">
    <button
      className="flex justify-between items-center w-full text-left"
      onClick={toggleOpen}
    >
      <span className="font-futuraCondensed  block -mb-1 text-[32px]">
        {question}
      </span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transform transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      >
        <path
          d="M4 4L12 12M12 12H6M12 12V6"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
    <div
      className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <p className="font-medium font-satoshi text-xl pl-12">{answer}</p>
    </div>
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="w-full flex justify-center px-6 mt-[72px]">
      <div className="w-full max-w-[1320px] py-20">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* Left column: "Still confused?" section */}
          <div className="md:w-1/5">
            <h2 className="font-helvetica text-[40px] font-normal leading-[46px] mb-2">
              Still confused?
            </h2>
            <p className="font-satoshi text-xl font-medium mb-4">
              Lorem ipsum dolor sit amet consectetur.If you still have anything
              to know, write to us directly
            </p>
            <button className="flex items-center justify-center text-lg leading-6 font-normal px-5 py-2 font-satoshi gap-2 w-[182px] h-[43px] bg-white text-black border border-black rounded-[32px] hover:bg-gray-100 transition-colors duration-500">
              SENT EMAIL
              <img
                src="/assets/icons/gmailicon.png"
                alt="Gmail icon"
                className="w-6 h-6 p-[2px_2px_4px_2px] mr-2"
              />{" "}
            </button>
          </div>

          {/* Right column: FAQ items */}
          <div className="md:w-2/3">
            {faqData.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={index === openIndex}
                toggleOpen={() =>
                  setOpenIndex(index === openIndex ? -1 : index)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;

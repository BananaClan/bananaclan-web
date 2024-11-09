import React, { useState } from "react";

const FAQItem = ({ question, answer, isOpen, toggleOpen }) => (
  <div className="border-b border-gray-200 py-4">
    <button
      className="flex justify-between items-center w-full text-left"
      onClick={toggleOpen}
    >
      <span className="font-semibold">{question}</span>
      <span
        className={`text-xl transform transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      >
        ▼
      </span>
    </button>
    <div
      className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <p className="text-gray-600">{answer}</p>
    </div>
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqData = [
    {
      question: "WHAT IS FIRST COPY SNEAKERS?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Fermentum vitae posuere massa elementum quis. Sit in arcu fermentum ut.Lorem ipsum dolor sit amet consectetur. Fermentum vitae posuere massa elementum quis. Sit in arcu fermentum ut.",
    },
    {
      question: "HOW IS FIRST COPY SNEAKERS DIFFERENT FROM THE OG ONE?",
      answer: "Answer for question 2...",
    },
    {
      question: "HOW WILL YOU BUYING FIRST COPY PRODUCTS AFFECT THE COMPANY?",
      answer: "Answer for question 3...",
    },
    {
      question: "WHY SHOULD YOU TRUST US?",
      answer: "Answer for question 4...",
    },
  ];

  return (
    <div className="w-full flex justify-center px-6">
      <div className="w-full max-w-[1320px] py-20">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* Left column: "Still confused?" section */}
          <div className="md:w-1/5">
            <h2 className="text-2xl font-bold mb-2">Still confused?</h2>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet consectetur.If you still have anything
              to know, write to us directly
            </p>
            <button className="flex items-center px-4 py-2 bg-white text-black border border-black rounded-full hover:bg-gray-100 transition-colors duration-500">
              <span className="mr-2">✉️</span>
              SENT EMAIL
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

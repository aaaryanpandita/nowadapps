"use client";
import React from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How accurate are the AI predictions?",
    answer:
      "Our AI models are designed for institutional-grade accuracy. While no prediction is 100% guaranteed, our algorithms process significantly more data than manual analysis could handle.",
  },
  {
    question: "What's the minimum to get started?",
    answer:
      "Just 0.00065 BNB to claim your airdrop tokens. That's it. Your tokens auto-stake and give you immediate platform access.",
  },
  {
    question: "Is this another pump-and-dump project?",
    answer:
      "No. 77.5% of tokens go to the community, not founders. Our success depends on your success, creating long-term alignment.",
  },
  {
    question: "Do I need DeFi experience?",
    answer:
      "Absolutely not. If you can stake a token, you can use NOWA. We've eliminated the complexity that keeps most people out of DeFi.",
  },
  {
    question: "When does the airdrop end?",
    answer:
      "Phase 1 starts September 5th. Each phase has limited allocation, so early participation is recommended.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full flex justify-center items-center mt-24 min-h-screen bg-brand-background">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        {/* Centered FAQ Title */}
        <div className="flex items-center justify-center w-full mb-15">
          <h2 className="text-4xl md:text-5xl font-bold text-white">FAQs</h2>
        </div>
        
        {/* Community Description */}
        <div className="text-center mb-12">
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            **"Questions? We've Got Answers."**
          </p>
        </div>

        {/* Follow Us Section */}
        
        
        {/* FAQ Items */}
        <div className="w-full divide-y divide-white/10 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-white/10">
          {faqs?.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div className="p-6" key={idx}>
                <button 
                  onClick={() => toggleFAQ(idx)}
                  className="group flex w-full items-center justify-between hover:bg-white/5 rounded-lg p-4 transition-colors duration-200"
                >
                  <span className="text-lg font-medium text-white group-hover:text-white/90 text-left pr-4">
                    {item?.question}
                  </span>
                  <ChevronDown 
                    className={`size-6 text-white/60 group-hover:text-white/80 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isOpen 
                      ? 'max-h-96 opacity-100 mt-4' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-4 pb-2 text-base leading-relaxed text-white/80">
                    {item?.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Bottom spacing */}
        <div className="mt-16"></div>
      </div>
    </div>
  );
};

export default FAQSection;
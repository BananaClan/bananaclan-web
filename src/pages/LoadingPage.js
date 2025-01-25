import React, { useState, useEffect } from "react";
import AnimatedLogo from "../components/common/AnimatedLogo";
import { motion } from "framer-motion";

const LoadingPage = ({ onLoadingComplete }) => {
  const [shouldSlide, setShouldSlide] = useState(false);

  useEffect(() => {
    // Wait for logo animation to complete
    const slideTimer = setTimeout(() => {
      setShouldSlide(true);
    }, 3500); // Adjust this duration based on your SVG animation duration

    return () => clearTimeout(slideTimer);
  }, []);

  const slideBackground = {
    initial: {
      transform: "translateY(0%)",
    },
    animate: {
      transform: "translateY(100%)",
      transition: {
        duration: 1.5,
        ease: [0.87, 0, 0.13, 1],
      },
    },
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Logo container - stays fixed */}
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="transform scale-[2.5]">
          <AnimatedLogo />
        </div>
      </div>

      {/* Sliding white background */}
      <motion.div
        className="fixed inset-0 bg-white z-99"
        initial="initial"
        animate={shouldSlide ? "animate" : "initial"}
        variants={slideBackground}
        onAnimationComplete={() => {
          if (shouldSlide) {
            document.body.classList.remove("overflow-hidden");
            onLoadingComplete();
          }
        }}
        onAnimationStart={() => {
          document.body.classList.add("overflow-hidden");
        }}
      />
    </div>
  );
};

export default LoadingPage;

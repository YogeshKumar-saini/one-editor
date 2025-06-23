"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

type TextAnimationHeadingProps = {
  className?: string;
  classNameAnimationContainer?: string;
};

const TextAnimationHeading = ({
  className,
  classNameAnimationContainer,
}: TextAnimationHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className={cn("text-center flex flex-col items-center gap-5", className)}
    >
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
        Build Space
      </h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className={cn("text-xl md:text-2xl font-medium text-muted-foreground", classNameAnimationContainer)}
      >
        <TypeAnimation
          sequence={["Your Team.", 1500, "Your Ideas.", 1500, "One Editor.", 1500]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </motion.div>
    </motion.div>
  );
};

export default TextAnimationHeading;

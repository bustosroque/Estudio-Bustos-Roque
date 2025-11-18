"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Scale,
  Heart,
  Pill,
  Stethoscope,
  Shield,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const icons = [
  { Icon: Scale, delay: 0 },
  { Icon: Heart, delay: 0.5 },
  { Icon: Pill, delay: 1 },
  { Icon: Stethoscope, delay: 1.5 },
  { Icon: Shield, delay: 2 },
  { Icon: FileText, delay: 2.5 },
  { Icon: CheckCircle, delay: 3 },
  { Icon: AlertCircle, delay: 3.5 },
];

export function AnimatedBackground() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map(({ Icon, delay }, index) => {
        const initialX = Math.random() * dimensions.width;
        const initialY = Math.random() * dimensions.height;
        return (
          <motion.div
            key={index}
            className="absolute"
            initial={{
              x: initialX,
              y: initialY,
              opacity: 0.05,
              scale: 0.5,
            }}
            animate={{
              y: [
                initialY,
                Math.random() * dimensions.height,
                Math.random() * dimensions.height,
              ],
              x: [
                initialX,
                Math.random() * dimensions.width,
                Math.random() * dimensions.width,
              ],
              rotate: [0, 360],
              opacity: [0.05, 0.15, 0.05],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut",
            }}
          >
            <Icon className="w-12 h-12 md:w-16 md:h-16 text-yellow-500/10" />
          </motion.div>
        );
      })}
    </div>
  );
}


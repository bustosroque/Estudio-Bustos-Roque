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
  const [mounted, setMounted] = useState(false);
  const [positions, setPositions] = useState<Array<{ initialX: number; initialY: number; animateY: number[]; animateX: number[]; duration: number }>>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // Generar posiciones determinísticas solo en el cliente
      const newPositions = icons.map((_, index) => {
        // Usar un seed basado en el índice para valores determinísticos pero variados
        const seed = index * 123.456;
        const random1 = (Math.sin(seed) * 10000) % 1;
        const random2 = (Math.sin(seed * 2) * 10000) % 1;
        const random3 = (Math.sin(seed * 3) * 10000) % 1;
        const random4 = (Math.sin(seed * 4) * 10000) % 1;
        const random5 = (Math.sin(seed * 5) * 10000) % 1;
        
        return {
          initialX: Math.abs(random1) * window.innerWidth,
          initialY: Math.abs(random2) * window.innerHeight,
          animateY: [
            Math.abs(random2) * window.innerHeight,
            Math.abs(random3) * window.innerHeight,
            Math.abs(random4) * window.innerHeight,
          ],
          animateX: [
            Math.abs(random1) * window.innerWidth,
            Math.abs(random4) * window.innerWidth,
            Math.abs(random5) * window.innerWidth,
          ],
          duration: 20 + Math.abs(random1) * 10,
        };
      });

      setPositions(newPositions);
      setMounted(true);

      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        
        // Regenerar posiciones al cambiar el tamaño
        const updatedPositions = icons.map((_, index) => {
          const seed = index * 123.456;
          const random1 = (Math.sin(seed) * 10000) % 1;
          const random2 = (Math.sin(seed * 2) * 10000) % 1;
          const random3 = (Math.sin(seed * 3) * 10000) % 1;
          const random4 = (Math.sin(seed * 4) * 10000) % 1;
          const random5 = (Math.sin(seed * 5) * 10000) % 1;
          
          return {
            initialX: Math.abs(random1) * window.innerWidth,
            initialY: Math.abs(random2) * window.innerHeight,
            animateY: [
              Math.abs(random2) * window.innerHeight,
              Math.abs(random3) * window.innerHeight,
              Math.abs(random4) * window.innerHeight,
            ],
            animateX: [
              Math.abs(random1) * window.innerWidth,
              Math.abs(random4) * window.innerWidth,
              Math.abs(random5) * window.innerWidth,
            ],
            duration: 20 + Math.abs(random1) * 10,
          };
        });
        setPositions(updatedPositions);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // No renderizar hasta que esté montado en el cliente
  if (!mounted || positions.length === 0) {
    return <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" />;
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map(({ Icon, delay }, index) => {
        const pos = positions[index];
        return (
          <motion.div
            key={index}
            className="absolute"
            initial={{
              x: pos.initialX,
              y: pos.initialY,
              opacity: 0.05,
              scale: 0.5,
            }}
            animate={{
              y: pos.animateY,
              x: pos.animateX,
              rotate: [0, 360],
              opacity: [0.05, 0.15, 0.05],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: pos.duration,
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


"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Newspaper,
  Shield,
  FileCheck,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function SharedHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigationLinks = [
    { name: "Inicio", href: "/", icon: Home },
    { name: "Noticias", href: "/noticias", icon: Newspaper },
    { name: "Obras Sociales", href: "/obrasociales", icon: Shield },
    {
      name: "Reclamos de Obra Social",
      href: "/obrasociales-leads",
      icon: FileCheck,
    },
    {
      name: "Pensión Discapacidad",
      href: "/pension-discapacidad",
      icon: Scale,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#153F35]/90 border-b border-white/10 shadow-lg">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-600/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                <Image
                  src="/images/logo-transparente.png"
                  alt="Estudio Jurídico Bustos & Roque"
                  width={50}
                  height={50}
                  className="brightness-110 relative z-10"
                />
              </div>
              <span className="font-serif font-bold text-lg text-yellow-600 hidden sm:inline group-hover:text-yellow-500 transition-colors">
                Bustos & Roque
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            {navigationLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    href={link.href}
                    className={`
                      relative flex items-center space-x-2 px-4 py-2 rounded-lg
                      transition-all duration-300 text-sm lg:text-base font-medium
                      ${
                        isActive
                          ? "text-yellow-600 bg-yellow-600/10 border border-yellow-600/30"
                          : "text-white/80 hover:text-yellow-600 hover:bg-white/5"
                      }
                    `}
                  >
                    <Icon
                      className={`h-4 w-4 ${
                        isActive ? "text-yellow-600" : "text-white/60"
                      }`}
                    />
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-600 rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.div
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white/80 hover:text-yellow-600 hover:bg-white/10 rounded-lg"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden backdrop-blur-xl bg-[#153F35]/95 border-t border-white/10 shadow-xl"
          >
            <div className="px-4 py-4 space-y-2">
              {navigationLinks.map((link, index) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        flex items-center space-x-3 px-4 py-3 rounded-lg
                        transition-all duration-300 text-base font-medium
                        ${
                          isActive
                            ? "text-yellow-600 bg-yellow-600/10 border border-yellow-600/30"
                            : "text-white/80 hover:text-yellow-600 hover:bg-white/10"
                        }
                      `}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          isActive ? "text-yellow-600" : "text-white/60"
                        }`}
                      />
                      <span>{link.name}</span>
                      {isActive && (
                        <motion.div
                          className="ml-auto h-2 w-2 bg-yellow-600 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}


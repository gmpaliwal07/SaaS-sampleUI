"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };



  const sections = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "how-it-works", label: "How It Works" },
    { id: "use-cases", label: "Use Cases" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="sticky m-4 top-0 z-50 font-primary backdrop-blur-md bg-white/60 border-b border-gray-200 rounded-full shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="text-2xl font-bold text-black font-title">
              EvalPro
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {sections.map((section) => (
                <Button
                  variant={"link"}
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {section.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-orange-600 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Sign In
            </button>
            <button
  
              className="bg-[#FE7743]  text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#212121] transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-orange-500 inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-4 py-4 space-y-1 bg-white/60 backdrop-blur-md border-t border-gray-200 shadow-md">
            {sections.map((section) => (
              <Button
                variant={"link"}
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="w-full text-left text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                {section.label}
              </Button>
            ))}
            <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
              <Button className="text-gray-300 px-3 py-2 rounded-full text-base font-medium">
                Sign In
              </Button>
              <Button
        
                className="bg-[#FE7743] text-white px-4 py-2 rounded-full text-base font-medium hover:bg-[#212121] transition-colors"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>            
      )}
    </nav>
  );
};

export default Navbar;

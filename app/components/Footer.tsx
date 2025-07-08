import React from 'react';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';
const links = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

const contactItems = [
  {
    icon: <Mail className="h-4 w-4 text-gray-400" />,
    text: "support@evalpro.com",
  },
  {
    icon: <Phone className="h-4 w-4 text-gray-400" />,
    text: "+1 (555) 123-4567",
  },
  {
    icon: <MapPin className="h-4 w-4 text-gray-400" />,
    text: (
      <>
        123 Innovation Drive<br />
        Tech City, TC 12345
      </>
    ),
  },
];
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2D4F2B] mx-8 rounded-t-2xl text-white font-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-white font-title">EvalPro</div>
            <p className="text-gray-400 text-sm font-title">
              Streamlining evaluation processes for educational institutions, HR departments, and training centers worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
  <h3 className="text-lg font-semibold text-white">Quick Links</h3>
  <ul className="space-y-2">
    {[
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Use Cases', href: '#use-cases' },
      { label: 'Contact Us', href: '#contact' },
    ].map((link) => (
      <li key={link.href}>
        <a
          href={link.href}
          className="text-gray-400 hover:text-white transition-colors text-sm"
        >
          {link.label}
        </a>
      </li>
    ))}
  </ul>
</div>


<div className="space-y-4">
  <h3 className="text-lg font-semibold text-white">Support</h3>
  <ul className="space-y-2">
    {[
      { label: 'Help Center', href: '#' },
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'System Status', href: '#' },
    ].map((item) => (
      <li key={item.label}>
        <a
          href={item.href}
          className="text-gray-400 hover:text-white transition-colors text-sm"
        >
          {item.label}
        </a>
      </li>
    ))}
  </ul>
</div>


          {/* Contact Info */}
          <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Contact Info</h3>
      <div className="space-y-3">
        {contactItems.map((item, index) => (
          <div key={index} className="flex items-start space-x-3">
            {item.icon}
            <span className="text-gray-400 text-sm">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 mt-12">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-gray-400 text-sm">
          © {currentYear} EvalPro. All rights reserved.
        </div>
        <div className="flex space-x-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
      </div>
    </footer>
  );
};

export default Footer;
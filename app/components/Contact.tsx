"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      organization: "",
      message: "",
    });
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 font-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-start mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-3 font-title">
            Get in Touch
          </h2>
          <p className="text-sm text-gray-600 max-w-3xl ">
            Have questions about our evaluation management system? We&apos;d
            love to hear from you and help you get started.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
                <h3 className="text-2xl mb-4 font-title" >
                <span className="text-orange-600 font-bold">Let&apos;s </span>
                <span className="text-gray-900 font-bold">Start a Conversation</span>
                </h3>
              <p className="text-gray-600 mb-8 text-sm font-second">
                Whether you&apos;re an educational institution, HR department,
                or training center, we&apos;re here to help you streamline your
                evaluation process.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {[
                {
                  icon: <Mail className="h-6 w-6 text-orange-600" />,
                  title: "Email Us",
                  detail: "support@evalpro.com",
                },
                {
                  icon: <Phone className="h-6 w-6 text-orange-600" />,
                  title: "Call Us",
                  detail: "+1 (555) 123-4567",
                },
                {
                  icon: <MapPin className="h-6 w-6 text-orange-600" />,
                  title: "Visit Us",
                  detail: (
                    <>
                      123 Innovation Drive
                      <br />
                      Tech City, TC 12345
                    </>
                  ),
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="bg-white p-3 rounded-lg">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold text-[#212121] font-title ">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm font-second">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h4 className="font-medium text-orange-500 mb-4 font-title">
                Why Choose EvalPro?
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "24hrs", label: "Response Time" },
                  { value: "99.9%", label: "Customer Satisfaction" },
                  { value: "24/7", label: "Support Available" },
                  { value: "Free", label: "Trial Period" },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-thin text-[#212121] font-title">
                      {item.value}
                    </div>
                    <div className="text-sm text-gray-600 font-title">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg font-second">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-title ">
              <span className="text-orange-500">Send</span> us a Message
            </h3>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2 font-title"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border text-base font-second border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2 font-title"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 font-second border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label
                  htmlFor="organization"
                  className="block text-sm font-medium text-gray-700 mb-2 font-title"
                >
                  Organization
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1 border font-second border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your organization name"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2 font-title"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about your evaluation needs..."
                ></textarea>
              </div>

              <Button
                onClick={handleSubmit}
                className=" bg-orange-500 text-white py-3 px-6 rounded-full w-1/2 font-semibold hover:bg-[#212121] transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

import React from "react";
import { BookOpen, Target, Settings, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Subject Management",
      description:
        "Create and organize subjects like Cloud Computing, Data Structures, Networking, and Signal Processing with intuitive categorization system for easy navigation.",
      highlights: [
        "Easy subject creation",
        "Organized categorization",
        "Complete control over framework",
      ],
    },
    {
      icon: Target,
      title: "Competency-Based Scoring",
      description:
        "Define specific competencies within each subject and assign custom marks for each competency with flexible scoring system that adapts to your requirements.",
      highlights: [
        "Custom competency definitions",
        "Flexible 1-10 marking scale",
        "Adaptive scoring system",
      ],
    },
    {
      icon: Settings,
      title: "Smart Management Tools",
      description:
        "Edit competencies and subjects on-the-fly with bulk operations for efficient management and automatic cleanup when subjects are deleted.",
      highlights: ["Real-time editing", "Bulk operations", "Automatic cleanup"],
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "Built with enterprise-grade security and reliability standards to ensure your evaluation data is protected and always accessible.",
      highlights: [
        "Enterprise-grade security",
        "Reliable performance",
        "Data protection",
      ],
    },
  ];

  return (
    <div
      id="features"
      className="py-20 bg-white  font-primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* div Header */}
        <div className="text-start mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-title">
            Powerful Features for Modern Evaluation
          </h2>
          <p className="text-sm text-gray-600 max-w-3xl ">
            Everything you need to create, manage, and track competency-based
            assessments in one comprehensive platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-200">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-gray-50  p-8 h-full hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-gray-100 p-3 rounded-lg mr-4 group-hover:bg-[#21212125] transition-colors">
                    <feature.icon className="h-6 w-6 text-orange-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 font-title leading-tight tracking-tight">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-gray-500 text-sm mb-6 leading-relaxed font-primary">
                  {feature.description}
                </p>

                <ul className="space-y-2">
                  {feature.highlights.map((highlight, highlightIndex) => (
                    <li
                      key={highlightIndex}
                      className="flex items-center text-sm text-gray-700 font-primary"
                    >
                      <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center  font-primary">
          <div className="bg-gradient-to-r from-orange-400 to-orange-300 rounded-b-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4 font-title">
              Ready to Experience These Features?
            </h3>
            <p className="text-gray-100 font-semibold mb-6">
              Join thousands of educators and HR professionals who trust our
              platform
            </p>
            <Button className="bg-white cursor-pointer text-black font-title px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Start Your Free Trial
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;

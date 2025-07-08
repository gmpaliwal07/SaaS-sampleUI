import React from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
const HeroSection = () => {
 

 
  return (
    <div
      id="home"
      className="bg-gradient-to-br from-gray-50 to-violet-100 min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4 font-title leading-tight tracking-tighter">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Streamline Your
                <span className="text-orange-600"> Evaluation Process</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                A comprehensive evaluation management system designed for
                educators and interviewers to create, manage, and track
                competency-based assessments with ease.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-3">
              {[
                "Create subjects and competencies in minutes",
                "Assign custom marks for each competency",
                "Smart management with bulk operations",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant={"default"}
               className="bg-orange-600 group text-white px-16 py-5 rounded-full text-lg font-title font-semibold hover:bg-[#212121] transition-colors flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Get Started </span>
                <ArrowRight className="h-5 w-5 group-hover:rotate-90" />
              </Button>
              <Button
                variant={"default"}
                className="border-2 border-white text-gray-900 px-8 font-title cursor-pointer bg-transparent py-5 rounded-full text-lg font-semibold hover:bg-[#212121] hover:text-white transition-colors"
              >
                Schedule Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4 font-thin font-title">
                Trusted by educators and HR professionals
              </p>
              <div className="flex items-center space-x-6 text-gray-400 font-primary">
                {["Universities", "Corporate HR", "Training Centers"].map(
                  (item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <span className="text-xs">{item}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="lg:pl-8 font-primary">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 font-title">
                    Data Structures
                  </h3>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Active
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Arrays</p>
                      <p className="text-sm text-gray-600">
                        Basic data structure
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-black">7</p>
                      <p className="text-sm text-gray-500">marks</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">LinkedLists</p>
                      <p className="text-sm text-gray-600">
                        Dynamic data structure
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-black">8</p>
                      <p className="text-sm text-gray-500">marks</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Trees</p>
                      <p className="text-sm text-gray-600">
                        Hierarchical structure
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-black">9</p>
                      <p className="text-sm text-gray-500">marks</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

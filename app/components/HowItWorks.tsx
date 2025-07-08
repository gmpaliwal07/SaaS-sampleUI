import React from 'react';
import { Plus, Target, Play, Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getVisualContent } from '../lib/utils';

const HowItWorksSection = () => {
    
  const steps = [
    {
      number: "01",
      icon: Plus,
      title: "Create Subjects",
      description: "Set up your evaluation categories like Data Structures, Cloud Computing, or any custom subject relevant to your needs.",
      details: "Add subjects in seconds with our intuitive interface"
    },
    {
      number: "02",
      icon: Target,
      title: "Define Competencies",
      description: "Add specific skills and competencies under each subject and assign custom marks ranging from 1-10 for each competency.",
      details: "Flexible scoring system adapts to your requirements"
    },
    {
      number: "03",
      icon: Play,
      title: "Start Evaluating",
      description: "Begin using your custom evaluation framework immediately. The system is ready to use as soon as you've set up your subjects.",
      details: "No complex setup or training required"
    },
    {
      number: "04",
      icon: Settings,
      title: "Manage & Update",
      description: "Edit, update, or remove subjects and competencies as needed. The system automatically handles dependencies and cleanup.",
      details: "Smart management with automatic cleanup"
    }
  ];

  return (
    <div id="how-it-works" className="py-20 bg-gray-100 mx-8 mt-16 rounded-t-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* div Header */}
        <div className="text-start mb-16">
          <h2 className="text-4xl font-title leading-tight tracking-tight font-bold text-gray-900 ">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl ">
            Get started with our evaluation management system in four simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12">
  {steps.map((step, index) => (
    <div
      key={index}
      className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Content */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="bg-orange-400 text-white text-xl font-bold w-12 h-12 rounded-full flex items-center justify-center">
            {step.number}
          </div>
          <div className="bg-white p-3 rounded-lg">
            <step.icon className="h-6 w-6 text-black" />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 font-title leading-tight tracking-tight">{step.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 font-primary">{step.description}</p>
          <p className="text-orange-600 font-medium font-title">{step.details}</p>
        </div>
      </div>

      {/* Visual */}
      <div className="flex-1">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
          {getVisualContent(index)}
        </div>
      </div>
    </div>
  ))}
</div>


        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 font-title">
            Ready to Get Started?
          </h3>
          <p className="text-gray-600 mb-8 text-sm">
            Join thousands of educators and HR professionals who have streamlined their evaluation process
          </p>
          <Button  className="bg-orange-600 text-white px-6 py-4   text-lg font-title rounded-full font-semibold hover:bg-[#212121]  cursor-pointer transition-colors">
            Create Your First Subject
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
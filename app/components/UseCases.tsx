import React, {  } from 'react';
import { GraduationCap, Users, Building, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UseCasesSection = () => {
  const useCases = [
    {
      icon: GraduationCap,
      title: "Educational Institutions",
      description: "Streamline student assessments and standardize evaluation processes across different courses and departments.",
      benefits: [
        "Reduce evaluation setup time by 70%",
        "Standardize grading across departments",
        "Track student progress effectively"
      ],
      example: "Universities use our platform to evaluate students in Computer Science, Engineering, and Business courses with consistent marking criteria."
    },
    {
      icon: Users,
      title: "HR Departments",
      description: "Standardize technical interviews and candidate evaluations with consistent scoring frameworks.",
      benefits: [
        "Consistent interview scoring",
        "Fair candidate comparison",
        "Reduce hiring bias"
      ],
      example: "Tech companies evaluate candidates on programming skills, system design, and problem-solving abilities with predefined competency scores."
    },
    {
      icon: Building,
      title: "Training Centers",
      description: "Track skill development progress and assess training effectiveness with detailed competency mapping.",
      benefits: [
        "Monitor skill development",
        "Identify learning gaps",
        "Measure training ROI"
      ],
      example: "Coding bootcamps track student progress across different programming languages and frameworks with detailed competency assessments."
    },
    {
      icon: TrendingUp,
      title: "Corporate Teams",
      description: "Evaluate employee competencies for performance reviews, promotions, and skill development programs.",
      benefits: [
        "Objective performance reviews",
        "Identify skill gaps",
        "Plan career development"
      ],
      example: "Companies assess employees on technical skills, leadership abilities, and domain expertise for promotion and development planning."
    }
  ];

  return (
    <div id="use-cases" className="py-20 bg-gray-100 mx-8  rounded-b-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-start mb-16">
          <h2 className="text-4xl font-title leading-tight tracking-tight font-bold text-gray-900 mb-2">
            Perfect For Every Organization
          </h2>
          <p className="text-sm font-primary text-gray-600 max-w-3xl ">
            Our evaluation management system adapts to your specific needs, whether you&apsos;re in education, HR, training, or corporate development
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {useCases.map((useCase, index) => (
            <div key={index} className="group">
              <div className="bg-gray-50 rounded-2xl p-8 h-full hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-orange-100 p-4 rounded-xl mr-4 group-hover:bg-white transition-colors">
                    <useCase.icon className="h-8 w-8 text-orange-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 font-title">{useCase.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed text-sm font-primary">
                  {useCase.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-thin text-black  mb-3 font-title">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {useCase.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center font-primary text-sm text-gray-700">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-white-800 font-second">
                    <strong className='font-title tracking-relaxed '>Example:</strong> {useCase.example}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-orange-400 via-orange-300 to-orange-400 rounded-2xl p-8 sm:p-10 text-white">
  <div className="text-center mb-10">
    <h3 className="text-3xl font-bold mb-2 font-title">Trusted by Organizations Worldwide</h3>
    <p className="text-white text-lg font-second">See how our platform is making a difference</p>
  </div>

  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
    {[
      { value: '500+', label: 'Educational Institutions' },
      { value: '1000+', label: 'HR Departments' },
      { value: '70%', label: 'Time Saved' },
      { value: '99.9%', label: 'Uptime' },
    ].map((stat, index) => (
      <div key={index} className="text-center">
        <div className="text-4xl font-extrabold mb-2 font-title">{stat.value}</div>
        <div className="text-white text-sm sm:text-base font-title">{stat.label}</div>
      </div>
    ))}
  </div>
</div>

        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 font-primary">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 font-title">
            Which Use Case Fits Your Needs?
          </h3>
          <p className="text-gray-600 mb-8 text-sm">
            Get started with a solution tailored to your organization
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-orange-600 font-title  text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors">
              Schedule a Demo
            </Button>
            <Button variant={"outline"} className="border-2 border-white-600 text-black px-8 py-3 font-title  font-semibold hover:bg-[#212121] rounded-full hover:text-white transition-colors">
              Start Free Trial
            </Button>
          </div>
        </div>
    </div>
    
  );
};

export default UseCasesSection;
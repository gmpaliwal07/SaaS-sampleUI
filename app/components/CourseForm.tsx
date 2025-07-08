'use client';

import { useState } from 'react';
import { Plus, BookOpen, Hash } from 'lucide-react';
import EventLogger from './EventLogger';
import api from '../lib/api';
import Course from '@/app/types';
import { Button } from '@/components/ui/button';

interface CourseFormProps {
  onCourseAdded: (course: Course) => void;
}

export default function CourseForm({ onCourseAdded }: CourseFormProps) {
  const [title, setTitle] = useState('');
  const [credits, setCredits] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate credits range
    const creditsNum = parseInt(credits);
    if (creditsNum < 0 || creditsNum > 10) {
      console.error('Credits must be between 0 and 10');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await api.post<Course>('/courses', { title, credits: creditsNum });
      onCourseAdded(response.data);
      setTitle('');
      setCredits('');
      EventLogger.logEvent('course_created', { title });
    } catch (error) {
      console.error('Error creating course:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-6 font-primary">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 mr-4 bg-orange-50 rounded-lg flex items-center justify-center">
          <Plus className="w-4 h-4 text-orange-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 font-title">Add New Subject</h2>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Subject Title Input */}
          <div>
            <label htmlFor="subject-title" className="block text-sm font-second font-medium text-gray-700 mb-2">
              Subject Title
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none font-second">
                <BookOpen className="h-4 w-4 text-[#2D4F2B]" />
              </div>
              <input
                id="subject-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Cloud Computing, Data Structures"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-400 text-sm"
                required
                aria-label="Subject Title"
              />
            </div>
          </div>

          {/* Max Credits Input */}
          <div>
            <label htmlFor="max-credits" className="block text-sm font-medium text-gray-700 mb-2">
              Max Credits
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Hash className="h-4 w-4 text-[#2D4F2B]" />
              </div>
              <input
                id="max-credits"
                type="number"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                placeholder="10"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-400 text-sm"
                min={0}
                max={10}
                required
                aria-label="Max Credits"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <Button
            onClick={handleSubmit}
            type="submit"
            disabled={isSubmitting || !title.trim() || !credits || parseInt(credits) < 0 || parseInt(credits) > 10}
            className="bg-orange-500 hover:bg-[#212121] font-title font-semibold disabled:bg-orange-400 text-white px-5 py-2 rounded-full text-sm transition-colors duration-200 flex items-center disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            <span>{isSubmitting ? 'Adding Subject...' : 'Add Subject'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
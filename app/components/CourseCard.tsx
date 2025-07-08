'use client';

import { useState } from 'react';
import { BookOpen, Trash2, Settings } from 'lucide-react';
import CompetencyModal from './CompetencyModal';
import Course, { Competency } from '@/app/types';
import EventLogger from '@/app/components/EventLogger';
import api from '@/app/lib/api';
import { Button } from '@/components/ui/button';

interface CourseCardProps {
  course: Course;
  competencies?: Competency[];
  onUpdate: () => void;
  onDelete: (courseTitle: string) => void;
}

export default function CourseCard({ course, onUpdate }: CourseCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleDelete = async () => {
    if (confirm(`Delete ${course.title}?`)) {
      setIsDeleting(true);
      try {
        await api.delete(`/courses/${course.id}`);
        onUpdate();
        EventLogger.logEvent('course_deleted', { id: course.id });
      } catch (error) {
        console.error('Error deleting course:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors duration-200 font-primary">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#708A58]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 font-title">{course.title}</h3>
              <p className="text-sm text-gray-600 font-second">Subject for evaluation</p>
            </div>
          </div>
          
          <div className="relative">
            {showActions && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowActions(false)}
                />
                <div className="absolute right-0 top-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20 min-w-[160px]">
                  <Button
                    onClick={() => {
                      setIsModalOpen(true);
                      setShowActions(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Manage Competencies</span>
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleDelete();
                      setShowActions(false);
                    }}
                    disabled={isDeleting}
                    className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{isDeleting ? 'Deleting...' : 'Delete Subject'}</span>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Metrics */}
        <div className="mb-6">
          <div className="flex items-center justify-between py-3 px-4 bg-teal-50 rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#212121]">{course.credits}</p>
              <p className="text-xs text-gray-700 uppercase tracking-wide">Credits</p>
            </div>
            <div className="h-8 w-px bg-[#708A58]"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{course.competencies?.length || 0}</p>
              <p className="text-xs text-gray-700 uppercase tracking-wide">Competencies</p>
            </div>
          </div>
        </div>

        {/* Competencies List */}
        <div className="mb-4">

          {(course.competencies || []).length > 0 ? (
            <ul className="list-disc  pl-5 text-sm text-gray-700 font-title">
              {course.competencies?.map((comp) => (
                <li key={comp.id} className="py-1">
                  {comp.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600 font-title">No competencies assigned</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-15">
          <Button
          variant={"outline"}
            onClick={() => setIsModalOpen(true)}
            className="hover:bg-orange-500  group hover:border-orange-600 hover:border-2 text-white py-2.5 px-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center justify-around space-x-2"
            aria-label={`Manage competencies for ${course.title}`}
          >
            <Settings className="w-4 h-4 text-orange-600 group-hover:text-white" />
            <span className='font-title font-semibold text-gray-600 group-hover:text-white '>Manage Competencies</span>
          </Button>

          <Button
          variant={"destructive"}
            onClick={handleDelete}
            disabled={isDeleting}
            className=" hover:text-red-600 font-semibold font-title cursor-pointer bg-gray-50 hover:bg-gray-50 rounded-full text-gray-700 border border-gray-300 py-2.5 px-4  text-sm transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
            aria-label={`Delete ${course.title}`}
          >
            <Trash2 className="w-4 h-4" />
            <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
          </Button>
        </div>
      </div>
      <CompetencyModal
        courseId={course.id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={onUpdate}
      />
    </>
  );
}
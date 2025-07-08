'use client';

import { useState, useEffect, useRef } from 'react';
import { BookOpen, Trash2, Loader2, Settings } from 'lucide-react';
import EventLogger from '@/app/components/EventLogger';
import api from '@/app/lib/api';
import Course from '@/app/types';
import CompetencyModal from './CompetencyModal'; // Import the modal component

interface ListViewProps {
  onUpdate: () => void;
}

export default function ListView({ onUpdate }: ListViewProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null); // State to control expanded view
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null); // State to control modal

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get<Course[]>('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete course?')) {
      setDeletingId(id);
      try {
        await api.delete(`/courses/${id}`);
        fetchCourses();
        onUpdate();
        EventLogger.logEvent('course_deleted', { id });
      } catch (error) {
        console.error('Error deleting course:', error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleCardClick = (id: number, e: React.MouseEvent) => {
    // Prevent toggle if clicking the Delete or Manage Competency button
    if ((e.target as HTMLElement).closest('button')) return;
    setExpandedCardId(expandedCardId === id ? null : id); // Toggle expanded view
  };

  const handleManageCompetencies = (id: number) => {
    setSelectedCourseId(id); // Open modal for the selected course
  };

  const closeModal = () => {
    setSelectedCourseId(null); // Close modal
  };

  // Close expanded view when clicking outside
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpandedCardId(null);
        setSelectedCourseId(null); // Close modal on outside click too
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading subjects...</span>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No subjects found</h3>
        <p className="text-gray-500">Add your first subject to get started with evaluations.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden" ref={containerRef}>
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900 font-title">All Subjects</h3>
        <p className="text-sm text-gray-500 mt-1 font-second">{courses.length} subjects available</p>
      </div>
      
      <div className="divide-y divide-gray-200 font-title">
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
            onClick={(e) => handleCardClick(course.id, e)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#708A58]" />
                </div>
                <div>
                  <h4 className="text-base font-medium text-gray-900">{course.title}</h4>
                  <p className="text-sm text-gray-500">Credits: {course.credits}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleManageCompetencies(course.id)}
                  className="inline-flex items-center space-x-2 px-3 py-2 text-sm font-medium text-[#708A58] hover:text-[#2D4F2B] hover:bg-orange-50 rounded-md transition-colors duration-150"
                  aria-label={`Manage competencies for ${course.title}`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Manage Competency</span>
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  disabled={deletingId === course.id}
                  className="inline-flex items-center space-x-2 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={`Delete ${course.title}`}
                >
                  {deletingId === course.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  <span>{deletingId === course.id ? 'Deleting...' : 'Delete'}</span>
                </button>
              </div>
            </div>
            {expandedCardId === course.id && (
              <div className="mt-4 bg-white rounded-md shadow-lg border border-gray-200 py-1 w-full">
                {course.competencies && course.competencies.length > 0 ? (
                  course.competencies.map((comp) => (
                    <div
                      key={comp.id}
                      className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {comp.name} ({comp.marks})
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500">No competencies</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Competency Modal */}
      <CompetencyModal
        courseId={selectedCourseId || 0} // Default to 0 if null, though modal won't open
        isOpen={selectedCourseId !== null}
        onClose={closeModal}
        onUpdate={onUpdate}
      />
    </div>
  );
}
'use client';

import { useState, useEffect, useRef } from 'react';
import { BookOpen, Trash2, Loader2, Settings } from 'lucide-react';
import EventLogger from '@/app/components/EventLogger';
import api from '../lib/api';
import Course from '@/app/types';
import CompetencyModal from './CompetencyModal'; // Import the modal component

interface TableViewProps {
  onUpdate: () => void;
}

export default function TableView({ onUpdate }: TableViewProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null); // State to control expanded view
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

  const handleRowClick = (id: number, e: React.MouseEvent) => {
    // Prevent toggle if clicking the Delete or Manage Competency button
    if ((e.target as HTMLElement).closest('button')) return;
    setExpandedRowId(expandedRowId === id ? null : id); // Toggle expanded view
  };

  const handleManageCompetencies = (id: number) => {
    setSelectedCourseId(id); // Open modal for the selected course
  };

  const closeModal = () => {
    setSelectedCourseId(null); // Close modal
  };

  // Close expanded view and modal when clicking outside
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpandedRowId(null);
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
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900 font-title">Subject Overview</h3>
        <p className="text-sm text-gray-500 mt-1 font-second">{courses.length} subjects in total</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 font-title">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Max Credits
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Competencies
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 font-title">
            {courses.map((course) => (
              <>
                <tr 
                  key={course.id} 
                  className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                  onClick={(e) => handleRowClick(course.id, e)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                        <BookOpen className="w-5 h-5 text-[#708A58]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{course.title}</div>
                        <div className="text-sm text-gray-500">Subject for evaluation</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{course.credits}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{course.competencies?.length || 0}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
                      className="inline-flex items-center space-x-2 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed ml-2"
                      aria-label={`Delete ${course.title}`}
                    >
                      {deletingId === course.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                      <span>{deletingId === course.id ? 'Deleting...' : 'Delete'}</span>
                    </button>
                  </td>
                </tr>
                {expandedRowId === course.id && (
                  <tr>
                    <td colSpan={4} className="bg-white border-t border-gray-200">
                      <div className="px-6 py-2">
                        <div className="bg-white rounded-md shadow-lg border border-gray-200 py-1 w-full">
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
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
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
'use client';

import { useState, useEffect } from 'react';
import { Competency } from '../types';
import EventLogger from '@/app/components/EventLogger';
import api from '../lib/api';
import { Button } from '@/components/ui/button';
import {   Pencil, Plus, Trash2 } from 'lucide-react';

interface CompetencyModalProps {
  courseId: number;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export default function CompetencyModal({ courseId, isOpen, onClose, onUpdate }: CompetencyModalProps) {
  const [competencies, setCompetencies] = useState<Competency[]>([]);
  const [newCompetency, setNewCompetency] = useState({ name: '', marks: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [courseTitle, setCourseTitle] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      fetchCourseTitle();
      fetchCompetencies();
    }
  }, [isOpen]);

  const fetchCourseTitle = async () => {
    try {
      const response = await api.get(`/courses/${courseId}`);
      setCourseTitle(response.data.title || `Course ${courseId}`);
      setError(null);
    } catch (error) {
      setError('Failed to fetch course title');
      console.error('Error fetching course title:', error);
      setCourseTitle(`Course ${courseId}`);
    }
  };

  const fetchCompetencies = async () => {
    try {
      const response = await api.get<Competency[]>(`/courses/${courseId}/competencies`);
      setCompetencies(response.data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch competencies');
      console.error('Error fetching competencies:', error);
    }
  };

  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const marks = parseInt(newCompetency.marks);
    if (!newCompetency.name || marks < 0 || marks > 10) {
      setError('Name is required, and marks must be between 0 and 10');
      return;
    }
    const url = editingId
      ? `/courses/competencies/${editingId}`
      : `/courses/${courseId}/competencies`;
    const method = editingId ? 'PUT' : 'POST';

    try {
      await api({
        method,
        url,
        data: { name: newCompetency.name, marks },
      });
      setNewCompetency({ name: '', marks: '' });
      setEditingId(null);
      fetchCompetencies();
      onUpdate();
      EventLogger.logEvent(editingId ? 'competency_updated' : 'competency_added', {
        courseId,
        name: newCompetency.name,
      });
      setError(null);
    } catch (error) {
      setError('Failed to add/update competency');
      console.error('Error adding/updating competency:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete competency?')) {
      try {
        await api.delete(`/courses/competencies/${id}`);
        fetchCompetencies();
        onUpdate();
        EventLogger.logEvent('competency_deleted', { courseId, id });
      } catch (error) {
        setError('Failed to delete competency');
        if (error instanceof Error) {
          console.error('Error deleting competency:', {
            message: error.message,
            name: error.name,
            stack: error.stack,
          });
        } else {
          console.error('Unexpected error deleting competency:', error);
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
    className="fixed inset-0 backdrop-blur-sm bg-transparent flex items-center justify-center font-primary z-50"
    role="dialog"
    aria-labelledby="modal-title"
  >
    <div className="bg-white placeholder:font-second text-black p-6 rounded-xl shadow-xl w-96 border border-white/10">
        <h3 id="modal-title" className="text-lg font-semibold mb-4 font-title">Competencies for {courseTitle}</h3>
        {error && <div className="text-red-500 mb-2">{error}</div>}

        <form onSubmit={handleAddOrUpdate} className="mb-4">
          <input
            type="text"
            value={newCompetency.name}
            onChange={(e) => setNewCompetency({ ...newCompetency, name: e.target.value })}
            placeholder="Competency Name"
            className="border font-primary  text-sm focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-400  p-2 w-full mb-4 rounded-full"
            required
            aria-label="Competency Name"
          />
          <input
            type="number"
            value={newCompetency.marks}
            onChange={(e) => setNewCompetency({ ...newCompetency, marks: e.target.value })}
            placeholder="Marks (0-10)"
            className="border font-primary text-sm focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-400  p-2 w-full mb-4 rounded-full"
            min="0"
            max="10"
            required
            aria-label="Marks"
          />
          <div className="flex gap-2">
            <Button type="submit" className="bg-orange-500 text-white font-bold rounded">
              {editingId ? <Pencil /> : <Plus />}
            </Button>
            {editingId && (
              <Button
                variant="destructive"
                onClick={() => setEditingId(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded font-title"
                aria-label="Cancel Edit"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>


<div>
<span className='font-title flex flex-row mb-3 '> List of competencies</span>
</div>
<div className="max-h-72 overflow-y-auto pr-1">
  <ul className="space-y-1">
    {competencies.map((comp, index) => (
      <li key={comp.id} className="relative group font-title">
        <div className="rounded-lg p-1 bg-gradient-to-r from-gray-50 to-blue-50 hover:from-gray-100 hover:to-blue-100 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-500">
                {index + 1}.
              </span>
              <span className="text-gray-900 font-semibold">
                {comp.name}
              </span>
              <span className="text-sm text-gray-600">
                {comp.marks}
              </span>
            </div>

            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                onClick={() => {
                  setNewCompetency({ name: comp.name, marks: comp.marks.toString() });
                  setEditingId(comp.id);
                }}
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-blue-50"
                aria-label={`Edit ${comp.name}`}
              >
                <Pencil className="h-4 w-4 text-gray-500" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(comp.id)}
                className="h-8 w-8 p-0 hover:bg-red-50"
                aria-label={`Delete ${comp.name}`}
              >
                <Trash2 className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>



        <Button
        variant={"outline"}
          onClick={onClose}
          className="mt-4 cursor-pointer  text-black px-4 py-2 rounded-full font-title hover:bg-gray-100 transition-colors duration-200"
          aria-label="Close Modal"
        >
          Close
        </Button>
      </div>
    </div>
  );
}

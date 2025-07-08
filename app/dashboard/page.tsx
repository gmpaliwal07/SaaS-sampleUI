"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import CourseCard from "@/app/components/CourseCard";
import CourseForm from "@/app/components/CourseForm";
import Course from "@/app/types";
import EventLogger from "@/app/components/EventLogger";
import useErrorBoundary from "@/app/hooks/useErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";
import api from "@/app/lib/api";
import { AxiosError } from "axios";
import {
  BookOpen,
  Plus,
  AlertTriangle,
  RefreshCw,
  GraduationCap,
  BarChart3,
  X,
  Captions,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ListView from "../components/ListView";
import TableView from "../components/TableView";
import {
  EmptyState,
  ErrorFallback,
  LoadingSpinner,
  StatsCard,
} from "../lib/utils";

interface DashboardState {
  courses: Course[];
  loading: boolean;
  error: string | null;
  retryCount: number;
}

interface DashboardStats {
  totalCourses: number;
  totalCompetencies: number;
  avgMarksPerCompetency: number;
}

export default function Dashboard() {
  const [state, setState] = useState<DashboardState>({
    courses: [],
    loading: true,
    error: null,
    retryCount: 0,
  });
  const [showForm, setShowForm] = useState(false);
  const { ErrorBoundaryComponent } = useErrorBoundary();

  // Memoized stats calculation
  const stats = useMemo((): DashboardStats => {
    const totalCourses = state.courses.length;
    const totalCompetencies = state.courses.reduce(
      (sum, course) => sum + (course.competencies?.length || 0),
      0
    );
    const avgMarksPerCompetency =
      totalCompetencies > 0
        ? state.courses.reduce(
            (sum, course) =>
              sum +
              (course.competencies?.reduce(
                (cSum, comp) => cSum + comp.marks,
                0
              ) || 0),
            0
          ) / totalCompetencies
        : 0;

    return {
      totalCourses,
      totalCompetencies,
      avgMarksPerCompetency: Math.round(avgMarksPerCompetency * 100) / 100,
    };
  }, [state.courses]);

  const fetchCourses = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      EventLogger.logEvent("courses_fetch_started", {
        retryCount: state.retryCount,
      });

      const response = await api.get<Course[]>("/courses", {
        timeout: 10000,
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid response format from server");
      }

      setState((prev) => ({
        ...prev,
        courses: response.data,
        loading: false,
        error: null,
        retryCount: 0,
      }));

      EventLogger.logEvent("courses_fetch_success", {
        courseCount: response.data.length,
        timestamp: new Date().toISOString(),
      });

      if (response.data.length > 0) {
        toast.success(
          `Loaded ${response.data.length} course${
            response.data.length === 1 ? "" : "s"
          }`
        );
      }
    } catch (error) {
      const errorMessage = handleFetchError(error);

      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
        retryCount: prev.retryCount + 1,
        courses: prev.retryCount === 0 ? [] : prev.courses, // Keep existing data on retry
      }));

      EventLogger.logEvent("courses_fetch_error", {
        error: errorMessage,
        retryCount: state.retryCount + 1,
        timestamp: new Date().toISOString(),
      });

      toast.error(errorMessage);
    }
  }, [state.retryCount]);

  const handleFetchError = (error: unknown): string => {
    if (error instanceof AxiosError) {
      if (error.code === "ECONNABORTED") {
        return "Request timeout. Please check your connection and try again.";
      }
      if (error.response?.status === 404) {
        return "Courses endpoint not found. Please contact support.";
      }
      if (error.response?.status === 500) {
        return "Server error. Please try again later.";
      }
      if (
        error.response?.status &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        return error.response?.data?.message || "Client error occurred.";
      }
      return error.message || "Network error occurred.";
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "An unexpected error occurred.";
  };

  const handleCourseAdded = useCallback((newCourse: Course) => {
    setState((prev) => ({
      ...prev,
      courses: [...prev.courses, newCourse],
    }));

    EventLogger.logEvent("course_added", {
      courseId: newCourse.id,
      title: newCourse.title,
      competencyCount: newCourse.competencies?.length || 0,
      timestamp: new Date().toISOString(),
    });

    toast.success(`Subject "${newCourse.title}" created successfully!`);
    setShowForm(false);
  }, []);

  const handleCourseUpdated = useCallback(() => {
    fetchCourses();
    toast.success("Course updated successfully!");
  }, [fetchCourses]);

  const handleCourseDeleted = useCallback(
    (courseTitle: string) => {
      fetchCourses();
      toast.success(`Subject "${courseTitle}" deleted successfully!`);
    },
    [fetchCourses]
  );

  const handleRetry = useCallback(() => {
    EventLogger.logEvent("retry_clicked", { retryCount: state.retryCount });
    fetchCourses();
  }, [fetchCourses, state.retryCount]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-h-screen bg-gray-100 font-primary">
        {/* Header */}
        <div className="bg-white shadow-xl border-b border-gray-300 mb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/60 border-b border-gray-200 shadow-sm rounded-full m-2" >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center font-primary">
                <div className="flex items-center">
                  <Captions className="w-8 h-8 text-orange-600 mr-3" />
                  <h1 className="text-2xl font-bold text-gray-800 font-title">
                    EvalPro
                  </h1>
                </div>
                <Button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-3 font-title font-semibold py-2 border border-transparent text-sm   text-white bg-orange-500 hover:bg-black rounded-full  transition-colors duration-200"
                >
                  <Plus className="w-4 h-4 " />
                  Add Subject
                </Button>
              </div>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-6 py-20">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Total Subjects"
              value={stats.totalCourses}
              icon={BookOpen}
              color="bg-teal-500"
            />
            <StatsCard
              title="Total Competencies"
              value={stats.totalCompetencies}
              icon={BarChart3}
              color="bg-cyan-500"
            />
            <StatsCard
              title="Avg. Marks/Competency"
              value={stats.avgMarksPerCompetency}
              icon={GraduationCap}
              color="bg-violet-500"
            />
          </div>

          {/* Coming Soon Segment */}
          <div className="space-y-4 font-primary mb-8">
            
            <h4 className="font-semibold text-gray-900 font-second">Evaluation Dashboard</h4>
            
            <div className="space-y-3">
            <div className="w-1/4 bg-yellow-200 font-title text-yellow-900 py-2 rounded-lg font-medium text-center">
                🚩 Coming Soon
              </div>
              <div className=" w-1/4 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <p className="text-green-900 font-medium">System Ready</p>
                <p className="text-green-700 text-sm">3 Subjects, 12 Competencies</p>
              </div>

            </div>
          </div>

          {/* Course Form Modal */}
          {showForm && (
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 font-title">
                    Create New Subject
                  </h2>
                  <Button
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="text-black hover:text-orange-700 cursor-pointer transition-colors duration-200"
                  >
                    <span className="sr-only">Close</span>
                    <X className="w-6 h-6" />
                  </Button>
                </div>
                <CourseForm onCourseAdded={handleCourseAdded} />
              </div>
            </div>
          )}

          {/* Error State */}
          {state.error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700">{state.error}</span>
                <Button
                  onClick={handleRetry}
                  className="ml-auto inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Retry
                </Button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {state.loading && <LoadingSpinner />}

          {/* Empty State */}
          {!state.loading && !state.error && state.courses.length === 0 && (
            <EmptyState onAddCourse={() => setShowForm(true)} />
          )}

          {/* Courses Grid */}
          {!state.loading && state.courses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onUpdate={handleCourseUpdated}
                  onDelete={handleCourseDeleted}
                />
              ))}
            </div>
          )}
        </div>

        <ListView
        onUpdate={handleCourseUpdated}
        />

        <TableView onUpdate={handleCourseUpdated} />
        {/* Error Boundary Component */}
        <ErrorBoundaryComponent />
      </div>
    </ErrorBoundary>
  );
}
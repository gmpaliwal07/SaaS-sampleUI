import { AlertTriangle, BookOpen, GraduationCap, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
 export function getVisualContent(index: number) {
    switch (index) {
      case 0:
        return (
          <div className="space-y-4 font-primary">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900  font-second">Create New Subject</h4>
              <Plus className="h-5 w-5 text-orange-600" />
            </div>
            {["Data Structures", "Cloud Computing", "Signal Processing"].map((subject, i) => (
              <div key={i} className={`p-3 rounded-lg ${getColor(subject)}`}>
                <p className={`font-medium ${getTextColor(subject)}`}>{subject}</p>
              </div>
            ))}
          </div>
        );
  
      case 1:
        const competencies = [
          { name: "Arrays", marks: 7 },
          { name: "LinkedLists", marks: 8 },
          { name: "Trees", marks: 9 },
        ];
        return (
          <div className="space-y-4 font-primary">
            <h4 className="font-semibold text-gray-900 font-second">Data Structures Competencies</h4>
            <div className="space-y-3">
              {competencies.map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">{item.name}</span>
                  <span className="font-bold text-orange-700">{item.marks} marks</span>
                </div>
              ))}
            </div>
          </div>
        );
  
      case 2:
        return (
          <div className="space-y-4 font-primary">
            <h4 className="font-semibold text-gray-900 font-second">Evaluation Dashboard</h4>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <p className="text-green-900 font-medium">System Ready</p>
                <p className="text-green-700 text-sm">3 Subjects, 12 Competencies</p>
              </div>
              <div className="w-full bg-yellow-200 font-title text-yellow-900 py-2 rounded-lg font-medium text-center">
                🚩 Coming Soon
              </div>
            </div>
          </div>
        );
  
      case 3:
        const actions = [
          { label: "Edit Subject", bg: "bg-blue-50", text: "text-blue-900" },
          { label: "Update Competencies", bg: "bg-yellow-50", text: "text-yellow-900" },
          { label: "Delete Subject", bg: "bg-red-50", text: "text-red-900" },
        ];
        return (
          <div className="space-y-4 font-primary">
            <h4 className="font-semibold text-gray-900 font-second">Management Options</h4>
            <div className="space-y-2">
              {actions.map((action, i) => (
                <Button
                variant={"outline"}
                  key={i}
                  className={`w-full text-left p-3 rounded-2xl font-medium ${action.bg} ${action.text}`}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        );
  
      default:
        return null;
    }
  }
  
export  function getColor(subject: string) {
    switch (subject) {
      case "Data Structures":
        return "bg-blue-50";
      case "Cloud Computing":
        return "bg-green-50";
      case "Signal Processing":
        return "bg-purple-50";
      default:
        return "bg-gray-50";
    }
  }
  
 export  function getTextColor(subject: string) {
    switch (subject) {
      case "Data Structures":
        return "text-blue-900";
      case "Cloud Computing":
        return "text-green-900";
      case "Signal Processing":
        return "text-purple-900";
      default:
        return "text-gray-900";
    }
  }



  export function LoadingSpinner() {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-[#2D4F2B]" />
          </div>
        </div>
        <span className="ml-3 text-gray-600 font-medium font-second">Loading courses...</span>
      </div>
    );
  }
  export function EmptyState({ onAddCourse }: { onAddCourse: () => void }) {
    return (
      <div className="text-center py-16 px-4">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <GraduationCap className="w-12 h-12 text-[#2D4F2B]" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 font-title">No courses yet</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">
          Get started by creating your first subject. You can add competencies and assign marks to build your evaluation system.
        </p>
        <Button
          onClick={onAddCourse}
          className="inline-flex font-title rounded-full items-center px-6 py-3 border border-transparent text-base font-medium  text-white bg-[#2D4F2B] hover:bg-[#708A58] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create First Subject
        </Button>
      </div>
    );
  }
  


export function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200 max-w-md mx-auto">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-3xl font-semibold text-red-900 mb-2 font-title">Something went wrong</h2>
        <p className="text-red-700 mb-4 text-sm font-second">{error.message}</p>
        <Button
          onClick={resetErrorBoundary}
          className="inline-flex font-title items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    </div>
  );
}


export function StatsCard({ title, value, icon: Icon, color }: { 
  title: string; 
  value: number; 
  icon: React.ComponentType<{ className?: string }>; 
  color: string; 
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-title font-medium text-gray-600">{title}</p>
          <p className="text-4xl font-title font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-12 h-12 text-white" />
        </div>
      </div>
    </div>
  );
}






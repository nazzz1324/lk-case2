import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockDisciplines } from "@/lib/mockData";
import { useLocation } from "wouter";

export default function TeacherDisciplines() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("all");

  const filteredDisciplines = mockDisciplines.filter((discipline) => {
    const matchesSearch = discipline.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = semesterFilter === "all" || discipline.semester.toString() === semesterFilter;
    return matchesSearch && matchesSemester;
  });

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 flex gap-4 w-full sm:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Поиск по названию дисциплины..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Все семестры</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                Семестр {sem}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Disciplines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDisciplines.map((discipline) => (
          <div
            key={discipline.id}
            className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md hover:border-primary transition-all group"
          >
            <div className="space-y-4">
              {/* Header */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{discipline.name}</h3>
                <p className="text-sm text-muted-foreground">Семестр {discipline.semester}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Студентов</p>
                  <p className="text-2xl font-bold text-foreground">24</p>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Индикаторов</p>
                  <p className="text-2xl font-bold text-foreground">{discipline.indicatorCount}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs text-muted-foreground">Заполнение оценок</p>
                  <p className="text-xs font-semibold text-primary">68%</p>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-sidebar-primary h-2 rounded-full"
                    style={{ width: "68%" }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={() => setLocation(`/teacher/grading/${discipline.id}`)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:translate-x-1 transition-transform"
              >
                Перейти к оцениванию
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredDisciplines.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Дисциплины не найдены</p>
        </div>
      )}
    </div>
  );
}

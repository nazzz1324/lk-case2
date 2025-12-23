import { Users, BookOpen, Target, Pin, Users2 } from "lucide-react";
import { useState } from "react";
import MetricCard from "@/components/MetricCard";
import { dashboardMetrics } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const disciplineData = [
  { name: "Веб-разработка", competencies: 5 },
  { name: "Базы данных", competencies: 4 },
  { name: "Алгоритмы", competencies: 6 },
  { name: "ООП", competencies: 5 },
  { name: "Сети", competencies: 3 },
];

const activityData = [
  { name: "Пн", оценки: 12 },
  { name: "Вт", оценки: 19 },
  { name: "Ср", оценки: 15 },
  { name: "Чт", оценки: 25 },
  { name: "Пт", оценки: 22 },
  { name: "Сб", оценки: 8 },
  { name: "Вс", оценки: 5 },
];

const competencyDistribution = [
  { name: "ПК-1", value: 25 },
  { name: "ПК-2", value: 20 },
  { name: "ПК-3", value: 30 },
  { name: "ОК-1", value: 25 },
];

const COLORS = ["#377DFF", "#A6C8FF", "#2D4DBF", "#5B9EFF"];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          icon={<Users size={24} />}
          value={dashboardMetrics.users}
          label="Пользователей"
          color="blue"
        />
        <MetricCard
          icon={<BookOpen size={24} />}
          value={dashboardMetrics.disciplines}
          label="Дисциплин"
          color="purple"
        />
        <MetricCard
          icon={<Target size={24} />}
          value={dashboardMetrics.competencies}
          label="Компетенций"
          color="green"
        />
        <MetricCard
          icon={<Pin size={24} />}
          value={dashboardMetrics.indicators}
          label="Индикаторов"
          color="orange"
        />
        <MetricCard
          icon={<Users2 size={24} />}
          value={dashboardMetrics.groups}
          label="Групп"
          color="blue"
        />
      </div>

      

        
    </div>
  );
}

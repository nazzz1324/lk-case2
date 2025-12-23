import { User, Mail, BookOpen } from "lucide-react";

export default function StudentProfile() {
  const studentName = sessionStorage.getItem("userName") || "Иван Петров";
  const group = "ПИ-21-1";
  const email = "ivan.petrov@university.ru";

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-sidebar-primary flex items-center justify-center text-white">
            <User size={48} />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-2">{studentName}</h1>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                <span>Группа: {group}</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="text-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              <div className="w-2 h-2 rounded-full bg-green-600" />
              Активен
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

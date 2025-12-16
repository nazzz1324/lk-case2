import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Target } from "lucide-react";

export default function StudentProfessions() {
  // Mock data for demonstration
  const professions = [
    { name: "Веб-разработчик", requiredCompetencies: 5, achievedCompetencies: 3, progress: 60 },
    { name: "Аналитик данных", requiredCompetencies: 4, achievedCompetencies: 1, progress: 25 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Мой Прогресс по Профессиям</h1>
      <p className="text-muted-foreground">
        Здесь вы можете увидеть, насколько вы готовы к освоению выбранных профессий на основе ваших компетенций.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {professions.map((prof, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">{prof.name}</CardTitle>
              <Users className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-4">{prof.progress}% Готовность</div>
              <Progress value={prof.progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Освоено {prof.achievedCompetencies} из {prof.requiredCompetencies} требуемых компетенций.
              </p>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold mb-1">Требуемые компетенции:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li><Target className="inline h-3 w-3 mr-1" /> ПК-1 (65% освоено)</li>
                  <li><Target className="inline h-3 w-3 mr-1" /> ПК-2 (45% освоено)</li>
                  <li><Target className="inline h-3 w-3 mr-1" /> ОК-1 (70% освоено)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

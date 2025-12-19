import { useState } from "react";
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { mockIndicators, mockCompetencies } from "@/lib/mockData";

interface Indicator {
  id: number;
  code: string;
  name: string;
  competencies: number[];
}

export default function Indicators() {
  const [indicators, setIndicators] = useState<Indicator[]>(mockIndicators);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndicator, setEditingIndicator] = useState<Indicator | null>(null);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    competencies: [] as number[],
  });

  const filteredIndicators = indicators.filter((indicator) =>
    indicator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    indicator.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = (indicator?: Indicator) => {
    if (indicator) {
      setEditingIndicator(indicator);
      setFormData({
        code: indicator.code,
        name: indicator.name,
        competencies: indicator.competencies,
      });
    } else {
      setEditingIndicator(null);
      setFormData({
        code: "",
        name: "",
        competencies: [],
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingIndicator) {
      setIndicators(
        indicators.map((i) =>
          i.id === editingIndicator.id
            ? {
                ...i,
                code: formData.code,
                name: formData.name,
                competencies: formData.competencies,
              }
            : i
        )
      );
    } else {
      setIndicators([
        ...indicators,
        {
          id: Math.max(...indicators.map((i) => i.id), 0) + 1,
          code: formData.code,
          name: formData.name,
          competencies: formData.competencies,
        },
      ]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setIndicators(indicators.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header with Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Поиск по названию или коду..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap"
        >
          <Plus size={18} className="mr-2" />
          Добавить
        </Button>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Код</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Название</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Компетенции</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredIndicators.map((indicator) => (
                <tr
                  key={indicator.id}
                  className="border-b border-border hover:bg-secondary transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-primary">{indicator.code}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{indicator.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-1 flex-wrap">
                      {indicator.competencies.map((compId) => {
                        const comp = mockCompetencies.find((c) => c.id === compId);
                        return (
                          <span
                            key={compId}
                            className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs font-medium"
                          >
                            {comp?.code}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenDialog(indicator)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors text-primary"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(indicator.id)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors text-destructive"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingIndicator ? "Редактировать индикатор" : "Добавить индикатор"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Код</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="И-1.1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Название</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Знание основ веб-разработки"
              />
            </div>
            <div className="space-y-2">
              <Label>Компетенции</Label>
              <div className="border border-border rounded-lg p-3 max-h-40 overflow-y-auto space-y-2">
                {mockCompetencies.map((competency) => (
                  <label key={competency.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.competencies.includes(competency.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            competencies: [...formData.competencies, competency.id],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            competencies: formData.competencies.filter((id) => id !== competency.id),
                          });
                        }
                      }}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-foreground">{competency.code} - {competency.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {editingIndicator ? "Сохранить" : "Добавить"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useState } from "react";
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { mockDisciplines, mockIndicators } from "@/lib/mockData";

interface Discipline {
  id: number;
  name: string;
  indicatorCount: number;
  indicators: number[];
}

export default function Disciplines() {
  const [disciplines, setDisciplines] = useState<Discipline[]>(mockDisciplines);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDiscipline, setEditingDiscipline] = useState<Discipline | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    indicators: [] as number[],
  });

  const filteredDisciplines = disciplines.filter((discipline) => {
    const matchesSearch = discipline.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleOpenDialog = (discipline?: Discipline) => {
    if (discipline) {
      setEditingDiscipline(discipline);
      setFormData({
        name: discipline.name,
        indicators: discipline.indicators,
      });
    } else {
      setEditingDiscipline(null);
      setFormData({
        name: "",
    
        indicators: [],
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingDiscipline) {
      setDisciplines(
        disciplines.map((d) =>
          d.id === editingDiscipline.id
            ? {
                ...d,
                name: formData.name,
                indicators: formData.indicators,
                indicatorCount: formData.indicators.length,
              }
            : d
        )
      );
    } else {
      setDisciplines([
        ...disciplines,
        {
          id: Math.max(...disciplines.map((d) => d.id), 0) + 1,
          name: formData.name,
          indicators: formData.indicators,
          indicatorCount: formData.indicators.length,
        },
      ]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setDisciplines(disciplines.filter((d) => d.id !== id));
  };

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
          
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap">
          <Plus size={18} className="mr-2" />
          Добавить дисциплину
        </Button>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Название дисциплины</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Индикаторов</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredDisciplines.map((discipline) => (
                <tr
                  key={discipline.id}
                  className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{discipline.name}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{discipline.indicatorCount}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenDialog(discipline)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors text-primary">
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(discipline.id)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors text-destructive">
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
              {editingDiscipline ? "Редактировать дисциплину" : "Добавить дисциплину"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Название</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Веб-разработка"
              />
            </div>

            <div className="space-y-2">
              <Label>Индикаторы</Label>
              <div className="border border-border rounded-lg p-3 max-h-40 overflow-y-auto space-y-2">
                {mockIndicators.map((indicator) => (
                  <label key={indicator.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.indicators.includes(indicator.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            indicators: [...formData.indicators, indicator.id],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            indicators: formData.indicators.filter((id) => id !== indicator.id),
                          });
                        }
                      }}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-foreground">{indicator.code} - {indicator.name}</span>
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
              {editingDiscipline ? "Сохранить" : "Добавить"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

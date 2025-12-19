import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { mockCompetencies } from "@/lib/mockData";
import { Textarea } from "@/components/ui/textarea";

// Mock Data
const mockProfessions = [
  { id: 1, name: "Веб-разработчик", description: "Специалист по созданию веб-приложений.", competencies: [1, 2, 4] },
  { id: 2, name: "Аналитик данных", description: "Специалист по сбору, обработке и анализу данных.", competencies: [3, 4] },
];

const getCompetencyCode = (id) => mockCompetencies.find(c => c.id === id)?.code || `ID-${id}`;

export default function Professions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProfession, setEditingProfession] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    competencies: []
  });

  const handleAddEdit = (profession = null) => {
    setEditingProfession(profession);
    setFormData({
      name: profession?.name || "",
      description: profession?.description || "",
      competencies: profession?.competencies || []
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    // Placeholder for save logic
    console.log("Saving profession:", formData);
    setIsDialogOpen(false);
  };

  const handleCompetencyChange = (competencyId) => {
    setFormData(prev => {
      const id = parseInt(competencyId);
      if (prev.competencies.includes(id)) {
        return { ...prev, competencies: prev.competencies.filter(c => c !== id) };
      } else {
        return { ...prev, competencies: [...prev.competencies, id] };
      }
    });
  };

  const handleDelete = (id) => {
    // Placeholder for delete logic
    console.log("Deleting profession with id:", id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Управление Профессиями</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleAddEdit(null)}>
              <Plus className="mr-2 h-4 w-4" /> Добавить
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProfession ? "Редактировать Профессию" : "Добавить Новую Профессию"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Название</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Описание</Label>
                <Textarea id="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="competencies" className="text-right pt-2">Компетенции</Label>
                <div className="col-span-3 border border-border rounded-lg p-3 max-h-40 overflow-y-auto space-y-2">
                  {mockCompetencies.map((comp) => (
                    <label key={comp.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.competencies.includes(comp.id)}
                        onChange={() => handleCompetencyChange(comp.id)}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm text-foreground">{comp.code} - {comp.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <Button onClick={handleSave}>Сохранить</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Список Профессий</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Описание</TableHead>
                <TableHead>Требуемые Компетенции</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProfessions.map((prof) => (
                <TableRow key={prof.id}>
                  <TableCell className="font-medium">{prof.id}</TableCell>
                  <TableCell>{prof.name}</TableCell>
                  <TableCell>{prof.description}</TableCell>
                  <TableCell>{prof.competencies.map(getCompetencyCode).join(", ")}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleAddEdit(prof)} className="mr-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(prof.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

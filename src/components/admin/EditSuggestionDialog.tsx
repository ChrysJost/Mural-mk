
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSuggestions } from "@/hooks/useSuggestions";

interface EditSuggestionDialogProps {
  suggestion: any;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const EditSuggestionDialog = ({ suggestion, isOpen, onClose, onSuccess }: EditSuggestionDialogProps) => {
  const [title, setTitle] = useState(suggestion?.title || "");
  const [description, setDescription] = useState(suggestion?.description || "");
  const [loading, setLoading] = useState(false);
  const { updateSuggestion } = useSuggestions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      return;
    }

    setLoading(true);
    try {
      await updateSuggestion(suggestion.id, {
        title: title.trim(),
        description: description.trim()
      });
      
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error updating suggestion:', error);
    } finally {
      setLoading(false);
    }
  };

  // Reset form when suggestion changes
  useState(() => {
    if (suggestion) {
      setTitle(suggestion.title || "");
      setDescription(suggestion.description || "");
    }
  });

  if (!suggestion) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Sugestão</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Título
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título da sugestão"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Descrição
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite a descrição da sugestão"
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading || !title.trim() || !description.trim()}
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSuggestionDialog;

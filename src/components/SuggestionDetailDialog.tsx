
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ThumbsUp, 
  Calendar, 
  User, 
  ExternalLink,
  MessageSquare
} from "lucide-react";
import SuggestionComments from "./SuggestionComments";

interface SuggestionDetailDialogProps {
  suggestion: any;
  isOpen: boolean;
  onClose: () => void;
  onVote: (id: string) => void;
}

const SuggestionDetailDialog = ({ 
  suggestion, 
  isOpen, 
  onClose, 
  onVote 
}: SuggestionDetailDialogProps) => {
  if (!suggestion) return null;

  const getStatusColor = (status: string) => {
    const colors = {
      "Recebido": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      "Em análise": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      "Aprovada": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      "Rejeitada": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      "Implementada": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    };
    return colors[status as keyof typeof colors] || colors["Recebido"];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl pr-8">{suggestion.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status e informações principais */}
          <div className="flex gap-2 flex-wrap">
            <Badge className={getStatusColor(suggestion.status)} variant="secondary">
              {suggestion.status}
            </Badge>
            <Badge variant="outline">{suggestion.module}</Badge>
            {suggestion.isPinned && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-300">
                Destacada
              </Badge>
            )}
          </div>

          {/* Descrição */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {suggestion.description}
            </p>
          </div>

          {/* Informações do usuário e estatísticas */}
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>Por {suggestion.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{suggestion.createdAt}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                <span>{suggestion.votes} votos</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                <span>{suggestion.comments} comentários</span>
              </div>
            </div>
          </div>

          {/* Botão de voto */}
          <div className="flex justify-center">
            <Button
              onClick={() => onVote(suggestion.id)}
              variant={suggestion.hasVoted ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              <ThumbsUp className="w-4 h-4" />
              {suggestion.hasVoted ? "Remover voto" : "Votar"}
            </Button>
          </div>

          {/* Resposta do administrador */}
          {suggestion.adminResponse && (
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Resposta da Administração:
              </h3>
              <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                {suggestion.adminResponse}
              </p>
            </div>
          )}

          {/* Seção de comentários */}
          <div className="border-t pt-6">
            <SuggestionComments 
              suggestionId={suggestion.id} 
              commentsCount={suggestion.comments || 0}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuggestionDetailDialog;

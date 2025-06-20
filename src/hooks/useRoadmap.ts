
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'planned' | 'in-progress' | 'completed';
  priority: 'baixa' | 'media' | 'alta';
  estimated_date?: string;
  start_date?: string;
  end_date?: string;
  product: string;
  votes: number;
  created_at: string;
  updated_at: string;
  reactions?: {
    likes: number;
    hearts: number;
    ideas: number;
  };
}

interface CreateRoadmapInput {
  title: string;
  description: string;
  status: string;
  priority: string;
  estimated_date?: string;
  product: string;
}

// Mock data
const mockRoadmapItems: RoadmapItem[] = [
  {
    id: '1',
    title: 'Integração com WhatsApp Business',
    description: 'Implementar integração completa com a API do WhatsApp Business para permitir conversas automatizadas e gerenciamento de mensagens.',
    status: 'in-progress',
    priority: 'alta',
    estimated_date: '2024-08-15',
    product: 'Bot',
    votes: 45,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-06-20T15:30:00Z',
    reactions: { likes: 12, hearts: 8, ideas: 5 }
  },
  {
    id: '2',
    title: 'Dashboard de Analytics Avançado',
    description: 'Criar dashboard com métricas detalhadas de performance, conversões e engajamento dos usuários.',
    status: 'planned',
    priority: 'media',
    estimated_date: '2024-09-30',
    product: 'Workspace',
    votes: 32,
    created_at: '2024-02-01T09:00:00Z',
    updated_at: '2024-06-18T11:20:00Z',
    reactions: { likes: 8, hearts: 15, ideas: 9 }
  },
  {
    id: '3',
    title: 'Sistema de Relatórios Automáticos',
    description: 'Implementar geração automática de relatórios financeiros com exportação em PDF e Excel.',
    status: 'completed',
    priority: 'alta',
    estimated_date: '2024-05-20',
    end_date: '2024-05-18',
    product: 'Financeiro',
    votes: 28,
    created_at: '2024-01-20T14:00:00Z',
    updated_at: '2024-05-18T16:45:00Z',
    reactions: { likes: 20, hearts: 6, ideas: 2 }
  },
  {
    id: '4',
    title: 'Integração com Google Maps',
    description: 'Adicionar funcionalidades de geolocalização e rotas otimizadas usando Google Maps API.',
    status: 'planned',
    priority: 'media',
    estimated_date: '2024-10-15',
    product: 'Mapa',
    votes: 18,
    created_at: '2024-03-01T08:30:00Z',
    updated_at: '2024-06-19T13:15:00Z',
    reactions: { likes: 5, hearts: 4, ideas: 9 }
  },
  {
    id: '5',
    title: 'Módulo de Agendamento Inteligente',
    description: 'Sistema de agendamento com IA para otimizar horários e evitar conflitos automaticamente.',
    status: 'in-progress',
    priority: 'alta',
    estimated_date: '2024-07-30',
    start_date: '2024-06-01',
    product: 'Agenda',
    votes: 38,
    created_at: '2024-02-15T11:00:00Z',
    updated_at: '2024-06-20T10:30:00Z',
    reactions: { likes: 15, hearts: 12, ideas: 11 }
  }
];

export const useRoadmap = () => {
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRoadmapItems = async () => {
    try {
      console.log('Fetching mock roadmap items...');
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRoadmapItems(mockRoadmapItems);
    } catch (error) {
      console.error('Error fetching roadmap items:', error);
      toast({
        title: "Erro ao carregar roadmap",
        description: "Não foi possível carregar os itens do roadmap.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createRoadmapItem = async (itemData: CreateRoadmapInput) => {
    try {
      console.log('Creating roadmap item:', itemData);
      
      const newItem: RoadmapItem = {
        id: Date.now().toString(),
        title: itemData.title,
        description: itemData.description,
        status: itemData.status as 'planned' | 'in-progress' | 'completed',
        priority: itemData.priority as 'baixa' | 'media' | 'alta',
        estimated_date: itemData.estimated_date,
        product: itemData.product,
        votes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        reactions: { likes: 0, hearts: 0, ideas: 0 }
      };

      setRoadmapItems(prev => [newItem, ...prev]);
      
      toast({
        title: "Item criado com sucesso!",
        description: "O novo item do roadmap foi adicionado.",
      });

      return newItem;
    } catch (error) {
      console.error('Error creating roadmap item:', error);
      toast({
        title: "Erro ao criar item",
        description: "Não foi possível criar o item do roadmap.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const addReaction = async (itemId: string, reactionType: 'likes' | 'hearts' | 'ideas', userEmail: string) => {
    try {
      console.log('Adding reaction:', { itemId, reactionType, userEmail });
      
      // Update local state
      setRoadmapItems(prev => 
        prev.map(item => 
          item.id === itemId 
            ? {
                ...item,
                reactions: {
                  ...item.reactions,
                  [reactionType]: (item.reactions?.[reactionType] || 0) + 1
                }
              }
            : item
        )
      );

      toast({
        title: "Reação adicionada!",
        description: "Sua reação foi registrada com sucesso.",
      });
    } catch (error) {
      console.error('Error adding reaction:', error);
      toast({
        title: "Erro ao reagir",
        description: "Não foi possível registrar sua reação.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchRoadmapItems();
  }, []);

  return {
    roadmapItems,
    loading,
    fetchRoadmapItems,
    createRoadmapItem,
    addReaction,
  };
};

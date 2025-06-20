
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ChangelogEntry {
  id: string;
  version: string;
  title: string;
  description: string;
  type: 'feature' | 'improvement' | 'bugfix' | 'breaking';
  content_type: 'text' | 'image' | 'video' | 'gif';
  content?: string;
  image_url?: string;
  video_url?: string;
  product: string;
  release_date: string;
  features: string[];
  created_at: string;
  updated_at: string;
}

interface CreateChangelogInput {
  version: string;
  title: string;
  description: string;
  type: string;
  content_type?: string;
  content?: string;
  image_url?: string;
  video_url?: string;
  product: string;
  release_date: string;
  features: string[];
}

// Mock data
const mockChangelogEntries: ChangelogEntry[] = [
  {
    id: '1',
    version: 'v3.2.0',
    title: 'Nova Interface de Usuário e Melhorias de Performance',
    description: 'Lançamos uma interface completamente redesenhada com foco na experiência do usuário, além de significativas melhorias de performance em toda a plataforma.',
    type: 'feature',
    content_type: 'text',
    content: 'Esta release inclui uma reformulação completa da interface com design mais moderno e intuitivo.',
    product: 'Workspace',
    release_date: '2024-06-20',
    features: [
      'Nova interface de usuário com design moderno',
      'Melhoria de 40% na velocidade de carregamento',
      'Sistema de notificações em tempo real',
      'Modo escuro implementado',
      'Navegação aprimorada entre módulos'
    ],
    created_at: '2024-06-20T10:00:00Z',
    updated_at: '2024-06-20T10:00:00Z'
  },
  {
    id: '2',
    version: 'v3.1.5',
    title: 'Correções Críticas e Estabilidade',
    description: 'Release focado em correções de bugs críticos e melhorias de estabilidade do sistema.',
    type: 'bugfix',
    content_type: 'text',
    product: 'Bot',
    release_date: '2024-06-15',
    features: [
      'Correção de falhas na sincronização de dados',
      'Resolução de problemas de conectividade',
      'Melhoria na estabilidade das conversas',
      'Otimização do uso de memória'
    ],
    created_at: '2024-06-15T14:30:00Z',
    updated_at: '2024-06-15T14:30:00Z'
  },
  {
    id: '3',
    version: 'v3.1.0',
    title: 'Integração com Sistemas Fiscais',
    description: 'Implementação completa de integração com sistemas fiscais brasileiros, incluindo emissão de NFe e consulta de CPF/CNPJ.',
    type: 'feature',
    content_type: 'text',
    product: 'Fiscal',
    release_date: '2024-06-01',
    features: [
      'Emissão automática de Nota Fiscal Eletrônica',
      'Consulta em tempo real de CPF/CNPJ',
      'Integração com SEFAZ',
      'Relatórios fiscais automatizados',
      'Validação de documentos fiscais',
      'Backup automático de XMLs'
    ],
    created_at: '2024-06-01T09:00:00Z',
    updated_at: '2024-06-01T09:00:00Z'
  },
  {
    id: '4',
    version: 'v3.0.0',
    title: 'Lançamento da Nova Plataforma',
    description: 'Lançamento oficial da nova versão da plataforma com arquitetura completamente redesenhada.',
    type: 'breaking',
    content_type: 'text',
    product: 'Workspace',
    release_date: '2024-05-15',
    features: [
      'Nova arquitetura de microsserviços',
      'API RESTful completamente redesenhada',
      'Sistema de autenticação aprimorado',
      'Dashboard administrativo renovado',
      'Suporte a múltiplos idiomas',
      'Integração com webhooks',
      'Sistema de logs avançado'
    ],
    created_at: '2024-05-15T12:00:00Z',
    updated_at: '2024-05-15T12:00:00Z'
  },
  {
    id: '5',
    version: 'v2.8.3',
    title: 'Melhorias no Sistema de Agendamento',
    description: 'Aprimoramentos significativos no módulo de agendamento com novas funcionalidades de automação.',
    type: 'improvement',
    content_type: 'text',
    product: 'Agenda',
    release_date: '2024-05-01',
    features: [
      'Agendamento recorrente automático',
      'Lembretes personalizáveis',
      'Integração com Google Calendar',
      'Visualização em timeline',
      'Conflitos de horário detectados automaticamente'
    ],
    created_at: '2024-05-01T15:20:00Z',
    updated_at: '2024-05-01T15:20:00Z'
  }
];

export const useChangelog = () => {
  const [changelogEntries, setChangelogEntries] = useState<ChangelogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchChangelogEntries = async () => {
    try {
      console.log('Fetching mock changelog entries...');
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setChangelogEntries(mockChangelogEntries);
    } catch (error) {
      console.error('Error fetching changelog entries:', error);
      toast({
        title: "Erro ao carregar changelog",
        description: "Não foi possível carregar o histórico de mudanças.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createChangelogEntry = async (entryData: CreateChangelogInput) => {
    try {
      console.log('Creating changelog entry:', entryData);
      
      const newEntry: ChangelogEntry = {
        id: Date.now().toString(),
        version: entryData.version,
        title: entryData.title,
        description: entryData.description,
        type: entryData.type as 'feature' | 'improvement' | 'bugfix' | 'breaking',
        content_type: (entryData.content_type || 'text') as 'text' | 'image' | 'video' | 'gif',
        content: entryData.content,
        image_url: entryData.image_url,
        video_url: entryData.video_url,
        product: entryData.product,
        release_date: entryData.release_date,
        features: entryData.features,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setChangelogEntries(prev => [newEntry, ...prev]);
      
      toast({
        title: "Changelog criado com sucesso!",
        description: "A nova entrada do changelog foi adicionada.",
      });

      return newEntry;
    } catch (error) {
      console.error('Error creating changelog entry:', error);
      toast({
        title: "Erro ao criar changelog",
        description: "Não foi possível criar a entrada do changelog.",
        variant: "destructive"
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchChangelogEntries();
  }, []);

  return {
    changelogEntries,
    loading,
    fetchChangelogEntries,
    createChangelogEntry,
  };
};


-- Criar tabela para comentários das sugestões
CREATE TABLE public.suggestion_comments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  suggestion_id uuid NOT NULL REFERENCES public.suggestions(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  author_email text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Adicionar RLS para os comentários
ALTER TABLE public.suggestion_comments ENABLE ROW LEVEL SECURITY;

-- Política para permitir que todos vejam comentários de sugestões públicas
CREATE POLICY "Anyone can view comments on public suggestions" 
  ON public.suggestion_comments 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.suggestions 
      WHERE suggestions.id = suggestion_comments.suggestion_id 
      AND suggestions.is_public = true
    )
  );

-- Política para permitir que qualquer pessoa adicione comentários
CREATE POLICY "Anyone can create comments" 
  ON public.suggestion_comments 
  FOR INSERT 
  WITH CHECK (true);

-- Criar função para incrementar votos das sugestões
CREATE OR REPLACE FUNCTION increment_suggestion_votes(suggestion_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.suggestions 
  SET votes = votes + 1 
  WHERE id = suggestion_id;
END;
$$ LANGUAGE plpgsql;

-- Criar função para decrementar votos das sugestões
CREATE OR REPLACE FUNCTION decrement_suggestion_votes(suggestion_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.suggestions 
  SET votes = GREATEST(votes - 1, 0) 
  WHERE id = suggestion_id;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger para atualizar comments_count automaticamente
CREATE OR REPLACE FUNCTION update_suggestion_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.suggestions 
    SET comments_count = comments_count + 1 
    WHERE id = NEW.suggestion_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.suggestions 
    SET comments_count = GREATEST(comments_count - 1, 0) 
    WHERE id = OLD.suggestion_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Criar o trigger
CREATE TRIGGER trigger_update_comments_count
  AFTER INSERT OR DELETE ON public.suggestion_comments
  FOR EACH ROW EXECUTE FUNCTION update_suggestion_comments_count();

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ContentSection } from '../types/content';

export const useContent = () => {
  const [content, setContent] = useState<ContentSection[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('content_sections')
        .select('*')
        .order('order_index');

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (id: string, updates: Partial<ContentSection>) => {
    try {
      const { error } = await supabase
        .from('content_sections')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      await fetchContent();
      return { success: true };
    } catch (error) {
      console.error('Error updating content:', error);
      return { error: 'Error al actualizar el contenido' };
    }
  };

  const createContent = async (newContent: Omit<ContentSection, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('content_sections')
        .insert([{
          ...newContent,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);

      if (error) throw error;
      await fetchContent();
      return { success: true };
    } catch (error) {
      console.error('Error creating content:', error);
      return { error: 'Error al crear el contenido' };
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('content_sections')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchContent();
      return { success: true };
    } catch (error) {
      console.error('Error deleting content:', error);
      return { error: 'Error al eliminar el contenido' };
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return {
    content,
    loading,
    updateContent,
    createContent,
    deleteContent,
    refetch: fetchContent
  };
};
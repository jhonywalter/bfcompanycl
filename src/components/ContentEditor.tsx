import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useContent } from '../hooks/useContent';
import { ContentSection } from '../types/content';
import { Save, X, Upload, Eye } from 'lucide-react';

interface ContentEditorProps {
  contentId?: string;
  onClose: () => void;
}

interface ContentFormData {
  section_name: string;
  title: string;
  subtitle: string;
  content: string;
  image_url: string;
  button_text: string;
  button_url: string;
  order_index: number;
  is_active: boolean;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({ contentId, onClose }) => {
  const { content, updateContent, createContent } = useContent();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);

  const currentContent = contentId ? content.find(c => c.id === contentId) : null;
  const isEditing = !!contentId;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ContentFormData>({
    defaultValues: {
      section_name: '',
      title: '',
      subtitle: '',
      content: '',
      image_url: '',
      button_text: '',
      button_url: '',
      order_index: content.length + 1,
      is_active: true
    }
  });

  const watchedValues = watch();

  useEffect(() => {
    if (currentContent) {
      reset({
        section_name: currentContent.section_name,
        title: currentContent.title,
        subtitle: currentContent.subtitle || '',
        content: currentContent.content,
        image_url: currentContent.image_url || '',
        button_text: currentContent.button_text || '',
        button_url: currentContent.button_url || '',
        order_index: currentContent.order_index,
        is_active: currentContent.is_active
      });
    }
  }, [currentContent, reset]);

  const onSubmit = async (data: ContentFormData) => {
    setIsLoading(true);
    setError('');

    try {
      let result;
      if (isEditing && contentId) {
        result = await updateContent(contentId, data);
      } else {
        result = await createContent(data);
      }

      if (result.error) {
        setError(result.error);
      } else {
        onClose();
      }
    } catch (err) {
      setError('Error inesperado al guardar');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between p-6 border-b">
        <h3 className="text-lg font-medium text-gray-900">
          {isEditing ? 'Editar Sección' : 'Nueva Sección'}
        </h3>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Eye className="w-4 h-4 mr-2" />
            {preview ? 'Editar' : 'Vista Previa'}
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6">
        {preview ? (
          <div className="border rounded-lg p-6 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              {watchedValues.image_url && (
                <div className="mb-6">
                  <img
                    src={watchedValues.image_url}
                    alt={watchedValues.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="text-center">
                {watchedValues.subtitle && (
                  <p className="text-sm text-indigo-600 font-medium mb-2">
                    {watchedValues.subtitle}
                  </p>
                )}
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {watchedValues.title || 'Título de ejemplo'}
                </h2>
                <div className="prose max-w-none text-gray-600 mb-6">
                  {watchedValues.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
                {watchedValues.button_text && (
                  <a
                    href={watchedValues.button_url || '#'}
                    className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {watchedValues.button_text}
                  </a>
                )}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la Sección *
                </label>
                <input
                  {...register('section_name', { required: 'El nombre de la sección es requerido' })}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="ej: hero, about, services"
                />
                {errors.section_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.section_name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Orden
                </label>
                <input
                  {...register('order_index', { 
                    required: 'El orden es requerido',
                    min: { value: 1, message: 'El orden debe ser mayor a 0' }
                  })}
                  type="number"
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                {errors.order_index && (
                  <p className="mt-1 text-sm text-red-600">{errors.order_index.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título *
              </label>
              <input
                {...register('title', { required: 'El título es requerido' })}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Título principal de la sección"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtítulo
              </label>
              <input
                {...register('subtitle')}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Subtítulo opcional"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenido *
              </label>
              <textarea
                {...register('content', { required: 'El contenido es requerido' })}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Contenido de la sección..."
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL de Imagen
              </label>
              <input
                {...register('image_url')}
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Texto del Botón
                </label>
                <input
                  {...register('button_text')}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Más información"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL del Botón
                </label>
                <input
                  {...register('button_url')}
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="https://ejemplo.com"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                {...register('is_active')}
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Sección activa (visible en el sitio web)
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
import React from 'react';
import { useContent } from '../hooks/useContent';
import { ExternalLink, ArrowDown, Star, Users, Award, Zap } from 'lucide-react';

export const PublicSite: React.FC = () => {
  const { content, loading } = useContent();

  const activeContent = content
    .filter(item => item.is_active)
    .sort((a, b) => a.order_index - b.order_index);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-700 border-t-yellow-400 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full bg-yellow-400/20 animate-pulse"></div>
          </div>
          <p className="text-gray-300 text-lg font-medium">Cargando experiencia...</p>
        </div>
      </div>
    );
  }

  if (activeContent.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="text-center max-w-2xl mx-auto px-6 relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-2xl mb-6 shadow-2xl">
              <Zap className="w-10 h-10 text-gray-900" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Sitio en Construcción
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Estamos creando algo extraordinario. Una experiencia digital que transformará la manera en que interactúas con nuestro contenido.
          </p>
          <div className="flex items-center justify-center space-x-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">Calidad Premium</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">Experiencia Única</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">Innovación</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Hero Section with Enhanced Background */}
      {activeContent[0] && (
        <section className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
          {/* Dark overlay pattern */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Subtle animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>
          
          {/* Geometric patterns */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-32 h-32 border border-yellow-400 rotate-45 animate-spin-slow"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 border border-gray-600 rotate-12 animate-bounce-slow"></div>
            <div className="absolute top-1/2 right-20 w-16 h-16 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            {activeContent[0].image_url && (
              <div className="mb-12">
                <div className="relative inline-block">
                  <img
                    src={activeContent[0].image_url}
                    alt={activeContent[0].title}
                    className="w-full max-w-2xl mx-auto h-80 md:h-96 object-cover rounded-3xl shadow-2xl ring-1 ring-gray-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-3xl"></div>
                </div>
              </div>
            )}
            
            {activeContent[0].subtitle && (
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full text-yellow-400 font-medium text-sm tracking-wide">
                  {activeContent[0].subtitle}
                </span>
              </div>
            )}
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white">
              {activeContent[0].title}
            </h1>
            
            <div className="max-w-4xl mx-auto mb-12">
              {activeContent[0].content.split('\n').map((paragraph, pIndex) => (
                paragraph.trim() && (
                  <p key={pIndex} className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed font-light">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              {activeContent[0].button_text && activeContent[0].button_url && (
                <a
                  href={activeContent[0].button_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center px-8 py-4 bg-yellow-400 text-gray-900 font-bold text-lg rounded-2xl hover:bg-yellow-300 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/25 transform hover:-translate-y-1"
                >
                  {activeContent[0].button_text}
                  <ExternalLink className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </a>
              )}
              
              <button className="inline-flex items-center px-8 py-4 bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-white font-semibold text-lg rounded-2xl hover:bg-gray-700/80 transition-all duration-300">
                Nuestros servicios
                
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="w-6 h-6 text-gray-400" />
          </div>
        </section>
      )}

      {/* Content Sections */}
      {activeContent.slice(1).map((section, index) => (
        <section
          key={section.id}
          className={`py-24 px-6 relative ${
            index % 2 === 0 
              ? 'bg-gray-900' 
              : 'bg-gray-800'
          }`}
        >
          {/* Background decorations for alternate sections */}
          {index % 2 !== 0 && (
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-700/20 rounded-full blur-3xl"></div>
            </div>
          )}

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center">
              {section.image_url && (
                <div className="mb-16">
                  <div className="relative inline-block">
                    <img
                      src={section.image_url}
                      alt={section.title}
                      className="w-full max-w-4xl mx-auto h-64 md:h-96 object-cover rounded-3xl shadow-2xl ring-1 ring-gray-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"></div>
                  </div>
                </div>
              )}
              
              {section.subtitle && (
                <div className="mb-6">
                  <span className="inline-flex items-center px-4 py-2 bg-yellow-400 text-gray-900 font-bold text-sm rounded-full tracking-wide">
                    {section.subtitle}
                  </span>
                </div>
              )}
              
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                {section.title}
              </h2>
              
              <div className="max-w-4xl mx-auto mb-12">
                {section.content.split('\n').map((paragraph, pIndex) => (
                  paragraph.trim() && (
                    <p key={pIndex} className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
              
              {section.button_text && section.button_url && (
                <div className="mt-12">
                  <a
                    href={section.button_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center px-8 py-4 bg-yellow-400 text-gray-900 font-bold text-lg rounded-2xl hover:bg-yellow-300 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    {section.button_text}
                    <ExternalLink className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}
      
      {/* Enhanced Footer */}
      <footer className="bg-black text-white py-6 relative overflow-hidden border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">          
          <div className="border-t border-gray-800 pt-4">
            <p className="text-gray-400 text-sm m-0">
              © BF COMPANY. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
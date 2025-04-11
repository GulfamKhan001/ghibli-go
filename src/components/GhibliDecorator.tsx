
import React from 'react';

const GhibliDecorator = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Animated clouds */}
      <div className="absolute top-10 left-[10%] w-16 h-8 bg-white/5 rounded-full blur-md animate-float" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-20 right-[15%] w-24 h-10 bg-white/5 rounded-full blur-md animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-36 left-[20%] w-20 h-10 bg-white/5 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }}></div>
      
      {/* Gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-ghibli-blue/10 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-ghibli-purple/10 to-transparent"></div>
    </div>
  );
};

export default GhibliDecorator;

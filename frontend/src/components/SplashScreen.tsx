import React, { useEffect, useState } from 'react';
import { Heart, Activity, Stethoscope } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Allow fade out animation
    }, 1000); // Show for 3 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-lightblue-200 overflow-hidden duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

      {/* Floating medical icons */}
      <div className="absolute inset-0">
        <Heart className="absolute top-1/4 left-1/4 text-white animate-pulse" size={40} />
        <Activity className="absolute top-3/4 right-1/4 text-white  animate-pulse" size={35} style={{ animationDelay: '1s' }} />
        <Stethoscope className="absolute bottom-1/4 left-1/3 text-white animate-pulse" size={45} style={{ animationDelay: '2s' }} />
      </div>

      {/* Main content */}
      <div className="text-center z-10">
        <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in">
          MyHealth
        </h1>
        <p className="text-xl text-blue-100 animate-fade-in">
          Hospital Management System
        </p>
        <div className="mt-8 flex justify-center">
          <div className="w-16 h-1 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
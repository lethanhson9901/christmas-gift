import React, { useState, useEffect, useRef } from 'react';
import { Gift, Sparkles, Star, Music } from 'lucide-react';

const ChristmasGift = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showMagicCircle, setShowMagicCircle] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/jingle-bells.mp3');
    audioRef.current.loop = true;

    const handleClick = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(console.warn);
        document.removeEventListener('click', handleClick);
      }
    };

    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShowSparkles(true);
      setShowMagicCircle(true);
      setTimeout(() => setShowSparkles(false), 6000);
      setTimeout(() => setShowMagicCircle(false), 4000);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(console.warn);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isPlaying]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-950 via-green-950 to-red-950 overflow-hidden">
      {/* Northern Lights Effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 animate-aurora"></div>
      </div>

      {/* Snow Container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="snow"></div>
        <div className="snow"></div>
        <div className="snow"></div>
      </div>

      {/* Music Control */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsPlaying(!isPlaying);
        }}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
      >
        <Music className={`w-6 h-6 ${isPlaying ? 'text-green-400' : 'text-white/60'}`} />
      </button>

      {/* Magical Circle */}
      {showMagicCircle && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-96 h-96">
            <div className="absolute inset-0 border-4 border-yellow-300/50 rounded-full animate-magic-circle-1"></div>
            <div className="absolute inset-0 border-4 border-red-300/50 rounded-full animate-magic-circle-2"></div>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-1 h-32 bg-gradient-to-t from-yellow-500/0 via-yellow-500/70 to-yellow-500/0"
                style={{
                  transform: `rotate(${i * 45}deg) translateY(-16rem)`,
                  transformOrigin: 'bottom center',
                }}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* Main Gift Container */}
      <div
        className={`relative transform transition-all duration-3000 cursor-pointer
          ${isOpen ? 'scale-125' : 'scale-100'}
          ${isHovered ? 'animate-float-gentle' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!isOpen ? (
          <div className="relative group">
            {/* Gift Box */}
            <div className="relative z-10 transform transition-transform duration-500 group-hover:scale-110">
              <Gift 
                size={140}
                className="text-red-400 drop-shadow-lg transition-all duration-1000 hover:text-red-300"
              />
              {/* Ribbon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="absolute w-full h-3 bg-gradient-to-r from-yellow-300/50 via-yellow-300 to-yellow-300/50 animate-shimmer"></div>
                <div className="absolute w-3 h-full bg-gradient-to-b from-yellow-300/50 via-yellow-300 to-yellow-300/50 animate-shimmer"></div>
              </div>
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-500 rounded-lg"></div>
            </div>

            {/* Ambient Light */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="w-48 h-48 bg-red-500/20 rounded-full blur-xl animate-pulse-slow"></div>
            </div>

            {/* Decorative Elements */}
            {[...Array(4)].map((_, i) => (
              <Star
                key={i}
                size={24}
                className="absolute text-yellow-300 animate-twinkle-stagger"
                style={{
                  top: `${Math.sin(i * Math.PI / 2) * 100}%`,
                  left: `${Math.cos(i * Math.PI / 2) * 100}%`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>
        ) : (
          <div className="transition-all duration-3000">
            {/* Gift Content Container */}
            <div className="relative w-96 h-96">
              {/* Magic Emergence Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-white/20 rounded-lg backdrop-blur-sm animate-emerge">
                <img
                  src="/api/placeholder/400/320"
                  alt="Christmas surprise" 
                  className="w-full h-full object-contain transform animate-float-up"
                />
                
                {/* Magical Border */}
                <div className="absolute inset-0 border-4 border-gradient animate-border-glow"></div>
                
                {/* Sparkle Overlay */}
                {showSparkles && (
                  <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                      <Sparkles
                        key={i}
                        size={24}
                        className="absolute text-yellow-300/80 animate-sparkle-float"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 3}s`,
                          animationDuration: `${3 + Math.random() * 2}s`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message */}
      <p 
        className={`mt-8 text-2xl text-center font-bold bg-gradient-to-r from-red-300 via-yellow-200 to-red-300 bg-clip-text text-transparent
          transition-all duration-1000 ${isOpen ? 'animate-float-gentle scale-110' : ''}`}
      >
        {!isOpen ? '✨ Click to reveal your magical Christmas surprise! ✨' : '🌟 May your Christmas be filled with wonder! 🌟'}
      </p>

      <style jsx global>{`
        .snow {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: -8px;
          animation: snowfall 10s linear infinite;
          opacity: 0;
        }

        .snow:nth-child(1) {
          left: 25%;
          animation-delay: 0s;
        }

        .snow:nth-child(2) {
          left: 50%;
          animation-delay: 2s;
        }

        .snow:nth-child(3) {
          left: 75%;
          animation-delay: 4s;
        }

        @keyframes snowfall {
          0% {
            transform: translateY(-10vh) translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(20px);
            opacity: 0;
          }
        }

        @keyframes aurora {
          0%, 100% { transform: translateX(-25%) translateY(-25%) rotate(0deg); opacity: 0.5; }
          50% { transform: translateX(25%) translateY(25%) rotate(180deg); opacity: 0.8; }
        }

        @keyframes emerge {
          0% { 
            transform: scale(0.1);
            opacity: 0;
            filter: blur(10px);
          }
          60% {
            transform: scale(1.1);
            opacity: 0.8;
            filter: blur(5px);
          }
          100% { 
            transform: scale(1);
            opacity: 1;
            filter: blur(0);
          }
        }

        @keyframes float-up {
          0% {
            transform: translateY(50vh) scale(0.5);
            opacity: 0;
          }
          50% {
            transform: translateY(-2vh) scale(1.05);
            opacity: 0.8;
          }
          75% {
            transform: translateY(1vh) scale(0.98);
            opacity: 0.9;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes float-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes sparkle-float {
          0%, 100% { 
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% { 
            transform: translateY(-20px) scale(1.2);
            opacity: 0.5;
          }
        }

        @keyframes shimmer {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }

        @keyframes magic-circle-1 {
          0% { transform: scale(0.8) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
          100% { transform: scale(2) rotate(360deg); opacity: 0; }
        }

        @keyframes magic-circle-2 {
          0% { transform: scale(0.8) rotate(360deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
          100% { transform: scale(2) rotate(0deg); opacity: 0; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }

        @keyframes twinkle-stagger {
          0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.3; transform: scale(0.8) rotate(180deg); }
        }

        @keyframes border-glow {
          0%, 100% { border-color: rgba(234, 179, 8, 0.3); }
          50% { border-color: rgba(234, 179, 8, 0.8); }
        }

        .animate-float-gentle {
          animation: float-gentle 3s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        .animate-aurora {
          animation: aurora 15s ease-in-out infinite;
        }

        .animate-emerge {
          animation: emerge 3s ease-out forwards;
        }

        .animate-float-up {
          animation: float-up 4s ease-out forwards;
        }

        .animate-sparkle-float {
          animation: sparkle-float 3s ease-in-out infinite;
        }

        .animate-magic-circle-1 {
          animation: magic-circle-1 4s ease-out forwards;
        }

        .animate-magic-circle-2 {
          animation: magic-circle-2 4s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-twinkle-stagger {
          animation: twinkle-stagger 2s ease-in-out infinite;
        }

        .border-gradient {
          animation: border-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ChristmasGift;
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";

interface ZodiacWheelProps {
  selectedId?: string;
  onConstellationClick?: (id: string) => void;
}

export default function ZodiacWheel({ selectedId, onConstellationClick }: ZodiacWheelProps) {
  const [, navigate] = useLocation();
  const [positions, setPositions] = useState<Record<string, { top: string, left: string, right?: string, bottom?: string }>>({});

  const { data: constellations, isLoading } = useQuery({
    queryKey: ["/api/constellations"],
  });

  useEffect(() => {
    if (constellations) {
      // Calculate positions for the zodiac signs on the wheel
      const newPositions: Record<string, { top: string, left: string, right?: string, bottom?: string }> = {};
      
      constellations.forEach((constellation: any, index: number) => {
        const angle = (index * 30) * (Math.PI / 180);
        const radius = 42; // % of container
        
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        
        if (x > 50 && y < 50) {
          // Top right quadrant
          newPositions[constellation.id] = { top: `${y}%`, right: `${100-x}%` };
        } else if (x > 50 && y > 50) {
          // Bottom right quadrant
          newPositions[constellation.id] = { bottom: `${100-y}%`, right: `${100-x}%` };
        } else if (x < 50 && y > 50) {
          // Bottom left quadrant
          newPositions[constellation.id] = { bottom: `${100-y}%`, left: `${x}%` };
        } else {
          // Top left quadrant
          newPositions[constellation.id] = { top: `${y}%`, left: `${x}%` };
        }
      });
      
      setPositions(newPositions);
    }
  }, [constellations]);

  const handleClick = (id: string) => {
    if (onConstellationClick) {
      onConstellationClick(id);
    } else {
      navigate(`/constellation/${id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="relative w-full aspect-square my-6 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-square my-6">
      {/* Zodiac Circle */}
      <div className="absolute inset-0 rounded-full border border-gray-700 zodiac-wheel">
        {/* Zodiac coordinates */}
        <div className="absolute inset-0 opacity-30">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="49" fill="none" stroke="#333" strokeWidth="0.5"/>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#333" strokeWidth="0.5"/>
            <circle cx="50" cy="50" r="30" fill="none" stroke="#333" strokeWidth="0.5"/>
            <circle cx="50" cy="50" r="20" fill="none" stroke="#333" strokeWidth="0.5"/>
            <line x1="0" y1="50" x2="100" y2="50" stroke="#333" strokeWidth="0.5"/>
            <line x1="50" y1="0" x2="50" y2="100" stroke="#333" strokeWidth="0.5"/>
            {/* 30 degree lines */}
            <line x1="50" y1="50" x2="93.3" y2="75" stroke="#333" strokeWidth="0.5"/>
            <line x1="50" y1="50" x2="93.3" y2="25" stroke="#333" strokeWidth="0.5"/>
            <line x1="50" y1="50" x2="75" y2="93.3" stroke="#333" strokeWidth="0.5"/>
            <line x1="50" y1="50" x2="25" y2="93.3" stroke="#333" strokeWidth="0.5"/>
            <line x1="50" y1="50" x2="6.7" y2="75" stroke="#333" strokeWidth="0.5"/>
            <line x1="50" y1="50" x2="6.7" y2="25" stroke="#333" strokeWidth="0.5"/>
            <line x1="50" y1="50" x2="75" y2="6.7" stroke="#333" strokeWidth="0.5"/>
            <line x1="50" y1="50" x2="25" y2="6.7" stroke="#333" strokeWidth="0.5"/>
          </svg>
        </div>
        
        {/* Zodiac Signs Positions */}
        {constellations?.map((constellation: any) => (
          <div
            key={constellation.id}
            className="absolute"
            style={positions[constellation.id]}
          >
            <div 
              className={`${
                selectedId === constellation.id 
                  ? 'w-12 h-12 border-2 border-primary' 
                  : 'w-10 h-10 hover:border hover:border-primary'
              } bg-[#1a1a1a] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300`}
              onClick={() => handleClick(constellation.id)}
            >
              {/* Display appropriate zodiac symbol */}
              <span 
                className={`${
                  selectedId === constellation.id 
                    ? 'text-2xl' 
                    : 'text-xl opacity-60'
                } text-[#FFD700] zodiac-icon ${selectedId === constellation.id ? 'active' : ''}`}
              >
                {constellation.symbol}
              </span>
            </div>
          </div>
        ))}
        
        {/* Center Dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full"></div>
      </div>
    </div>
  );
}

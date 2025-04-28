import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Constellation } from "@/lib/types";

interface ConstellationDetailsProps {
  constellation: Constellation;
}

export default function ConstellationDetails({ constellation }: ConstellationDetailsProps) {
  return (
    <div className="hidden md:block w-1/2 bg-[#1e1e1e] p-6 overflow-y-auto border-l border-gray-800">
      {/* Constellation Image */}
      <div className="mb-8 border border-primary/30 rounded-lg overflow-hidden shadow-lg">
        <div className="relative">
          <img 
            src={constellation.imageUrl} 
            alt={`${constellation.name} constellation`} 
            className="w-full h-auto object-cover aspect-video"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4">
              <span className="text-sm text-primary font-medium">{constellation.element} Element</span>
            </div>
          </div>
        </div>
      </div>

      {/* Details Title */}
      <h2 className="text-3xl font-playfair font-bold mb-4">{constellation.name}</h2>

      {/* Details Description */}
      <div className="mb-6">
        <p className="text-sm text-gray-300 leading-relaxed mb-4">
          {constellation.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <img 
              src={constellation.skyImageUrl} 
              alt={`${constellation.name} star map`} 
              className="w-full h-auto object-cover"
            />
            <div className="p-2 bg-[#17171a] text-xs text-gray-400 text-center">
              Star Map
            </div>
          </div>
          
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <img 
              src={constellation.historyImageUrl} 
              alt={`${constellation.name} historical illustration`} 
              className="w-full h-auto object-cover"
            />
            <div className="p-2 bg-[#17171a] text-xs text-gray-400 text-center">
              Historical Illustration
            </div>
          </div>
        </div>
      </div>

      {/* Astronomical Data */}
      <div className="mb-6 bg-[#17171a] p-4 rounded-lg border border-gray-800">
        <h3 className="text-lg font-bold mb-4 text-primary">Astronomical Data</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-1">Right ascension</h4>
            <p className="text-base mb-3">{constellation.rightAscension}</p>
            
            <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-1">Declination</h4>
            <p className="text-base mb-3">{constellation.declination}</p>
            
            <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-1">Area</h4>
            <p className="text-base mb-3">{constellation.areaDegrees} square degrees</p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-1">Size rank</h4>
            <p className="text-base mb-3">{constellation.sizeRank}</p>
            
            <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-1">Brightest stars</h4>
            <p className="text-base mb-3">{constellation.brightestStars}</p>
            
            <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-1">Observation</h4>
            <p className="text-base mb-0">{constellation.observationInfo} {constellation.observationPeriod}</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="relative mt-8">
        <Button className="bg-white text-[#121212] font-medium py-6 px-6 rounded-md w-full hover:bg-gray-200 transition-colors">
          JOIN THE STUDY
        </Button>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <PlusIcon className="text-[#121212]" />
        </div>
      </div>
    </div>
  );
}

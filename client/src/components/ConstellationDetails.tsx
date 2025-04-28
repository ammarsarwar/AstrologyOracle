import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Constellation } from "@/lib/types";

interface ConstellationDetailsProps {
  constellation: Constellation;
}

export default function ConstellationDetails({ constellation }: ConstellationDetailsProps) {
  return (
    <div className="hidden md:block w-1/2 bg-[#1e1e1e] p-4 overflow-y-auto border-l border-gray-800">
      {/* Constellation Image */}
      <div className="mb-6 border border-gray-700 rounded-lg overflow-hidden">
        <img 
          src={constellation.skyImageUrl} 
          alt={`${constellation.name} constellation in the night sky`} 
          className="w-full h-auto object-cover aspect-video"
        />
      </div>

      {/* Details Title */}
      <h2 className="text-3xl font-playfair font-bold mb-4">{constellation.name}</h2>

      {/* Details Description */}
      <div className="mb-6">
        <p className="text-sm text-gray-300 leading-relaxed">
          {constellation.description}
        </p>
      </div>

      {/* Astronomical Data */}
      <div className="mb-4">
        <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-1">Right ascension</h3>
        <p className="text-xl mb-3">{constellation.rightAscension}</p>
        
        <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-1">Declination</h3>
        <p className="text-xl mb-3">{constellation.declination}</p>
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

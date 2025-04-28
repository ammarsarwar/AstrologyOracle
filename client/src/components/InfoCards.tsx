import { Constellation } from "@/lib/types";
import { Expand, Star, Maximize2, Moon } from "lucide-react";

interface InfoCardsProps {
  constellation: Constellation;
}

export default function InfoCards({ constellation }: InfoCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4">
      {/* Card 1 */}
      <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700">
        <div className="flex items-center mb-2 text-primary">
          <Expand size={14} />
        </div>
        <h3 className="text-sm font-medium mb-1">The constellation</h3>
        <p className="text-xs text-gray-400">
          {constellation.name} occupies an area of {constellation.areaDegrees} square degrees of the starry sky.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700">
        <div className="flex items-center mb-2 text-primary">
          <Star size={14} />
        </div>
        <h3 className="text-sm font-medium mb-1">The constellation of {constellation.name} with the largest angular area</h3>
        <p className="text-xs text-gray-400">occupies the {constellation.sizeRank} place.</p>
      </div>

      {/* Card 3 */}
      <div className="bg-accent-light p-4 rounded-lg border border-accent-gold">
        <div className="flex items-center mb-2 text-primary">
          <Maximize2 size={14} />
        </div>
        <h3 className="text-sm font-medium mb-1">{constellation.name} borders on {constellation.bordersCount} constellations -</h3>
        <p className="text-xs">{constellation.borders}.</p>
      </div>

      {/* Card 4 */}
      <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700">
        <div className="flex items-center mb-2 text-primary">
          <Star size={14} />
        </div>
        <h3 className="text-sm font-medium mb-1">
          The brightest stars forming the {constellation.name} constellation are {constellation.brightestStars}.
        </h3>
      </div>

      {/* Card 5 */}
      <div className="col-span-2 bg-[#1a1a1a] p-4 rounded-lg border border-gray-700">
        <div className="flex items-center mb-2 text-primary">
          <Moon size={14} />
        </div>
        <h3 className="text-sm font-medium mb-1">
          {constellation.observationInfo}
        </h3>
        <p className="text-xs text-gray-400">{constellation.observationPeriod}</p>
      </div>
    </div>
  );
}

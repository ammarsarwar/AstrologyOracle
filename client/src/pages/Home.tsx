import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ZodiacWheel from "@/components/ZodiacWheel";

export default function Home() {
  const [_, navigate] = useLocation();
  const { toast } = useToast();

  const { data: constellations, isLoading, error } = useQuery({
    queryKey: ["/api/constellations"],
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading constellations",
        description: "There was a problem loading the zodiac data.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleConstellationClick = (id: string) => {
    navigate(`/constellation/${id}`);
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col items-center justify-center">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h1 className="text-5xl font-playfair font-bold mb-4">Zodiac Constellations</h1>
          <p className="text-gray-400 mb-8">
            Explore the 12 zodiac constellations located along the ecliptic - the visible annual
            path of the Sun among the stars. Discover their mythology, astronomical properties,
            and significance since ancient times.
          </p>
          <Button 
            className="bg-white text-background hover:bg-gray-200"
            onClick={() => constellations && handleConstellationClick(constellations[0].id)}
            disabled={isLoading}
          >
            Explore Constellations
          </Button>
        </div>

        {isLoading ? (
          <div className="w-full flex justify-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Failed to load constellations. Please try again.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
            {constellations?.map((constellation: any) => (
              <div 
                key={constellation.id}
                className="constellation-card bg-[#1e1e1e] rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => handleConstellationClick(constellation.id)}
              >
                <div className="relative aspect-square">
                  <img 
                    src={constellation.imageUrl} 
                    alt={constellation.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-3xl text-primary opacity-90">{constellation.symbol}</span>
                      <span className="px-2 py-1 bg-primary/20 rounded text-xs text-primary uppercase font-bold">{constellation.element}</span>
                    </div>
                    <h3 className="text-xl font-playfair font-bold">{constellation.name}</h3>
                    <p className="text-gray-300 text-sm">{constellation.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="hidden md:flex md:w-1/2 p-6 bg-[#1a1a1a] border-l border-gray-800 items-center justify-center">
        <div className="w-full max-w-xl">
          <h2 className="text-3xl font-playfair font-bold mb-6 text-center">
            Interactive Zodiac Wheel
          </h2>
          <ZodiacWheel onConstellationClick={handleConstellationClick} />
        </div>
      </div>
    </div>
  );
}

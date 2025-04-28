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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto">
            {constellations?.map((constellation: any) => (
              <div 
                key={constellation.id}
                className="constellation-card bg-[#1e1e1e] rounded-xl p-4 cursor-pointer"
                onClick={() => handleConstellationClick(constellation.id)}
              >
                <h3 className="text-xl font-playfair font-bold mb-2">{constellation.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{constellation.date}</p>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img 
                    src={constellation.imageUrl} 
                    alt={constellation.name}
                    className="w-full h-full object-cover"
                  />
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

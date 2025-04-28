import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { useToast } from "@/hooks/use-toast";
import ZodiacWheel from "@/components/ZodiacWheel";
import ConstellationDetails from "@/components/ConstellationDetails";
import InfoCards from "@/components/InfoCards";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Heart, Share2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ConstellationView() {
  const [, params] = useRoute("/constellation/:id");
  const id = params?.id;
  const { toast } = useToast();
  const [isFavorited, setIsFavorited] = useState(false);

  const { data: constellation, isLoading, error } = useQuery({
    queryKey: [`/api/constellations/${id}`],
    enabled: !!id,
  });

  const { data: favorites } = useQuery({
    queryKey: ["/api/favorites"],
  });

  const favoriteMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/favorites", { 
        constellationId: id,
        action: isFavorited ? "remove" : "add"
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({
        title: isFavorited ? "Removed from favorites" : "Added to favorites",
        duration: 2000,
      });
      setIsFavorited(!isFavorited);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive",
      });
    }
  });

  const shareMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/share", { constellationId: id });
    },
    onSuccess: () => {
      toast({
        title: "Share link created",
        description: "Link copied to clipboard",
        duration: 2000,
      });
      navigator.clipboard.writeText(window.location.href);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create share link",
        variant: "destructive",
      });
    }
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading constellation",
        description: "There was a problem loading the data.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  useEffect(() => {
    if (favorites && id) {
      setIsFavorited(favorites.includes(id));
    }
  }, [favorites, id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !constellation) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Constellation not found</h2>
          <p className="text-gray-400 mb-6">The constellation you are looking for doesn't exist or couldn't be loaded.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Left Panel - Zodiac Wheel */}
      <section className="hidden md:block w-1/4 border-r border-gray-800 p-4 overflow-y-auto bg-[#1e1e1e]">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Zodiac constellations</h2>
          <p className="text-sm text-gray-400">
            Zodiac constellations — 12 constellations located along the ecliptic, the visible annual
            path of the Sun among the stars. The name is due to the fact that most of the zodiac
            constellations have been named after animals since ancient times.
          </p>
        </div>
        
        <ZodiacWheel selectedId={id} />
      </section>

      {/* Main Content Area */}
      <section className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Current Zodiac Display (Middle Section) */}
        <div className="w-full md:w-1/2 p-4 overflow-y-auto">
          {/* Zodiac Title and Actions */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-5xl font-playfair font-bold">{constellation.name}</h1>
            <div className="flex space-x-3">
              <button 
                className={`text-xl ${isFavorited ? 'text-primary' : 'text-gray-400 hover:text-primary'} transition-colors`}
                onClick={() => favoriteMutation.mutate()}
                disabled={favoriteMutation.isPending}
              >
                <Heart className={isFavorited ? "fill-primary" : ""} />
              </button>
              <button 
                className="text-xl text-gray-400 hover:text-white transition-colors"
                onClick={() => shareMutation.mutate()}
                disabled={shareMutation.isPending}
              >
                <Share2 />
              </button>
              <button className="text-xl text-gray-400 hover:text-white transition-colors">
                <MoreVertical />
              </button>
            </div>
          </div>

          {/* Zodiac Illustrations */}
          <div className="mb-6 flex flex-col space-y-4">
            <div className="border border-gray-700 rounded-lg overflow-hidden">
              <img 
                src={constellation.historyImageUrl} 
                alt={`Historical illustration of ${constellation.name}`} 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Information Cards Grid */}
          <InfoCards constellation={constellation} />
        </div>

        {/* Details Panel (Right Section) */}
        <ConstellationDetails constellation={constellation} />
      </section>
    </div>
  );
}

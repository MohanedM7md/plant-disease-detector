import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
interface PlantSelectorProps {
  selectedPlant: string | null;
  onSelect: (plant: string) => void;
}

interface Plant {
  id: string;
  name: string;
  icon?: string;
  image?: string;
  color: string;
  bgColor: string;
  borderColor: string;
  selectedBg: string;
}

const plants: Plant[] = [
        {
      id: "apple",
      name: "Apple",
      icon: "🍎",
      image: "/plants/apple.png",
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-green-200",
      selectedBg: "bg-green-100",
    },

    {
        id: "bell_pepper",
        name: "Bell Pepper",
        icon: "🫑",
        image: "/plants/pepper.png",
        color: "from-lime-400 to-lime-600",
        bgColor: "bg-lime-50",
        borderColor: "border-lime-200",
        selectedBg: "bg-lime-100",
    },
    {
        id: "grape",
        name: "Grape",
        icon: "🍇",
        color: "from-purple-400 to-purple-600",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        selectedBg: "bg-purple-100",
    },

{
  id: "potato",
  name: "Potato",
  icon: "🥔",
  color: "from-amber-400 to-amber-600",
  bgColor: "bg-amber-50",
  borderColor: "border-amber-200",
  selectedBg: "bg-amber-100",
},

    {
        id: "strawberry",
        name: "Strawberry",
        icon: "🍓",
        image: "/plants/strawberry.png",
    color: "from-pink-400 to-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    selectedBg: "bg-pink-100",
},
    {
        id: "tomato",
        name: "Tomato",
        icon: "🍅",
        image: "/plants/tomato.png",
        color: "from-red-400 to-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        selectedBg: "bg-red-100",
    },
];

const PlantSelector = ({ selectedPlant, onSelect }: PlantSelectorProps) => {
  return (
    <div className="w-full">
      <h3 className="font-display text-xl text-foreground mb-4 text-center">
        Select Plant Type
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {plants.map((plant, index) => {
          const isSelected = selectedPlant === plant.id;

          return (
            <button
              key={plant.id}
              onClick={() => onSelect(plant.id)}
              style={{ animationDelay: `${index * 100}ms` }}
              className={cn(
                "group relative p-6 rounded-2xl border-2 transition-all duration-500 ease-out",
                "hover:scale-105 hover:shadow-medium",
                "animate-fade-in-up",
                isSelected
                  ? `${plant.selectedBg} ${plant.borderColor} shadow-medium scale-105`
                  : `${plant.bgColor} border-transparent hover:${plant.borderColor}`
              )}
            >
              {/* Selected Checkmark */}
              {isSelected && (
                <div className="absolute -top-2 -right-1 w-6 h-6 rounded-full bg-gradient-healthy flex items-center justify-center animate-scale-in">
                  <Check className="w-10 h-4 text-emerald-950" />
                </div>
              )}

              {/* Emoji OR Image */}
              <div className="mb-3 flex items-center justify-center h-16">
                {plant.image ? (
                    <img
                        src={plant.image}
                        alt={plant.name}
                        draggable={false}
                        onError={(e) => {
                        e.currentTarget.style.display = "none";
                        }}
                        className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                ) : (
                  <span className="text-5xl transition-transform duration-300 group-hover:scale-110">
                    {plant.icon}
                  </span>
                )}
              </div>

              {/* Name */}
              <p
                className={cn(
                  "font-body font-medium text-sm transition-colors duration-300 text-center",
                  isSelected
                    ? "text-foreground"
                    : "text-muted-foreground group-hover:text-foreground"
                )}
              >
                {plant.name}
              </p>

              {/* Gradient Overlay */}
              <div
                className={cn(
                  "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300",
                  `bg-linear-to-br ${plant.color}`
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PlantSelector;

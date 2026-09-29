export type Trophy = {
  id: string;
  label: string;
  image: string;
};

export const trophies: Trophy[] = [
  {
    id: "world-cup",
    label: "Copa del Mundo",
    image: "/images/trophies/world-cup.webp",
  },
  {
    id: "eurocopa",
    label: "Eurocopa",
    image: "/images/trophies/eurocopa.png",
  },
  {
    id: "laliga",
    label: "La Liga",
    image: "/images/trophies/laliga.png",
  },
  {
    id: "copa-espana",
    label: "Copa del Rey",
    image: "/images/trophies/copa-espana.png",
  },
  {
    id: "supercopa",
    label: "Supercopa de España",
    image: "/images/trophies/supercopa.png",
  },
];

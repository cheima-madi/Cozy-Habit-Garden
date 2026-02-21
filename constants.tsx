
import React from 'react';
import { Sprout, Flower, TreePine, Leaf, Snowflake } from 'lucide-react';
import { PlantType } from './types';

export const PLANT_ICONS: Record<PlantType, React.ReactNode> = {
  succulent: <Leaf className="w-8 h-8 text-emerald-400" />,
  cactus: <Snowflake className="w-8 h-8 text-green-500" />,
  fern: <Sprout className="w-8 h-8 text-teal-500" />,
  flower: <Flower className="w-8 h-8 text-rose-400" />,
  tree: <TreePine className="w-8 h-8 text-emerald-600" />,
};

export const PLANT_COLORS: Record<PlantType, string> = {
  succulent: 'bg-emerald-50',
  cactus: 'bg-green-50',
  fern: 'bg-teal-50',
  flower: 'bg-rose-50',
  tree: 'bg-emerald-50',
};

export const MOTIVATIONAL_QUOTES = [
  "Small steps lead to big results!",
  "Your garden is blooming because of you.",
  "Every drop of effort counts.",
  "Consistency is the sunshine of your life.",
  "Growth takes time, be patient with yourself.",
  "You're doing amazing today!",
  "Keep nurturing your dreams.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
];


import React from 'react';
import { Habit } from '../types';
import { PLANT_ICONS, PLANT_COLORS } from '../constants';
import { CheckCircle2, Moon, Trash2, Heart } from 'lucide-react';

interface HabitCardProps {
  habit: Habit;
  isCompletedToday: boolean;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, isCompletedToday, onComplete, onDelete }) => {
  // Visual growth stage calculation
  // Stage 0: 60%, 1: 70%, 2: 80%, 3: 90%, 4: 100%
  const growthScale = 0.6 + (habit.growthStage * 0.1);

  return (
    <div 
      className={`group relative flex flex-col items-center p-6 rounded-[2.5rem] transition-all duration-500 border-2 ${
        isCompletedToday 
          ? 'border-emerald-100 bg-white shadow-xl shadow-emerald-900/5' 
          : 'border-slate-100 bg-slate-50/50 shadow-sm opacity-90'
      }`}
    >
      <button 
        onClick={() => onDelete(habit.id)}
        className="absolute top-5 right-5 p-2 text-slate-200 hover:text-rose-400 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
        title="Remove habit"
      >
        <Trash2 size={16} />
      </button>

      {/* Plant Visual Area */}
      <div className={`relative flex items-center justify-center w-28 h-28 mb-4 rounded-full ${PLANT_COLORS[habit.plantType]} transition-all duration-700 ${!isCompletedToday ? 'grayscale brightness-95 opacity-60' : 'shadow-inner'}`}>
        <div 
          style={{ transform: `scale(${growthScale})` }}
          className={`transition-transform duration-1000 ease-out flex items-center justify-center ${isCompletedToday ? 'animate-pulse' : ''}`}
        >
          {PLANT_ICONS[habit.plantType]}
        </div>
        
        {!isCompletedToday && (
          <div className="absolute -top-1 -right-1 bg-white p-1 rounded-full shadow-sm animate-bounce">
            <Moon className="text-slate-400 w-5 h-5" />
          </div>
        )}
        
        {isCompletedToday && (
          <div className="absolute -top-1 -right-1 bg-emerald-400 p-1 rounded-full shadow-sm animate-in zoom-in fade-in duration-300">
            <Heart className="text-white w-4 h-4 fill-white" />
          </div>
        )}
      </div>

      <div className="text-center w-full px-2">
        <h3 className="text-lg font-bold text-slate-700 mb-0.5 line-clamp-1">{habit.name}</h3>
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter mb-5">
          {isCompletedToday ? (
            <span className="text-emerald-400">Blooming Happily</span>
          ) : (
            <span>Resting in Shade</span>
          )}
          {habit.growthStage > 0 && ` • Level ${habit.growthStage}`}
        </p>
      </div>

      <button
        onClick={() => !isCompletedToday && onComplete(habit.id)}
        disabled={isCompletedToday}
        className={`w-full py-4 px-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all duration-300 relative overflow-hidden ${
          isCompletedToday
            ? 'bg-emerald-50 text-emerald-600 cursor-default ring-1 ring-emerald-100'
            : 'bg-white text-emerald-600 border border-emerald-200 hover:bg-emerald-50 hover:shadow-md hover:-translate-y-0.5 active:scale-95 shadow-sm'
        }`}
      >
        {isCompletedToday ? (
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} />
            <span className="text-sm">Nurtured Today</span>
          </div>
        ) : (
          <span className="text-sm">Complete Today</span>
        )}
        
        {!isCompletedToday && (
          <div className="absolute inset-0 bg-emerald-400 opacity-0 hover:opacity-5 transition-opacity pointer-events-none" />
        )}
      </button>
    </div>
  );
};

export default HabitCard;

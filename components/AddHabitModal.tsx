
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { PlantType } from '../types';
import { PLANT_ICONS } from '../constants';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, plantType: PlantType) => void;
}

const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [plantType, setPlantType] = useState<PlantType>('succulent');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim(), plantType);
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md p-8 rounded-[2rem] shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-slate-800 mb-6">Plant a New Habit</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-500 mb-2 ml-1">
              Habit Name
            </label>
            <input
              autoFocus
              type="text"
              placeholder="e.g., Morning Meditation"
              className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-emerald-300 transition-colors text-slate-700 font-medium"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={24}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-500 mb-3 ml-1">
              Choose a Plant Buddy
            </label>
            <div className="grid grid-cols-5 gap-3">
              {(Object.keys(PLANT_ICONS) as PlantType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPlantType(type)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
                    plantType === type 
                      ? 'border-emerald-400 bg-emerald-50 text-emerald-600 scale-105' 
                      : 'border-slate-100 hover:border-emerald-100 bg-slate-50 text-slate-300'
                  }`}
                >
                  {PLANT_ICONS[type]}
                  <span className="text-[10px] mt-1 capitalize font-bold">{type}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-emerald-400 hover:bg-emerald-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 transition-all active:scale-[0.98] disabled:opacity-50"
            disabled={!name.trim()}
          >
            Start Growing
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHabitModal;

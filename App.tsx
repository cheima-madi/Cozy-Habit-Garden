
import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Leaf, Sparkles, Coffee } from 'lucide-react';
import { Habit, PlantType } from './types';
import { MOTIVATIONAL_QUOTES } from './constants';
import HabitCard from './components/HabitCard';
import AddHabitModal from './components/AddHabitModal';

const STORAGE_KEY = 'cozy_habit_garden_data_v1';

const getTodayString = () => new Date().toISOString().split('T')[0];

const App: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [today, setToday] = useState(getTodayString());
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  // Initialize data from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setHabits(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load habits', e);
      }
    }
  }, []);

  // Save to LocalStorage whenever habits change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  // Handle auto-reset by checking date periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const current = getTodayString();
      if (current !== today) {
        setToday(current);
      }
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [today]);

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 4000);
  };

  const addHabit = (name: string, plantType: PlantType) => {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : Math.random().toString(36).substring(2, 11);

    const newHabit: Habit = {
      id,
      name,
      plantType,
      lastCompletedDate: null,
      growthStage: 0,
      createdAt: new Date().toISOString(),
    };
    setHabits([...habits, newHabit]);
  };

  const deleteHabit = (id: string) => {
    if (confirm('Are you sure you want to remove this habit? It will disappear from your garden forever.')) {
      setHabits(habits.filter(h => h.id !== id));
    }
  };

  const completeHabit = (id: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        const quote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
        showToast(quote);
        return {
          ...habit,
          lastCompletedDate: today,
          growthStage: Math.min(habit.growthStage + 1, 4)
        };
      }
      return habit;
    }));
  };

  const completionStats = useMemo(() => {
    if (habits.length === 0) return 0;
    const completedCount = habits.filter(h => h.lastCompletedDate === today).length;
    return Math.round((completedCount / habits.length) * 100);
  }, [habits, today]);

  return (
    <div className="min-h-screen flex flex-col max-w-xl mx-auto px-4 py-8 md:py-12 pb-24 md:pb-12">
      {/* Header */}
      <header className="flex flex-col mb-10 text-center animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="bg-emerald-100 p-2 rounded-2xl shadow-sm">
            <Leaf className="text-emerald-500 w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Cozy Habit Garden</h1>
        </div>
        <p className="text-slate-500 font-medium">Nurture your habits, watch your life bloom.</p>
        <div className="mt-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-50 inline-block px-3 py-1 rounded-full self-center">
          {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </header>

      {/* Progress Card */}
      <section className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-emerald-900/5 mb-10 border-2 border-slate-50 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-50" />
        <div className="relative z-10">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-4xl font-black text-emerald-500">{completionStats}%</span>
              <span className="block text-sm font-bold text-slate-400 mt-1 uppercase tracking-wider">Today's Growth</span>
            </div>
            <div className="flex flex-col items-end">
               <Sparkles className="text-amber-400 mb-1 animate-pulse" />
               <span className="text-[10px] font-bold text-slate-300 uppercase">{habits.filter(h => h.lastCompletedDate === today).length}/{habits.length} Tasks</span>
            </div>
          </div>
          <div className="w-full h-4 bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-emerald-300 to-emerald-500 rounded-full transition-all duration-1000 ease-out shadow-sm"
              style={{ width: `${completionStats}%` }}
            />
          </div>
          <p className="mt-4 text-slate-400 text-sm font-medium text-center italic leading-relaxed">
            {completionStats === 100 
              ? "Your garden is fully awake and beautiful! ✨" 
              : completionStats > 50 
                ? "You're doing great! More sunlight is coming." 
                : completionStats > 0 
                  ? "A few sprouts are appearing. Keep going!" 
                  : habits.length > 0 
                    ? "Your plants are sleeping. Give them some love!" 
                    : "Ready to plant your first habit buddy?"}
          </p>
        </div>
      </section>

      {/* Habit Grid */}
      <main className="flex-1">
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-xl font-bold text-slate-700 flex items-center gap-2">
            My Daily Plants
            {habits.length > 0 && (
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg">{habits.length}</span>
            )}
          </h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-600 rounded-2xl hover:bg-emerald-200 transition-all shadow-sm font-bold text-sm"
          >
            <Plus size={18} />
            Add New
          </button>
        </div>

        {habits.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-20">
            {habits.map((habit, index) => (
              <div key={habit.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100 + 200}ms` }}>
                <HabitCard 
                  habit={habit}
                  isCompletedToday={habit.lastCompletedDate === today}
                  onComplete={completeHabit}
                  onDelete={deleteHabit}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in duration-500">
            <div className="bg-slate-50 p-8 rounded-full mb-6">
              <Coffee size={48} className="text-slate-300" />
            </div>
            <p className="text-lg font-medium text-slate-500">The garden is empty...<br/>Start small, plant a seed today.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-6 px-8 py-3 bg-emerald-500 text-white font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-200"
            >
              Plant Your First Habit
            </button>
          </div>
        )}
      </main>

      {/* Motivational Toast */}
      {toast.visible && (
        <div className="fixed bottom-24 sm:bottom-10 left-1/2 -translate-x-1/2 z-[60] bg-slate-800 text-white px-6 py-4 rounded-[2rem] shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 max-w-[90vw]">
          <div className="bg-emerald-500 p-1.5 rounded-full">
            <Sparkles className="text-white" size={16} />
          </div>
          <p className="text-sm font-bold leading-tight">{toast.message}</p>
        </div>
      )}

      {/* Floating Add Button for Mobile */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-600/40 hover:scale-110 active:scale-95 transition-all z-40 sm:hidden group"
      >
        <Plus size={32} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Modals */}
      <AddHabitModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={addHabit}
      />

      <footer className="mt-auto py-8 text-center border-t border-slate-100 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-2 opacity-30">
          <Leaf size={14} />
          <p className="text-[10px] font-bold tracking-widest uppercase">Cozy Habit Garden v1.0</p>
        </div>
        <p className="text-slate-300 text-[10px] font-semibold italic">Growth is not a race, it's a slow blooming process.</p>
      </footer>
    </div>
  );
};

export default App;

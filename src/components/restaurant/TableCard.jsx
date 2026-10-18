import React from 'react';
import { Users, Armchair, CheckCircle2, XCircle } from 'lucide-react';

export const TableCard = ({ table, isSelected, onSelect, guestCount = 1 }) => {
  if (!table) return null;

  const isAvailable = table.available !== false;
  const isSufficientCapacity = table.capacity >= guestCount;

  return (
    <div
      role="button"
      tabIndex={isAvailable ? 0 : -1}
      aria-pressed={isSelected}
      aria-disabled={!isAvailable}
      aria-label={`Table ${table.number}, ${table.type}, capacity ${table.capacity} guests${!isAvailable ? ', already booked' : ''}`}
      data-testid={`table-card-${table.id}`}
      onClick={() => {
        if (isAvailable && onSelect) onSelect(table);
      }}
      onKeyDown={(e) => {
        if (isAvailable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          if (onSelect) onSelect(table);
        }
      }}
      className={`p-4 rounded-2xl border transition-all select-none relative focus:outline-hidden focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${
        !isAvailable
          ? 'bg-slate-100/70 border-slate-200 opacity-60 cursor-not-allowed'
          : isSelected
          ? 'bg-indigo-50/50 border-indigo-600 ring-2 ring-indigo-500/20 shadow-md cursor-pointer'
          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md cursor-pointer'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              isSelected
                ? 'bg-indigo-600 text-white'
                : !isAvailable
                ? 'bg-slate-200 text-slate-500'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Armchair className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900">{table.number}</h4>
            <span className="text-[11px] text-slate-500 font-medium">{table.type}</span>
          </div>
        </div>

        <div>
          {isSelected ? (
            <CheckCircle2 className="w-5 h-5 text-indigo-600 fill-indigo-100" />
          ) : !isAvailable ? (
            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100 flex items-center gap-0.5">
              <XCircle className="w-3 h-3" /> Booked
            </span>
          ) : (
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              Available
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
        <span className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          Max {table.capacity} guests
        </span>

        {isAvailable && !isSufficientCapacity && (
          <span className="text-[10px] text-amber-600 font-semibold">
            (Party has {guestCount})
          </span>
        )}
      </div>
    </div>
  );
};

export default TableCard;

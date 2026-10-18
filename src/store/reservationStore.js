import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { generateAndLogApiKey } from '../utils/apiKeyLogger';

// Custom Logging Middleware (Experiment 6 topic e)
const loggerMiddleware = (config) => (set, get, api) =>
  config(
    (...args) => {
      const prevState = get();
      set(...args);
      const nextState = get();

      // Avoid recursion on actionLogs state update
      const isActionLogsUpdate = args[0] && typeof args[0] === 'object' && 'actionLogs' in args[0];

      const actionKey = typeof args[0] === 'function' ? 'functional_update' : Object.keys(args[0]).join(', ');
      
      if (!isActionLogsUpdate) {
        generateAndLogApiKey(`STORE_STATE_ACTION [${actionKey}]`, {
          mutation: args[0],
          selectedRestaurant: nextState.selectedRestaurant?.name,
          partySize: nextState.guests,
          date: nextState.date,
          time: nextState.time,
          selectedTable: nextState.table ? `Table ${nextState.table.number}` : null
        });
      }

      const logEntry = {
        timestamp: new Date().toLocaleTimeString(),
        action: actionKey,
        payload: args[0],
        prevSelected: prevState.selectedRestaurant?.name || null,
        nextSelected: nextState.selectedRestaurant?.name || null
      };

      console.groupCollapsed(`%c[Zustand Middleware] Action Dispatched @ ${logEntry.timestamp}`, 'color: #6366f1; font-weight: bold;');
      console.log('Previous State:', prevState);
      console.log('Action / Mutation:', args[0]);
      console.log('Next State:', nextState);
      console.groupEnd();

      // Store recent action history in store for inspection
      if (!isActionLogsUpdate && get().actionLogs) {
        const currentLogs = get().actionLogs || [];
        set({ actionLogs: [logEntry, ...currentLogs].slice(0, 15) });
      }
    },
    get,
    api
  );

export const useReservationStore = create(
  loggerMiddleware(
    persist(
      (set) => ({
        // State variables (Experiment 6 topic b)
        selectedRestaurant: null,
        date: '',
        time: '',
        guests: 2,
        table: null,
        specialRequests: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        isLoading: false,
        error: null,
        activeStep: 1,
        actionLogs: [],

        // Actions (Experiment 6 topic c)
        setRestaurant: (restaurant) =>
          set({
            selectedRestaurant: restaurant,
            table: null // reset table when restaurant changes
          }),

        setDateTime: (date, time) =>
          set({ date, time }),

        setGuests: (guests) =>
          set({ guests: Number(guests) || 1 }),

        setTable: (table) =>
          set({ table }),

        setSpecialRequests: (specialRequests) =>
          set({ specialRequests }),

        setCustomerDetails: (details) =>
          set((state) => ({
            ...state,
            customerName: details.name !== undefined ? details.name : state.customerName,
            customerEmail: details.email !== undefined ? details.email : state.customerEmail,
            customerPhone: details.phone !== undefined ? details.phone : state.customerPhone
          })),

        setLoading: (isLoading) =>
          set({ isLoading }),

        setError: (error) =>
          set({ error }),

        setActiveStep: (activeStep) =>
          set({ activeStep }),

        resetReservation: () =>
          set({
            selectedRestaurant: null,
            date: '',
            time: '',
            guests: 2,
            table: null,
            specialRequests: '',
            customerName: '',
            customerEmail: '',
            customerPhone: '',
            isLoading: false,
            error: null,
            activeStep: 1
          }),

        clearActionLogs: () => set({ actionLogs: [] })
      }),
      {
        name: 'agy_restaurant_reservation_store', // Experiment 6 topic d: Browser storage sync
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          selectedRestaurant: state.selectedRestaurant,
          date: state.date,
          time: state.time,
          guests: state.guests,
          table: state.table,
          specialRequests: state.specialRequests,
          customerName: state.customerName,
          customerEmail: state.customerEmail,
          customerPhone: state.customerPhone
        })
      }
    )
  )
);

export default useReservationStore;

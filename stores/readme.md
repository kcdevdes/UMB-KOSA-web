# 📌 `/store` Folder Guidelines

## 📂 **Overview**

The `/store` folder is responsible for **global state management** using **Zustand**.  
It contains **Zustand stores**, which are structured by domain to maintain clear organization.

---

## ✅ **Allowed in `/store`:**

- **Zustand Store Definitions (`create` function)**

  - Stores application-wide state in a modular and reusable way.
  - Example:

    ```ts
    import { create } from 'zustand';

    interface UserState {
      user: string | null;
      setUser: (user: string | null) => void;
    }

    export const useUserStore = create<UserState>((set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }));
    ```

- **Domain-Specific State Management**

  - Zustand state is grouped **by domain (e.g., `useAuthStore.ts`, `useEventStore.ts`)** for better maintainability.

- **Persisted State (if needed)**

  - If data should persist across sessions, Zustand's middleware can be used:

    ```ts
    import { create } from 'zustand';
    import { persist } from 'zustand/middleware';

    export const useAuthStore = create(
      persist(
        (set) => ({
          user: null,
          setUser: (user) => set({ user }),
        }),
        { name: 'auth-storage' } // Saves state in localStorage
      )
    );
    ```

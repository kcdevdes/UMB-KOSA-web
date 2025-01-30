# 📌 `/service` Folder Guidelines

## 📂 **Overview**

The `/service` folder is responsible for **handling API requests** and **business logic** related to data fetching.  
It contains:

- An **`/api` subfolder** for defining `axios` instances and API functions, categorized by domain.
- A **`/hooks` subfolder** for handling API calls within reusable hooks.

---

## ✅ **Allowed in `/service`:**

### 🔹 **1. `/service/api` - API Handling**

- **Axios Instance (`index.ts`)**

  - Centralized Axios instance configuration for consistent API calls.
  - Example:

    ```ts
    import axios from 'axios';

    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    export default api;
    ```

- **Domain-Specific API Functions (`authApi.ts`, `eventApi.ts`, etc.)**

  - API functions should be grouped based on the feature they belong to.
  - Example:

    ```ts
    import api from './index';

    export const loginUser = async (email: string, password: string) => {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    };
    ```

- **Local Type Definitions (if not globally used)**
  - Types that are **only used in one API function** should be defined **inside** the same file before usage.

---

### 🔹 **2. `/service/hooks` - API Hooks**

- **Encapsulating API Calls and Business Logic**

  - Hooks should **call API functions** and handle related logic like caching, re-fetching, or state updates.

- **Custom Hooks for API Calls (`useAuth.ts`, `useEvents.ts`, etc.)**

  - Example:

    ```ts
    import { useState } from 'react';
    import { loginUser } from '@/service/api/authApi';

    export const useAuth = () => {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(false);

      const login = async (email: string, password: string) => {
        setLoading(true);
        try {
          const data = await loginUser(email, password);
          setUser(data);
        } catch (error) {
          console.error('Login failed', error);
        } finally {
          setLoading(false);
        }
      };

      return { user, login, loading };
    };
    ```

- **Handling Business Logic, Not Just API Calls**
  - Hooks should **combine multiple API calls, handle UI state, and encapsulate logic**.
  - ✅ Example: `useEvent.ts` might fetch, filter, and format event data.

---

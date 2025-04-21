// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/client";

// User login action
// User login action
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });

      if (error) {
        // Supabase adətən "Invalid login credentials" deyir
        if (error.message.toLowerCase().includes("invalid login credentials")) {
          return rejectWithValue("Invalid email or password");
        }
        return rejectWithValue(error.message);
      }

      // Fetch username from profiles table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        return rejectWithValue(profileError.message);
      }

      // Return enriched user
      return {
        user: { ...data.user, username: profile.username },
        session: data.session,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// User registration action
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (error) {
        // Emailin artıq mövcud olduğu halda xüsusi səhv mesajı
        if (error.message.includes("User already registered")) {
          return rejectWithValue("Bu email artıq mövcuddur");
        }
        return rejectWithValue(error.message);
      }

      if (data) {
        // Profile cədvəlinə məlumat əlavə et
        await supabase.from("profiles").insert([
          {
            id: data.user.id,
            username: userData.username,
            age: userData.age,
            phone: userData.phone,
          },
        ]);
      }

      return { user: data.user, session: data.session };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice to handle auth state
// Slice to handle auth state
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    session: null,
    loading: false,
    loginError: null, // Login səhvləri üçün xüsusi state
    registerError: null, // Register səhvləri üçün xüsusi state
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.session = null;
      state.loginError = null;
      state.registerError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.loginError = null; // Login uğurlu olarsa, səhv sıfırlanır
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload; // Login səhvini saxlayırıq
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.registerError = null; // Register uğurlu olarsa, səhv sıfırlanır
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registerError = action.payload; // Register səhvini saxlayırıq
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

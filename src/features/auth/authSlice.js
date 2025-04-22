import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../lib/client";

//!Login

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });

      if (error) {
        if (error.message.toLowerCase().includes("invalid login credentials")) {
          return rejectWithValue("Invalid email or password");
        }
        return rejectWithValue(error.message);
      }

      //!İstifadəçi login olduqdan sonra,onun usernamesini supabasedən almaq

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        return rejectWithValue(profileError.message);
      }

      return {
        user: { ...data.user, username: profile.username },
        session: data.session,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//!Register

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      let { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (error) {
        if (error.message.includes("User already registered")) {
          return rejectWithValue("This email already exists");
        }
        return rejectWithValue(error.message);
      }

      //! Profile cədvəlinə məlumat əlavə etmək

      if (data) {
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    session: null,
    loading: false,
    loginError: null,
    registerError: null,
  },
  reducers: {
    logout: (state) => {
      (state.user = null),
        (state.session = null),
        (state.loginError = null),
        (state.registerError = null);
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
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registerError = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

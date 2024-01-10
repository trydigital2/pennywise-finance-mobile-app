import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile, CurrencyCode } from '../../types';
import { INITIAL_USER } from '../../data';

interface UserState {
  profile: UserProfile;
  isLoading: boolean;
}

const initialState: UserState = {
  profile: INITIAL_USER,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    updateCurrency: (state, action: PayloadAction<CurrencyCode>) => {
      state.profile.preferredCurrency = action.payload;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    completeOnboarding: (state) => {
      state.profile.onboardingCompleted = true;
    },
  },
});

export const { setUserProfile, updateCurrency, updateUserProfile, completeOnboarding } = userSlice.actions;
export default userSlice.reducer;

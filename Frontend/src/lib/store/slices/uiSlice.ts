import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  projectsExpanded: boolean;
  blogsExpanded: boolean;
  activeBlogId: number | null;
  mobileMenuOpen: boolean;
}

const initialState: UIState = {
  projectsExpanded: false,
  blogsExpanded: false,
  activeBlogId: null,
  mobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleProjectsExpanded(state) {
      state.projectsExpanded = !state.projectsExpanded;
    },
    toggleBlogsExpanded(state) {
      state.blogsExpanded = !state.blogsExpanded;
    },
    setActiveBlogId(state, action: PayloadAction<number | null>) {
      state.activeBlogId = action.payload;
    },
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu(state) {
      state.mobileMenuOpen = false;
    },
  },
});

export const {
  toggleProjectsExpanded,
  toggleBlogsExpanded,
  setActiveBlogId,
  toggleMobileMenu,
  closeMobileMenu,
} = uiSlice.actions;

export default uiSlice.reducer;

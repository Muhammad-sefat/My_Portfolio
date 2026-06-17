import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Blog } from '@/features/blogs/types';

interface UIState {
  projectsExpanded: boolean;
  blogsExpanded: boolean;
  activeBlogId: string | number | null;
  blogs: Blog[];
  mobileMenuOpen: boolean;
}

const initialState: UIState = {
  projectsExpanded: false,
  blogsExpanded: false,
  activeBlogId: null,
  blogs: [],
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
    setActiveBlogId(state, action: PayloadAction<string | number | null>) {
      state.activeBlogId = action.payload;
    },
    setBlogs(state, action: PayloadAction<Blog[]>) {
      state.blogs = action.payload;
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
  setBlogs,
  toggleMobileMenu,
  closeMobileMenu,
} = uiSlice.actions;

export default uiSlice.reducer;

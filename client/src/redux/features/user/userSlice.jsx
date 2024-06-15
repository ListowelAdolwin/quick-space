import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: null,
	currentSchool: null,
};

const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		registerUser: (state, action) => {
			state.currentUser = action.payload;
		},
		loginUser: (state, action) => {
			state.currentUser = action.payload;
		},
		logoutUser: (state) => {
			state.currentUser = null;
		},
		updateSchool: (state, action) => {
			state.currentSchool = action.payload.school;
		},
	},
});

export const { registerUser, logoutUser, loginUser, updateSchool } = userSlice.actions;

export default userSlice.reducer;

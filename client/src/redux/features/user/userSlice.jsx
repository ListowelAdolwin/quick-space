import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: null,
	currentSchool: "",
	cautionAlert: {
		hasBeenDisplayed: false,
		lastDisplayed: null,
	},
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
		updateCautionAlert: (state, action) => {
			state.cautionAlert = action.payload;
		},
	},
});

export const {
	registerUser,
	logoutUser,
	loginUser,
	updateSchool,
	updateCautionAlert,
} = userSlice.actions;

export default userSlice.reducer;

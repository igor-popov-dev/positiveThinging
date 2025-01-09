import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../helpers/API';
import { LoginResponse } from '../interfaces/auth.interface';
import { Profile } from '../interfaces/user.interface';
import { loadState } from './storage';
import { RootState } from './store';

export const JWT_PERSISTENT_STATE= 'userData';



export interface UserState {
    jwt: string | null,
    loginErrorMessage?: string;
    registerErrorMessage?: string;
    profile?: Profile
}

export interface UserPersistantState {
    jwt: string | null;
}

const initialState: UserState = {
	jwt: loadState<UserPersistantState>(JWT_PERSISTENT_STATE)?.jwt ?? null
};

export const getProfile = createAsyncThunk<Profile, void, {state: RootState}>('user/getProfile', async (_, thunkApi) => {
	try {
		const state = thunkApi.getState() as { user: UserState };
		const jwt = state.user.jwt;

		const {data} = await axios.get<Profile>(`${PREFIX}/user/profile`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
		return data;
	} catch(e) {
		if (e instanceof AxiosError) {
			return thunkApi.rejectWithValue(e.response?.data.message || 'Ошибка загрузки профиля');
		}
		return thunkApi.rejectWithValue('Произошла непредвиденная ошибка');
	}
});

export const login = createAsyncThunk('user/login', 
	async (params: {email: string, password: string}) => {
		try {
			const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email: params.email,
				password: params.password
			});
			return data;
		} catch(e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	});

export const register = createAsyncThunk('user/register', 
	async (params: {email: string, password: string, name: string}) => {
		try {
			const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/register`, {
				email: params.email,
				password: params.password,
				name: params.name
			});
			return data;
		} catch(e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addJwt: (state, action: PayloadAction<string>) => {
			state.jwt = action.payload;
		},
		logout: (state) => {
			state.jwt = null;
		},
		clearLoginError: (state) => {
			state.loginErrorMessage = undefined;
		},
		clearRegisterError: (state) => {
			state.registerErrorMessage = undefined;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message;
		});
		builder.addCase(getProfile.fulfilled, (state, action) => {
			state.profile = action.payload;
		});
		builder.addCase(getProfile.pending, (state) => {
			state.profile = undefined;
		});
		builder.addCase(register.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(register.rejected, (state, action) => {
			state.registerErrorMessage = action.error.message;
		});
	}
});

export default userSlice.reducer;
export const userActions = userSlice.actions;

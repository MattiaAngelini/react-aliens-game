// redux/slices/playersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = { //stato iniziale dei due scelte players
  player1: '',
  player2: '',
};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: { //fubnzioni che cambieranno lo stato
    setPlayer1: (state, action) => {
      state.player1 = action.payload; // Aggiorna player1
    },
    setPlayer2: (state, action) => {
      state.player2 = action.payload; // Aggiorna player2
    },
  },
});

// Esporta le azioni
export const {setPlayer1, setPlayer2 } = playersSlice.actions;
// Esporta il reducer
export default playersSlice.reducer;

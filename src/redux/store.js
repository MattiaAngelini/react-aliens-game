import { configureStore } from '@reduxjs/toolkit';
import playersReducer from './slices/playersSlice'; //slice per players

const store = configureStore({ //store
  reducer: {
    players: playersReducer, // nome proprietà dello stato
  }
});

export default store; 

import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "../image/imageSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../middleware/saga";

//Call the saga middlerware 
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

//Export the store method from the redux toolkit 
export const store = configureStore({
  //Call the imageReducer from the imageSlice.ts file 
  reducer: {
    image: imageReducer,
  },
  //Initialise middleware 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

//Run the middleware exported from the saga.rs file 
sagaMiddleware.run(rootSaga);

//Export the rootstate and appdispatch 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { put, call, takeEvery } from "redux-saga/effects";
import {
  findKeyword,
  findKeyWordSuccess,
  findKeyWordLoading,
  findKeyWordReject,
} from "../image/imageSlice";
import { PayloadAction } from "@reduxjs/toolkit";

//obtain access key from unsplash 
var clientKey = "ENF3GOHfe9liAe8H4gmTmY0Q2ScdYcuNJuARe8FjQWc";


//Export the saga function fetchKeywordImages that fetches the API call with the corresponding keyword and the API key of user (Nin a)
export function* fetchKeywordImages(
  action: PayloadAction<string>
): Generator<any, void, any> {
  try {
    //Call the findKeyWordLoading reducer when loading 
    yield put(findKeyWordLoading());

    //Assign result as the fetch call to the unsplash api using the action.payload -> parameter keyword, and clientKey -> API key 
    const res = yield call(
      fetch,
      `https://api.unsplash.com/search/photos?query=${action.payload}&client_id=${clientKey}&per_page=20`
    );

    //If the result does not fetch call back ok status, throw an error 
    if (!res.ok) {
      throw new Error("Failed to fetch images");
    }
    //Else, assign data as the result in json form 
    const data = yield res.json();

    //Call the findKeyWordSuccess reducer with the corresponding data variable, including the fetch result above 
    yield put(findKeyWordSuccess(data));
  } catch (e: any) {
    //If there are any errors, call the findKeyWordReject reducer and display the message 
    yield put(findKeyWordReject(e.message));
  }
}

//Calls the fetchKeywordImages function whenever findKeyword is triggered 
export function* watchFindKeywordAsync() {
  yield takeEvery(findKeyword, fetchKeywordImages);
}

//Calls the watchFindKeywordAsync function in the saga.ts file 
export default function* rootSaga() {
  yield watchFindKeywordAsync();
}

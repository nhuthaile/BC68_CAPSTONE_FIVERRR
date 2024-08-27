import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nguoiDungService } from "../services/nguoiDung.service";

export const getUserValueApi = createAsyncThunk(
  "nguoiDung/getUserValueApi",
  async (_, thunkAPI) => {
    const result = await nguoiDungService.getAllUser();
    console.log(result.data.content);
    return result.data.content;
  }
);

const initialState = {
  allUser: [],
};

const nguoiDungSlice = createSlice({
  name: "nguoiDung",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserValueApi.fulfilled, (state, action) => {
      // console.log("action", action);
      state.allUser = action.payload;
    });
    builder.addCase(getUserValueApi.pending, (state, action) => {
      console.log("Data đang chờ xử lý");
    });
    builder.addCase(getUserValueApi.rejected, (state, action) => {
      console.log("Đã xảy ra lỗi");
    });
  },
});

// export const {} = nguoidungSlice.actions;

export default nguoiDungSlice.reducer;

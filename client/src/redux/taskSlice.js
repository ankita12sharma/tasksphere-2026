import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const taskSlice = createApi({
  reducerPath: "taskSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8666",
  }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/gettasks",
      providesTags: ["Tasks"],
    }),
    createTask: builder.mutation({
      query: (newdata) => ({
        url: "/createtask",
        method: "POST",
        body: newdata,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation({
      query: ({ id, ...updatedata }) => ({
        url: `/edittask/${id}`,
        method: "PUT",
        body: updatedata,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/deltask/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});
export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskSlice;
export default taskSlice;

import { axiosInstance } from "../api";

export interface IData {
  title: string;
  description: string;
}
interface IResponse {
  success: boolean;
  data: unknown;
  message?: any;
  status?: boolean;
  createdAt?: string;
}

export interface ITodo {
  success: boolean;
  message?: any;
  data: {
    todo: IData[];
  } | null;
}
export const useTodo = () => {
  // add
  const addTodo = async (data: IData): Promise<IResponse> => {
    try {
      const res = await axiosInstance.post("/todo", data);
      return {
        success: true,
        data: res.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  };
  // read
  const getTodo = async () => {
    try {
      const res = await axiosInstance.get("/getall");
      return {
        success: true,
        data: res.data?.data,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
        data: null,
      };
    }
  };

  // delete
  const deleteTodo = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/${id}`);
      return {
        success: true,
        data: res.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  };

  // update Incomplete

  const updateTodo = async (_id: string, body: any) => {
    try {
      const res = await axiosInstance.put(`/${_id}`, body);
      return {
        success: true,
        data: res.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  };

  return { addTodo, getTodo, deleteTodo, updateTodo };
};

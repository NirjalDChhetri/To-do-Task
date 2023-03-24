import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  Toast,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useTodo } from "../hooks/useTood";
import { FaTrash } from "react-icons/fa";
import TodoForm from "./TodoForm";
import UpdateTodo from "./UpdateTodo";

interface ITodoData {
  _id: string;
  title: string;
  description: string;
  status: boolean;
  createdAt: string;
}
const TodoLists = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { getTodo, deleteTodo, updateTodo } = useTodo();

  const [todoData, setTodData] = useState<ITodoData[] | null>(null);
  const [reftech, setReFetch] = useState<boolean>(false);
  // need to use when cliked update
  const [selectedData, setSelectedData] = useState<ITodoData | null>(null);

  const getData = async () => {
    const res = await getTodo();
    setTodData(res?.data);
    console.log("res is ", todoData);
    setTodData(res.data?.todo);
    setReFetch(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (reftech) {
      getData();
    }
  }, [reftech]);

  const handleDeleteTodo = async (index: any) => {
    const result = await deleteTodo(index);
    getData();
  };
  //Incomplete Todo
  const handleUpdateTodo = async (id: string) => {
    const selectedData = todoData?.find((todo: any) => todo.id === id);
    if (selectedData) {
      setSelectedData(selectedData);
      // open when id is toggled
      onOpen();
    }
  };

  return (
    <Box>
      <TodoForm setReFetch={setReFetch} />
      {todoData?.map((todo, index: number) => {
        return (
          <Box bg={"whitesmoke"} key={index}>
            <Flex>
              <Box ml={10}>title: {todo?.title}</Box>
              <Spacer />
              <Box>Description:{todo?.description}</Box>
              <Spacer />

              <Flex justify={"end"}>
                <Button
                  variant="10"
                  onClick={() => {
                    handleDeleteTodo(todo._id);
                  }}
                >
                  <FaTrash />
                  Delete
                </Button>
                <Button
                  variant="20"
                  onClick={() => {
                    handleUpdateTodo(todo?._id);
                  }}
                >
                  Update
                </Button>
              </Flex>
            </Flex>
          </Box>
        );
      })}

      <UpdateTodo
        isOpen={isOpen}
        onClose={onClose}
        {...selectedData}
        setReFetch={setReFetch}
      />
    </Box>
  );
};

export default TodoLists;

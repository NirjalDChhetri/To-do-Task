import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IData, useTodo } from "../hooks/useTood";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";

export default function TodoForm({
  setReFetch,
}: {
  setReFetch: (rfetch: boolean) => void;
}) {
  const [todo, setTodo] = useState<IData>({ title: "", description: "" });
  const toast = useToast();

  const { addTodo } = useTodo();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await addTodo(todo);
    if (res.success) {
      toast({
        duration: 1000,
        title: "Todo created successfully",
        status: "success",
      });
      setReFetch(true);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setTodo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <form className="todoform" onSubmit={handleSubmit}>
      <div className="flex">
        <FormControl>
          <FormLabel>Todo</FormLabel>
          <Input
            type="text"
            name="title"
            autoComplete="off"
            placeholder="New todo..."
            onChange={handleChange}
          />
          <FormHelperText>Todo is required.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            id="newtodobox"
            className="todoinput"
            name="description"
            autoComplete="off"
            placeholder="Add description..."
            onChange={handleChange}
          />
          <FormHelperText></FormHelperText>
        </FormControl>

        <Button variant="outline" type="submit">
          <FaPlus /> Add
        </Button>
      </div>
    </form>
  );
}

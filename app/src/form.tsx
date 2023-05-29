import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask } from "./fetcher.tsx";
import { SlNote } from "react-icons/sl";
import {getAllData} from "./fetcher.tsx";

export const Form = () => {
  const [inputText, setInputText] = useState<string>("");
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value);
  }
  const mutation = useMutation({
    mutationFn: createTask,
  });
  const handleSubmit = (): void => {
    mutation.mutate();
    const queryClient = useQueryClient()
    queryClient.refetchQueries([''])
  }

  return (
    <form className="my-[3%] mx-[3%]">
      <input
        name="task-title"
        placeholder="enter your task"
        value={inputText}
        className="border-2 px-[3%] py-[1%] text-lg w-[500px] my-[1%]  border-comment rounded-md"
        onChange={handleInput}
      />
      <button
        type="submit"
        className="ml-[3%] bg-orange text-lg text-white px-[3%] py-[1%] rounded-md"
        onClick={handleSubmit}
      >
        create!
      </button>
    </form>
  )
};


import { QueryClientProvider, useQuery, useMutation, useQueryClient } from
  "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  FaReact,
  FaPencilAlt,
  FaCalendar,
  FaCheck
} from 'react-icons/fa';
import {
  MdWork,
  MdAssignment
} from "react-icons/md";
import { Task } from "./types/my-type.tsx";
import { queryClientGetAllData } from "./query-client.tsx";
import { updateTask, getAllData } from "./fetcher.tsx";
import { Form } from "./form.tsx";


const TodoApp = () => {
  // API call
  const { data: tasks, isLoading, isError, error } = useQuery({
    queryKey: ["tasks"]
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    console.log(error)
    return <div>Error fetching tasks</div>;
  };
  // Assertion for type
  const taskTyped: Task[] = tasks["tasks"].map((task) => {
    const regexp = "[0-9]{4}-[0-9]{2}-[0-9]{2}";
    const taskYYYYmmdd: string = task.createdAt.match(regexp);
    console.log(taskYYYYmmdd)
    return {
      id: task.id,
      title: task.title,
      createdAt: taskYYYYmmdd,
      finishedAt: task.finishedAt
    }
  });
  const title: string = "React Task Manager";
  const tasksSubTitle: string = taskTyped.length === 0 ? "No Tasks" : "Tasks";
  const formSubtitle: string = "Add New Task";
  const numOfTasks: number = taskTyped.length;
  const mainText: string = "You have " + numOfTasks.toString() + " tasks! If Click the task to edit when you finish the task";
  const formText: string = "If you get some task, Please enter the task title and click the button or press enter key";
  return (
    <div className="px-[10%] py-[5%] bg-midnight" >
      <Title text={title} />
      <div className="my-[3%] py-[3%] font-body ">
        <SubTitle
          text={tasksSubTitle}
        />
        <p className="px-[3%] py-[1%] text-red text-2xl font-bold">{"Loaded Tasks: "}{numOfTasks.toString()}</p>
        <Text text={mainText} />
        <ul className="p-[3%]">
          {taskTyped.map((task, key) => {
            return (
              <li key={key} className="mb-[3%] p-[3%] bg-dark-gray rounded-lg">
                <TaskTitle id={task.id} title={task.title} finishedAt={task.finishedAt} />
                <p className="text-lg">
                  <FaCalendar className="inline text-orange" />
                  <span className="ml-[3%]">{task.createdAt}</span>
                </p>
              </li>
            )
          })}
        </ul>
        <SubTitle text={formSubtitle} />
        <Text text={formText} />
        <Form />
        <Footer />
      </div>
    </div >
  );
};

const Title = ({ text }: { text: string }) => {
  return (
    <h1 className="font-title font-bold text-4xl p-[3%] bg-dark rounded-lg">
      <FaReact className="inline-block align-middle text-blue" />
      <span className="inline-block align-middle px-[3%] text-white">{text}</span>
    </h1>
  )
};

const SubTitle = ({ text }: { text: string }) => {
  return (
    <h3 className="font-title font-bold  text-light-gray block text-3xl py-[2%] pl-[3%]">
      <MdWork className="inline-block align-middle" />
      <span className="ml-[3%] inline-block align-middle">{text}</span>
    </h3>
  )
}

const Text = ({ text }: { text: string }) => {
  return (
    <p className="px-[3%] text-comment text-lg">{text}</p>
  )
};

const TaskTitle = (
  { id, title, finishedAt }: { id: string, title: string, finishedAt: string }
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.fetchQuery({ "queryKey": ["tasks"], "queryFn": getAllData });
    }
  },);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditable(false);
    const formData = new FormData(e.currentTarget);
    console.log(formData)
    const newTitle = formData.get("new-title") ? formData.get("new-title").toString() : "";
    console.log(newTitle)
    if (newTitle) {
      mutation.mutate({ id, newTitle, finishedAt });
    };
  };
  if (!isEditable) {
    return (
      <h3 className="text-xl mb-[2%]">
        <MdAssignment className="text-orange inline-block align-middle" />
        <div
          className="text-dark text-xl  ml-[3%] inline-block align-middle"
        >
          {title}
        </div>
        <button
          className="ml-[10%] inline-block align-middle text-comment hover:text-orange"
          type="submit"
          value={id}
          onClick={() => setIsEditable(true)}
        >
          <FaPencilAlt />
        </button>
      </h3>
    )
  } else {
    return (
      <h3 className="text-xl mb-[2%]">
        <MdAssignment className="text-orange inline-block align-middle" />
        <form
          className="text-dark text-xl  ml-[3%] inline-block align-middle"
          onSubmit={(e) => (handleUpdate(e))}
        >
          <input
            type="text"
            name="new-title"
            placeholder={title}
            className="bg-light-gray pl-[5%] text-dark rounded-lg"
          />
          <button
            className="ml-[3%] w-[150px] inline-block bg-dark hover:bg-midnight rounded-lg  align-middle text-comment hover:text-green"
            type="submit"
            value={id}
          >
            <FaCheck
              className="inline-block align-middle mr-[10%]"
            />
            <p className="inline-block">Change!</p>
          </button>
        </form>
      </h3>
    )
  }
};

const Footer = () => {
  return (
    <div className="rounded-lg my-[10%]">
      <SubTitle text={"Information"} />
      <div className="my-[1%] px-[3%]">
        <p className="bg-dark rounded-lg text-dark-gray py-[5%] px-[3%]">@This site is created by <span className="text-green">PR TIMES. Inc</span></p>
      </div>
    </div>
  )
};

export const App = () => (
  <QueryClientProvider client={queryClientGetAllData}>
    <TodoApp />
  </QueryClientProvider>
);

export default App;

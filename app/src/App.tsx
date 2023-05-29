import {
  FaReact,
  FaPencilAlt,
  FaCalendar,
} from 'react-icons/fa';
import {
  MdWork
} from "react-icons/md";
import { Task } from "./types/my-type.tsx";
import { Form } from "./form.tsx";
import { QueryClientProvider, useQuery, QueryClient } from '@tanstack/react-query';
import { getAllData } from './fetcher.tsx';
import { PropsWithChildren } from 'react';

const TodoApp = () => {
  const { data: tasks, isLoading, isError, error } = useQuery({ queryKey: ["tasks"], queryFn: getAllData });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    console.log(error)
    return <div>Error fetching tasks</div>;
  };
  const title = "React Task Manager";
  const tasksSubTitle = tasks.length === 0 ? "No Tasks" : "Tasks";
  const formSubtitle = "Add New Task";
  const numOfTasks = tasks.length;
  const mainText = "You have " + numOfTasks.toString() + " tasks! If Click the task to edit when you finish the task";
  const formText = "If you get some task, Please enter the task title and click the button or press enter key";
  return (
    <div className="px-[10%] py-[5%] bg-midnight">
      <Title text={title} numOfTasks={numOfTasks} />
      <div className="my-[3%] py-[3%] font-body ">
        <SubTitle
          text={tasksSubTitle}
        />
        <p className="px-[3%] py-[1%] text-red text-2xl font-bold">{"Loaded Tasks: "}{numOfTasks.toString()}</p>
        <Text children={mainText} />
        <ul className="p-[3%]">
          {tasks.map((task, key) => {
            return (
              <li key={key} className="mb-[3%] p-[3%] bg-dark-gray rounded-lg">
                <h2 className="text-xl">
                  <FaPencilAlt className="inline text-orange" />
                  <span className="text-dark ml-[3%]">{task.title}</span>
                </h2>
                <p className="text-lg">
                  <FaCalendar className="inline text-orange" />
                  <span className="ml-[3%]">{task.createdAt}</span>
                </p>
              </li>
            )
          })}
        </ul>
        <SubTitle text={formSubtitle} />
        <Text children={formText} />
        <Form />
        <Footer />
      </div>
    </div >
  );
};

const Title = ({ text, numOfTasks }: { text: string, numOfTasks: number }) => {
  return (
    <h1 className="font-title font-bold text-4xl p-[3%] bg-dark rounded-lg">
      <FaReact className="inline-block align-middle text-blue" />
      <span className="inline-block align-middle px-[3%] text-white">{text}</span>
    </h1>
  )
};

const SubTitle = ({ text }: { text: string }) => {
  return (
    <h2 className="font-title font-bold  text-light-gray block text-3xl py-[2%] pl-[3%]">
      <MdWork className="inline-block align-middle" />
      <span className="ml-[3%] inline-block align-middle">{text}</span>
    </h2>
  )
}

const Text = ({ children }: PropsWithChildren) => {
  return (
    <p className="px-[3%] text-comment text-lg">{children}</p>
  )
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
const queryClientGetAllData = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClientGetAllData}>
    <TodoApp />
  </QueryClientProvider>
);

export default App;

import { QueryClientProvider, useQuery, QueryClient } from '@tanstack/react-query';
import { getAllData } from './fetcher.tsx';

const TodoApp = () => {
  const { data: tasks, isLoading, isError, error } = useQuery({ queryKey: ["tasks"], queryFn: getAllData });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    console.log(error)
    return <div>Error fetching tasks</div>;
  }
  return (
    <div>
      <h1>Hello TypeScript!</h1>
      <ul>
        {tasks.map((task, key) => {
          return (
            <li key={key}>
              <h3>{task.title}</h3>
              <p>{task.createdAt}</p>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

const queryClientGetAllData = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClientGetAllData}>
    <TodoApp />
  </QueryClientProvider>
);

export default App;

// https://jsonplaceholder.typicode.com/todos
import { useQuery } from "@tanstack/react-query"

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todo'],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      {data.map((todo: Todo) => 
        <div key={todo.id}>
          <h3>{todo.title}</h3>
          <p>{todo.completed ? "Completed" : "Not completed"}</p>
        </div>
      )}
    </div>
  )
}

export default App

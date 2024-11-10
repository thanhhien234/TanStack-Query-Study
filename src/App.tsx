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
    queryFn: async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
      if (!res.ok) {
        alert('error')
      }
      return res.json();
    },
    select: (data: Todo[]) => data.map(todo => todo.title),
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      {data?.map((title, index) => (
        <p key={index}>{title}</p>
      ))}
    </div>
  )
}

export default App

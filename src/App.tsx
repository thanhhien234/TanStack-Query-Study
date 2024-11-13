import { useInfiniteQuery } from "@tanstack/react-query";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const ITEMS_PER_PAGE = 10;

interface FetchTodosResponse {
  data: Todo[];
  nextPage: number | null;
}

function App() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<FetchTodosResponse, Error>({
    queryKey: ['todo'],
    queryFn: async ({ pageParam = 1 }) => { //pageParam = 1은 첫 페이지를 나타내는 초기값
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_page=${pageParam}&_limit=${ITEMS_PER_PAGE}`
      );
      const data = await response.json();
      const totalItems = 200; // 총 항목 수를 200으로 가정
      const nextPage = pageParam * ITEMS_PER_PAGE < totalItems ? pageParam + 1 : null; // 다음 페이지가 있는지 계산

      return {
        data,
        nextPage,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage, // 다음 페이지 번호를 반환하는 함수
    initialPageParam: 1, // 초기 페이지 번호 = 1
  });

  if (isLoading) return <p>Loading...</p>;

  if (error instanceof Error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {data?.pages.map((page, index) => (
        <div key={index}>
          {page.data.map((todo: Todo) => (
            <div key={todo.id}>
              <h3>{todo.title}</h3>
              <p>{todo.completed ? "Completed" : "Not completed"}</p>
            </div>
          ))}
        </div>
      ))}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}  {/* 더 이상 데이터가 없으면 "Load More" 버튼을 비활성화 */}
        </button>
      )}
    </div>
  );
}

export default App;
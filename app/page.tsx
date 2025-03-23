import Todo from '@/components/Todo/Todo';
export const metadata = {
  title: "To-Do List Web App"
}

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Todo/>
    </div>
  )
}
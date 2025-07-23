import { PlusCircle } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import MainLayout from "./layouts/MainLayout";
import React, { useEffect, useState } from "react";
import { Badge } from "./components/ui/badge";
import { Card, CardContent } from "./components/ui/card";

function App() {
  const [inputTask, setInputTask] = useState("");

  // function yang diberikan ke dalam useState disebut LAZY INITIAL STATE. React akan menjalankan fungsi ini hanya 1x, yaitu saat komponen pertama kali di render untuk menentukan nilai awal dari state
  const [tasks, setTasks] = useState<string[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTask(e.target.value);
  };

  const handleSubmitTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputTask.trim()) return;

    setTasks([...tasks, inputTask]);
    setInputTask("");
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <form className=" -mt-6" onSubmit={handleSubmitTask}>
          <div className="flex gap-x-2 text-white">
            <Input
              className="bg-[#262626] h-12 border border-zinc-950 placeholder:text-gray-500 caret-[#1E6F9F] focus:outline-none focus:ring-[#1E6F9F] focus:border-none"
              placeholder="Add a new task"
              onChange={handleInputChange}
            />
            <Button className="bg-[#1E6F9F] text-white h-12 flex items-center cursor-pointer">
              New <PlusCircle />
            </Button>
          </div>
        </form>
        <div className="mt-10">
          <div className="flex justify-between text-[#4EA8DE]">
            <p>
              Tugas dibuat{" "}
              <Badge className="bg-gray-600 ml-1">{tasks.length}</Badge>
            </p>
            <p>Selesai</p>
          </div>
          {tasks.length > 0 ? (
            <ul className="flex flex-col space-y-2 mt-4">
              {tasks.map((task, index) => (
                <li key={index}>
                  <Card className="rounded-[8px] bg-[#262626] border-[#333333]">
                    <CardContent>
                      <div className="flex items-center gap-x-4">
                        <input
                          type="checkbox"
                          className="appearance-none h-6 w-6 shrink-0 border-2 border-[#4EA8DE] rounded-full cursor-pointer bg-center  checked:bg-[#5E60CE] checked:border-0 checked:bg-[url('data:image/svg+xml,%3csvg%20viewBox%3d%220%200%2016%2016%22%20fill%3d%22white%22%20xmlns%3d%22http%3a//www.w3.org/2000/svg%22%3e%3cpath%20d%3d%22M12.207%204.793a1%201%200%20010%201.414l-5%205a1%201%200%2001-1.414%200l-2-2a1%201%200%20011.414-1.414L6.5%209.086l4.293-4.293a1%201%200%20011.414%200z%22/%3e%3c/svg%3e')]"
                        />
                        <p className={`text-white ${index}`}>{task}</p>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white">Belum ada tugas</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default App;

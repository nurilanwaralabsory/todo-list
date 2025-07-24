import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import MainLayout from "./layouts/MainLayout";
import React, { useEffect, useState } from "react";
import { Badge } from "./components/ui/badge";
import { Card, CardContent } from "./components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

interface Task {
  text: string;
  completed: boolean;
}

function App() {
  const [inputTask, setInputTask] = useState("");

  const [tasks, setTasks] = useState<Task[]>(() => {
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

    setTasks([{ text: inputTask, completed: false }, ...tasks]);
    setInputTask("");
  };

  const handleToggleTask = (taskIndex: number) => {
    const newTasks = tasks.map((task, index) => {
      if (index === taskIndex) {
        return { ...task, completed: !task.completed };
      }

      return task;
    });

    setTasks(newTasks);
  };

  const handleDeleteTask = (taskIndex: number) => {
    const newTasks = [...tasks];
    newTasks.splice(taskIndex, 1);

    setTasks(newTasks);
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
              value={inputTask}
            />
            <Button className="bg-[#1E6F9F] text-white h-12 flex items-center cursor-pointer">
              New <PlusCircle />
            </Button>
          </div>
        </form>
        <div className="mt-10">
          <div className="flex justify-between text-[#4EA8DE]">
            <div>
              <p>
                Task created{" "}
                <Badge className="bg-gray-600 ml-1">{tasks.length}</Badge>
              </p>
              <Select>
                <SelectTrigger
                  className="w-[100px] border-none p-0 focus:ring-0 focus:ring-offset-0 focus:outline-none
             focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                >
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent className="bg-[#262626] border-[#333333] text-[#4EA8DE]">
                  <SelectGroup>
                    <SelectItem value="true">Complete</SelectItem>
                    <SelectItem value="false">Incomplete</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              Done{" "}
              <Badge className="bg-gray-600 ml-1">
                {" "}
                {tasks.filter((task) => task.completed).length}
              </Badge>{" "}
              of
              <Badge className="bg-gray-600 ml-1"> {tasks.length}</Badge>
            </div>
          </div>
          {tasks.length > 0 ? (
            <ul className="flex flex-col space-y-2 mt-4">
              {tasks.map((task, index) => (
                <li key={index}>
                  <Card className="rounded-[8px] bg-[#262626] border-[#333333]">
                    <CardContent className="flex justify-between items-center">
                      <div className="flex items-center gap-x-4">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleToggleTask(index)}
                          className={`appearance-none h-6 w-6 shrink-0 border-2 border-[#4EA8DE] rounded-full cursor-pointer bg-center 
                             checked:bg-[#5E60CE] checked:border-0 checked:bg-[url('data:image/svg+xml,%3csvg%20viewBox%3d%220%200%2016%2016%22%20fill%3d%22white%22%20xmlns%3d%22http%3a//www.w3.org/2000/svg%22%3e%3cpath%20d%3d%22M12.207%204.793a1%201%200%20010%201.414l-5%205a1%201%200%2001-1.414%200l-2-2a1%201%200%20011.414-1.414L6.5%209.086l4.293-4.293a1%201%200%20011.414%200z%22/%3e%3c/svg%3e')]`}
                        />
                        <p
                          className={` ${
                            task.completed
                              ? "line-through text-gray-400"
                              : "text-white"
                          }`}
                        >
                          {task.text}
                        </p>
                      </div>
                      <div>
                        <Trash2
                          className="text-gray-400 h-5 w-5 cursor-pointer"
                          onClick={() => handleDeleteTask(index)}
                        />
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

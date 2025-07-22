import { PlusCircle } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <MainLayout>
      <form className="max-w-2xl mx-auto -mt-6">
        <div className="flex gap-x-2 text-white">
          <Input
            className="bg-[#262626] h-12 border border-zinc-950 placeholder:text-gray-500 caret-[#1E6F9F] focus:outline-none focus:ring-[#1E6F9F] focus:border-none"
            placeholder="Add a new task"
          />
          <Button className="bg-[#1E6F9F] text-white h-12 flex items-center cursor-pointer">
            New <PlusCircle />
          </Button>
        </div>
      </form>
    </MainLayout>
  );
}

export default App;

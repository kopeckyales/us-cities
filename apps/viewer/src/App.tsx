import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { TreeView } from "./TreeView";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <TreeView />
      </QueryClientProvider>
    </div>
  );
}

export default App;

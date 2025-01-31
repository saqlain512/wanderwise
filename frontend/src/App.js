import Routerr from "./Routerr";
import { AuthProvider } from "./context/auth";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routerr/>
      </AuthProvider>
    </div>
  );
}

export default App;

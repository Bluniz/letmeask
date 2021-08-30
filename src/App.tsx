import { AuthProvider } from "contexts/authContext";
import { Routes } from "routes";
import { ToastContainer } from "components/Toast/index";

function App() {
  return (
    <AuthProvider>
      <Routes />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;

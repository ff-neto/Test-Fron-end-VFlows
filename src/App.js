import Routes from "./routes"
import {AuthContext} from '../src/context/auth/auth.context'

function App() {
  return (
    <div>
      <AuthContext>
        <Routes/>
      </AuthContext>
    </div>
  );
}

export default App;

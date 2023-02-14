import Routes from "./routes";
import { AuthContext } from "./context/auth/auth.context";
import { ContratoContext } from "./context/contract/contract.context";

function App() {
    return (
        <div>
            <AuthContext>
                <ContratoContext>
                    <Routes />
                </ContratoContext>
            </AuthContext>
        </div>
    );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestPage from "./pages/TestPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/test" element={<TestPage />} />
                    <Route path="*" element={<ErrorPage />} />

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

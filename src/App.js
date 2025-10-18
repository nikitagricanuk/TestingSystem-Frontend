import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestPage from "./pages/TestPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import ResultsTestPage from "./pages/ResultsTestPage";
import { TestProvider } from "./utils/TestContext";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <TestProvider>
                    <Routes>
                        <Route path="/test" element={<TestPage />} />
                        <Route path="*" element={<ErrorPage />} />
                        <Route path="/result" element={<ResultsTestPage />} />

                        <Route path="/auth" element={<LoginPage />} />
                        <Route path="/" element={<LoginPage />} />
                    </Routes>
                </TestProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;

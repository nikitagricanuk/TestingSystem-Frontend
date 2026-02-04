import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateQuestion from './pages/CreateQuestion'
import BankOfQuestions from './pages/BankOfQuestions'
import './App.css'
import LayoutWithSideBar from './components/LayoutWithSideBar'
import MyTests from './pages/MyTests'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutWithSideBar/>}>
          <Route path="/bank" element={<BankOfQuestions />} />
          <Route path="/create" element={<CreateQuestion />} />
          <Route path="/tests" element={<MyTests />} />
          <Route path="/" element={<BankOfQuestions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
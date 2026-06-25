import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import AddPage from "./pages/AddPage"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

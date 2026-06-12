import { Route, BrowserRouter, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { MainPage } from "./pages/MainPage"
import MainLayout from "./components/layout/MainLayout"
import { PodcastPage } from "./pages/CreatePostPage"
import { ChatPage } from "./pages/ChatPage"
import { MessagePage } from "./pages/MessagePage"


function App() {

  return (
    <BrowserRouter>
    <Routes>

      <Route element={<MainLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/podcast" element={<PodcastPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:chatId" element={<MessagePage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      
      
    </Routes>
    </BrowserRouter>
  )
}

export default App

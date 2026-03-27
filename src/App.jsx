import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-full">
        {/* Thin top bar mimicking Figma frame label */}
        <div className="h-6 bg-gray-800 flex items-center px-4 flex-shrink-0">
          <span className="text-white text-xs font-medium tracking-widest">CHAT</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

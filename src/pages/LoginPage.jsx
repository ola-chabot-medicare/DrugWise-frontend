import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Pill } from 'lucide-react';

const HEX_POSITIONS = [
  [100, 100], [260, 190], [420, 80], [560, 240], [160, 340],
  [360, 390], [510, 140], [660, 320], [90, 490], [700, 90],
  [300, 520], [480, 440], [720, 460], [200, 260],
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/chat');
  };

  return (
    <div className="flex h-full">
      {/* LEFT — gradient panel */}
      <div className="hidden md:flex w-3/5 relative bg-gradient-to-br from-blue-700 via-blue-600 to-teal-500 items-center justify-center overflow-hidden">
        {/* Faint wireframe hexagons */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {HEX_POSITIONS.map(([cx, cy], i) => {
            const r = 40;
            const pts = Array.from({ length: 6 }, (_, k) => {
              const angle = (Math.PI / 180) * (60 * k - 30);
              return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
            }).join(' ');
            return (
              <polygon
                key={i}
                points={pts}
                fill="none"
                stroke="white"
                strokeWidth="1.5"
              />
            );
          })}
        </svg>

        {/* Center medical cross hex cluster */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Center hex */}
            <polygon
              points="100,68 126,83 126,113 100,128 74,113 74,83"
              fill="rgba(255,255,255,0.25)"
              stroke="white"
              strokeWidth="2"
            />
            {/* Top hex */}
            <polygon
              points="100,20 126,35 126,65 100,80 74,65 74,35"
              fill="rgba(255,255,255,0.15)"
              stroke="white"
              strokeWidth="2"
            />
            {/* Bottom hex */}
            <polygon
              points="100,116 126,131 126,161 100,176 74,161 74,131"
              fill="rgba(255,255,255,0.15)"
              stroke="white"
              strokeWidth="2"
            />
            {/* Left hex */}
            <polygon
              points="52,68 78,83 78,113 52,128 26,113 26,83"
              fill="rgba(255,255,255,0.15)"
              stroke="white"
              strokeWidth="2"
            />
            {/* Right hex */}
            <polygon
              points="148,68 174,83 174,113 148,128 122,113 122,83"
              fill="rgba(255,255,255,0.15)"
              stroke="white"
              strokeWidth="2"
            />
            {/* Cross */}
            <rect x="93" y="78" width="14" height="44" rx="3" fill="white" />
            <rect x="78" y="93" width="44" height="14" rx="3" fill="white" />
          </svg>

          <div className="text-center">
            <h1 className="text-white text-4xl font-bold tracking-wide">DrugWise</h1>
            <p className="text-blue-100 text-base mt-1">Where Knowledge Meets Care</p>
          </div>
        </div>
      </div>

      {/* RIGHT — login form */}
      <div className="flex-1 md:w-2/5 bg-white flex flex-col items-center justify-between py-10 px-8">
        <div className="w-full max-w-sm flex-1 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
              <Pill className="w-5 h-5 text-white" />
            </div>
            <span className="text-blue-600 font-bold text-xl">DrugWise</span>
          </div>

          <h2 className="text-3xl font-bold text-slate-800 mb-1">Welcome!</h2>
          <p className="text-base text-slate-400 mb-6">Sign in to your account</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-base font-medium text-slate-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-base outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            <div>
              <label className="block text-base font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-base outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-base text-slate-600 cursor-pointer select-none">
                <input type="checkbox" className="rounded accent-blue-600" />
                Remember me
              </label>
              <a href="#" className="text-base text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3.5 rounded-full transition text-base shadow-sm mt-2"
            >
              Log in
            </button>
          </form>

          {/* HIPAA badge */}
          <div className="mt-5 flex justify-center">
            <span className="text-xs text-slate-400 border border-slate-200 rounded-full px-4 py-1.5">
              🔒 HIPAA Compliance
            </span>
          </div>

          <p className="text-center text-base text-slate-500 mt-6">
            Don&apos;t have an account?{' '}
            <a href="#" className="text-blue-600 font-medium hover:underline">
              Sign up
            </a>
          </p>
        </div>

        <p className="text-sm text-slate-800">© DrugWise 2026</p>
      </div>
    </div>
  );
}

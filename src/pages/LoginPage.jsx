import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import DrugWiseLogo from '../assets/DrugWiseLogo';

const HEX_POSITIONS = [
  [100, 100], [260, 190], [420, 80], [560, 240], [160, 340],
  [360, 390], [510, 140], [660, 320], [90, 490], [700, 90],
  [300, 520], [480, 440], [720, 460], [200, 260],
];

// Split hexagons into groups for different float speeds
const TOP_LEFT_HEXES = [0, 1, 2, 6, 9];        // animate-float-delayed
const BOTTOM_RIGHT_HEXES = [3, 4, 5, 7, 8, 10, 11, 12, 13]; // animate-float-slow

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnGlow, setBtnGlow] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/chat');
  };

  return (
    <div className="flex h-full relative">
      {/* LEFT — gradient panel */}
      <div className="hidden md:flex w-3/5 relative items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 25%, #0ea5e9 60%, #14b8a6 100%)' }}
      >
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
            const animClass = TOP_LEFT_HEXES.includes(i)
              ? 'animate-float-delayed'
              : BOTTOM_RIGHT_HEXES.includes(i)
              ? 'animate-float-slow'
              : '';
            return (
              <polygon
                key={i}
                points={pts}
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                className={animClass}
              />
            );
          })}
        </svg>

        {/* Radial glow behind center cluster */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 40% 50%, rgba(255,255,255,0.18) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(20,184,166,0.25) 0%, transparent 40%)' }}
        />

        {/* Center medical cross hex cluster */}
        <div className="relative z-10 flex flex-col items-center gap-4 animate-float">
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
            <h1 className="text-white text-5xl font-bold tracking-wide drop-shadow-lg">DrugWise</h1>
            <p className="text-sky-200 text-base mt-2 font-medium">Your Powerful AI Drug Assistant</p>
          </div>
        </div>
      </div>

      {/* Gradient divider line */}
      <div className="hidden md:block absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-200 to-transparent" style={{ left: '59.5%' }} />

      {/* RIGHT — login form (glass card) */}
      <div className="flex-1 md:w-2/5 flex flex-col items-center justify-between py-10 px-20"
        style={{ background: 'linear-gradient(160deg, #f8faff 0%, #f0f9ff 100%)' }}
      >
        <div
          className="w-full max-w-sm flex-1 flex flex-col justify-center animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.2s' }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <DrugWiseLogo size={56} />
            <span className="text-blue-600 font-black tracking-tight text-3xl">DrugWise</span>
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
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-base outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-[0_0_0_4px_rgba(37,99,235,0.1)]"
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
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-base outline-none pr-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-[0_0_0_4px_rgba(37,99,235,0.1)]"
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
              onMouseEnter={() => setBtnGlow(true)}
              onMouseLeave={() => setBtnGlow(false)}
              className="w-full text-white font-semibold py-3.5 rounded-full transition text-base shadow-md mt-2 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9, #14b8a6)',
                ...(btnGlow ? { animation: 'pulse-glow 2s ease-in-out infinite' } : {})
              }}
            >
              Log in
            </button>
          </form>

          {/* HIPAA badge */}
          <div className="mt-5 flex justify-center">
            <span
              className="text-xs font-medium px-4 py-1.5 rounded-full"
              style={{ background: 'linear-gradient(135deg,rgba(59,130,246,0.1),rgba(20,184,166,0.1))', border: '1px solid rgba(59,130,246,0.25)', color: '#1d4ed8' }}
            >
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

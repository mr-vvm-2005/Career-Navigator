import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp, loginWithGoogle } from "../services/authService";
import { toast } from "react-toastify";
import { LogIn, UserPlus, Mail, Lock, User, Chrome } from "lucide-react";
import { motion } from "framer-motion";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, name);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Logged in with Google!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Google signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-200/40 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-premium border border-white p-8 sm:p-12 overflow-hidden">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-[2rem] text-white shadow-xl shadow-indigo-500/30 mb-6 rotate-3 hover:rotate-0 transition-transform duration-500">
              <UserPlus size={40} />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Create Account</h1>
            <p className="text-slate-500 font-medium">Join the next generation of tech leaders</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <User size={20} />
                </span>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all font-bold text-slate-700 shadow-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <Mail size={20} />
                </span>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all font-bold text-slate-700 shadow-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Password</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <Lock size={20} />
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all font-bold text-slate-700 shadow-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-indigo-600/20 hover:bg-slate-900 active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Get Started <LogIn size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center">
            <div className="flex-1 h-px bg-slate-100"></div>
            <span className="px-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">or quick join</span>
            <div className="flex-1 h-px bg-slate-100"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="mt-8 w-full border border-slate-100 bg-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-slate-700 shadow-sm"
          >
            <Chrome size={20} className="text-indigo-500" /> Google Account
          </button>

          <div className="mt-10 text-center">
            <p className="text-sm font-bold text-slate-500">
              Already a member?{" "}
              <Link to="/login" className="text-indigo-600 font-black hover:underline underline-offset-4">
                Sign In Instead
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Brain, 
  Zap, 
  Activity, 
  Users, 
  ArrowUpRight,
  ArrowRight,
  Check, 
  AlertTriangle, 
  Lock,
  Star,
  Quote,
  RefreshCcw,
  BarChart,
  ChevronDown,
  ChevronUp,
  Layout,
  Menu,
  X,
  Target,
  XCircle,
  HelpCircle
} from 'lucide-react';

// --- Utils & Hooks ---

// Hook for scroll reveal animation
const useOnScreen = (ref: React.RefObject<Element>, rootMargin = "0px") => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { rootMargin, threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin]);
  return isIntersecting;
};

const Reveal = ({ children, className = "", delay = 0 }: { children?: React.ReactNode, className?: string, delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- Logos ---

const ElyunLogo = ({ className = "h-10" }: { className?: string }) => (
  <svg viewBox="0 0 300 300" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="elyunGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00FFFF" />
        <stop offset="50%" stopColor="#B026FF" />
        <stop offset="100%" stopColor="#FFD700" />
      </linearGradient>
    </defs>
    {/* Triangle */}
    <path d="M150 20 L280 240 H20 Z" stroke="url(#elyunGradient)" strokeWidth="8" fill="none" />
    
    {/* Inner Geometry (Simplified Flower of Life representation) */}
    <g opacity="0.9">
      <circle cx="150" cy="160" r="45" stroke="url(#elyunGradient)" strokeWidth="4" />
      <circle cx="125" cy="125" r="45" stroke="url(#elyunGradient)" strokeWidth="4" />
      <circle cx="175" cy="125" r="45" stroke="url(#elyunGradient)" strokeWidth="4" />
      <circle cx="150" cy="90" r="45" stroke="url(#elyunGradient)" strokeWidth="4" />
    </g>

    {/* Text */}
    <text x="150" y="295" textAnchor="middle" fontFamily="sans-serif" fontWeight="300" fontSize="60" letterSpacing="10" fill="url(#elyunGradient)">ELYUN</text>
  </svg>
);

// --- UI Components ---

const Button = ({ 
  children, 
  primary = false, 
  className = "", 
  onClick 
}: { 
  children?: React.ReactNode, 
  primary?: boolean, 
  className?: string,
  onClick?: () => void 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform active:scale-95 text-sm md:text-base relative overflow-hidden group";
  
  // Neon Purple Button
  const primaryStyles = "bg-neon-purple/90 hover:bg-neon-purple text-white shadow-[0_0_20px_rgba(176,38,255,0.4)] hover:shadow-[0_0_30px_rgba(176,38,255,0.6)]";
  
  // Glass Button
  const secondaryStyles = "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-neon-purple/50 backdrop-blur-md";

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${primary ? primaryStyles : secondaryStyles} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Shine effect on hover */}
      {primary && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />}
    </button>
  );
};

const SectionBadge = ({ children }: { children?: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-gray-300 mb-6 backdrop-blur-md shadow-lg">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-purple opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-purple"></span>
    </span>
    {children}
  </div>
);

const SectionTitle = ({ title, subtitle, center = true }: { title: string, subtitle?: string, center?: boolean }) => (
  <Reveal className={`mb-16 ${center ? 'text-center' : 'text-left'} max-w-4xl mx-auto`}>
    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white leading-tight font-display">
      {title}
    </h2>
    {subtitle && (
      <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
  </Reveal>
);

const Card: React.FC<{ children?: React.ReactNode, className?: string, delay?: number }> = ({ children, className = "", delay = 0 }) => (
  <Reveal delay={delay} className="h-full">
    <div className={`glass-card rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]
      shadow-[0_0_25px_rgba(24,0,163,0.25)] 
      hover:shadow-[0_0_40px_rgba(24,0,163,0.5)] 
      border border-white/10 hover:border-[#1800a3]/50
      ${className}`}>
      {children}
    </div>
  </Reveal>
);

const IconBox = ({ icon, color = "text-white" }: { icon: React.ReactNode, color?: string }) => (
  <div className={`w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 backdrop-blur-sm group-hover:bg-neon-purple/20 group-hover:border-neon-purple/50 transition-colors duration-300`}>
    <div className={`${color} group-hover:text-white transition-colors duration-300`}>
      {icon}
    </div>
  </div>
);

const AccordionItem: React.FC<{ 
  title: string, 
  subtitle: string, 
  isOpen: boolean, 
  onClick: () => void,
  index: string | React.ReactNode
}> = ({ 
  title, 
  subtitle, 
  isOpen, 
  onClick, 
  index 
}) => {
  return (
    <div className="mb-4">
      <button 
        onClick={onClick}
        className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between group backdrop-blur-md hover:scale-[1.02]
        ${isOpen 
          ? 'bg-white/10 border-neon-purple/50 shadow-[0_0_25px_rgba(24,0,163,0.4)]' 
          : 'bg-white/5 border-white/10 hover:border-[#1800a3]/50 hover:shadow-[0_0_25px_rgba(24,0,163,0.4)]'
        }`}
      >
        <div className="flex items-center gap-4">
          <span className={`flex-shrink-0 w-8 h-8 rounded flex items-center justify-center text-sm font-bold border ${isOpen ? 'bg-neon-purple text-white border-neon-purple' : 'bg-white/5 text-gray-500 border-white/10'}`}>
            {index}
          </span>
          <span className={`text-lg font-medium transition-colors font-display ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
            {title}
          </span>
        </div>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-neon-purple' : 'text-gray-500'}`} />
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-6 pt-0 text-gray-400 leading-relaxed pl-[4.5rem]">
          {subtitle}
        </div>
      </div>
    </div>
  );
};

// --- Quiz Component ---

const BurnoutQuiz = () => {
  const [step, setStep] = useState<'intro' | 'question' | 'result'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    {
      text: "Do you feel emotionally drained before the workday even begins?",
      options: [
        { text: "Rarely", value: 0 },
        { text: "Sometimes", value: 1 },
        { text: "Often", value: 2 },
        { text: "Every single day", value: 3 }
      ]
    },
    {
      text: "Do you find yourself becoming cynical or critical of your team's performance?",
      options: [
        { text: "No, I'm supportive", value: 0 },
        { text: "Occasionally", value: 1 },
        { text: "Frequently", value: 2 },
        { text: "It's my default mode", value: 3 }
      ]
    },
    {
      text: "Are you struggling to delegate because you fear it won't be done right?",
      options: [
        { text: "No, I trust my team", value: 0 },
        { text: "Sometimes", value: 1 },
        { text: "Often", value: 2 },
        { text: "Always - I do it myself", value: 3 }
      ]
    },
    {
      text: "Do you feel like an 'Imposter' despite your achievements?",
      options: [
        { text: "No, I am confident", value: 0 },
        { text: "Sometimes", value: 1 },
        { text: "Often", value: 2 },
        { text: "Constantly", value: 3 }
      ]
    },
    {
      text: "Can you mentally disconnect from work when you are at home?",
      options: [
        { text: "Yes, easily", value: 0 },
        { text: "It takes effort", value: 1 },
        { text: "Rarely", value: 2 },
        { text: "Never, my mind is always racing", value: 3 }
      ]
    }
  ];

  const handleStart = () => {
    setScore(0);
    setCurrentQ(0);
    setStep('question');
  };

  const handleAnswer = (value: number) => {
    const newScore = score + value;
    setScore(newScore);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep('result');
    }
  };

  const getResult = () => {
    if (score <= 4) return {
      status: "OPTIMIZED",
      color: "text-emerald-400",
      desc: "Your resilience is high. Use this course to maintain your edge and prevent future sliding.",
      action: "Fortify Leadership"
    };
    if (score <= 9) return {
      status: "STRAINED",
      color: "text-yellow-400",
      desc: "You are the 'Squeezed Middle'. Caught between targets and team needs. Burnout is approaching.",
      action: "Stabilize System"
    };
    return {
      status: "CRITICAL",
      color: "text-neon-purple",
      desc: "You are in survival mode. Your biology is fighting your role. You need 'Managerial Self-Preservation' immediately.",
      action: "Emergency Protocol"
    };
  };

  const result = getResult();

  return (
    <section className="relative py-24 px-6 z-10">
      <div className="max-w-3xl mx-auto">
        <Reveal>
        <div className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border border-white/10">
           
           {/* Decorative bg element */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/5 blur-[100px] rounded-full pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-cyan/5 blur-[80px] rounded-full pointer-events-none" />

           {step === 'intro' && (
             <div className="text-center animate-fadeIn relative z-10">
               <div className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 mb-8 shadow-[0_0_20px_rgba(176,38,255,0.15)] backdrop-blur-md">
                <BarChart className="w-8 h-8 text-neon-purple" />
               </div>
               <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-tight font-display">Executive Resilience Audit</h3>
               <p className="text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed text-lg">
                 Are you just "tired" or is your leadership compromised? 
                 Take this 30-second assessment to analyze your operational state.
               </p>
               <Button primary onClick={handleStart} className="mx-auto text-lg px-8 py-4">
                 Start Assessment <ArrowUpRight className="w-5 h-5" />
               </Button>
             </div>
           )}

           {step === 'question' && (
             <div className="animate-fadeIn w-full max-w-xl mx-auto relative z-10">
               <div className="flex justify-between items-center text-xs font-mono text-neon-purple mb-8 uppercase tracking-widest bg-neon-purple/10 px-4 py-2 rounded-full border border-neon-purple/20">
                 <span>Query {currentQ + 1} / {questions.length}</span>
                 <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-neon-purple animate-pulse"/> Diagnostic Mode</span>
               </div>
               
               <h3 className="text-2xl md:text-3xl font-bold mb-10 leading-tight text-white font-display">
                 {questions[currentQ].text}
               </h3>
               
               <div className="space-y-4">
                 {questions[currentQ].options.map((option, idx) => (
                   <button
                     key={idx}
                     onClick={() => handleAnswer(option.value)}
                     className="w-full text-left p-6 rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-transparent hover:from-neon-purple/20 hover:to-neon-purple/5 hover:border-neon-purple hover:shadow-[0_0_20px_rgba(176,38,255,0.3)] transition-all duration-300 flex items-center justify-between group backdrop-blur-md"
                   >
                     <span className="text-lg text-gray-300 group-hover:text-white transition-colors font-medium">{option.text}</span>
                     <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-neon-purple group-hover:bg-neon-purple group-hover:text-white transition-all scale-90 group-hover:scale-100">
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                     </div>
                   </button>
                 ))}
               </div>
               
               <div className="mt-10 h-1.5 bg-white/5 rounded-full overflow-hidden">
                 <div 
                   className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan transition-all duration-500 shadow-[0_0_15px_rgba(176,38,255,0.8)]"
                   style={{ width: `${((currentQ) / questions.length) * 100}%` }}
                 />
               </div>
             </div>
           )}

           {step === 'result' && (
             <div className="text-center animate-fadeIn relative z-10">
               <p className="text-sm font-mono text-gray-500 mb-6 uppercase tracking-widest">Diagnostic Complete</p>
               
               <div className="inline-block relative mb-8 scale-100 hover:scale-105 transition-transform duration-700 ease-in-out">
                 <div className={`absolute inset-0 blur-[50px] opacity-40 animate-pulse ${result.color === 'text-emerald-400' ? 'bg-emerald-400' : result.color === 'text-yellow-400' ? 'bg-yellow-400' : 'bg-neon-purple'}`}></div>
                 <h3 className="text-5xl md:text-7xl font-bold relative z-10 tracking-tight font-display">
                   <span className={`${result.color} drop-shadow-[0_0_25px_rgba(176,38,255,0.4)] animate-pulse-slow`}>{result.status}</span>
                 </h3>
               </div>

               <p className="text-xl text-gray-300 mb-10 max-w-lg mx-auto leading-relaxed">
                 {result.desc}
               </p>
               
               <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                 <Button primary onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="w-full md:w-auto">
                   {result.action}
                 </Button>
                 <button 
                   onClick={handleStart}
                   className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors py-2 px-4 hover:bg-white/5 rounded-lg"
                 >
                   <RefreshCcw className="w-4 h-4" /> Restart Analysis
                 </button>
               </div>
             </div>
           )}
        </div>
        </Reveal>
      </div>
    </section>
  );
};

// --- Sections ---

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-24 px-6 z-10 overflow-hidden bg-brand-black">
      {/* Abstract Background - No dots/grid */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-deep-purple/30 rounded-[100%] blur-[120px] pointer-events-none opacity-50 mix-blend-screen animate-pulse-slow"
        style={{ transform: `translate(-50%, ${scrollY * 0.2}px)` }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[800px] h-[600px] bg-deep-blue/20 rounded-[100%] blur-[150px] pointer-events-none opacity-40 mix-blend-screen"
        style={{ transform: `translate(-20%, ${scrollY * 0.1}px)` }}
      />
      
      {/* Grain overlay for texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

      <div className="max-w-5xl mx-auto text-center relative z-20">
        <Reveal>
          <SectionBadge>Executive Leadership Course</SectionBadge>
        </Reveal>
        
        <Reveal delay={200}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight mb-8 text-white drop-shadow-2xl font-display">
            Save Yourself. <br />
            <span className="text-gray-500 bg-clip-text bg-gradient-to-b from-white to-gray-600">
              Save Your Team.
            </span>
          </h1>
        </Reveal>
        
        <Reveal delay={400}>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            For the <strong>"Squeezed Middle"</strong> in Tech, Finance, and Consulting.
            You were promoted for your technical skills, but now you're drowning in human dynamics.
            Stop the contagion. Master the biology of resilient leadership.
          </p>
        </Reveal>
        
        <Reveal delay={600}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button primary onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
              Start The Transformation <ArrowUpRight className="w-4 h-4" />
            </Button>
            <Button onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}>
              View Curriculum
            </Button>
          </div>
        </Reveal>
        
        {/* Logos or Trust Indicators */}
        <Reveal delay={800} className="mt-16 pt-8 border-t border-white/5 flex justify-center items-center gap-8 md:gap-16 opacity-40 grayscale">
           <span className="font-bold text-xl tracking-tighter">TECHSTAR</span>
           <span className="font-bold text-xl tracking-tighter">NEXUS</span>
           <span className="font-bold text-xl tracking-tighter">ALPHAVENTURE</span>
           <span className="font-bold text-xl tracking-tighter hidden md:block">FUTURESYNC</span>
        </Reveal>
      </div>
    </section>
  );
};

const TargetAudience = () => (
  <section className="relative py-12 px-6 z-10 border-b border-white/5 bg-white/[0.01]">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        <Reveal>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white font-display">
            <Target className="w-5 h-5 text-neon-purple" /> 
            Is this for you?
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3 text-gray-400">
              <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span><strong>The "Squeezed" Middle:</strong> You are caught between aggressive top-down targets and the wellbeing needs of your teams.</span>
            </li>
            <li className="flex gap-3 text-gray-400">
              <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span><strong>The Conscientious Achiever:</strong> Promoted for technical skills but feel ill-equipped to handle complex people problems.</span>
            </li>
            <li className="flex gap-3 text-gray-400">
              <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span><strong>Managers & Dept Heads:</strong> You have direct reports and work in high-pressure environments (Tech, Consulting, Scale-ups).</span>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={200}>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-400 font-display">
            <XCircle className="w-5 h-5 text-gray-500" /> 
            Who is this NOT for?
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3 text-gray-500">
              <X className="w-5 h-5 flex-shrink-0" />
              <span><strong>Individual Contributors:</strong> Employees with no direct management responsibilities.</span>
            </li>
            <li className="flex gap-3 text-gray-500">
              <X className="w-5 h-5 flex-shrink-0" />
              <span><strong>Intentionally Toxic Leaders:</strong> Those who believe "churn and burn" is a valid strategy and have no interest in empathy.</span>
            </li>
            <li className="flex gap-3 text-gray-500">
              <X className="w-5 h-5 flex-shrink-0" />
              <span><strong>Clinical Therapy Seekers:</strong> This is a professional development program, not medical treatment for severe trauma.</span>
            </li>
          </ul>
        </Reveal>
      </div>
    </div>
  </section>
);

const Problem = () => (
  <section className="relative py-24 px-6 z-10">
    <div className="max-w-7xl mx-auto">
      <SectionTitle 
        title="The Management Trap" 
        subtitle="Why highly capable leaders are burning out in record numbers."
      />
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <Card className="group h-full" delay={100}>
          <IconBox icon={<Brain className="w-6 h-6" />} color="text-neon-purple" />
          <h3 className="text-2xl font-bold mb-4 text-white font-display">The "Squeezed" Middle</h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            You are isolated. You feel you cannot show vulnerability to your team or your bosses. You lack a support network, dealing with "Loneliness in the Middle" while fighting fires instead of leading strategically.
          </p>
          <div className="w-full h-px bg-white/5 mb-6" />
          <div className="flex items-center gap-2 text-sm text-neon-purple font-medium drop-shadow-[0_0_5px_rgba(176,38,255,0.5)]">
             <AlertTriangle className="w-4 h-4" /> Chronic Overwhelm
          </div>
        </Card>

        {/* Card 2 */}
        <Card className="group h-full" delay={300}>
          <IconBox icon={<Users className="w-6 h-6" />} color="text-neon-purple" />
          <h3 className="text-2xl font-bold mb-4 text-white font-display">The Toxic Contagion</h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            A stressed manager creates a 'Culture of Urgency'. Dealing with interpersonal conflicts, passive-aggressive behavior, or disengaged employees (quiet quitting) drains your energy and kills innovation.
          </p>
          <div className="w-full h-px bg-white/5 mb-6" />
          <div className="flex items-center gap-2 text-sm text-neon-purple font-medium drop-shadow-[0_0_5px_rgba(176,38,255,0.5)]">
             <Activity className="w-4 h-4" /> Team Turnover Risk: High
          </div>
        </Card>
      </div>
    </div>
  </section>
);

const Solution = () => (
  <section className="relative py-24 px-6 z-10">
    {/* Noise Texture */}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
    
    <div className="max-w-7xl mx-auto relative">
      <SectionTitle 
        title="The Framework" 
        subtitle="A biological and strategic approach to sustainable leadership."
      />
      
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: <Layout className="w-6 h-6" />,
            title: "Managerial Self-Preservation",
            desc: "Concrete tools to protect your energy. Manage stress proactively and set healthy boundaries without guilt.",
            color: "text-neon-purple"
          },
          {
            icon: <Shield className="w-6 h-6" />,
            title: "Actionable Frameworks",
            desc: "No fluff. Use the Eisenhower Matrix, MoSCoW prioritization, and Strategic Delegation to handle the load.",
            color: "text-blue-400"
          },
          {
            icon: <Zap className="w-6 h-6" />,
            title: "Psychological Safety",
            desc: "Master Active Listening and Non-Violent Communication (NVC) to resolve toxic dynamics and build trust.",
            color: "text-pink-400"
          }
        ].map((item, idx) => (
          <Card key={idx} className="bg-brand-black hover:bg-[#111112]" delay={idx * 200}>
            <IconBox icon={item.icon} color={item.color} />
            <h3 className="text-xl font-bold mb-3 text-white font-display">{item.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Curriculum = () => {
  const [openIndex, setOpenIndex] = useState<string | null>("1");

  const modules = [
    { 
      id: "1", 
      title: "Module 1: Burn-out & Toxic Management", 
      subtitle: "Identify root causes of burnout and toxic behaviors. Understand the 'Honeymoon' to 'Chronic Fatigue' phases. Learn to spot the weak signals of distress in yourself and your team." 
    },
    { 
      id: "2", 
      title: "Module 2: Compassionate Leadership", 
      subtitle: "The foundations of caring leadership: Trust, Respect, Authenticity, and Support. Learn why benevolence is a strategic strength, not a weakness." 
    },
    { 
      id: "3", 
      title: "Module 3: Sustainable Performance", 
      subtitle: "Create a healthy work environment. Master workload management (Eisenhower Matrix), effective delegation, and promote autonomy to prevent bottlenecking." 
    },
    { 
      id: "4", 
      title: "Module 4: Responding to Distress", 
      subtitle: "Deciphering signs of psychological distress. Mastering 'Active Listening' and Non-Violent Communication (NVC) to handle difficult conversations and conflict." 
    },
    { 
      id: "5", 
      title: "Module 5: Manager Self-Preservation", 
      subtitle: "Your resilience is the cornerstone of your team's success. Techniques for mindfulness, setting clear limits, asking for help, and the power of disconnection." 
    }
  ];

  return (
    <section id="curriculum" className="relative py-24 px-6 z-10">
      <div className="max-w-3xl mx-auto">
        <SectionTitle title="The Executive Curriculum" center={false} subtitle="5 Modules designed to transform pressure into potential." />
        
        <Reveal className="mt-8">
          {modules.map((module) => (
            <AccordionItem 
              key={module.id}
              index={module.id}
              title={module.title}
              subtitle={module.subtitle}
              isOpen={openIndex === module.id}
              onClick={() => setOpenIndex(openIndex === module.id ? null : module.id)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
};

const SocialProof = () => (
  <section className="relative py-24 px-6 z-10">
    <div className="max-w-7xl mx-auto">
      <SectionTitle title="Trusted by Leaders" subtitle="Real results from executives who regained control." />
      
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            quote: "I was overwhelmed, turnover was skyrocketing. I had to rethink my entire approach. This program saved my health and my department.",
            author: "David Martin",
            role: "Senior Ops Manager",
            img: "https://randomuser.me/api/portraits/men/32.jpg"
          },
          {
            quote: "I was exhausted by interpersonal conflicts and passivity within my team. NVC works. We actually enjoy meetings again.",
            author: "Sarah Chen",
            role: "Tech Lead",
            img: "https://randomuser.me/api/portraits/women/44.jpg"
          },
          {
            quote: "I was a high performer hiding distress until the breaking point. The self-preservation module taught me that protecting my energy allows me to lead better.",
            author: "Thomas Dubois",
            role: "Project Director",
            img: "https://randomuser.me/api/portraits/men/86.jpg"
          }
        ].map((testimonial, idx) => (
          <Card key={idx} className="flex flex-col justify-between h-full" delay={idx * 150}>
            <div>
              <Quote className="w-8 h-8 text-neon-purple mb-6 opacity-50" />
              <p className="text-gray-300 mb-8 leading-relaxed">"{testimonial.quote}"</p>
            </div>
            <div className="flex items-center gap-4 pt-6 border-t border-white/5">
              <img src={testimonial.img} alt={testimonial.author} className="w-10 h-10 rounded-full grayscale" />
              <div>
                <div className="font-bold text-white text-sm">{testimonial.author}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{testimonial.role}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="relative py-24 px-6 z-10">
    <div className="max-w-5xl mx-auto">
      <SectionTitle title="Membership" center={true} />
      
      <div className="grid md:grid-cols-3 gap-8 items-center mt-12">
        {/* Placeholder Left Card */}
        <Reveal delay={200} className="hidden md:block p-8 rounded-3xl border border-white/10 hover:border-[#1800a3]/50 bg-white/[0.02] text-gray-500 blur-[2px] transform scale-90 opacity-50 backdrop-blur-sm shadow-[0_0_25px_rgba(24,0,163,0.25)]">
           <h3 className="text-xl font-bold mb-4 font-display">Self-Paced</h3>
           <div className="text-3xl font-bold mb-6">$1,497</div>
           <div className="space-y-4 mb-8">
             <div className="h-2 w-full bg-white/10 rounded"></div>
             <div className="h-2 w-2/3 bg-white/10 rounded"></div>
           </div>
           <button className="w-full py-3 rounded-lg border border-white/10">Waitlist</button>
        </Reveal>

        {/* Main Card (Center) */}
        <Reveal className="relative p-1 rounded-3xl bg-gradient-to-b from-neon-purple to-neon-purple/20 shadow-[0_0_50px_rgba(176,38,255,0.15)] transform md:scale-105 z-10">
          <div className="bg-[#0f0f10]/90 backdrop-blur-xl rounded-[22px] p-8 md:p-10 h-full flex flex-col">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="inline-block px-3 py-1 bg-neon-purple/10 text-neon-purple text-xs font-bold rounded-full mb-2 uppercase tracking-wide border border-neon-purple/20 shadow-[0_0_10px_rgba(176,38,255,0.2)]">
                  Founding Member
                </span>
                <h3 className="text-3xl font-bold text-white font-display">Executive</h3>
              </div>
              <div className="text-right">
                <div className="text-gray-500 line-through text-sm">$1,497</div>
                <div className="text-4xl font-bold text-white">$997</div>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-8 border-l-2 border-neon-purple pl-4">
              Discounted rate for case-study participants. Full access + coaching.
            </p>

            <div className="space-y-5 mb-10 flex-grow">
              {[
                "Full 5-Module Curriculum",
                "Private Executive Community",
                "Lifetime Updates included",
                "Conflict Resolution Toolkit"
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-neon-purple/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-neon-purple" />
                  </div>
                  <span className="text-sm">{feat}</span>
                </div>
              ))}
            </div>

            <Button primary className="w-full py-4 text-lg" onClick={() => window.location.href = "https://login.elyun.io/courses/offers/d7e84de3-7eff-4a1c-b61b-bb791486911a"}>
              Become a Member <ArrowUpRight className="w-5 h-5" />
            </Button>
            <p className="text-center text-xs text-gray-500 mt-4">30-day money-back guarantee</p>
          </div>
        </Reveal>

        {/* Placeholder Right Card */}
        <Reveal delay={200} className="hidden md:block p-8 rounded-3xl border border-white/10 hover:border-[#1800a3]/50 bg-white/[0.02] text-gray-500 blur-[2px] transform scale-90 opacity-50 backdrop-blur-sm shadow-[0_0_25px_rgba(24,0,163,0.25)]">
           <h3 className="text-xl font-bold mb-4 font-display">Corporate</h3>
           <div className="text-3xl font-bold mb-6">Custom</div>
           <div className="space-y-4 mb-8">
             <div className="h-2 w-full bg-white/10 rounded"></div>
             <div className="h-2 w-2/3 bg-white/10 rounded"></div>
           </div>
           <button className="w-full py-3 rounded-lg border border-white/10">Contact</button>
        </Reveal>
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const faqs = [
    {
      question: "How long is the course?",
      answer: "The course is designed to be completed in 5 weeks, with one module per week. However, you have lifetime access and can go at your own pace."
    },
    {
      question: "Is this for individuals or teams?",
      answer: "It is primarily designed for individual leaders, managers, and executives. However, many companies purchase licenses for their entire leadership team to create a shared language."
    },
    {
      question: "Do I get a certificate?",
      answer: "Yes, upon completion of all modules and the final assessment, you will receive a verifiable digital certificate of completion."
    },
    {
      question: "What if I'm not satisfied?",
      answer: "We offer a 30-day money-back guarantee. If you don't feel the course has provided value, simply email us for a full refund."
    },
    {
      question: "Is there live coaching?",
      answer: "The self-paced version does not include live coaching. The Executive Founding Member offer currently includes access to a private community where you can ask questions."
    }
  ];

  return (
    <section className="relative py-24 px-6 z-10 border-t border-white/5 bg-white/[0.01]">
      <div className="max-w-3xl mx-auto">
        <SectionTitle title="Frequently Asked Questions" center={true} />
        
        <Reveal className="mt-8">
          {faqs.map((faq, idx) => (
            <AccordionItem 
              key={idx}
              index={<HelpCircle className="w-4 h-4" />}
              title={faq.question}
              subtitle={faq.answer}
              isOpen={openIndex === idx.toString()}
              onClick={() => setOpenIndex(openIndex === idx.toString() ? null : idx.toString())}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="relative py-12 border-t border-white/5 bg-brand-black/80 backdrop-blur-lg text-sm z-10">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2 font-bold text-white">
        <ElyunLogo className="w-8 h-8" />
        <span className="tracking-widest font-display">ELYUN</span>
      </div>
      <div className="text-gray-500">
        © 2024 Elyun Executive. All rights reserved.
      </div>
      <div className="flex gap-8">
        <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy</a>
        <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms</a>
        <a href="#" className="text-gray-500 hover:text-white transition-colors">Contact</a>
      </div>
    </div>
  </footer>
);

// --- Main App ---

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-brand-black text-white selection:bg-neon-purple selection:text-white overflow-hidden">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-black/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="font-bold text-lg tracking-tight flex items-center gap-2">
            <ElyunLogo className="w-10 h-10" />
            {/* Hiding text on mobile to let logo shine, showing on desktop */}
            <span className="hidden sm:inline-block tracking-[0.2em] font-light font-display">ELYUN</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <button onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Curriculum</button>
            <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Pricing</button>
            <Button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="py-2 px-4 text-xs">
              Join Now
            </Button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <main>
        <Hero />
        <TargetAudience />
        <Problem />
        <BurnoutQuiz />
        <Solution />
        <Curriculum />
        <SocialProof />
        <Pricing />
        <FAQ />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
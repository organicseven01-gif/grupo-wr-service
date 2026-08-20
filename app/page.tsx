'use client';
import Image from 'next/image';
import { 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  PhoneCall, 
  ShieldCheck, 
  Video, 
  KeySquare, 
  Sparkles, 
  Wrench, 
  Users,
  CheckCircle2,
  Star,
  ArrowRight,
  Menu,
  ChevronDown,
  X,
  MapPin,
  Building2,
  Warehouse,
  Store,
  Home as HomeIcon,
  Factory,
  GraduationCap,
  Building,
  Briefcase,
  Hospital,
  ShoppingCart
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import CountUp from '../components/CountUp';

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const touchStartY = useRef(0);
  const touchInsideScrollable = useRef(false);
  const bioScrollRef = useRef<HTMLDivElement>(null);
  const totalSections = 9;

  useEffect(() => {
    const canScrollInside = (target: EventTarget | null, deltaY: number) => {
      const box = bioScrollRef.current;
      if (!box || !(target instanceof Node) || !box.contains(target)) return false;
      const atTop = box.scrollTop <= 0;
      const atBottom = box.scrollTop + box.clientHeight >= box.scrollHeight - 1;
      return (deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isMobileMenuOpen) return;

      if (canScrollInside(e.target, e.deltaY)) {
        return; // let the bio text scroll naturally instead of changing section
      }

      e.preventDefault();

      if (isAnimating) return;

      if (e.deltaY > 0 && currentSection < totalSections - 1) {
        navigateSection(currentSection + 1);
      } else if (e.deltaY < 0 && currentSection > 0) {
        navigateSection(currentSection - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (isMobileMenuOpen) return;
      touchStartY.current = e.touches[0].clientY;
      const box = bioScrollRef.current;
      touchInsideScrollable.current = !!(box && e.target instanceof Node && box.contains(e.target));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isMobileMenuOpen) return;
      if (touchInsideScrollable.current) return; // let the bio text scroll naturally
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isMobileMenuOpen || isAnimating) return;
      if (touchInsideScrollable.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      if (deltaY > 50 && currentSection < totalSections - 1) {
        navigateSection(currentSection + 1);
      } else if (deltaY < -50 && currentSection > 0) {
        navigateSection(currentSection - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, isAnimating, isMobileMenuOpen]);

  const navigateSection = (index: number) => {
    if (index === currentSection) return;
    setIsAnimating(true);
    setCurrentSection(index);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-zinc-950 selection:bg-orange-600 selection:text-white relative">
      
      {/* Side Navigation Dots */}
      <div className="fixed right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {Array.from({ length: totalSections }).map((_, i) => (
          <button 
            key={i}
            onClick={() => navigateSection(i)}
            className="p-2 cursor-pointer group"
            aria-label={`Ir para a seção ${i + 1}`}
          >
            <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${currentSection === i ? 'bg-orange-500 scale-150' : 'bg-zinc-700 group-hover:bg-orange-400'}`} />
          </button>
        ))}
      </div>

      {/* Top Bar & Header */}
      <div className="fixed top-0 w-full z-50">
        <div className="hidden md:block bg-zinc-900 border-b border-zinc-800 py-2 text-xs font-medium text-zinc-400">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-500" />
                contato@grupowrservice.com.br
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-zinc-500">Siga-nos:</span>
              <div className="flex items-center gap-3">
                <a href="#" className="hover:text-orange-500 transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
                <a href="#" className="hover:text-orange-500 transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
              </div>
            </div>
          </div>
        </div>

        <header className="bg-black/95 backdrop-blur-md border-b border-zinc-900 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateSection(0)}>
              <Image src="/images/logo.png" alt="Grupo WR Service" width={32} height={32} className="w-7 h-7 md:w-8 md:h-8 object-contain" />
              <div className="flex flex-col leading-none">
                <span className="text-lg md:text-xl font-bold text-white tracking-tight">Grupo WR</span>
                <span className="text-[9px] md:text-[10px] font-bold text-orange-500 tracking-widest uppercase">Service</span>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              <button onClick={() => navigateSection(0)} className={`text-sm font-medium transition-colors ${currentSection === 0 ? 'text-orange-500' : 'text-zinc-300 hover:text-orange-500'}`}>Home</button>
              <button onClick={() => navigateSection(1)} className={`text-sm font-medium transition-colors ${currentSection === 1 ? 'text-orange-500' : 'text-zinc-300 hover:text-orange-500'}`}>Sobre nós</button>
              <button onClick={() => navigateSection(2)} className={`text-sm font-medium transition-colors ${currentSection === 2 ? 'text-orange-500' : 'text-zinc-300 hover:text-orange-500'}`}>Serviços</button>
              <button onClick={() => navigateSection(3)} className={`text-sm font-medium transition-colors ${currentSection === 3 ? 'text-orange-500' : 'text-zinc-300 hover:text-orange-500'}`}>Segmento</button>
              <button onClick={() => navigateSection(7)} className={`text-sm font-medium transition-colors ${currentSection === 6 ? 'text-orange-500' : 'text-zinc-300 hover:text-orange-500'}`}>Trabalhe conosco</button>
              <button onClick={() => navigateSection(6)} className={`text-sm font-medium transition-colors ${currentSection === 6 ? 'text-orange-500' : 'text-zinc-300 hover:text-orange-500'}`}>FAQ</button>
            </nav>

            <div className="hidden lg:flex items-center gap-6">
              <a href="https://wa.me/5514988264038" target="_blank" rel="noopener noreferrer" className="bg-orange-600 hover:bg-orange-500 active:scale-95 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(234,88,12,0.3)] hover:shadow-[0_0_25px_rgba(234,88,12,0.5)]">
                Solicitar Orçamento
              </a>
            </div>
            
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-white p-2">
               <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-zinc-950/95 backdrop-blur-md z-[60] lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col h-full px-6 py-8">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-2">
                <Image src="/images/logo.png" alt="Grupo WR Service" width={32} height={32} className="w-8 h-8 object-contain" />
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-bold text-white tracking-tight">Grupo WR</span>
                  <span className="text-[10px] font-bold text-orange-500 tracking-widest uppercase">Service</span>
                </div>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 hover:text-white p-2">
                <X className="w-7 h-7" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 items-center text-center">
               <button onClick={() => { navigateSection(0); setIsMobileMenuOpen(false); }} className={`text-2xl font-bold ${currentSection === 0 ? 'text-orange-500' : 'text-white'}`}>Home</button>
               <button onClick={() => { navigateSection(1); setIsMobileMenuOpen(false); }} className={`text-2xl font-bold ${currentSection === 1 ? 'text-orange-500' : 'text-white'}`}>Sobre nós</button>
               <button onClick={() => { navigateSection(2); setIsMobileMenuOpen(false); }} className={`text-2xl font-bold ${currentSection === 2 ? 'text-orange-500' : 'text-white'}`}>Serviços</button>
               <button onClick={() => { navigateSection(3); setIsMobileMenuOpen(false); }} className={`text-2xl font-bold ${currentSection === 3 ? 'text-orange-500' : 'text-white'}`}>Segmento</button>
               <button onClick={() => { navigateSection(7); setIsMobileMenuOpen(false); }} className={`text-2xl font-bold ${currentSection === 6 ? 'text-orange-500' : 'text-white'}`}>Trabalhe conosco</button>
               <button onClick={() => { navigateSection(6); setIsMobileMenuOpen(false); }} className={`text-2xl font-bold ${currentSection === 6 ? 'text-orange-500' : 'text-white'}`}>FAQ</button>
               
               <a 
                 href="https://wa.me/5514988264038" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="mt-8 block text-center bg-orange-600 hover:bg-orange-500 active:scale-95 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 w-full shadow-[0_0_20px_rgba(234,88,12,0.3)]"
               >
                  Solicitar Orçamento
               </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div 
        className="w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.645,0.045,0.355,1)] flex flex-col"
        style={{ transform: `translateY(-${currentSection * 100}vh)` }}
      >
        
        {/* Section 0: Hero */}
        <section className="h-screen w-full shrink-0 relative flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video
              src="/videos/hero-bg.mp4"
              poster="/images/case-altaris.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pt-28 md:pt-24">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight mb-4 md:mb-6">
                Soluções inteligentes para empresas e <span className="text-orange-500">condomínios</span>
              </h1>
              <p className="text-sm md:text-xl text-zinc-400 mb-6 md:mb-10 leading-relaxed max-w-xl">
                Segurança Patrimonial, Monitoramento, Controle de Acesso e Facilities com atendimento personalizado em Bauru e região.
              </p>
              <button onClick={() => navigateSection(2)} className="bg-orange-600 hover:bg-orange-500 active:scale-95 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-lg transition-all duration-300 shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_30px_rgba(234,88,12,0.5)]">
                Conheça nossos serviços
              </button>
            </div>
          </div>
        </section>

        {/* Section 1: About */}
        <section className="h-screen w-full shrink-0 relative flex flex-col justify-center bg-zinc-950 overflow-hidden">
          
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full pt-16 md:pt-0">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-orange-900/20 rounded-3xl transform translate-x-4 translate-y-4 border border-orange-900/30"></div>
                <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900">
                  <Image
                    src="/images/director.png"
                    alt="Weslei Grego - Diretor Operacional"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 to-transparent">
                     <h3 className="text-2xl font-bold text-white mb-1">Weslei Grego</h3>
                     <p className="text-orange-500 font-medium uppercase tracking-wider text-sm">Diretor Operacional</p>
                  </div>
                </div>
              </div>
              
              <div ref={bioScrollRef} className="max-h-[60vh] lg:max-h-[65vh] overflow-y-auto pr-2 md:pr-4 custom-scrollbar">
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 tracking-tight leading-tight uppercase">
                  Weslei Grego
                </h2>
                <h3 className="text-lg md:text-xl text-orange-500 font-semibold mb-6 md:mb-8 uppercase tracking-wider">
                  Diretor Operacional
                </h3>
                
                <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-zinc-300 font-medium">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                    <p>Há mais de 13 anos na área da Segurança Patrimonial.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                    <p>Instrutor credenciado pela Polícia Federal em mais de 10 matérias.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                    <p>Instrutor de Tiro.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                    <p>Instrutor de Curso de Monitoramento.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                    <p>Durante 7 anos trabalhou como vigilante patrimonial em uma empresa de segurança multinacional.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                    <p>Desenvolveu experiência em Transporte de Valores (Carro Forte).</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                    <p>Atuou como Líder de Equipe.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                    <p>Experiência em consultoria de segurança, montando planos de segurança para os patrimônios.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                    <p>Coordenador do curso de Monitoramento e de curso de Liderança.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                    <p>Formado em Gestão de Segurança Privada.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                    <p>Diretor da WR e Athenttus.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Services */}
        <section className="h-screen w-full shrink-0 relative flex flex-col justify-center bg-black overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full pt-16 md:pt-0">
            <div className="text-center max-w-3xl mx-auto mb-4 md:mb-8">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3 tracking-tight">
                Soluções Completas para sua Empresa
              </h2>
              <p className="text-zinc-400 text-xs md:text-base hidden md:block">
                Terceirização estratégica para valorizar seu patrimônio. Oferecemos um ecossistema completo de serviços para que você foque apenas no crescimento do seu negócio.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {[
                { icon: ShieldCheck, title: "Segurança Patrimonial", desc: "Monitoramento por câmeras, vigilância e ronda patrimonial.", img: "/images/services/seguranca-patrimonial.jpg" },
                { icon: Sparkles, title: "Serviços Corporativos", desc: "Serviços terceirizados e suporte para o pleno funcionamento da operação." },
                { icon: KeySquare, title: "Controle de Acesso", desc: "Portaria presencial, portaria eletrônica e controle de acesso integrado." },
                { icon: Users, title: "Limpeza Empresarial", desc: "Equipe especializada em limpeza empresarial e conservação." },
                { icon: Video, title: "Recepção Corporativa", desc: "Recepção corporativa com excelência e qualidade no atendimento." },
                { icon: Wrench, title: "Segurança para Eventos", desc: "Equipe qualificada para garantir a segurança do seu evento.", img: "/images/services/seguranca-eventos.jpg" },
              ].map((service, index) => (
                <div key={index} className="relative bg-zinc-900/80 backdrop-blur border border-zinc-800 p-3 md:p-5 rounded-xl overflow-hidden hover:border-orange-500/50 hover:bg-zinc-900 transition-all duration-300 group">
                  {service.img && (
                    <>
                      <Image src={service.img} alt={service.title} fill className="object-cover object-top opacity-25 group-hover:opacity-35 transition-opacity" />
                      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950/85 to-zinc-950/95" />
                    </>
                  )}
                  <div className="relative">
                    <div className="w-9 h-9 md:w-11 md:h-11 bg-black border border-zinc-800 rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-3 group-hover:bg-orange-600/10 group-hover:border-orange-500/30 transition-colors">
                      <service.icon className="w-4 h-4 md:w-5 md:h-5 text-orange-500 group-hover:text-orange-400" />
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-white mb-1 md:mb-2">{service.title}</h3>
                    <p className="text-zinc-400 leading-snug text-[10px] md:text-xs">
                      {service.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Segmento */}
        <section className="h-screen w-full shrink-0 relative flex flex-col justify-center bg-zinc-950 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full pt-16 md:pt-0">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-6 tracking-tight">
                Segmentos de Atuação
              </h2>
              <p className="text-zinc-400 text-xs md:text-lg">
                Soluções customizadas para diferentes perfis de negócios e operações.
              </p>
            </div>
            
            <div className="relative w-full overflow-hidden py-8">
              <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-zinc-950 to-transparent z-10"></div>
              <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-zinc-950 to-transparent z-10"></div>
              
              <div className="flex w-[200%] animate-marquee">
                {[
                  { icon: Building2, title: "Condomínios Comerciais" },
                  { icon: HomeIcon, title: "Condomínios Residenciais" },
                  { icon: Factory, title: "Indústrias" },
                  { icon: Warehouse, title: "Logística" },
                  { icon: Store, title: "Varejo" },
                  { icon: Hospital, title: "Hospitais" },
                  { icon: GraduationCap, title: "Educação" },
                  { icon: Building, title: "Órgãos Públicos" },
                  { icon: Briefcase, title: "Escritórios" },
                  { icon: ShoppingCart, title: "Shoppings" },
                ].concat([
                  { icon: Building2, title: "Condomínios Comerciais" },
                  { icon: HomeIcon, title: "Condomínios Residenciais" },
                  { icon: Factory, title: "Indústrias" },
                  { icon: Warehouse, title: "Logística" },
                  { icon: Store, title: "Varejo" },
                  { icon: Hospital, title: "Hospitais" },
                  { icon: GraduationCap, title: "Educação" },
                  { icon: Building, title: "Órgãos Públicos" },
                  { icon: Briefcase, title: "Escritórios" },
                  { icon: ShoppingCart, title: "Shoppings" },
                ]).map((segment, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center justify-center min-w-[150px] md:min-w-[200px] gap-3 md:gap-4 group cursor-pointer">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-orange-600/10 group-hover:border-orange-500/30 transition-colors">
                      <segment.icon className="w-8 h-8 md:w-12 md:h-12 text-zinc-500 group-hover:text-orange-500 transition-colors" />
                    </div>
                    <span className="text-zinc-400 font-medium text-xs md:text-sm text-center group-hover:text-white transition-colors">{segment.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Stats */}
        <section className="h-screen w-full shrink-0 relative flex flex-col justify-center bg-orange-600 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x-0 md:divide-x divide-y md:divide-y-0 divide-orange-500/30 text-center">
              <div className="pt-6 md:pt-0">
                <div className="text-5xl md:text-7xl font-bold text-white mb-2 md:mb-4"><CountUp end={15} suffix="+" duration={3} /></div>
                <div className="text-orange-200 font-medium text-xs md:text-sm uppercase tracking-wider">Anos de Mercado</div>
              </div>
              <div className="pt-6 md:pt-0">
                <div className="text-5xl md:text-7xl font-bold text-white mb-2 md:mb-4"><CountUp end={500} suffix="+" duration={3} /></div>
                <div className="text-orange-200 font-medium text-xs md:text-sm uppercase tracking-wider">Projetos Atendidos</div>
              </div>
              <div className="pt-6 md:pt-0">
                <div className="text-5xl md:text-7xl font-bold text-white mb-2 md:mb-4"><CountUp end={2.5} suffix="K" decimals={1} duration={3} /></div>
                <div className="text-orange-200 font-medium text-xs md:text-sm uppercase tracking-wider">Profissionais Ativos</div>
              </div>
              <div className="pt-6 md:pt-0">
                <div className="text-5xl md:text-7xl font-bold text-white mb-2 md:mb-4"><CountUp end={24} suffix="/7" duration={3} /></div>
                <div className="text-orange-200 font-medium text-xs md:text-sm uppercase tracking-wider">Monitoramento Contínuo</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Empresas Atendidas */}
        <section className="h-screen w-full shrink-0 relative flex flex-col justify-center bg-zinc-950 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full pt-16 md:pt-0">
            <div className="text-center mb-12 md:mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Empresas Atendidas</h2>
              <p className="text-zinc-400 text-sm md:text-lg">Marcas que confiam na excelência do Grupo WR Service</p>
            </div>

            <div className="relative w-full overflow-hidden py-8">
              <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-zinc-950 to-transparent z-10"></div>
              <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-zinc-950 to-transparent z-10"></div>
              
              <div className="flex w-[200%] animate-marquee items-center gap-12 md:gap-24 px-12 md:px-24">
                {[
                  "Construtora Alpha", "Residencial Jardins", "Logística Express", "Indústria Mega",
                  "Centro Médico Vita", "Colégio Nacional", "Shopping Central", "Torre Empresarial Sul",
                  "Construtora Alpha", "Residencial Jardins", "Logística Express", "Indústria Mega",
                  "Centro Médico Vita", "Colégio Nacional", "Shopping Central", "Torre Empresarial Sul"
                ].map((empresa, index) => (
                  <div key={index} className="flex-none">
                    <span className="text-2xl md:text-4xl font-black text-zinc-800 uppercase tracking-widest whitespace-nowrap">{empresa}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: FAQ */}
        <section className="h-screen w-full shrink-0 relative flex flex-col justify-center bg-zinc-900 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 md:px-8 w-full">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-6 tracking-tight">
                Perguntas Frequentes
              </h2>
              <p className="text-zinc-400 text-sm md:text-lg">
                Esclareça suas principais dúvidas sobre nossa operação e serviços.
              </p>
            </div>
            
            <div className="space-y-3">
              {[
                {
                  q: "Como funciona a implantação da portaria remota?",
                  a: "Realizamos um estudo de viabilidade técnica sem custo. Após aprovado, instalamos todos os equipamentos (câmeras, biometria, nobreaks) e treinamos os moradores, com transição assistida para garantir zero impacto na rotina."
                },
                {
                  q: "Os profissionais de facilities são contratados de vocês?",
                  a: "Sim. Todos os colaboradores (limpeza, zeladoria, recepção e vigilância) são registrados sob regime CLT pela WR Service. Cuidamos de todos os encargos, faltas, férias e passivos trabalhistas."
                },
                {
                  q: "O que acontece se faltar energia ou internet no condomínio?",
                  a: "Nossos projetos preveem nobreaks de longa duração e internet com redundância (links de backup). Em caso de falha crítica e prolongada, deslocamos um agente físico de pronto atendimento para o local imediatamente."
                },
                {
                  q: "Posso contratar apenas o serviço de limpeza?",
                  a: "Com certeza. Nossos serviços podem ser contratados de forma modular (apenas um serviço) ou integrada (facilities completo + segurança), adaptando-se perfeitamente à sua necessidade e orçamento."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-black/50 border border-zinc-800 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none hover:bg-black/80 transition-colors"
                  >
                    <span className="font-semibold text-white text-sm md:text-base pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-orange-500 shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-6 pb-4 text-zinc-400 text-xs md:text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Trabalhe Conosco */}
        <section className="h-screen w-full shrink-0 relative flex flex-col justify-center bg-black overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full pt-16 md:pt-0">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-tight">
                  Faça parte da equipe <span className="text-orange-500">Grupo WR</span>
                </h2>
                <p className="text-zinc-400 mb-6 md:mb-8 leading-relaxed text-sm md:text-lg">
                  Valorizamos o talento humano e investimos constantemente na capacitação dos nossos colaboradores. Envie seu currículo e venha construir uma carreira sólida conosco.
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-2xl">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Envie seu Currículo</h3>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get('name');
                    const phone = formData.get('phone');
                    const role = formData.get('role');
                    const linkedin = formData.get('linkedin');
                    const subject = `Currículo - ${role} - ${name}`;
                    const body = `Nome: ${name}%0D%0ATelefone: ${phone}%0D%0ACargo de Interesse: ${role}%0D%0ALink do Currículo/LinkedIn: ${linkedin}`;
                    window.location.href = `mailto:contato@grupowrservice.com.br?subject=${subject}&body=${body}`;
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="name" className="block text-xs md:text-sm font-medium text-zinc-400 mb-1">Nome Completo</label>
                    <input required type="text" id="name" name="name" className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="Digite seu nome" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs md:text-sm font-medium text-zinc-400 mb-1">Telefone / WhatsApp</label>
                    <input required type="text" id="phone" name="phone" className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="(00) 00000-0000" />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-xs md:text-sm font-medium text-zinc-400 mb-1">Cargo de Interesse</label>
                    <input required type="text" id="role" name="role" className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="Ex: Vigilante, Recepcionista" />
                  </div>
                  <div>
                    <label htmlFor="linkedin" className="block text-xs md:text-sm font-medium text-zinc-400 mb-1">Link do Currículo (Drive/LinkedIn)</label>
                    <input required type="url" id="linkedin" name="linkedin" className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="https://..." />
                  </div>
                  <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 active:scale-95 text-white py-3 md:py-4 rounded-lg font-bold text-sm md:text-base transition-all duration-300 shadow-[0_0_15px_rgba(234,88,12,0.3)] mt-2">
                    Enviar Currículo por E-mail
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: CTA & Footer */}
        <section className="h-screen w-full shrink-0 relative flex flex-col justify-between bg-zinc-950 overflow-hidden pt-20 md:pt-28">
          
          {/* Pre-Footer CTA */}
          <div className="w-full flex-1 flex flex-col justify-center">
            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
              <div className="bg-orange-600 rounded-2xl md:rounded-3xl overflow-hidden flex flex-col md:flex-row items-center">
                <div className="hidden md:block w-full md:w-5/12 h-48 md:h-64 relative">
                   <Image
                      src="/images/cta-eventos.jpg"
                      alt="Equipe de segurança do Grupo WR Service em evento"
                      fill
                      className="object-cover object-top"
                    />
                </div>
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Pronto para otimizar sua gestão e aumentar a segurança?
                    </h2>
                    <p className="text-orange-100 text-sm md:text-base">
                      Solicite um estudo de viabilidade sem compromisso. Faremos um diagnóstico completo do seu negócio.
                    </p>
                  </div>
                  <a href="https://wa.me/5514988264038" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 text-white px-6 py-3 rounded-full font-bold text-sm md:text-base whitespace-nowrap transition-all duration-300 shrink-0 shadow-lg animate-pulse">
                    Falar com um consultor
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-black py-8 md:py-12 border-t border-zinc-900 w-full shrink-0">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="col-span-2 md:col-span-1">
                  <div className="flex items-center gap-2 mb-4">
                    <Image src="/images/logo.png" alt="Grupo WR Service" width={24} height={24} className="w-6 h-6 object-contain" />
                    <div className="flex flex-col leading-none">
                      <span className="text-lg font-bold text-white tracking-tight">Grupo WR</span>
                      <span className="text-[9px] font-bold text-orange-500 tracking-widest uppercase">Service</span>
                    </div>
                  </div>
                  <p className="text-zinc-500 text-xs leading-relaxed mb-4">
                    Excelência em terceirização de serviços, oferecendo soluções integradas em segurança e facilities.
                  </p>
                  <div className="flex gap-3">
                    <a href="#" className="text-zinc-500 hover:text-orange-500 transition-colors"><Facebook className="w-4 h-4" /></a>
                    <a href="#" className="text-zinc-500 hover:text-orange-500 transition-colors"><Instagram className="w-4 h-4" /></a>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-3 uppercase text-xs tracking-wider">Links</h4>
                  <ul className="space-y-2">
                    <li><button onClick={() => navigateSection(1)} className="text-zinc-500 hover:text-orange-500 text-xs transition-colors">Sobre a Empresa</button></li>
                    <li><button onClick={() => navigateSection(2)} className="text-zinc-500 hover:text-orange-500 text-xs transition-colors">Serviços</button></li>
                    <li><button onClick={() => navigateSection(5)} className="text-zinc-500 hover:text-orange-500 text-xs transition-colors">Depoimentos</button></li>
                    <li><button onClick={() => navigateSection(6)} className="text-zinc-500 hover:text-orange-500 text-xs transition-colors">Dúvidas Frequentes</button></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-3 uppercase text-xs tracking-wider">Serviços</h4>
                  <ul className="space-y-2">
                    <li><button onClick={() => navigateSection(2)} className="text-zinc-500 hover:text-orange-500 text-xs transition-colors">Segurança</button></li>
                    <li><button onClick={() => navigateSection(2)} className="text-zinc-500 hover:text-orange-500 text-xs transition-colors">Portaria Remota</button></li>
                    <li><button onClick={() => navigateSection(2)} className="text-zinc-500 hover:text-orange-500 text-xs transition-colors">Facilities</button></li>
                  </ul>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <h4 className="text-white font-bold mb-3 uppercase text-xs tracking-wider">Contato</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-xs">
                      <PhoneCall className="w-4 h-4 text-orange-500 shrink-0" />
                      <span className="text-zinc-300">(14) 98826-4038</span>
                    </li>
                    <li className="flex gap-2 text-xs">
                      <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                      <span className="text-zinc-300">Rua Anvar Dabus 09-84 L6 QF - Jardim Dona Sarah, Bauru - SP, 17012-380</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs">
                      <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                      <span className="text-zinc-300">contato@grupowrservice.com.br</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs">
                      <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                      <span className="text-zinc-300">Seg. a Sex. das 08:00 às 18:00</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-900 text-center md:text-left text-zinc-600 text-xs flex flex-col md:flex-row justify-between items-center gap-2">
                <p>© {new Date().getFullYear()} Grupo WR Service. Todos os direitos reservados.</p>
              </div>
            </div>
          </footer>
        </section>

      </div>
    </div>
  );
}


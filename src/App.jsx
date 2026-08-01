import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import confetti from 'canvas-confetti';
import { FaMusic, FaPause, FaPlay, FaHeart, FaStar } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import { MemoryTrail, SectionFrame } from './components/StoryFrame';

gsap.registerPlugin(ScrollTrigger);

const images = {
  krishna: ['/krishna-1.png', '/krishna-2.png', '/krishna-3.png'],
  simran: ['/simran-1.png', '/simran-2.png', '/simran-3.png'],
};

const storyChapters = [
  {
    title: 'Chaos Begins',
    body: 'We met in Class 6. And if someone asked us what we were... Friends? Absolutely not. We somehow found reasons to argue over the smallest things. Looking back... it is honestly funny.',
    accent: '0 → 100%',
  },
  {
    title: 'The Goodbye We Didn’t Understand',
    body: 'Then came your last day at school. I still remember one small moment. You waved goodbye. At that time... it just felt like another farewell. I didn’t know it would be our last conversation for years.',
  },
  {
    title: 'Different Paths',
    body: 'Life moved on. Different schools. Different routines. Different people. Without realizing it... we became strangers again.',
    years: ['2017', '2018', '2019', '2020', '2021', '2022'],
  },
  {
    title: 'One Notification Changed Everything',
    body: 'Years later... One Instagram conversation brought us back. I still remember where I was. I was sitting inside a movie theatre. Funny how one conversation changed everything.',
  },
  {
    title: 'Slowly...',
    body: 'It wasn’t instant. There wasn’t a day where we suddenly became best friends. It happened through random conversations, memes, late night chats, sharing problems, laughing, until being friends just became natural.',
  },
  {
    title: 'Distance Didn’t Matter',
    body: 'I moved to another city. Distance could’ve changed everything. Somehow... it didn’t.',
  },
  {
    title: 'Today',
    body: 'Today... Sometimes a single “hmm” is enough. Sometimes one random reply is enough. We’ve talked so much that we can understand each other’s mood without saying much. That is probably my favorite part of our friendship.',
  },
];

const trailSteps = [
  { label: 'Chapter 1', title: 'Chaos Begins', body: 'We met in Class 6 and immediately turned every small moment into a battle of wit.' },
  { label: 'Chapter 2', title: 'The Goodbye', body: 'One last wave at school felt ordinary until years later it became a memory we could never fully explain.' },
  { label: 'Chapter 3', title: 'Different Paths', body: 'We drifted into separate lives, separate routines, and separate worlds without noticing the distance.' },
  { label: 'Chapter 4', title: 'One Notification', body: 'A single Instagram message opened the door to the version of us we were always meant to become.' },
  { label: 'Chapter 5', title: 'A Friendship That Grew', body: 'It did not arrive in one dramatic moment. It grew through late-night chats, memes, laughter, and trust.' },
  { label: 'Chapter 6', title: 'Distance Didn’t Matter', body: 'Even after distance, the bond stayed calm, strong, and quietly alive.' },
  { label: 'Chapter 7', title: 'Today', body: 'Now one random text is enough to understand the whole day, the whole mood, the whole story.' },
];

const numbers = [
  { label: 'Years Since We Met', value: '10' },
  { label: 'Years We Didn’t Talk', value: '6' },
  { label: 'Instagram Reconnected', value: '1' },
  { label: 'Mood Detection', value: '99.9%' },
  { label: 'Bakchodi', value: '∞' },
  { label: 'Tolerance Level', value: 'Unlimited' },
];

const understandings = [
  'Random “hmm” has meaning.',
  'Dry replies are suspicious.',
  'Serious talks become jokes.',
  'We understand each other’s mood.',
  'Endless roasting.',
];

const reasons = [
  'You stayed.',
  'You listen.',
  'You understand.',
  'You tolerate me.',
  'You celebrate my wins.',
  'You make ordinary conversations memorable.',
];

const checklist = [
  'Trip Together',
  'Stupid Photos',
  'More Memories',
  'Laugh About Class 6',
  'Stay Friends Forever',
];

const floatingEmojis = ['💖', '✨', '🫶', '😌', '😂', '🌟', '💫', '💗', '🥹', '🎀'];

function App() {
  const [isIntroDone, setIsIntroDone] = useState(false);
  const [showStart, setShowStart] = useState(false);
  const [muted, setMuted] = useState(true);
  const [openedLetter, setOpenedLetter] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const introRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, duration: 1.2 });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setProgress(total > 0 ? (current / total) * 100 : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const target = introRef.current;
    if (!target) return;
    gsap.fromTo(
      target.querySelectorAll('.intro-word'),
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 1.1, stagger: 0.4, ease: 'power3.out', delay: 0.2 }
    );
  }, [isIntroDone]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.16 }
    );

    document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const startStory = () => {
    setShowStart(true);
    setIsIntroDone(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      audioRef.current.volume = 0.35;
    }
    setMuted(false);
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.1 } });
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setMuted(audioRef.current.muted);
  };

  const heroImages = useMemo(() => [images.krishna[0], images.simran[0], images.krishna[1], images.simran[1]], []);

  return (
    <div className="min-h-screen bg-[#09090B] text-white overflow-x-hidden selection:bg-[#ff4d8d]/60">
      <audio ref={audioRef} src="/friendship-theme.mp3" loop muted />
      <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-[#ff4d8d] via-[#7c3aed] to-[#ffd166] transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
      <button onClick={toggleMute} className="fixed top-5 right-5 z-50 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl p-3 text-white shadow-[0_0_25px_rgba(255,77,141,0.25)] hover:scale-105 transition-transform">
        {muted ? <FaPlay /> : <FaPause />}
      </button>

      <AnimatePresence mode="wait">
        {!isIntroDone ? (
          <motion.div
            ref={introRef}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
            transition={{ duration: 1.2 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#020202] text-center px-6"
            onClick={startStory}
          >
            <div className="space-y-3 text-white/90">
              <p className="intro-word text-[clamp(1rem,2vw,1.4rem)] uppercase tracking-[0.4em] text-[#b3b3b3]">Initializing...</p>
              <p className="intro-word text-[clamp(1.3rem,3vw,2rem)] font-semibold">Searching Memories...</p>
              <p className="intro-word text-[clamp(1rem,2vw,1.3rem)] text-[#ffd166]">Loading...</p>
              <p className="intro-word mt-6 text-[clamp(1.2rem,3vw,1.8rem)] text-[#ff4d8d] font-semibold">Best Friend Found ✓</p>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-12 text-center">
              <p className="text-[clamp(1.5rem,3vw,2.3rem)] font-semibold">Love you, Chudail ❤️</p>
              <p className="mt-3 text-lg text-white/70">Click Anywhere To Begin</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main className={`transition-all duration-700 ${showStart ? 'opacity-100' : 'opacity-0'}`}>
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-10">
          {Array.from({ length: 40 }).map((_, index) => (
            <motion.span
              key={index}
              className="absolute text-[1.2rem] sm:text-[1.5rem]"
              initial={{ y: -20, x: `${(index % 10) * 10}%`, opacity: 0 }}
              animate={{ y: ['-10vh', '110vh'], x: [null, `${((index * 7) % 10) * 10}%`], opacity: [0, 1, 0.8, 0] }}
              transition={{ duration: 8 + (index % 6), repeat: Infinity, delay: index * 0.12, ease: 'easeInOut' }}
              style={{ left: `${(index * 7) % 100}%`, top: '-10%' }}
            >
              {floatingEmojis[index % floatingEmojis.length]}
            </motion.span>
          ))}
        </div>
        <section className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,77,141,0.2),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(124,58,237,0.3),_transparent_30%),linear-gradient(135deg,_rgba(255,77,141,0.08),_transparent_40%)]" />
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white/70"
                initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
                animate={{ x: [null, Math.random() * 100 + '%'], y: [null, Math.random() * 100 + '%'], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 10 + i % 5, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>
          <div className="relative z-10 max-w-7xl w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }} className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/80">
                <IoSparkles className="text-[#ffd166]" /> Special for Simran
              </div>
              <h1 className="text-[clamp(3rem,6vw,6.6rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
                Happy Friendship Day,<br />
                <span className="text-[#ff4d8d]">Simran</span> ❤️
              </h1>
              <p className="max-w-2xl text-lg md:text-xl text-[#b3b3b3] leading-8">
                Some friendships begin with a hello. Ours began with arguments.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={startStory} className="rounded-full bg-gradient-to-r from-[#ff4d8d] to-[#7c3aed] px-7 py-3 font-medium shadow-[0_0_40px_rgba(255,77,141,0.28)]">Begin Our Story</button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="relative">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#ff4d8d]/30 to-[#7c3aed]/30 blur-3xl" />
              <div className="grid grid-cols-2 gap-4 rounded-[2rem] border border-white/10 bg-white/10 p-4 backdrop-blur-2xl">
                {heroImages.map((img, index) => (
                  <motion.img
                    key={img}
                    src={img}
                    alt={index % 2 === 0 ? 'Krishna' : 'Simran'}
                    className="h-[280px] w-full rounded-[1.3rem] object-cover shadow-[0_20px_80px_rgba(0,0,0,0.25)]"
                    whileHover={{ scale: 1.03, y: -6 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-24 md:px-8 lg:px-12">
          <SectionFrame eyebrow="Our Story" title="The timeline of us" description="This is not a story told in separate cards. It is one memory unfolding piece by piece, like a film that remembers itself.">
            <div className="space-y-10">
              {storyChapters.map((chapter, index) => (
                <motion.article
                  key={chapter.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.04 }}
                  className="reveal rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-8 shadow-[0_18px_80px_rgba(0,0,0,0.14)]"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-3xl space-y-4">
                      <p className="text-sm uppercase tracking-[0.3em] text-[#ff4d8d]">Chapter {index + 1}</p>
                      <h3 className="text-2xl font-semibold text-white">{chapter.title}</h3>
                      <p className="text-lg leading-8 text-[#b3b3b3]">{chapter.body}</p>
                    </div>
                    {chapter.accent ? (
                      <div className="rounded-full border border-[#ffd166]/30 bg-[#ffd166]/10 px-6 py-3 text-[#ffd166] font-medium">{chapter.accent}</div>
                    ) : null}
                    {chapter.years ? (
                      <div className="flex flex-wrap gap-3">
                        {chapter.years.map((year) => (
                          <div key={year} className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/80">{year}</div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </motion.article>
              ))}
            </div>
            <div className="mt-12">
              <MemoryTrail steps={trailSteps} />
            </div>
          </SectionFrame>
        </section>

        <section className="px-6 py-24 md:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-2xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
              <div className="reveal space-y-6">
                <p className="text-sm uppercase tracking-[0.35em] text-[#ffd166]">The Plot Twist</p>
                <h2 className="text-[clamp(2rem,3.6vw,2.8rem)] font-semibold">If someone had told our Class 6 selves...</h2>
                <p className="text-lg leading-8 text-[#b3b3b3]">we would’ve laughed. But somewhere between chaos and time, we became best friends.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#ff4d8d]">Class 6</p>
                  <ul className="mt-4 space-y-3 text-[#b3b3b3]">
                    <li>❌ Arguments</li>
                    <li>❌ Chaos</li>
                    <li>❌ Rivals</li>
                  </ul>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#7c3aed]">Today</p>
                  <ul className="mt-4 space-y-3 text-[#b3b3b3]">
                    <li>✅ Best Friends</li>
                    <li>✅ Mood Readers</li>
                    <li>✅ Partners in Bakchodi</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 md:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-3">
            {numbers.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="reveal rounded-[1.6rem] border border-white/10 bg-white/8 p-7 text-center backdrop-blur-2xl"
              >
                <p className="text-4xl font-semibold text-[#ffd166]">{item.value}</p>
                <p className="mt-3 text-sm uppercase tracking-[0.3em] text-[#b3b3b3]">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-6 py-24 md:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-2xl">
            <div className="reveal text-center space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-[#ff4d8d]">Things Only We Understand</p>
              <h2 className="text-[clamp(2rem,3.4vw,2.8rem)] font-semibold">A language made of jokes, silence, and chaos</h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {understandings.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="reveal rounded-[1.25rem] border border-white/10 bg-black/20 p-5 text-[#f5f5f5]"
                >
                  <div className="flex items-center gap-3">
                    <FaStar className="text-[#ffd166]" />
                    <p>{item}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 md:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                whileHover={{ scale: 1.02, y: -8 }}
                className="reveal rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-white/12 to-transparent p-6"
              >
                <div className="mb-4 text-[#ff4d8d]"><FaHeart /></div>
                <p className="text-xl font-medium">{reason}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-6 py-24 md:px-8 lg:px-12">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-black/30 p-10 text-center backdrop-blur-2xl">
            <div className="reveal space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-[#ffd166]">If We Never Reconnected</p>
              <h2 className="text-[clamp(2rem,3.5vw,2.8rem)] font-semibold">Sometimes I wonder...</h2>
              <p className="mx-auto max-w-2xl text-lg leading-8 text-[#b3b3b3]">What if we never found each other again? One Instagram message changed everything.</p>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 md:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-2xl">
            <div className="reveal text-center space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-[#7c3aed]">Future Bucket List</p>
              <h2 className="text-[clamp(2rem,3.4vw,2.8rem)] font-semibold">A few things we should absolutely do</h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {checklist.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="reveal rounded-[1.2rem] border border-white/10 bg-black/20 p-5 text-center text-white/85"
                >
                  <p className="text-lg">☐ {item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 md:px-8 lg:px-12">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#ff4d8d]/15 to-[#7c3aed]/15 p-8 backdrop-blur-2xl">
            <div className="reveal text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-[#ffd166]">Secret Letter</p>
              <h2 className="mt-4 text-[clamp(2rem,3.4vw,2.8rem)] font-semibold">Open it when you want the truth</h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="reveal mt-10 mx-auto max-w-3xl"
            >
              <div className="rounded-[2rem] border border-white/10 bg-black/30 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#b3b3b3]">Envelope</p>
                  <button onClick={() => setOpenedLetter(true)} className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm">{openedLetter ? 'Opened' : 'Open Letter'}</button>
                </div>
                <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-white/10 p-6">
                  <motion.div initial={false} animate={{ rotateX: openedLetter ? 0 : 8, y: openedLetter ? 0 : 8 }} transition={{ duration: 0.5 }} className="rounded-[1rem] border border-white/10 bg-[#fffdf7] p-6 text-[#111] shadow-2xl">
                    <p className="font-serif text-lg leading-8">
                      {openedLetter ? (
                        <>
                          If someone had told the Class 6 version of me that one day I’d be making an entire website just to wish you on Friendship Day, I’d have laughed the hardest.<br /><br />
                          Back then, all I knew was that we’d somehow end up arguing over the smallest things. If anyone had said, “One day you’ll call her your best friend,” I would’ve replied, “Bilkul nahi!”<br /><br />
                          Life has a weird way of surprising people, doesn’t it?<br /><br />
                          We lost touch for years, and honestly, I never thought we’d talk again. Then one random Instagram conversation changed everything. Slowly, without even realizing it, you became one of the most important people in my life.<br /><br />
                          Now we’ve reached a point where a random “hmm,” “thik hu,” or even a dry reply is enough for us to know something’s wrong. It’s funny how that happened.<br /><br />
                          Ab thoda sach bolte hain...<br /><br />
                          Baaki teri shakal ko chhod kar, tu badhiya bandi hai.<br /><br />
                          Pata nahi kaise, but tu meri har bakchodi ko itne patience se jhel leti hai. Mere random jokes, faltu arguments, overthinking, unnecessary drama... sab survive kar leti hai. Honestly, mujhe kabhi kabhi lagta hai tu hi ek insaan hai jo mujhe itna tolerate kar sakti hai.<br /><br />
                          Aur haan, meri pooja karti reh. Ho sakta hai tujhe achha pati mil hi jaaye.<br /><br />
                          Aur agar nahi mila...<br /><br />
                          ...to tension mat lena.<br /><br />
                          Main hoon na.<br /><br />
                          Shaadi main tumse nahi karunga, lekin pakka karwa dunga. Baraat bhi manage karwa denge, DJ bhi, aur agar zarurat padi toh stage pe speech bhi de dunga. Fikar not.<br /><br />
                          Jokes apart...<br /><br />
                          Thank you.<br /><br />
                          Thank you for staying.<br /><br />
                          Thank you for understanding me without me having to explain everything.<br /><br />
                          Thank you for listening to all my nonsense.<br /><br />
                          Thank you for laughing at my terrible jokes.<br /><br />
                          Thank you for becoming the friend I never expected to have but now can’t imagine life without.<br /><br />
                          I don’t know where life is going to take us in the next few years. We’ll both get busy, move to different places, have different responsibilities and meet new people.<br /><br />
                          But I genuinely hope one thing never changes...<br /><br />
                          Us.<br /><br />
                          Let’s keep making memories, keep roasting each other, keep irritating each other, and keep being the kind of friends who can understand each other with just one random text.<br /><br />
                          Happy Friendship Day, Chudail.<br /><br />
                          With lots of bakchodi and a little bit of emotion,<br />
                          — Krishna
                        </>
                      ) : (
                        'Click to open this letter from Krishna to Simran.'
                      )}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-24 md:px-8 lg:px-12">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-black/40 p-10 text-center backdrop-blur-2xl">
            <div className="reveal space-y-8">
              <div className="space-y-3 text-[clamp(1.4rem,2.8vw,2.4rem)] font-medium tracking-[0.3em] uppercase text-[#b3b3b3]">
                <p>Classmates.</p>
                <p>Enemies.</p>
                <p>Strangers.</p>
                <p>Friends.</p>
                <p>Best Friends.</p>
                <p>Forever?</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  confetti({ particleCount: 220, spread: 120, origin: { y: 0.5 } });
                }}
                className="rounded-full bg-gradient-to-r from-[#ff4d8d] to-[#ffd166] px-7 py-3 font-semibold text-[#09090B]"
              >
                Reveal Forever ❤️
              </motion.button>
              <p className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold text-white">Happy Friendship Day,<br />Simran ❤️</p>
              <p className="text-lg text-[#b3b3b3]">Thank you for coming back into my life.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

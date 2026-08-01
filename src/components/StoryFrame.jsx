import { motion } from 'framer-motion';

export function SectionFrame({ eyebrow, title, description, children, className = '' }) {
  return (
    <div className={`mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-white/8 p-8 shadow-[0_20px_90px_rgba(0,0,0,0.18)] backdrop-blur-2xl ${className}`}>
      {(eyebrow || title || description) && (
        <div className="reveal text-center space-y-4">
          {eyebrow && <p className="text-sm uppercase tracking-[0.35em] text-[#ffd166]">{eyebrow}</p>}
          {title && <h2 className="text-[clamp(2rem,3.4vw,2.8rem)] font-semibold">{title}</h2>}
          {description && <p className="mx-auto max-w-2xl text-lg leading-8 text-[#b3b3b3]">{description}</p>}
        </div>
      )}
      {children && <div className="mt-10">{children}</div>}
    </div>
  );
}

export function MemoryTrail({ steps }) {
  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-[#ff4d8d] via-[#7c3aed] to-transparent md:block" />
      <div className="space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: index * 0.05 }}
            className={`relative rounded-[1.5rem] border border-white/10 bg-black/20 p-6 backdrop-blur-2xl md:w-[calc(50%-1.5rem)] ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}
          >
            <div className="absolute left-1/2 top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-[#ffd166] shadow-[0_0_24px_#ffd166] md:block" />
            <p className="text-sm uppercase tracking-[0.3em] text-[#ff4d8d]">{step.label}</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#b3b3b3]">{step.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

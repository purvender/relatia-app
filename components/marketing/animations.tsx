"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

export function FadeIn({ children, delay = 0, duration = 0.7, className }: RevealProps) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={prefersReduced ? undefined : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInUp({ children, delay = 0, duration = 0.7, className }: RevealProps) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={prefersReduced ? undefined : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInScale({ children, delay = 0, duration = 0.8, className }: RevealProps) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={prefersReduced ? undefined : { opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInLeft({ children, delay = 0, duration = 0.7, className }: RevealProps) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={prefersReduced ? undefined : { opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInRight({ children, delay = 0, duration = 0.7, className }: RevealProps) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={prefersReduced ? undefined : { opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxFloat({ children, className, offset = 20 }: RevealProps & { offset?: number }) {
  return (
    <motion.div
      initial={{ y: offset }}
      whileInView={{ y: -offset }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 1.2, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

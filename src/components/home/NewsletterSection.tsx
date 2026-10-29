'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    setStatus('success');
  };

  return (
    <section className="py-20 lg:py-24 bg-[#F7F5F0]">
      <Container size="narrow">
        <div className="bg-white border border-[#E3DFD6] p-8 sm:p-12 text-center shadow-xs">
          <Reveal direction="up">
            <div className="w-12 h-12 mx-auto bg-[#F7F5F0] border border-[#E3DFD6] flex items-center justify-center text-[#756B55] mb-5">
              <Mail className="w-6 h-6 stroke-1" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#756B55] block mb-2">
              The Quick Floors Journal
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#252522] tracking-tight">
              Design Inspiration & Arrival Previews
            </h2>
            <p className="text-xs sm:text-sm text-[#77766F] mt-3 max-w-md mx-auto leading-relaxed">
              Subscribe to receive new collection lookbooks, installation guides, and member-only announcements.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            {status === 'success' ? (
              <div className="mt-8 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center gap-2 max-w-md mx-auto">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you! You have been subscribed to our journal previews.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-8 max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 bg-[#F7F5F0] border border-[#E3DFD6] px-4 py-3 text-xs text-[#252522] placeholder-[#77766F] outline-none focus:border-[#756B55] transition-colors"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Subscribe
                  </Button>
                </div>
                {status === 'error' && (
                  <p className="text-[11px] text-red-600 mt-2 text-left">{errorMessage}</p>
                )}
                <p className="text-[10px] text-[#77766F] mt-3">
                  We respect your privacy. Unsubscribe at any time. (Simulated demo)
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

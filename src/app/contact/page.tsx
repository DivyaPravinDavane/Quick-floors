'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Sample or Product Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="py-10 sm:py-16 bg-[#F7F5F0]">
      <Container size="wide">
        <Breadcrumbs items={[{ label: 'Contact Us' }]} className="mb-6" />

        <div className="max-w-3xl mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#756B55] block mb-2">
            Direct Client Support
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#252522] tracking-tight">
            Connect with Our Flooring Specialists
          </h1>
          <p className="text-xs sm:text-sm text-[#77766F] mt-3 leading-relaxed">
            Have questions about square-foot calculation, subfloor preparation, Schluter waterproofing, or curbside freight delivery? Our team is available by phone and message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white border border-[#E3DFD6] p-8 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-[#252522]">
                  Thank You, {formData.name}!
                </h3>
                <p className="text-xs text-[#77766F] max-w-md mx-auto leading-relaxed">
                  Your message has been received. In live operations, our Georgetown specialists respond within 2-4 business hours. (Simulated demo)
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      subject: 'Sample or Product Inquiry',
                      message: '',
                    });
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-[#E3DFD6] pb-3 mb-5">
                  <h3 className="font-serif text-xl text-[#252522]">
                    Send Us a Project Message
                  </h3>
                  <p className="text-xs text-[#77766F] mt-1">
                    Fill out the form below and we will get back to you promptly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#252522] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Sarah Jenkins"
                      className="w-full bg-[#F7F5F0]/60 border border-[#E3DFD6] p-2.5 text-xs text-[#252522] outline-none focus:border-[#756B55]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#252522] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sarah@example.com"
                      className="w-full bg-[#F7F5F0]/60 border border-[#E3DFD6] p-2.5 text-xs text-[#252522] outline-none focus:border-[#756B55]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#252522] mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(647) 000-0000"
                      className="w-full bg-[#F7F5F0]/60 border border-[#E3DFD6] p-2.5 text-xs text-[#252522] outline-none focus:border-[#756B55]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#252522] mb-1">
                      Inquiry Topic
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#F7F5F0]/60 border border-[#E3DFD6] p-2.5 text-xs text-[#252522] outline-none focus:border-[#756B55]"
                    >
                      <option>Sample or Product Inquiry</option>
                      <option>Square Footage Calculation</option>
                      <option>Curbside Freight Logistics</option>
                      <option>Trade & Designer Program</option>
                      <option>Schluter Systems Specification</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#252522] mb-1">
                    Your Message or Project Details *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your room size, preferred finishes, or timeline..."
                    className="w-full bg-[#F7F5F0]/60 border border-[#E3DFD6] p-2.5 text-xs text-[#252522] outline-none focus:border-[#756B55]"
                  />
                </div>

                {error && <p className="text-xs text-red-600">{error}</p>}

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Right: Authentic Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E3DFD6] p-6 sm:p-8 space-y-5 shadow-sm">
              <h3 className="font-serif text-xl text-[#252522] pb-3 border-b border-[#E3DFD6]">
                Georgetown Showroom Hub
              </h3>

              <div className="space-y-4 text-xs text-[#252522]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#756B55] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Physical Location</strong>
                    <span className="text-[#77766F] leading-relaxed">
                      140 Guelph St, Unit 7<br />
                      Georgetown, ON L7G 4A5<br />
                      Canada
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#756B55] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Direct Telephone</strong>
                    <a href="tel:+16477944836" className="text-[#756B55] font-semibold hover:underline">
                      (647) 794-4836
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#756B55] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Email Orders & Service</strong>
                    <a href="mailto:orders@quickfloors.ca" className="text-[#756B55] hover:underline">
                      orders@quickfloors.ca
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#756B55] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Support Hours (EST)</strong>
                    <span className="text-[#77766F] leading-relaxed">
                      Monday – Friday: 8:00 AM – 6:00 PM<br />
                      Saturday: 9:00 AM – 4:00 PM<br />
                      Online Showroom: Open 24/7
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-[#EEEAE2]/60 border border-[#E3DFD6] p-6 text-xs space-y-3">
              <h4 className="font-semibold text-[#252522] uppercase tracking-wider">
                Helpful Resources
              </h4>
              <ul className="space-y-2 text-[#77766F]">
                <li>
                  <Link href="/how-it-works" className="hover:text-[#252522] flex items-center justify-between">
                    <span>How Curbside Freight Operates</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </li>
                <li>
                  <Link href="/samples" className="hover:text-[#252522] flex items-center justify-between">
                    <span>5 Free Samples Terms & Shipping</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-[#252522] flex items-center justify-between">
                    <span>Installation & Tile Leveling FAQs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

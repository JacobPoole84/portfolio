'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

export default function Module5Portfolio() {
  const [isDark, setIsDark] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!heroRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.to('.hero-glow-left', {
        x: 48,
        y: -24,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to('.hero-glow-right', {
        x: -36,
        y: 28,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to('.hero-ring', {
        rotate: 360,
        duration: 28,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })

      gsap.to('.hero-particle', {
        y: 'random(-26, 26)',
        x: 'random(-18, 18)',
        opacity: 'random(0.25, 0.95)',
        duration: 'random(4.5, 8.5)',
        stagger: {
          each: 0.2,
          repeat: -1,
          yoyo: true,
        },
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const section = document.getElementById(targetId)
    if (!section) return
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${targetId}`)
  }

  const validateForm = () => {
    const newErrors = { name: '', email: '', message: '' }
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
      isValid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')

    if (validateForm()) {
      setSubmitting(true)
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!res.ok) throw new Error('Failed to send')
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitted(false), 3000)
      } catch {
        setSubmitError('Something went wrong. Please try again.')
      } finally {
        setSubmitting(false)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div
      className={`min-h-screen ${isDark ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
    >
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .fade-in {
          animation: fadeIn 0.8s ease-in;
        }
      `}</style>

      <header
        className={`sticky top-0 z-50 shadow-md ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
      >
        <nav
          className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center"
          aria-label="Main navigation"
        >
          <div>
            <a
              href="#home"
              onClick={e => handleNavClick(e, 'home')}
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded block"
            >
              <Image src="/icon.png" alt="Portfolio logo" width={40} height={40} className="h-10 w-auto rounded-lg" priority />
            </a>
          </div>
          <div className="flex items-center gap-6">
            <ul className="flex gap-6" role="list">
              <li>
                <a
                  href="#home"
                  onClick={e => handleNavClick(e, 'home')}
                  className={`hover:text-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={e => handleNavClick(e, 'projects')}
                  className={`hover:text-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={e => handleNavClick(e, 'about')}
                  className={`hover:text-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={e => handleNavClick(e, 'contact')}
                  className={`hover:text-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Contact
                </a>
              </li>
            </ul>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`ml-4 px-4 py-2 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isDark
                  ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 focus:ring-yellow-400'
                  : 'bg-gray-800 text-white hover:bg-gray-700 focus:ring-blue-500'
              }`}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </nav>
      </header>

      <section
        id="home"
        ref={heroRef}
        className={`relative isolate overflow-hidden text-white py-20 fade-in ${isDark ? 'bg-gradient-to-r from-blue-900 to-blue-950' : 'bg-gradient-to-r from-blue-600 to-blue-800'}`}
        aria-label="Hero section"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className={`hero-glow-left absolute -left-24 top-8 h-72 w-72 rounded-full blur-3xl ${isDark ? 'bg-cyan-400/20' : 'bg-cyan-200/45'}`}
          />
          <div
            className={`hero-glow-right absolute -right-16 top-24 h-80 w-80 rounded-full blur-3xl ${isDark ? 'bg-indigo-400/20' : 'bg-indigo-200/40'}`}
          />
          <div
            className={`hero-ring absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full border ${isDark ? 'border-white/10' : 'border-white/35'}`}
          />
          <div
            className={`absolute inset-0 opacity-40 ${isDark ? 'bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_40%),radial-gradient(circle_at_75%_70%,rgba(56,189,248,0.18),transparent_45%)]' : 'bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_40%),radial-gradient(circle_at_75%_70%,rgba(147,197,253,0.28),transparent_45%)]'}`}
          />
          <span className={`hero-particle absolute left-[12%] top-[22%] h-2.5 w-2.5 rounded-full ${isDark ? 'bg-cyan-200/80' : 'bg-white/95'}`} />
          <span className={`hero-particle absolute left-[20%] top-[68%] h-2 w-2 rounded-full ${isDark ? 'bg-blue-200/75' : 'bg-white/85'}`} />
          <span className={`hero-particle absolute left-[34%] top-[36%] h-1.5 w-1.5 rounded-full ${isDark ? 'bg-sky-300/80' : 'bg-white/80'}`} />
          <span className={`hero-particle absolute left-[48%] top-[14%] h-2 w-2 rounded-full ${isDark ? 'bg-indigo-200/85' : 'bg-white/90'}`} />
          <span className={`hero-particle absolute left-[56%] top-[72%] h-2.5 w-2.5 rounded-full ${isDark ? 'bg-cyan-100/70' : 'bg-blue-100/90'}`} />
          <span className={`hero-particle absolute left-[68%] top-[42%] h-1.5 w-1.5 rounded-full ${isDark ? 'bg-sky-100/90' : 'bg-white/85'}`} />
          <span className={`hero-particle absolute left-[82%] top-[26%] h-2 w-2 rounded-full ${isDark ? 'bg-blue-100/85' : 'bg-white/90'}`} />
          <span className={`hero-particle absolute left-[88%] top-[64%] h-2.5 w-2.5 rounded-full ${isDark ? 'bg-indigo-100/70' : 'bg-blue-100/85'}`} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 focus:outline-none">Jacob Poole</h1>
          <p className={`text-xl mb-8 ${isDark ? 'text-blue-300' : 'text-blue-100'}`}>
            Full-stack developer crafting innovative web solutions
          </p>
          <a
            href="mailto:jacobpoole84@gmail.com"
            className={`inline-block px-8 py-3 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white ${isDark ? 'bg-blue-300 text-blue-900 hover:bg-blue-200' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
            aria-label="Contact me via email"
          >
            Contact Me
          </a>
          <div className="mt-6 flex items-center justify-center gap-4" role="list" aria-label="Quick profile links">
            <a
              href="https://www.linkedin.com/in/jacob-poole-a546181a/"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white ${isDark ? 'bg-blue-800 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-400 text-white'}`}
              aria-label="Open LinkedIn"
              role="listitem"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d="M6.94 8.5H3.56v10.87h3.38V8.5zM5.25 3.14c-1.08 0-1.95.88-1.95 1.96 0 1.08.87 1.95 1.95 1.95s1.95-.87 1.95-1.95c0-1.08-.87-1.96-1.95-1.96zM20.44 13.19c0-3.01-1.61-4.41-3.76-4.41-1.73 0-2.5.95-2.93 1.62V8.5h-3.38v10.87h3.38v-6.07c0-.32.02-.64.12-.87.25-.64.82-1.3 1.78-1.3 1.25 0 1.75.96 1.75 2.36v5.88h3.38v-6.18z" />
              </svg>
            </a>
            <a
              href="https://github.com/JacobPoole84"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}
              aria-label="Open GitHub"
              role="listitem"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d="M12 .5C5.65.5.5 5.74.5 12.22c0 5.18 3.3 9.57 7.88 11.12.58.11.79-.26.79-.57 0-.28-.01-1.03-.02-2.02-3.2.71-3.88-1.58-3.88-1.58-.52-1.37-1.27-1.73-1.27-1.73-1.04-.73.08-.71.08-.71 1.15.08 1.75 1.2 1.75 1.2 1.02 1.8 2.68 1.28 3.33.98.1-.76.4-1.28.72-1.57-2.55-.3-5.24-1.31-5.24-5.86 0-1.3.45-2.36 1.19-3.19-.12-.3-.52-1.5.11-3.13 0 0 .97-.32 3.18 1.22a10.78 10.78 0 0 1 5.78 0c2.21-1.54 3.18-1.22 3.18-1.22.63 1.63.23 2.83.11 3.13.74.83 1.19 1.89 1.19 3.19 0 4.56-2.69 5.55-5.26 5.85.41.37.78 1.09.78 2.19 0 1.58-.01 2.86-.01 3.25 0 .31.21.69.8.57 4.58-1.55 7.87-5.94 7.87-11.12C23.5 5.74 18.35.5 12 .5z" />
              </svg>
            </a>
            <a
              href="/JacobPooleResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white ${isDark ? 'bg-emerald-700 hover:bg-emerald-600 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}
              aria-label="Open Resume"
              role="listitem"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d="M6 2.75h9.5L20 7.25V21a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3.75a1 1 0 0 1 1-1zm8.5 1.8v2.7a1 1 0 0 0 1 1h2.7L14.5 4.55zM8 11h8v1.5H8V11zm0 3h8v1.5H8V14zm0 3h5v1.5H8V17z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
        aria-label="Featured projects"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className={`text-4xl font-bold mb-12 text-center focus:outline-none ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-8" role="list">
            {[
              {
                id: 1,
                title: 'Crypto-Tracker App',
                description:
                  'A full-stack crypto-tracking application with real-time price updates.',
                image: '/crypto-tracker-preview.svg',
                link: 'https://coinpulse-eight.vercel.app/',
                githubLink: 'https://github.com/JacobPoole84/coinpulse',
                openInNewTab: true,
              },
              {
                id: 2,
                title: 'AI-powered skincare analysis platform',
                description:
                  'AI-powered platform that analyzes skincare routines and provides personalized recommendations.',
                image: '/skinstric.png',
                link: 'https://skinstric-xi.vercel.app/',
                githubLink: 'https://github.com/JacobPoole84/skinstric',
                openInNewTab: true,
              },
              {
                id: 3,
                title: 'Modern UI/UX Showcase',
                description:
                  'A collection of modern UI/UX design patterns and components built with React and Tailwind CSS.',
                image: '/modern-ui-ux.png',
                link: 'https://modern-ux-ui-sigma.vercel.app/',
                githubLink: 'https://github.com/JacobPoole84/modern-ux-ui',
                openInNewTab: true,
              },
              {
                id: 4,
                title: 'Book summary & knowledge consumption platform',
                description:
                  'A modern productivity-focused reading platform that delivers condensed book insights, audio summaries, and self-improvement content through a clean, mobile-friendly interface',
                image: '/summarist.png',
                link: 'https://summarist-liard.vercel.app/',
                githubLink: 'https://github.com/JacobPoole84/virtual-internship-v2',
                openInNewTab: true,
              },
            ].map(project => (
              <div
                key={project.id}
                className={`rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500 ${isDark ? 'bg-gray-700' : 'bg-white'}`}
                role="listitem"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3
                    className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  >
                    {project.title}
                  </h3>
                  <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {project.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <a
                      href={project.link}
                      target={project.openInNewTab ? '_blank' : undefined}
                      rel={project.openInNewTab ? 'noopener noreferrer' : undefined}
                      className="text-blue-600 font-semibold hover:text-blue-800 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
                    >
                      View Project →
                    </a>
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 font-semibold hover:text-gray-800 transition focus:outline-none focus:ring-2 focus:ring-gray-500 rounded px-1"
                      >
                        GitHub Repo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
        aria-label="About me"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className={`text-4xl font-bold mb-12 text-center focus:outline-none ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            About Me
          </h2>
          <div className="flex flex-col items-center">
            <div className="flex justify-center mb-8">
              <Image
                src="/JacobHeadshot.jpg"
                alt="Profile photo"
                width={300}
                height={300}
                className="rounded-full shadow-lg"
              />
            </div>

            <div className="max-w-2xl text-center">
              <p
                className={`text-lg mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              >
                I'm a passionate full-stack developer with a love for building beautiful, functional
                web applications. With expertise in modern JavaScript frameworks and cloud
                technologies, I create scalable solutions that make a real impact. When I'm not
                coding, you can find me exploring new technologies and collaborating with amazing
                teams.
              </p>

              <h3
                className={`text-2xl font-semibold mb-4 focus:outline-none ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                Skills
              </h3>
              <div className="grid grid-cols-2 gap-3" role="list">
                {[
                  'JavaScript',
                  'React',
                  'Next.js',
                  'TypeScript',
                  'Tailwind CSS',
                  'GSAP',
                  'Node.js',
                  'PostgreSQL',
                  'API Design',
                ].map(skill => (
                  <div
                    key={skill}
                    className={`px-4 py-2 rounded-lg font-semibold text-center transition focus-within:ring-2 focus-within:ring-blue-500 ${isDark ? 'bg-blue-900 text-blue-300 hover:bg-blue-800' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                    role="listitem"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
        aria-label="Contact form"
      >
        <div className="max-w-2xl mx-auto px-4">
          <h2
            className={`text-4xl font-bold mb-12 text-center focus:outline-none ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Get In Touch
          </h2>

          {submitted && (
            <div
              className={`mb-6 p-4 rounded-lg text-center font-semibold ${isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'}`}
            >
              ✓ Message sent successfully! I'll get back to you soon.
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className={`rounded-lg shadow-lg p-8 ${isDark ? 'bg-gray-700' : 'bg-white'}`}
            aria-label="Contact form"
          >
            <div className="mb-6">
              <label
                htmlFor="name"
                className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg transition focus:outline-none focus:ring-2 ${
                  errors.name
                    ? isDark
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-red-400 focus:ring-red-400'
                    : isDark
                      ? 'border-gray-600 focus:ring-blue-500'
                      : 'border-gray-300 focus:ring-blue-500'
                } ${isDark ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'}`}
                placeholder="Your name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p
                  id="name-error"
                  className={`text-sm mt-1 ${isDark ? 'text-red-400' : 'text-red-600'}`}
                  role="alert"
                >
                  {errors.name}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg transition focus:outline-none focus:ring-2 ${
                  errors.email
                    ? isDark
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-red-400 focus:ring-red-400'
                    : isDark
                      ? 'border-gray-600 focus:ring-blue-500'
                      : 'border-gray-300 focus:ring-blue-500'
                } ${isDark ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'}`}
                placeholder="your.email@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className={`text-sm mt-1 ${isDark ? 'text-red-400' : 'text-red-600'}`}
                  role="alert"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-2 border rounded-lg transition focus:outline-none focus:ring-2 ${
                  errors.message
                    ? isDark
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-red-400 focus:ring-red-400'
                    : isDark
                      ? 'border-gray-600 focus:ring-blue-500'
                      : 'border-gray-300 focus:ring-blue-500'
                } ${isDark ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'}`}
                placeholder="Your message..."
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p
                  id="message-error"
                  className={`text-sm mt-1 ${isDark ? 'text-red-400' : 'text-red-600'}`}
                  role="alert"
                >
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting || !formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
              className={`w-full px-6 py-3 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                !submitting && formData.name.trim() && formData.email.trim() && formData.message.trim()
                  ? isDark
                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                  : isDark
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              aria-label="Send contact message"
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitError && (
              <p className={`text-sm mt-2 ${isDark ? 'text-red-400' : 'text-red-600'}`} role="alert">
                {submitError}
              </p>
            )}
          </form>
        </div>
      </section>

      <footer
        className={`text-white py-20 ${isDark ? 'bg-gray-950' : 'bg-gray-900'}`}
        aria-label="Site footer"
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <div className="relative inline-flex flex-col items-center group">
              <button
                aria-label="Back to top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                onMouseEnter={e => {
                  gsap.to(e.currentTarget, { scale: 1.15, rotate: 6, duration: 0.3, ease: 'back.out(1.7)' })
                  gsap.to(e.currentTarget.parentElement!.querySelector('.tooltip'), { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' })
                }}
                onMouseLeave={e => {
                  gsap.to(e.currentTarget, { scale: 1, rotate: 0, duration: 0.3, ease: 'power2.out' })
                  gsap.to(e.currentTarget.parentElement!.querySelector('.tooltip'), { opacity: 0, y: 4, duration: 0.15, ease: 'power2.in' })
                }}
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg cursor-pointer"
              >
                <Image src="/icon.png" alt="Logo — back to top" width={64} height={64} className="h-16 w-auto rounded-lg" />
              </button>
              <span
                className="tooltip pointer-events-none absolute -bottom-8 whitespace-nowrap text-xs text-gray-400 opacity-0 translate-y-1"
              >
                ↑ Back to top
              </span>
            </div>
          </div>
          <div className="mb-6" role="list" aria-label="Social media links">
            <a
              href="https://github.com/JacobPoole84"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my GitHub profile"
              className="inline-block mr-4 hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
              role="listitem"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/jacob-poole-a546181a/"
              aria-label="Connect with me on LinkedIn"
              className="inline-block mr-4 hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
              role="listitem"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="/JacobPooleResume.pdf"
              aria-label="Open my resume"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
              role="listitem"
            >
              Resume
            </a>
          </div>
          <p className={`${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            &copy; 2026 Jacob Poole. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
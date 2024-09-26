'use client'

import { useEffect, useRef, useState } from 'react'
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import Link from "next/link"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

gsap.registerPlugin(ScrollTrigger)

const skills = [
  "Python", "Django", "Redis", "Django Channels", "FastAPI", "Django REST Framework",
  "PostgreSQL", "Docker", "JavaScript", "Kafka", "GraphQL", "React", "Node.js", "TypeScript"
]

const projects = [
  {
    title: "Crypto Wallet App",
    description: "A secure and user-friendly cryptocurrency wallet application built with React Native and blockchain integration.",
    link: "https://github.com/janedoe/crypto-wallet-app",
    gradient: "from-blue-400 to-green-500"
  },
  {
    title: "Weather API",
    description: "A robust weather API built with FastAPI, providing real-time weather data and forecasts.",
    link: "https://github.com/janedoe/weather-api",
    gradient: "from-yellow-400 to-red-500"
  },
  {
    title: "TaskPay",
    description: "A task management and payment platform using Django, Django Channels, and Stripe integration.",
    link: "https://github.com/janedoe/taskpay",
    gradient: "from-purple-400 to-pink-500"
  }
]

export function Page() {
  const headerRef = useRef(null)
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })

      gsap.from(aboutRef.current, {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })

      gsap.from(skillsRef.current?.children, {
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out'
      })

      gsap.from(projectsRef.current?.children, {
        scrollTrigger: {
          trigger: projectsRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: 'power3.out'
      })

      gsap.from(contactRef.current?.children, {
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        },
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      })
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (!canvas || !ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particles: { x: number; y: number; size: number; vx: number; vy: number }[] = []

    const createParticle = (x: number, y: number) => {
      particles.push({
        x,
        y,
        size: Math.random() * 2 + 1,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1
      })
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.size > 0.1) particle.size -= 0.01

        if (particle.size <= 0) {
          particles.splice(index, 1)
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()

          const dx = mousePosition.x - particle.x
          const dy = mousePosition.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(mousePosition.x, mousePosition.y)
            ctx.stroke()
          }
        }
      })

      requestAnimationFrame(animateParticles)
    }

    animateParticles()

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      createParticle(e.clientX, e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mousePosition])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 text-white relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
      <header 
        ref={headerRef}
        className="relative p-6 bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-lg"
      >
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">Jane Doe</h1>
          <p className="text-xl">Full Stack Software Engineer</p>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4 relative">
        <section ref={aboutRef} className="mb-12 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-lg">
            I'm a passionate full stack software engineer with 5+ years of experience in building web applications
            and APIs. I specialize in Python-based backends using Django and FastAPI, with expertise in frontend
            technologies like React and JavaScript. I'm skilled in working with databases, message brokers, and
            containerization technologies. My goal is to create efficient, scalable, and user-friendly solutions
            that solve real-world problems.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <div ref={skillsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div 
                key={skill} 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full px-3 py-1 text-center shadow-md transform hover:scale-105 transition-transform duration-200"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section ref={projectsRef} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <div ref={contactRef} className="flex flex-wrap gap-4">
            <Button asChild className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
              <Link href="mailto:jane.doe@example.com">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white">
              <Link href="https://github.com/janedoe" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
              <Link href="https://linkedin.com/in/janedoe" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer 
        className="relative bg-gradient-to-r from-purple-500 to-indigo-500 py-6 text-center text-white"
      >
        <p>&copy; 2023 Jane Doe. All rights reserved.</p>
      </footer>
    </div>
  )
}

function ProjectCard({ title, description, link, gradient }: { title: string; description: string; link: string; gradient: string }) {
  return (
    <Card className={`bg-gradient-to-br ${gradient} text-white overflow-hidden transform hover:scale-105 transition-transform duration-200 h-full`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-100">{description}</CardDescription>
        <Button asChild className="mt-4 bg-white text-gray-800 hover:bg-gray-100">
          <Link href={link} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Project
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  showCTA?: boolean
  ctaText?: string
  ctaHref?: string
}

export function Header({ showCTA = true, ctaText = "Use this template", ctaHref = "#" }: HeaderProps) {
  return (
    <header className="px-4 sm:px-6 lg:px-8 pt-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <Image 
              src="/firecrawl-logo-with-fire.webp" 
              alt="Firecrawl logo" 
              width={40}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          
        </div>
        
        {showCTA && (
          <Button
            variant="code"
            asChild
          >
            <Link href={ctaHref} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              {ctaText}
            </Link>
          </Button>
        )}
      </div>
    </header>
  )
}
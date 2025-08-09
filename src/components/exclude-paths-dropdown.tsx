'use client'

import { useState, useRef, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Filter, Plus, X } from 'lucide-react'

interface ExcludePathsDropdownProps {
  excludePaths: string[]
  onExcludePathsChange: (paths: string[]) => void
}

export function ExcludePathsDropdown({ excludePaths, onExcludePathsChange }: ExcludePathsDropdownProps) {
  const [localPaths, setLocalPaths] = useState<string[]>(excludePaths.length > 0 ? excludePaths : [''])
  const [isOpen, setIsOpen] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (excludePaths.length === 0 && localPaths.length === 0) {
      setLocalPaths([''])
    }
  }, [excludePaths, localPaths.length])

  const handlePathChange = (index: number, value: string) => {
    const newPaths = [...localPaths]
    newPaths[index] = value
    setLocalPaths(newPaths)
  }

  const handlePathBlur = (index: number) => {
    const path = localPaths[index]
    // Only validate non-empty paths
    if (path && !path.startsWith('/')) {
      const newPaths = [...localPaths]
      newPaths[index] = '/' + path
      setLocalPaths(newPaths)
    }
  }

  const addPath = () => {
    setLocalPaths([...localPaths, ''])
    // Focus the new input after a brief delay
    setTimeout(() => {
      const lastIndex = localPaths.length
      inputRefs.current[lastIndex]?.focus()
    }, 50)
  }

  const removePath = (index: number) => {
    const newPaths = localPaths.filter((_, i) => i !== index)
    // Ensure at least one empty input remains
    setLocalPaths(newPaths.length > 0 ? newPaths : [''])
  }

  const handleOk = () => {
    // Filter out empty paths and ensure they start with /
    const validPaths = localPaths
      .filter(path => path.trim() !== '')
      .map(path => path.startsWith('/') ? path : '/' + path)
    
    onExcludePathsChange(validPaths)
    setIsOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      // When closing, save the valid paths
      handleOk()
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
          title="Exclude paths from crawling"
        >
          <Filter className="w-4 h-4" />
          {excludePaths.length > 0 && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="w-80 p-4"
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Exclude Paths</h3>
            <span className="text-xs text-zinc-500">Paths to ignore when crawling</span>
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {localPaths.map((path, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  ref={(el) => {
                    inputRefs.current[index] = el
                  }}
                  type="text"
                  value={path}
                  onChange={(e) => handlePathChange(index, e.target.value)}
                  onBlur={() => handlePathBlur(index)}
                  placeholder="/admin"
                  className="flex-1 h-8 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      if (index === localPaths.length - 1) {
                        addPath()
                      }
                    }
                  }}
                />
                {localPaths.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removePath(index)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={addPath}
              className="h-8"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Path
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleOk}
              className="h-8 bg-orange-500 hover:bg-orange-600 text-white"
            >
              OK
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
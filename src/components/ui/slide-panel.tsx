import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface SlidePanelProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children?: ReactNode
    className?: string
}

export function SlidePanel({ isOpen, onClose, title, children, className }: SlidePanelProps) {
    const panelRef = useRef<HTMLDivElement>(null)

    // Close on click outside the panel
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen, onClose])

    // Close on Escape key
    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
        }

        return () => {
            document.removeEventListener("keydown", handleEscape)
        }
    }, [isOpen, onClose])

    return (
        <>
            {/* Backdrop overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/30 z-40 transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
            />

            {/* Slide panel from right */}
            <div
                ref={panelRef}
                className={cn(
                    "fixed top-0 right-0 h-full w-[400px] max-w-full bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "translate-x-full",
                    className
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto h-[calc(100%-73px)]">
                    {children}
                </div>
            </div>
        </>
    )
}

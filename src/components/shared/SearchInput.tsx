"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

interface SearchInputProps<T> {
    className?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    onSelect: (item: T) => void;
    results: T[];
    isLoading?: boolean;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    renderResult: (item: T, index: number, isSelected: boolean) => ReactNode;
    renderEmpty?: () => ReactNode;
    debounceMs?: number;
    minQueryLength?: number;
}

export function SearchInput<T>({
    className = "",
    placeholder = "Search...",
    value,
    onChange,
    onSelect,
    results,
    isLoading = false,
    isOpen: controlledIsOpen,
    onOpenChange,
    renderResult,
    renderEmpty,
    minQueryLength = 2
}: SearchInputProps<T>) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Use controlled or uncontrolled open state
    const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
    const setIsOpen = onOpenChange || setInternalIsOpen;


    // Show dropdown when we have results
    useEffect(() => {
        const shouldOpen = results.length > 0 && value.length >= minQueryLength;
        setIsOpen(shouldOpen);
        setSelectedIndex(-1);
    }, [results, value, minQueryLength, setIsOpen]);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !inputRef.current?.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsOpen]);

    const handleSelect = (item: T) => {
        setIsOpen(false);
        onSelect(item);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen || results.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < results.length - 1 ? prev + 1 : prev
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < results.length) {
                    handleSelect(results[selectedIndex]);
                }
                break;
            case "Escape":
                setIsOpen(false);
                setSelectedIndex(-1);
                inputRef.current?.blur();
                break;
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className={`relative ${className}`}>
            {/* Search Input */}
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                {isLoading && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    </div>
                )}
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-auto"
                >
                    {results.length > 0 ? (
                        <ul className="py-1">
                            {results.map((item, index) => (
                                <li
                                    key={index}
                                    className="cursor-pointer"
                                    onClick={() => handleSelect(item)}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                >
                                    {renderResult(item, index, index === selectedIndex)}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        renderEmpty ? (
                            renderEmpty()
                        ) : (
                            <div className="px-4 py-3 text-gray-500 text-center">
                                No results found
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}

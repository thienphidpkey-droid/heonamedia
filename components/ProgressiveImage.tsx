import React, { useState, useEffect, useRef } from 'react';

interface ProgressiveImageProps {
    src: string;
    alt: string;
    className?: string;
    loading?: 'lazy' | 'eager';
    fetchPriority?: 'high' | 'low' | 'auto';
    width?: string;
    height?: string;
    /**
     * Delay in milliseconds before starting to load this image.
     * This allows for progressive/sequential loading of images.
     */
    delay?: number;
}

/**
 * Progressive Image component that loads images sequentially
 * with optional delays for better performance and visual experience
 */
export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
    src,
    alt,
    className = '',
    loading = 'lazy',
    fetchPriority = 'auto',
    width,
    height,
    delay = 0,
}) => {
    const [shouldLoad, setShouldLoad] = useState(delay === 0);
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (delay > 0) {
            const timer = setTimeout(() => {
                setShouldLoad(true);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [delay]);

    useEffect(() => {
        if (shouldLoad && imgRef.current) {
            if (imgRef.current.complete) {
                setIsLoaded(true);
            }
        }
    }, [shouldLoad]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Skeleton/placeholder while loading */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-pulse" />
            )}

            {shouldLoad && (
                <img
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    loading={loading}
                    fetchPriority={fetchPriority}
                    width={width}
                    height={height}
                    className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    onLoad={handleLoad}
                />
            )}
        </div>
    );
};

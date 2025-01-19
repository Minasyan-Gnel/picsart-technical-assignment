import React, { useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { usePhotoStore } from "../../../stores/PhotoStore";

export const LoadMore = () => {
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const [searchParams] = useSearchParams();

    const { loadMore } = usePhotoStore();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        loadMore(searchParams.get('q'))
                    }
                })
            },
        )
    
        if (loadMoreRef.current) {
          observer.observe(loadMoreRef.current)
        }
    
        return () => {
          observer.disconnect()
        }
    }, [loadMore, searchParams])

  return <div ref={loadMoreRef} style={{ height: '1px' }} />
}
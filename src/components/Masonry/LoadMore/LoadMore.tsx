import React, { useRef, useEffect } from "react";

import { usePhotoStore } from "../../../stores/PhotoStore";

export const LoadMore = () => {
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const { loadMore } = usePhotoStore();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        loadMore()
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
    }, [loadMore])

  return <div ref={loadMoreRef} style={{ height: '1px' }} />
}
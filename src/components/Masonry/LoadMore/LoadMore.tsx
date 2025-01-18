import React, { FC, useRef, useEffect } from "react";

type LoadMoreProps = {
    onLoadMore: () => void;
}

export const LoadMore: FC<LoadMoreProps> = ({onLoadMore}) => {
    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              onLoadMore()
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
      }, [onLoadMore])

  return <div ref={loadMoreRef} style={{ height: '1px' }} />
}
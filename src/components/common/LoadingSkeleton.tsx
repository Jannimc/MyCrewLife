import React from 'react';

interface LoadingSkeletonProps {
  items?: number;
  type?: 'card' | 'list' | 'profile';
}

export function LoadingSkeleton({ items = 1, type = 'card' }: LoadingSkeletonProps) {
  const renderSkeleton = () => {
    switch (type) {
      case 'profile':
        return (
          <div className="space-y-4">
            <div className="h-5 bg-gray-200 rounded w-24 mb-1 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
          </div>
        );
      case 'list':
        return (
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="h-5 bg-gray-200 rounded w-24"></div>
              <div className="h-5 bg-gray-200 rounded-full w-16"></div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-6 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {[...Array(items)].map((_, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
}
const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {/* Map over the skeletonMessages array to create skeletons for each message */}
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
          {/* Chat image (profile picture) skeleton */}
          <div className="chat-image avatar">
            <div className="size-10 rounded-full">
              {/* Skeleton for the circular profile image */}
              <div className="skeleton w-full h-full rounded-full" />
            </div>
          </div>

          {/* Chat header (name or timestamp) skeleton */}
          <div className="chat-header mb-1">
            {/* Skeleton for header text */}
            <div className="skeleton h-4 w-16" />
          </div>

          {/* Chat message bubble skeleton */}
          <div className="chat-bubble bg-transparent p-0">
            {/* Skeleton for the message content */}
            <div className="skeleton h-16 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;

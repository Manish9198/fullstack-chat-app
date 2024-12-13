import { Users } from "lucide-react";

// A functional React component to render a skeleton loader for a sidebar
const SidebarSkeleton = () => {
  // Create an array of 8 null values to represent the skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    // Main container for the sidebar skeleton
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200"
    >
      {/* Header section of the sidebar */}
      <div className="border-b border-base-300 w-full p-5">
        {/* Header content: Icon and title */}
        <div className="flex items-center gap-2">
          {/* Users icon from lucide-react */}
          <Users className="w-6 h-6" />
          {/* Title text, visible only on larger screens */}
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      {/* Skeleton loader for contact items */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          // Individual skeleton item
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full" />
            </div>

            {/* User information skeleton, visible only on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              {/* Placeholder for the user name */}
              <div className="skeleton h-4 w-32 mb-2" />
              {/* Placeholder for additional user details */}
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    // Main container, hidden on small screens, with background and padding
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      {/* Content wrapper with a maximum width and centered text */}
      <div className="max-w-md text-center">
        {/* Grid layout for the decorative pattern */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {/* Create 9 square elements with alternating animations */}
          {[...Array(9)].map((_, i) => (
            <div
              key={i} // Unique key for each square element
              className={`aspect-square rounded-2xl bg-primary/10 ${
                i % 2 === 0 ? "animate-pulse" : "" // Add animation to every second square
              }`}
            />
          ))}
        </div>
        {/* Title section */}
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {/* Subtitle section */}
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;

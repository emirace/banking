type Props = {
  size?: "sm" | "md" | "lg";
};

const Loading = ({ size = "md" }: Props) => {
  const sizeClass =
    size === "sm" ? "h-6 w-6" : size === "lg" ? "h-20 w-20" : "h-10 w-10";

  return (
    <div className={`relative ${sizeClass} flex items-center justify-center`}>
      <div
        className="absolute animate-spin inset-0 rounded-full bg-gradient-to-r from-blue-600 via-black to-purple-600"
        style={{
          WebkitMask: "radial-gradient(circle, transparent 55%, black 56%)",
          mask: "radial-gradient(circle, transparent 55%, black 56%)",
        }}
      />
    </div>
  );
};

export default Loading;

import React from 'react';

interface BadgeProps {
  icon: string; // Placeholder for icon (e.g., SVG path or class name)
  title: string;
  description: string;
}

const Badge: React.FC<BadgeProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[var(--background)] shadow-md">
      <div className="text-4xl text-[var(--color-primary)] mb-3">{icon}</div>
      <h3 className="text-lg font-bold text-[var(--foreground)] mb-1">{title}</h3>
      <p className="text-[0.7rem] text-[var(--foreground)]">{description}</p>
    </div>
  );
};

export default Badge; 
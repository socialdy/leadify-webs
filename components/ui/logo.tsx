import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      src="/img/logo.png"
      alt="Leadify Logo"
      width={120}
      height={120}
      priority
    />
  );
}; 
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

const ParticleBackground = dynamic(
  () => import("@/components/effects/ParticleBackground")
);
const CustomCursor = dynamic(
  () => import("@/components/effects/CustomCursor")
);

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ParticleBackground />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import FeaturesSection from '@/components/home/FeaturesSection'
import EMSInfoSection from '@/components/home/EMSInfoSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden dark:bg-gray-900">
        <HeroSection />
        <ServicesSection />
        <FeaturesSection />
        <EMSInfoSection />
    </main>
  )
}

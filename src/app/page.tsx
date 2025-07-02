import dynamic from 'next/dynamic'

// Dynamic imports for code splitting - components will load only when needed
const HeroSection = dynamic(() => import('@/components/home/HeroSection'), {
  loading: () => <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 animate-pulse" />,
})

const ServicesSection = dynamic(() => import('@/components/home/ServicesSection'), {
  loading: () => <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse" />,
})

const FeaturesSection = dynamic(() => import('@/components/home/FeaturesSection'), {
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-900 animate-pulse" />,
})

const EMSInfoSection = dynamic(() => import('@/components/home/EMSInfoSection'), {
  loading: () => <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse" />,
})

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

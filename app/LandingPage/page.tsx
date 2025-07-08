import ContactSection from "../components/Contact";
import FeaturesSection from "../components/FeatureSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import HowItWorksSection from "../components/HowItWorks";
import Navbar from "../components/Navbar";
import UseCasesSection from "../components/UseCases";

export default function LandingPage() {
    return (
<div>
    <Navbar />
    <HeroSection />
    <FeaturesSection />
    <HowItWorksSection />
    <UseCasesSection />
    <ContactSection />
    <Footer />
</div>
    )

}
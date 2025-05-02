import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToEnrollmentForm = () => {
    const enrollmentFormSection = document.getElementById('enrollment-form');
    if (enrollmentFormSection) {
      enrollmentFormSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative">
      {/* Remove top info section with gray background */}
      <div className="flex flex-col lg:flex-row bg-[#0F172A] min-h-[500px]">
        {/* Left side with image and gradient */}
        <div className="relative lg:w-2/3">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/attached_assets/Peer to peer .png')" }}
          />
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, #0F172A 0%, rgba(15,23,42,0.9) 40%, transparent 100%)"
            }}
          />
        </div>

        {/* Right side with text content */}
        <div className="relative lg:w-1/3 flex flex-col justify-center p-8 lg:p-12 bg-[#0F172A] z-10">
          <h1 className="text-4xl font-bold mb-4 text-white">Veteran Care Re-imagined</h1>
          <p className="text-gray-300 mb-6">
            AriasHealth.ai leverages cutting-edge technologies for veteran specific mental health support. Our platform
            provides personalized connections with those who truly understand your experiences.
          </p>

          <Button 
            onClick={scrollToEnrollmentForm}
            className="bg-[#3e64dd] text-white hover:bg-[#2a4bba] transition-all duration-300 rounded-md py-2 px-6 text-sm font-medium w-fit"
            size="default"
          >
            Get Support – Join the Waitlist
          </Button>

          <p className="mt-4 text-sm text-gray-400">
            <span className="font-semibold text-gray-300">Early Access:</span> Be among the first to experience veteran-matched support.
          </p>
        </div>
      </div>
    </section>
  );
}
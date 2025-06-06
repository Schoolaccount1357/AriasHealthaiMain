import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import PeerSupportImg from "@assets/Peertopeer.jpg";

export function Hero() {
  const scrollToEnrollmentForm = () => {
    const enrollmentFormSection = document.getElementById('enrollment-form');
    if (enrollmentFormSection) {
      enrollmentFormSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="mb-0 sm:mb-12">
      {/* Hero Banner - Using the new Peertopeer.jpg image */}
      <div className="relative h-[400px] sm:h-[300px] md:h-[400px] overflow-hidden bg-[#0F172A]">
        {/* Left side - Image of veterans in support group */}
        <div className="absolute top-0 left-0 h-full w-full sm:w-2/3 overflow-hidden">
          <img 
            src={PeerSupportImg} 
            alt="Support group discussion in a bright, supportive environment" 
            className="h-full w-full object-cover object-center"
          />
          {/* Gradient overlay - bottom to top for mobile, left to right for desktop */}
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#0F172A] via-[#0F172A]/60 to-transparent sm:from-transparent sm:via-[#0F172A]/60 sm:to-[#0F172A]"></div>
        </div>

        {/* Content area - positioned at bottom for mobile, right side for desktop */}
        <div className="absolute bottom-0 sm:top-0 sm:right-0 w-full sm:w-1/2 pb-8 sm:p-0 flex flex-col justify-end sm:justify-center items-start sm:items-start sm:pl-8">
          <div className="max-w-xs ml-64 sm:mx-0 text-left sm:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-amber-100 via-white to-amber-50 text-transparent bg-clip-text">
              You are not alone.
            </h1>
            <p className="text-sm md:text-base text-white/90 mb-4">
              Confidential veteran-to-veteran support, built with care.
            </p>

            <Button 
              onClick={scrollToEnrollmentForm}
              className="bg-[#3e64dd] text-white hover:bg-[#2a4bba] transition-all duration-300 rounded-md py-2 px-4 text-sm font-medium"
              size="default"
            >
              Get early access to PairLink
            </Button>
          </div>
        </div>
      </div>


    </section>
  );
}
import MVPPreviewImg from "@assets/Preview_1752600978042.png";

export function MVPPreview() {
  return (
    <section className="mb-8 sm:mb-12 md:mb-16 px-4 sm:px-0">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-[#10066A]">
            Willow MVP Preview
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#10066A] to-[#3e64dd] mx-auto mb-4 sm:mb-6"></div>
        </div>

        {/* Image Container with Responsive Design - Half Size */}
        <div className="flex justify-center">
          <div className="relative max-w-full w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <img 
              src={MVPPreviewImg} 
              alt="Willow MVP Preview showing mobile app interface with AriasHealth.ai branding and Welcome to Willow screens"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
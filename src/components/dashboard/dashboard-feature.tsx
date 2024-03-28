import Link from 'next/link';
import BackgroundSection from '../ui/background';

const DashboardFeature = ({ background, color, video }) => {
  const sectionStyle = {
    background: background ? `url(${background}) center/cover` : color,
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <BackgroundSection videoSrc={video} imageUrl={background} overlayColor={color} className="py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
            Welcome to the dynamic and vibrant world of BARK
          </h1>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-300 mb-8">
            Our ecosystem thrives on innovation, collaboration, and shared value.
            Beyond being just a token, BARK is a community united by a common goal:
            building a future where everyone can thrive.
          </h2>
          <p className="text-lg sm:text-base lg:text-lg leading-7 text-gray-300 mb-8">
            Secure your early bonus and become a part of our growing community.
          </p>
          <Link href="/claim">
            <button
              className="px-8 py-3 rounded-full bg-blue text-white shadow-md hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-blue transition duration-300 ease-in-out"
            >
              Claim Now
            </button>
          </Link>
          <div className="mt-4 flex items-center justify-center">
            <img src="/assets/logo/solana-logo-black.svg" alt="Solana Logo" className="w-4 h-4" />
          </div>
        </div>
      </div>
    </BackgroundSection>
  );
};

export default DashboardFeature;

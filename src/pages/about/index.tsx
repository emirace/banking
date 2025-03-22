import Footer from "../_components/footer";
import Navbar from "../_components/navbar";
import AboutSection from "./_component/about";
import BankingFeatures from "./_component/featureCard";

function AboutUs() {
  return (
    <div>
      <Navbar />
      <section className="bg-gradient-to-br from-purple-900 pt-20 h-80  via-black to-blue-600 text-white flex w-full justify-center items-center ">
        <h1 className="text-7xl font-semibold">About us</h1>
      </section>
      <AboutSection />
      <BankingFeatures />
      <Footer />
    </div>
  );
}

export default AboutUs;

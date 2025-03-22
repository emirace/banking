import Footer from "../_components/footer";
import Navbar from "../_components/navbar";
import BankingFeatures from "../about/_component/featureCard";
import Features from "../home/_components/features";

function Service() {
  return (
    <div>
      <Navbar />
      <section className="-mb-10 bg-gradient-to-br from-purple-900 pt-20 h-80  via-black to-blue-600 text-white flex w-full justify-center items-center ">
        <h1 className="text-5xl text-center md:text-7xl font-semibold">
          Our Services
        </h1>
      </section>
      <Features />
      <BankingFeatures />
      <Footer />
    </div>
  );
}

export default Service;

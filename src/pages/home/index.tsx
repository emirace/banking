import Footer from "../_components/footer";
import Navbar from "../_components/navbar";
import BillingPayment from "./_components/billPayments";
import Features from "./_components/features";
import FinanceControl from "./_components/financeControl";
import Hero from "./_components/hero";
import InternationalPayments from "./_components/internationalPayments";
import PaymentBanner from "./_components/paymentBanner";
import PaymentFeature from "./_components/paymentFeatures";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <FinanceControl />
      <PaymentFeature />
      <InternationalPayments />
      <BillingPayment />
      <PaymentBanner />
      <Footer />
    </div>
  );
}

export default Home;

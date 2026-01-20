import { CiYoutube } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { useState } from "react";
import { FaCheck, FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router";
import logo from "../../assets/images/logo.png";

export default function Footer() {
  const [sent, setSent] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribeToNewsletter = async () => {
    try {
      setLoading(true);
      await fetch("/api/newsletters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: input }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setInput("");
      setSent(true);
      setLoading(false);
    }
  };

  return (
    <footer className="py-10 pt-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Logo & Contact Info */}
        <div>
          <div className="text-2xl font-bold flex items-center space-x-2">
            <img src={logo} alt="logo" className="w-auto h-10" />
            <span className=" ">TransactSphere</span>
          </div>
          <p className="text-gray-400 mt-4">
            5919 Drive Crossings Pkwy, Kenturky
          </p>
          <p className="mt-2 font-semibold">transactsphere@gmail.com</p>
          <p className="text-purple-500 mt-2 font-bold">+1 (786) 312-1096</p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold">Useful Links</h3>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li>
              <Link to="/about" className="hover:text-black">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-black">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-black">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter & Social Links */}
        <div>
          <h3 className="text-lg font-semibold">Newsletter</h3>
          <div className="flex items-center mt-4 border-b border-gray-600 pb-2">
            <input
              type="email"
              placeholder="Your Email"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={sent}
              className="bg-transparent border-none focus:ring-0 focus:outline-none text-white w-full placeholder-gray-400"
            />
            {sent ? (
              <FaCheck className="text-lg" />
            ) : (
              <button
                onClick={subscribeToNewsletter}
                className="text-gray-400 hover:text-black hover:bg-white border border-gray-400 rounded-full px-6 p-1"
              >
                {loading ? "Sending" : "Send"}
              </button>
            )}
          </div>
          <div className="flex space-x-4 mt-4">
            <Link
              to="#"
              className="p-2 rounded-full border border-white border-opacity-30"
            >
              <FaFacebook className="w-5 h-5" />
            </Link>
            <Link
              to="#"
              className="p-2 rounded-full border border-white border-opacity-30"
            >
              <FaXTwitter className="w-5 h-5" />
            </Link>
            <Link
              to="#"
              className="p-2 rounded-full border border-white border-opacity-30"
            >
              <CiYoutube className="w-5 h-5" />
            </Link>
            <Link
              to="#"
              className="p-2 rounded-full border border-white border-opacity-30"
            >
              <FaInstagram className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-800 pt-4">
        © 2025 TransactSphere. All Rights Reserved
      </div>
    </footer>
  );
}

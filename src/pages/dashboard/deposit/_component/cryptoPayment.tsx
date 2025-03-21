import React, { useState, useEffect, ChangeEvent } from "react";
import { QRCodeSVG } from "qrcode.react";
import { FaRegCopy } from "react-icons/fa";
import { useSetting } from "../../../../context/setting";
import { useToastNotification } from "../../../../context/toastNotification";
import Loading from "../../../_components/loading";
import { deposit } from "../../../../services/transaction";
import { compressImageUpload } from "../../../../utils/image";

const CryptoPayment: React.FC<{ price?: number; close: () => void }> = ({
  price,
  close,
}) => {
  const { addNotification } = useToastNotification();
  const [loadingPayment, setLoadingPayment] = useState(false);
  const { settings, fetchSettings } = useSetting();
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<any>(null); // Selected Crypto Object
  const [timeLeft, setTimeLeft] = useState(15 * 60 + 56);
  const [receipt, setReceipt] = useState("");
  const [madePayment, setMadePayment] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadSetting = async () => {
      try {
        setLoading(true);
        await fetchSettings();
      } catch (error: any) {
        addNotification({
          message: error || "An error occurred while fetching settings.",
          error: true,
        });
      } finally {
        setLoading(false);
      }
    };
    loadSetting();
  }, []);

  useEffect(() => {
    if (selectedCrypto && price) {
      setAmount(selectedCrypto.rate * price);
    }
  }, [selectedCrypto, price]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const formatWalletAddress = (address: string): string => {
    if (!address || address.length < 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handlePayment = async () => {
    try {
      if (!receipt) {
        addNotification({
          message: "Please upload a receipt before confirming payment.",
          error: true,
        });
        return;
      }
      setLoadingPayment(true);
      await deposit(amount, "bank", receipt);
      addNotification({ message: "Deposit made successfully" });
      close();
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setLoadingPayment(false);
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      const file = e.target.files?.[0];
      if (!file) throw Error("No image found");

      const imageUrl = await compressImageUpload(file, 1024);

      setReceipt(imageUrl);

      addNotification({ message: "Image uploaded" });
    } catch (err) {
      addNotification({ message: "Failed uploading image", error: true });
    } finally {
      setUploading(false);
    }
  };

  return loading ? (
    <div className="h-[60vh] w-full flex justify-center items-center">
      <Loading />
    </div>
  ) : (
    <div className="p-6 w-full">
      {/* Select Crypto Dropdown */}
      <h2 className="text-xl font-semibold text-center">
        Select Cryptocurrency
      </h2>
      <select
        className="w-full p-2 border rounded-lg mt-2"
        value={selectedCrypto?.name || ""}
        onChange={(e) => {
          const crypto = settings.cryptoInfo.find(
            (c: any) => c.name === e.target.value
          );
          setSelectedCrypto(crypto || null);
        }}
      >
        <option value="">Select a cryptocurrency</option>
        {settings.cryptoInfo.map((crypto: any) => (
          <option key={crypto.name} value={crypto.name}>
            {crypto.name} ({crypto.network})
          </option>
        ))}
      </select>

      {/* Payment Details */}
      {selectedCrypto && (
        <>
          <h2 className="text-xl font-semibold text-center mt-4">
            Pay with <span className="capitalize">{selectedCrypto.name}</span>
          </h2>
          <p className="text-sm text-gray-500 text-center mb-4">
            Send the amount due to the address below.
          </p>

          {/* QR Code */}
          <div className="flex flex-col items-center">
            <QRCodeSVG value={selectedCrypto.address} size={120} />
            <p className="text-sm text-gray-500 mt-2 break-all text-center">
              {selectedCrypto.address}
            </p>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Please send only {selectedCrypto.name} to this address.
          </p>

          {/* Payment Details Box */}
          <div className="bg-gray-50 p-4 rounded-lg mt-4 border">
            {/* Amount Due */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Amount due</p>
              <p className="font-semibold">
                {amount} {selectedCrypto.name}
              </p>
            </div>

            {/* Wallet Address */}
            <div className="flex justify-between items-center mt-3">
              <p className="text-sm text-gray-500">Wallet Address</p>
              <div className="flex items-center">
                <p className="font-semibold mr-2">
                  {formatWalletAddress(selectedCrypto.address)}
                </p>
                <button onClick={() => copyToClipboard(selectedCrypto.address)}>
                  <FaRegCopy className="text-gray-500 cursor-pointer" />
                </button>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="flex justify-between items-center mt-3">
              <p className="text-sm text-gray-500">Time left to pay</p>
              <p className="font-semibold">{formatTime(timeLeft)}</p>
            </div>

            {madePayment && (
              <div className="my-4">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Payment Receipt
                </label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="mt-1 p-2 border rounded-lg w-full"
                  onChange={handleImageUpload}
                />
                {uploading && <Loading size="sm" />}
              </div>
            )}

            {/* Confirm Payment Button */}
            {madePayment ? (
              <button
                onClick={handlePayment}
                disabled={loadingPayment}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center"
              >
                {loadingPayment && <Loading size="sm" />} Continue
              </button>
            ) : (
              <button
                onClick={() => setMadePayment(true)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center"
              >
                I have made Payment (${amount})
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CryptoPayment;

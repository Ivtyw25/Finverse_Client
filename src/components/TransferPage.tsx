import React, { useState, useEffect } from 'react';
import { data, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTypingSpeed } from '../context/TypingSpeedContext';
import { useMouseSpeed } from '../context/MouseActivityContext';

type TransferFormData = {
  bank: string;
  accountNumber: string;
  accountType: string;
  amount: string;
  reference: string;
  description: string;
};

export default function TransferPage() {
  const navigate = useNavigate();
  const{ endSession,loginHour, loginDay, session_seconds} = useAuth();
  const { recordKeystroke, startTracking, stopTracking, averageCPM } = useTypingSpeed();
  const { averageSpeed } = useMouseSpeed();
  const [riskLevel, setRiskLevel] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    startTracking();
    return () => stopTracking(); // Stop when component unmounts
  }, []);

  const [form, setForm] = useState<TransferFormData>({
    bank: '',
    accountNumber: '',
    accountType: '',
    amount: '',
    reference: '',
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataPrediction = {
      // user_id: "user123",
      // device_os: "Windows",
      login_hour: 2110,
      typing_speed_cpm: averageCPM,
      nav_path: "login>settings>transfer",
      nav_path_depth: 3.0,
      ip_country: "MY",
      session_duration_sec: session_seconds,
      mouse_movement_rate: averageSpeed,
      device_id: "device_A",
      ip_consistency_score: 0.92,
      login_day_of_week: loginDay,
      geo_distance_from_usual: 12.4,
      browser_language: "en-US",
      failed_login_attempts_last_24h: 0,
      is_vpn_detected: 0,
      recent_device_change: 1
    }
    console.log(session_seconds)
    endSession()
    stopTracking()
    console.log(dataPrediction)
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
       body: JSON.stringify({
        sessions: [dataPrediction]
       })
      }) 
      const result = await response.json();
      const prediction = result?.results?.[0];
      console.log(result.results)

      if (prediction?.risk_level === "High") {
        setRiskLevel("High");
        setShowDialog(true);
      }
      const emailData = {
        email_to: "Ivantham1990@gmail.com",
        subject: "Urgent: Suspicios Activity Secure Bank Online Banking",
        message: "We've detected unusual activity on your account that may indicate a security risk. Please verify if it is you"

      }
      const emailResponse = await fetch("http://127.0.0.1:8000/send-email",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(emailData)
      })
      const emailResult = await emailResponse.json();
      if (emailResult)
        console.log("succssfully send")
    }catch (err){
      console.log(err)
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow border mt-8">
      <h1 className="text-2xl font-semibold mb-6">Transfer Funds</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Recipient Bank */}
        <div>
          <label className="block text-slate-700 font-medium mb-1">Recipient Bank</label>
          <select
            name="bank"
            value={form.bank}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select bank</option>
            <option value="Maybank">Maybank</option>
            <option value="CIMB">CIMB</option>
            <option value="Public Bank">Public Bank</option>
          </select>
        </div>

        {/* Account Number */}
        <div>
          <label className="block text-slate-700 font-medium mb-1">Recipient Account Number</label>
          <input
            name="accountNumber"
            onKeyDown={recordKeystroke}
            value={form.accountNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="e.g. 1234567890"
          />
        </div>

        {/* Account Type */}
        <div>
          <label className="block text-slate-700 font-medium mb-1">Account Type</label>
          <select
            name="accountType"
            value={form.accountType}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select account type</option>
            <option value="savings">Savings</option>
            <option value="checking">Checking</option>
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-slate-700 font-medium mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            onKeyDown={recordKeystroke}
            value={form.amount}
            onChange={handleChange}
            required
            min={0.01}
            step={0.01}
            className="w-full p-2 border rounded"
            placeholder="e.g. 100.00"
          />
        </div>

        {/* Recipient Reference */}
        <div>
          <label className="block text-slate-700 font-medium mb-1">Recipient Reference</label>
          <select
            name="reference"
            value={form.reference}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select reference</option>
            <option value="friend">Friend</option>
            <option value="family">Family</option>
            <option value="utility">Utility</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-slate-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onKeyDown={recordKeystroke}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Optional description"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="bg-gray-300 hover:bg-gray-400 text-slate-900 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Submit Transfer
          </button>
          {showDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
                <h2 className="text-xl font-bold mb-4 text-red-600">Suspicious Behavior Detected</h2>
                <p className="mb-4">Your behavior is suspicious. Please check your Gmail to verify it's you.</p>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}

        </div>
      </form>
    </div>
  );
}

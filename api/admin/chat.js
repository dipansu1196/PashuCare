export default function handler(req, res) {
  const chat = [
    {
      id: 1,
      user_message: "मेरी गाय बीमार है",
      ai_response: "कृपया लक्षण बताएं। मैं आपकी सहायता करूंगा।",
      created_at: "2024-01-01 16:00:00"
    },
    {
      id: 2,
      user_message: "भैंस का दूध कम हो रहा है",
      ai_response: "यह पोषण की कमी हो सकती है। पशु चिकित्सक से संपर्क करें।",
      created_at: "2024-01-02 17:00:00"
    }
  ];

  res.status(200).json(chat);
}
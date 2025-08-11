export default function handler(req, res) {
  const doctors = [
    {
      id: 1,
      name: "डॉ. राजेश शर्मा",
      phone: "+91 9876543210",
      specialization: "सामान्य पशु चिकित्सक",
      clinic_address: "मुख्य बाजार, दिल्ली",
      experience_years: "15 years",
      rating: 4.8,
      consultation_fee: 500,
      availability: "Mon-Sat 9AM-6PM",
      services: "सामान्य जांच, टीकाकरण",
      created_at: "2024-01-01 10:00:00"
    },
    {
      id: 2,
      name: "डॉ. प्रिया गुप्ता",
      phone: "+91 9876543211",
      specialization: "पशु सर्जन",
      clinic_address: "सेक्टर 15, गुड़गांव",
      experience_years: "12 years",
      rating: 4.7,
      consultation_fee: 800,
      availability: "Mon-Fri 10AM-5PM",
      services: "सर्जरी, आपातकालीन देखभाल",
      created_at: "2024-01-02 11:00:00"
    }
  ];

  res.status(200).json(doctors);
}
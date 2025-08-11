export default function handler(req, res) {
  const feedback = [
    {
      id: 1,
      name: "सुरेश पटेल",
      email: "suresh@example.com",
      phone: "+91 9876543214",
      message: "बहुत अच्छी सेवा मिली। डॉक्टर बहुत अच्छे हैं।",
      created_at: "2024-01-01 14:00:00"
    },
    {
      id: 2,
      name: "गीता देवी",
      email: "geeta@example.com",
      phone: "+91 9876543215",
      message: "समय पर सहायता मिली। धन्यवाद।",
      created_at: "2024-01-02 15:00:00"
    }
  ];

  res.status(200).json(feedback);
}
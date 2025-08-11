export default function handler(req, res) {
  const users = [
    {
      id: 1,
      name: "राम सिंह",
      email: "ram@example.com",
      phone: "+91 9876543212",
      address: "गांव खेड़ा, हरियाणा",
      animal_count: 5,
      created_at: "2024-01-01 12:00:00"
    },
    {
      id: 2,
      name: "श्याम कुमार",
      email: "shyam@example.com",
      phone: "+91 9876543213",
      address: "गांव रामपुर, उत्तर प्रदेश",
      animal_count: 8,
      created_at: "2024-01-02 13:00:00"
    }
  ];

  res.status(200).json(users);
}
export const provider = {
  id: 1,
  name: "Fakhar Rashid",
  profession: "Electrician",
  rating: 4.9,
  personalImage: "/placeholder2.png?height=300&width=300",
  location: { address: "Lahore" },
  verified: true,
  completedJobs: 187,
  totalReviews: 3,
  memberSince: "January 2022",
  about:
    "Professional electrician with over 10 years of experience. Specializing in residential and commercial electrical installations, repairs, and maintenance.",
  skills: [
    "Electrical Wiring",
    "Circuit Repair",
    "Lighting Installation",
    "Appliance Installation",
    "Electrical Troubleshooting",
    "Panel Upgrades",
  ],
  experience: 5,
  education: "Diploma in Electrical Engineering, Punjab Technical College",
  languages: ["English", "Urdu", "Punjabi"],
  services: [
    { name: "Electrical Wiring", price: "Rs. 2,000", duration: "1-2 hours" },
    {
      name: "Light Fixture Installation",
      price: "Rs. 1,500",
      duration: "1 hour",
    },
    {
      name: "Circuit Breaker Repair",
      price: "Rs. 3,000",
      duration: "2-3 hours",
    },
    { name: "Fan Installation", price: "Rs. 1,200", duration: "1 hour" },
    {
      name: "Electrical Safety Inspection",
      price: "Rs. 2,500",
      duration: "2 hours",
    },
    { name: "Outlet Installation", price: "Rs. 800", duration: "30 minutes" },
  ],
  reviews_list: [
    {
      id: 1,
      user: "Zainab Ali",
      userImage: "/placeholder.png?height=50&width=50",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Ahmed did an excellent job installing new wiring in my kitchen. Very professional and clean work.",
    },
    {
      id: 2,
      user: "Muhammad Imran",
      userImage: "/placeholder.png?height=50&width=50",
      rating: 5,
      date: "1 month ago",
      comment:
        "Fixed my electrical issues quickly and for a reasonable price. Highly recommended!",
    },
    {
      id: 3,
      user: "Ayesha Khan",
      userImage: "/placeholder.png?height=50&width=50",
      rating: 4,
      date: "2 months ago",
      comment:
        "Good service, arrived on time and completed the work efficiently.",
    },
  ],
};

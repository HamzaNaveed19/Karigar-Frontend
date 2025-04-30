import { Star, MapPin, CheckCircle } from "lucide-react";
import Button from "../UI/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../UI/Tabs";
import Card from "../UI/Card";
import CardContent from "../UI/CardContent";
import About from "../Components/Provider/About";
import Services from "../Components/Provider/Services";
import Reviews from "../Components/Provider/Reviews";

export default function ProviderProfile({ params }) {
  const provider = {
    id: 1,
    name: "Ahmed Khan",
    profession: "Electrician",
    rating: 4.9,
    reviews: 124,
    personalImage: "/placeholder.png?height=300&width=300",
    location: "Lahore",
    verified: true,
    completedJobs: 187,
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

  return (
    <div className=" mx-auto px-4 py-8 md:py-12">
      {/* Provider Header - Mobile View */}
      <div className="mb-6 block md:hidden">
        <div className="flex items-center gap-4">
          <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-lg">
            <img
              src={provider.personalImage || "/placeholder.png"}
              alt={provider.name}
              className="h-full w-full object-cover rounded-full"
              width={80}
              height={80}
            />
            {provider.verified && (
              <div className="absolute -right-1 bottom-0 rounded-full bg-white p-1 shadow-sm">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold">{provider.name}</h1>
            <p className="text-gray-500">{provider.profession}</p>
            <div className="flex items-center">
              <Star className="mr-1 h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-medium">{provider.rating}</span>
              <span className="ml-1 text-sm text-gray-500">
                ({provider.reviews})
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Provider Info */}
        <div className="md:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-0">
              {/* Desktop Profile Image */}
              <div className="relative hidden md:block">
                <img
                  src={provider.personalImage || "/placeholder.svg"}
                  alt={provider.name}
                  className="h-64 w-full object-cover"
                />
                {provider.verified && (
                  <div className="absolute right-2 top-2 rounded-full bg-white p-1 shadow-md">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                )}
              </div>

              {/* Desktop Profile Info */}
              <div className="hidden p-4 md:block">
                <h1 className="text-2xl font-bold">{provider.name}</h1>
                <p className="mb-2 text-gray-500">{provider.profession}</p>
                <div className="mb-4 flex items-center">
                  <Star className="mr-1 h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="font-medium">{provider.rating}</span>
                  <span className="ml-1 text-sm text-gray-500">
                    ({provider.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Stats - Both Mobile & Desktop */}
              <div className="border-b border-t p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">
                      Completed Jobs
                    </span>
                    <span className="font-medium">
                      {provider.completedJobs}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Member Since</span>
                    <span className="font-medium">{provider.memberSince}</span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-4 flex items-center text-gray-700">
                  <MapPin className="mr-2 h-4 w-4" />
                  {provider.location}
                </div>
                <div className="space-y-2">
                  <Button className="w-full">Book Now</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Provider Details */}
        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-4">
              <About provider={provider}></About>
            </TabsContent>

            <TabsContent value="services" className="mt-4">
              <Services provider={provider}></Services>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              <Reviews provider={provider}></Reviews>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

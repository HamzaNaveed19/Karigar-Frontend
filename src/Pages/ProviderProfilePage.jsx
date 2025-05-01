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
    personalImage: "/placeholder2.png?height=300&width=300",
    location: "Lahore",
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

  return (
    <div className=" mx-auto px-4 py-6">
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
          <Card className="sticky top-20 overflow-hidden border border-gray-100 shadow-sm">
            <CardContent className="p-0">
              <div className="relative h-20 w-full md:h-20"></div>

              <div className="px-5 pb-5">
                <div className="relative -mt-12 mb-4 flex justify-center">
                  <div className="h-48 w-48 rounded-full border-4 border-white bg-white shadow-lg">
                    <img
                      src={provider.personalImage}
                      alt={provider.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="text-center">
                  <h1 className="text-xl font-bold text-gray-800">
                    {provider.name}
                  </h1>
                  <div className="flex items-center justify-center gap-1">
                    <p className="text-sm text-emerald-600">
                      {provider.profession}
                    </p>
                    {provider.verified && (
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    )}
                  </div>
                </div>

                {/* Rating and Location */}
                <div className="mt-4 flex items-center justify-center gap-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="ml-1 text-sm font-medium text-gray-800">
                      {provider.rating}
                    </span>
                    <span className="ml-1 text-xs text-gray-500">
                      ({provider.totalReviews})
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="ml-1">{provider.location}</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-gray-50 p-3 text-center">
                    <p className="text-xs font-medium text-gray-500">
                      Experience
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {provider.experience}+ years
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 text-center">
                    <p className="text-xs font-medium text-gray-500">
                      Jobs Completed
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {provider.completedJobs}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Book Now
                  </Button>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Member since {provider.memberSince}
                  </p>
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

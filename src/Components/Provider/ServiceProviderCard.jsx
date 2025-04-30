import { Star, MapPin, CheckCircle, Briefcase, Award, Gem } from "lucide-react";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import CardContent from "../../UI/CardContent";

export default function ServiceProviderCard({
  id,
  name,
  profession,
  rating,
  reviews,
  image,
  location,
  verified,
  experience = 5,
  completedJobs = 120,
  services,
  skills,
}) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer group h-full">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="relative flex-shrink-0 ">
          <img
            src={image}
            alt={name}
            className="h-56 w-full object-cover rounded-lg"
          />
          {verified && (
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium shadow-sm backdrop-blur-sm">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <span>Verified</span>
            </div>
          )}
        </div>

        {/* This one is the Main content below the image */}
        <div className="p-2 mt-2 flex-grow">
          <div className=" flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{name}</h3>
              <p className="text-sm font-medium text-emerald-600">
                {profession}
              </p>
            </div>

            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-medium">{rating}</span>
                <span className="ml-1 text-xs text-gray-500">({reviews})</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Starts from Rs {services[0]?.price || "500"}
              </p>
            </div>
          </div>

          <div className="mb-2 mt-2 flex items-center text-sm text-gray-600">
            <MapPin className="mr-2 h-4 w-4 text-gray-400" />
            <span>{location}</span>
          </div>

          <div className="mb-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-lg bg-emerald-50 p-2">
              <Briefcase className="mx-auto h-4 w-4 text-gray-500" />
              <p className="mt-1 font-medium">{experience}+ years</p>
            </div>
            <div className="rounded-lg bg-emerald-50 p-2">
              <Award className="mx-auto h-4 w-4 text-gray-500" />
              <p className="mt-1 font-medium">{completedJobs} jobs</p>
            </div>
            <div className="rounded-lg bg-emerald-50 p-2">
              <Gem className="mx-auto h-4 w-4 text-gray-500" />
              <p className="mt-1 font-medium">{skills?.length || "1"} skills</p>
            </div>
          </div>
        </div>

        <div className="p-2 mt-auto">
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="flex-1">
              View Profile
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

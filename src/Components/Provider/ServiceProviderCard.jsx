import { Star, MapPin, CheckCircle, Briefcase, Award, Gem } from "lucide-react";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import CardContent from "../../UI/CardContent";
import { Link } from "react-router-dom";

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
  onPage = false,
}) {
  return (
    <Link to={"/profile/"}>
      <Card
        className={`overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer group h-full`}
      >
        <CardContent className=" flex flex-col h-full">
          <div className="relative flex-shrink-0">
            <img
              src={image}
              alt={name}
              className={`w-full object-cover rounded-lg ${
                onPage ? "h-48" : "h-48 md:h-full"
              } mb-2`}
            />
            {verified && (
              <div
                className={`absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white/90 ${
                  onPage ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1 text-xs"
                } font-medium shadow-sm backdrop-blur-sm`}
              >
                <CheckCircle
                  className={`${
                    onPage ? "h-3 w-3" : "h-4 w-4"
                  } text-emerald-600`}
                />
                <span>Verified</span>
              </div>
            )}
          </div>

          {/* Main content below the image */}
          <div className={`${onPage ? "p-0" : "p-2"} mt-1 flex-grow`}>
            <div className="flex items-start justify-between">
              <div>
                <h3
                  className={`${
                    onPage ? "text-sm" : "text-lg"
                  } font-bold text-gray-900`}
                >
                  {name}
                </h3>
                <p
                  className={`${
                    onPage ? "text-xs" : "text-sm"
                  } font-medium text-emerald-600`}
                >
                  {profession}
                </p>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex items-center">
                  <Star
                    className={`mr-1 ${
                      onPage ? "h-3 w-3" : "h-4 w-4"
                    } fill-amber-400 text-amber-400`}
                  />
                  <span className={`${onPage ? "text-sm" : "font-medium"}`}>
                    {rating}
                  </span>
                  <span
                    className={`ml-1 ${
                      onPage ? "text-[10px]" : "text-xs"
                    } text-gray-500`}
                  >
                    ({reviews})
                  </span>
                </div>
                <p
                  className={`mt-0.5 ${
                    onPage ? "text-[10px]" : "text-xs"
                  } text-gray-500`}
                >
                  Starts from Rs {services[0]?.price || "500"}
                </p>
              </div>
            </div>

            <div
              className={`${onPage ? "mb-2" : "mb-4"} mt-1 flex items-center ${
                onPage ? "text-xs" : "text-sm"
              } text-gray-600`}
            >
              <MapPin
                className={`mr-1  ${
                  onPage ? "h-3 w-3" : "h-4 w-4"
                } text-gray-400`}
              />
              <span>{location}</span>
            </div>

            <div
              className={`mb-3 grid grid-cols-3 gap-1 text-center ${
                onPage ? "text-[10px]" : "text-xs"
              }`}
            >
              <div className="rounded-lg bg-emerald-50 p-2">
                <Briefcase
                  className={`mx-auto ${
                    onPage ? "h-3 w-3" : "h-4 w-4"
                  } text-gray-500`}
                />
                <p className={`${onPage ? "mt-0.5" : "mt-1"} font-medium`}>
                  {experience}+ years
                </p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-2">
                <Award
                  className={`mx-auto ${
                    onPage ? "h-3 w-3" : "h-4 w-4"
                  } text-gray-500`}
                />
                <p className={`${onPage ? "mt-0.5" : "mt-1"} font-medium`}>
                  {completedJobs} jobs
                </p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-2">
                <Gem
                  className={`mx-auto ${
                    onPage ? "h-3 w-3" : "h-4 w-4"
                  } text-gray-500`}
                />
                <p className={`${onPage ? "mt-0.5" : "mt-1"} font-medium`}>
                  {skills?.length || "1"} skills
                </p>
              </div>
            </div>
          </div>

          <div className={`hidden ${onPage ? "p-1.5" : "p-2"} mt-auto`}>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size={"xs"}
                className="flex-1 text-xs p-1"
              >
                View Profile
              </Button>
              <Button
                size={"xs"}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-xs"
              >
                Book Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

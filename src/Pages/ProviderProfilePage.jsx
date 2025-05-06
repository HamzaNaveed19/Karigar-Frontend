import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProviderById } from "../Redux/Slices/serviceProvidersSlice";
import { Star, MapPin, CheckCircle } from "lucide-react";
import Button from "../UI/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../UI/Tabs";
import Card from "../UI/Card";
import CardContent from "../UI/CardContent";
import About from "../components/Provider/About";
import Services from "../components/Provider/Services";
import Reviews from "../components/Provider/Reviews";
import ProviderProfileSkeleton from "../Components/Skeletons/ProviderProfileSkeleton";
import NotFoundMessage from "../UI/NotFoundMessage";
import ErrorMessage from "../UI/ErrorMessage";

export default function ProviderProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { currentProvider, status, error } = useSelector((state) => {
    return {
      currentProvider: state.providers.data[id],
      status: state.providers.status,
      error: state.providers.error,
    };
  });

  console.log("DATA:");
  console.log(currentProvider);

  useEffect(() => {
    console.log("RENDERED: Provider profile!");
    // If we don't have full data for this provider, fetch it
    if (!currentProvider) {
      console.log("API HIT: Provider profile!");
      dispatch(fetchProviderById(id));
    }
  }, [id, dispatch, currentProvider]);

  if (!currentProvider || status === "loading") {
    return <ProviderProfileSkeleton></ProviderProfileSkeleton>;
  }

  if (!currentProvider && status === "failed") {
    return (
      <ErrorMessage
        title="Connection Failed"
        message="Unable to connect to the server. Check your internet connection."
      />
    );
  }

  if (!currentProvider && status === "succeeded") {
    return (
      <NotFoundMessage
        title="No service provider found with this ID"
        description={`We couldn't find any service provider matching your search. Try adjusting your search query.`}
      />
    );
  }

  // if (!currentProvider) {
  //   return null;
  // }

  return (
    <div className="mx-auto px-4 py-6">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="sticky top-20 overflow-hidden border border-gray-100 shadow-sm">
            <CardContent className="p-0">
              <div className="relative h-20 w-full md:h-20"></div>

              <div className="px-5 pb-5">
                <div className="relative -mt-12 mb-4 flex justify-center">
                  <div className="h-52 w-52 rounded-full border-4 border-white bg-white shadow-lg">
                    <img
                      src={"/placeholder2.png"}
                      alt={currentProvider.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <h1 className="text-xl font-bold text-gray-800">
                    {currentProvider.name}
                  </h1>
                  <div className="flex items-center justify-center gap-1">
                    <p className="text-sm text-emerald-600">
                      {currentProvider.profession}
                    </p>
                    {currentProvider.verified && (
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    )}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-center gap-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="ml-1 text-sm font-medium text-gray-800">
                      {currentProvider.rating}
                    </span>
                    <span className="ml-1 text-xs text-gray-500">
                      ({currentProvider.totalReviews})
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="ml-1">
                      {currentProvider.location.address}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-gray-50 p-3 text-center">
                    <p className="text-xs font-medium text-gray-500">
                      Experience
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {currentProvider.experience}+ years
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 text-center">
                    <p className="text-xs font-medium text-gray-500">
                      Jobs Completed
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {currentProvider.completedJobs}
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
                    Member since {currentProvider.memberSince}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-4">
              <About provider={currentProvider} />
            </TabsContent>

            <TabsContent value="services" className="mt-4">
              <Services provider={currentProvider} />
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              <Reviews provider={currentProvider} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

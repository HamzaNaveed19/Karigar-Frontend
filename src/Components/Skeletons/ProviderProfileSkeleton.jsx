import { Skeleton, SkeletonText } from "../../UI/Skeleton";
import Card from "../../UI/Card";
import CardContent from "../../UI/CardContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../UI/Tabs";

export default function ProviderProfileSkeleton() {
  return (
    <div className="mx-auto px-4 py-6">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="sticky top-20 overflow-hidden border border-gray-100 shadow-sm">
            <CardContent className="p-0">
              <div className="relative h-20 w-full bg-white md:h-20"></div>

              <div className="px-5 pb-5">
                <div className="relative -mt-12 mb-4 flex justify-center">
                  <div className="h-52 w-52 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
                    <Skeleton className="h-52 w-52 rounded-full" />
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <Skeleton className="mx-auto h-6 w-3/4" />
                  <div className="flex items-center justify-center gap-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton circle className="h-4 w-4" />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-center gap-4">
                  <div className="flex items-center">
                    <Skeleton circle className="h-4 w-4" />
                    <Skeleton className="ml-1 h-4 w-8" />
                    <Skeleton className="ml-1 h-3 w-12" />
                  </div>
                  <div className="flex items-center">
                    <Skeleton circle className="h-4 w-4" />
                    <Skeleton className="ml-1 h-4 w-20" />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-gray-50 p-3 text-center">
                    <Skeleton className="mx-auto h-3 w-16" />
                    <Skeleton className="mx-auto mt-1 h-4 w-12" />
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 text-center">
                    <Skeleton className="mx-auto h-3 w-24" />
                    <Skeleton className="mx-auto mt-1 h-4 w-8" />
                  </div>
                </div>

                <div className="mt-6">
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>

                <div className="mt-4 text-center">
                  <Skeleton className="mx-auto h-3 w-32" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 ">
          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent
              value="about"
              className="mt-4 border border-gray-200 rounded-md p-8"
            >
              <div className="space-y-4">
                <Skeleton className="h-5 w-1/4" />
                <SkeletonText lines={4} />
                <Skeleton className="h-5 w-1/4" />
                <SkeletonText lines={4} />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-5 w-1/4" />
                  <Skeleton className="h-5 w-1/4" />
                  <SkeletonText lines={4} />
                  <SkeletonText lines={4} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="services" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                {[1, 2, 3, 4].map((service) => (
                  <div key={service} className="border rounded-lg p-4">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <SkeletonText lines={2} />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              <div className="space-y-4">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Skeleton circle className="h-10 w-10" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <div className="mt-3 space-y-2">
                      <SkeletonText lines={2} />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

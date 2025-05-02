import { useState } from "react";
import { Camera } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../UI/Tabs";
import Card from "../UI/Card";
import CardContent from "../UI/CardContent";
import About from "../Components/User/About";
import Settings from "../Components/User/Settings";

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState(
    "/placeholder.png?height=200&width=200"
  );

  // Mock user data
  const user = {
    name: "Asad Ahmed",
    email: "asad.ahmed@example.com",
    phone: "+92 300 1234567",
    address: "123 Main Street, Gulberg, Lahore",
    joinDate: "January 2023",
  };

  return (
    <div className="mx-auto px-4 py-6">
      <div className="grid gap-8 md:grid-cols-4">
        {/* Profile Sidebar */}
        <Card className="md:sticky top-20 h-[54vh] md:col-span-1 border border-gray-200 shadow-sm pt-12">
          <CardContent className=" p-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4 group">
                <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-lg">
                  <img
                    src={profileImage || "/placeholder.svg"}
                    alt="Profile"
                    className="h-full w-full object-cover"
                    width={128}
                    height={128}
                  />
                </div>
                <div className="absolute bottom-0 right-0 transform transition-transform duration-200 group-hover:scale-110">
                  <label htmlFor="profile-upload" className="cursor-pointer">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md hover:bg-emerald-600 transition-colors">
                      <Camera className="h-5 w-5" />
                    </div>
                    <input
                      id="profile-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setProfileImage(event.target.result);
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-sm text-gray-500">
                Member since {user.joinDate}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="mt-6">
              <About user={user}></About>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <Settings></Settings>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

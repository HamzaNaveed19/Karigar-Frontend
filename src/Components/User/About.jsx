import React, { useState } from "react";
import Card from "../../UI/Card";
import CardContent from "../../UI/CardContent";
import { Input } from "../../UI/Input";
import { User, Mail, Phone, MapPin, Edit, Save, User2Icon } from "lucide-react";
import Button from "../../UI/Button";

function About({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.location.address,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving data:", formData);
    setIsEditing(false);
  };

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="flex gap-2 text-lg font-bold text-gray-800">
              <User2Icon></User2Icon>
              Personal Information
            </h2>
            <p className="text-gray-500 text-xs">
              Update your personal details and contact information.
            </p>
          </div>
          {!isEditing && (
            <Button
              variant="outline"
              className="flex items-center gap-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          )}
        </div>

        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Full Name
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={true}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Phone Number
              </label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="address"
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                Address
              </label>
              <Input
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
              onClick={() => {
                setIsEditing(false);

                setFormData({
                  name: user.name,
                  email: user.email,
                  phone: user.phone,
                  address: user.location.address,
                  bio: user.bio || "",
                });
              }}
            >
              Cancel
            </Button>
            <Button className="flex items-center gap-2" onClick={handleSave}>
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default About;

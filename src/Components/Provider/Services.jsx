import React from "react";
import Card from "../../UI/Card";
import CardContent from "../../UI/CardContent";
import { Clock } from "lucide-react";
import Button from "../../UI/Button";

function Services({ provider }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-4 text-xl font-bold">Services Offered</h2>
        <div className="space-y-4">
          {provider.services.map((service, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border p-4 transition-all hover:border-emerald-200 hover:bg-emerald-50"
            >
              <div>
                <h3 className="font-medium">{service.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-1 h-4 w-4" />
                  {service.duration}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-emerald-600">
                  {service.price}
                </div>
                <Button size="sm" className="mt-2">
                  Book
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default Services;

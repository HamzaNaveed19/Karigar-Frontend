import React from "react";
import { BookOpen, Clock, Languages, Award } from "lucide-react";
import Card from "../../UI/Card";
import CardContent from "../../UI/CardContent";
import Badge from "../../UI/Badge";

function About({ provider }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="mb-8">
          <h2 className="mb-4 flex items-center text-2xl font-bold text-gray-800">
            <span className="mr-2 h-1.5 w-6 rounded-full bg-emerald-500"></span>
            About {provider.name}
          </h2>
          <p className="text-gray-700 leading-relaxed">{provider.about}</p>
        </div>

        <div className="mb-8">
          <div className="mb-4 flex items-center">
            <Award className="mr-2 h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Skills & Expertise
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {provider.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="mb-3 flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-semibold text-gray-800">Education</h3>
          </div>
          <p className="rounded-lg bg-gray-50 p-4 text-gray-700 shadow-inner">
            {provider.education}
          </p>
        </div>

        <div className="mb-8">
          <div className="mb-3 flex items-center">
            <Languages className="mr-2 h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-semibold text-gray-800">Languages</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {provider.languages.map((language, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                {language}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center">
            <Clock className="mr-2 h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Working Hours
            </h3>
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-100 shadow-xs">
            <div className="grid grid-cols-1 divide-y divide-gray-100">
              <div className="grid grid-cols-2 p-1">
                <div className="font-medium text-gray-700">Monday - Friday</div>
                <div className="text-gray-600">9:00 AM - 6:00 PM</div>
              </div>
              <div className="grid grid-cols-2 p-1">
                <div className="font-medium text-gray-700">Saturday</div>
                <div className="text-gray-600">10:00 AM - 4:00 PM</div>
              </div>
              <div className="grid grid-cols-2 p-1">
                <div className="font-medium text-gray-700">Sunday</div>
                <div className="text-gray-600">Closed</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default About;

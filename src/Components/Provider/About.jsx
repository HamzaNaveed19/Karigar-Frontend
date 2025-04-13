import React from "react";
import Card from "../../UI/Card";
import CardContent from "../../UI/CardContent";
import Badge from "../../UI/Badge";

function About({ provider }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-4 text-xl font-bold">About {provider.name}</h2>
        <p className="text-gray-700">{provider.about}</p>

        <h3 className="mb-2 mt-6 text-lg font-semibold">Skills</h3>
        <div className="mb-4 flex flex-wrap gap-2">
          {provider.skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-emerald-50">
              {skill}
            </Badge>
          ))}
        </div>

        <h3 className="mb-2 mt-6 text-lg font-semibold">Education</h3>
        <p className="mb-4 text-gray-700">{provider.education}</p>

        <h3 className="mb-2 mt-6 text-lg font-semibold">Languages</h3>
        <div className="flex flex-wrap gap-2">
          {provider.languages.map((language, index) => (
            <Badge key={index} variant="secondary">
              {language}
            </Badge>
          ))}
        </div>

        <h3 className="mb-2 mt-6 text-lg font-semibold">Working Hours</h3>
        <div className="grid grid-cols-2 gap-2 text-gray-700">
          <div>Monday - Friday</div>
          <div>9:00 AM - 6:00 PM</div>
          <div>Saturday</div>
          <div>10:00 AM - 4:00 PM</div>
          <div>Sunday</div>
          <div>Closed</div>
        </div>
      </CardContent>
    </Card>
  );
}

export default About;

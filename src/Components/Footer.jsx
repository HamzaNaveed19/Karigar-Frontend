import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
} from "lucide-react";

function Footer() {
  return (
    <footer className=" bg-white border-t">
      <div className="pl-24 flex justify-center items-center py-12 ">
        <div className="flex flex-wrap justify-center gap-8">
          {/* First Column - Brand Info */}
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Karigar</h3>
            <p className="text-gray-600 mb-4">
              Connecting customers with skilled local service providers across
              Pakistan.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-pink-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Middle Columns - Navigation Links */}
          {[
            {
              title: "For Customers",
              links: ["How it Works", "Safety & Trust", "Pricing", "FAQs"],
            },
            {
              title: "For Providers",
              links: [
                "Join as Provider",
                "Provider Guidelines",
                "Success Stories",
                "Resources",
              ],
            },
          ].map((section) => (
            <div key={section.title} className="flex-1 min-w-[200px]">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link} className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-gray-400 mr-1" />
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Last Column - Contact Info */}
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <span className="text-gray-600">+92 300 1234567</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <span className="text-gray-600">support@karigar.pk</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <span className="text-gray-600">Lahore, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t  pt-8 px-24 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} Karigar. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

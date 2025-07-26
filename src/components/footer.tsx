import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {

  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";

import { Link } from "react-router";
import { socialMediaIcons } from "@/constants/const";
export const Footer = function () {

  return (
    <div className="bg-gray-50 dark:bg-gray-950 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Yasmeen United</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              the best Onlin E-Store
            </p>
            <div className="flex space-x-4">
              {socialMediaIcons.map(icon => {
                return (
                  <Button key={icon.name} variant="ghost" size="sm" className="cursor-pointer p-2">
                    <img src={icon.src}
                      className="logo h-4 w-4"
                      style={{
                        filter: "invert(32%) sepia(60%) saturate(500%) hue-rotate(180deg)"
                      }}
                      alt={icon.name}
                    />
                  </Button>
                )
              })}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Customer Service
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/contactUs"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100  transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutUs"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100  transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                >
                  Returns
                </Link>
              </li>
            </ul>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>1-234-567-890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>help@yasmeenunited.sy</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Stay Updated
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Subscribe to get special offers, free giveaways, and deals.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4" />
              <span>123 Commerce St, City, State 12345</span>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Truck className="h-4 w-4" />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <RotateCcw className="h-4 w-4" />
            <span>30-Day Returns</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Shield className="h-4 w-4" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <CreditCard className="h-4 w-4" />
            <span>Multiple Payment Options</span>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex flex-wrap items-center space-x-4">
            <span>© 2024 Yasmeen United. All rights reserved.</span>
            <Link to="/" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              Terms of Service
            </Link>
            <Link to="/" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

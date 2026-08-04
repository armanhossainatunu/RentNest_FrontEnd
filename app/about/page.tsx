import { Mail, Phone, MapPin, Clock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <section className="container mx-auto max-w-6xl px-5 py-16">
      {/* Hero */}

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold md:text-5xl">Contact RentNest</h1>

        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Have questions about renting, listing your property, or need support?
          Our team is ready to help you.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Contact Info */}

        <div className="space-y-5">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <Mail className="text-primary" />

              <div>
                <h3 className="font-semibold">Email</h3>

                <p className="text-sm text-muted-foreground">
                  support@rentnest.com
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <Phone className="text-primary" />

              <div>
                <h3 className="font-semibold">Phone</h3>

                <p className="text-sm text-muted-foreground">
                  +880 1700-000000
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <MapPin className="text-primary" />

              <div>
                <h3 className="font-semibold">Address</h3>

                <p className="text-sm text-muted-foreground">
                  Dhaka, Bangladesh
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <Clock className="text-primary" />

              <div>
                <h3 className="font-semibold">Working Hours</h3>

                <p className="text-sm text-muted-foreground">
                  Sat - Thu (9:00 AM - 6:00 PM)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}

        <Card className="lg:col-span-2">
          <CardContent className="p-8">
            <h2 className="mb-6 text-2xl font-bold">Send us a message</h2>

            <form className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Input placeholder="Your Name" />

                <Input placeholder="Email Address" type="email" />
              </div>

              <Input placeholder="Subject" />

              <Textarea placeholder="Write your message..." rows={6} />

              <Button className="w-full md:w-auto">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Bottom CTA */}

      <div className="mt-16 rounded-xl bg-primary p-8 text-center text-primary-foreground">
        <h2 className="text-3xl font-bold">
          Find your perfect home with RentNest
        </h2>

        <p className="mt-3">
          Trusted rental marketplace connecting tenants and property owners.
        </p>
      </div>
    </section>
  );
}

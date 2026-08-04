import { Mail, MapPin, Phone } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Left Content */}

        <div>
          <h1 className="text-4xl font-bold">Contact Us</h1>

          <p className="mt-4 text-muted-foreground">
            Have questions about renting, listing your property, or need
            support? Our team is here to help you.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <MapPin className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h3 className="font-semibold">Address</h3>

                <p className="text-sm text-muted-foreground">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Phone className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h3 className="font-semibold">Phone</h3>

                <p className="text-sm text-muted-foreground">+880 1XXXXXXXXX</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Mail className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h3 className="font-semibold">Email</h3>

                <p className="text-sm text-muted-foreground">
                  support@rentnest.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}

        <div className="rounded-xl border p-6 shadow-sm">
          <h2 className="mb-5 text-2xl font-semibold">Send Message</h2>

          <div className="space-y-4">
            <Input placeholder="Your Name" />

            <Input type="email" placeholder="Your Email" />

            <Input placeholder="Subject" />

            <Textarea placeholder="Write your message..." rows={6} />

            <Button className="w-full">Send Message</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

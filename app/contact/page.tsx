// app/contact/page.tsx

import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <section className=" py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Have questions about RentNest? We'd love to hear from you. Send us a
            message and our team will respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-gray-100 rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>

            <form className="space-y-5">
              <div>
                <label className="block mb-2 font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Email</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Subject</label>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Message</label>

                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg 
  transition-all duration-300 
  hover:bg-primary/90 
  hover:scale-[1.02] 
  hover:shadow-lg 
  active:scale-95"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gray-100 rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <Mail className="text-primary" />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-600">support@rentnest.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="text-primary" />
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-gray-600">+880 1712-345678</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="text-primary" />
                  <div>
                    <h4 className="font-semibold">Office</h4>
                    <p className="text-gray-600">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            {/* Google Map */}
            <div className="rounded-xl overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps?q=Bangladesh&output=embed"
                width="100%"
                height="350"
                loading="lazy"
                className="border-0"
                title="Google Map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

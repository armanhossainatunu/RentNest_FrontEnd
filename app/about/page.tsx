import { Home, ShieldCheck, Users, Search } from "lucide-react";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}

      <section className="py-20 px-5 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-5">About RentNest</h1>

        <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
          RentNest is a modern rental marketplace that connects property owners
          and tenants easily. Our mission is to make finding and renting
          properties simple, secure, and reliable.
        </p>
      </section>

      {/* About Content */}

      <section className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Find Your Perfect Home</h2>

          <p className="text-muted-foreground leading-7">
            Whether you are looking for a comfortable apartment, a luxury villa,
            or a commercial space, RentNest helps you discover the right
            property according to your needs. Property owners can easily publish
            their properties and connect with potential tenants.
          </p>
        </div>

        <div className="bg-muted rounded-xl p-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <Home className="mx-auto mb-3 h-8 w-8" />

              <h3 className="font-bold">Properties</h3>

              <p className="text-sm text-muted-foreground">
                Thousands of listings
              </p>
            </div>

            <div className="text-center">
              <Users className="mx-auto mb-3 h-8 w-8" />

              <h3 className="font-bold">Community</h3>

              <p className="text-sm text-muted-foreground">Trusted users</p>
            </div>

            <div className="text-center">
              <ShieldCheck className="mx-auto mb-3 h-8 w-8" />

              <h3 className="font-bold">Secure</h3>

              <p className="text-sm text-muted-foreground">Safe transactions</p>
            </div>

            <div className="text-center">
              <Search className="mx-auto mb-3 h-8 w-8" />

              <h3 className="font-bold">Easy Search</h3>

              <p className="text-sm text-muted-foreground">Find faster</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}

      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-5">Our Mission</h2>

          <p className="max-w-3xl mx-auto text-muted-foreground">
            We aim to create a trusted rental ecosystem where landlords can
            manage their properties easily and tenants can find their ideal
            homes without hassle.
          </p>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;

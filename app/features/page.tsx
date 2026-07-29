import {
  Home,
  Search,
  ShieldCheck,
  UserRound,
  Building2,
  CreditCard,
  MessageCircle,
  BarChart3,
} from "lucide-react";

const features = [
  {
    title: "Easy Property Search",
    description:
      "Find apartments, villas, houses, and commercial spaces with powerful search options.",
    icon: Search,
  },
  {
    title: "Property Management",
    description:
      "Landlords can easily create, update, and manage their property listings.",
    icon: Building2,
  },
  {
    title: "Verified Users",
    description:
      "A trusted platform connecting verified landlords and tenants.",
    icon: ShieldCheck,
  },
  {
    title: "Tenant Friendly",
    description:
      "Tenants can explore properties and send rental requests easily.",
    icon: UserRound,
  },
  {
    title: "Secure Payments",
    description: "Safe and reliable payment system for rental transactions.",
    icon: CreditCard,
  },
  {
    title: "Direct Communication",
    description: "Connect landlords and tenants for faster communication.",
    icon: MessageCircle,
  },
  {
    title: "Dashboard Analytics",
    description: "Manage rental activities with useful dashboard insights.",
    icon: BarChart3,
  },
  {
    title: "Wide Property Collection",
    description: "Explore different types of properties in one platform.",
    icon: Home,
  },
];

const FeaturesPage = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}

      <section className="text-center py-20 px-5">
        <h1 className="text-4xl md:text-5xl font-bold mb-5">
          RentNest Features
        </h1>

        <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
          Everything you need for a simple, secure, and smart rental experience.
          RentNest helps landlords and tenants manage properties effortlessly.
        </p>
      </section>

      {/* Features Grid */}

      <section className="max-w-7xl mx-auto px-5 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                border rounded-xl p-6
                hover:shadow-lg
                transition
                bg-card
                "
              >
                <Icon className="h-10 w-10 mb-4" />

                <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>

                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}

      <section className="max-w-5xl mx-auto px-5 pb-20">
        <div
          className="
          rounded-2xl
          bg-muted
          p-10
          text-center
          "
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Next Home?
          </h2>

          <p className="text-muted-foreground mb-6">
            Join RentNest today and experience a smarter way to rent properties.
          </p>
        </div>
      </section>
    </main>
  );
};

export default FeaturesPage;

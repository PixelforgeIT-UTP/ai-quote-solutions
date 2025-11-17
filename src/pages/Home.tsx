import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Recycle, Home as HomeIcon, Leaf, Wrench, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export default function Home() {
  const services = [
    {
      icon: HomeIcon,
      title: "Hoarding Remediation",
      description: "Compassionate, professional hoarding cleanup with dignity and respect.",
      link: "/hoarding",
    },
    {
      icon: Wrench,
      title: "Home Services",
      description: "Complete residential cleanup and maintenance solutions.",
      link: "/home-services",
    },
    {
      icon: Recycle,
      title: "Sustainable Junk Removal",
      description: "Eco-friendly disposal with maximum recycling and minimal waste.",
      link: "/sustainable",
    },
    {
      icon: Leaf,
      title: "Property Maintenance",
      description: "Ongoing property care and waste management services.",
      link: "/maintenance",
    },
  ];

  const features = [
    "Licensed & Insured",
    "Same-Day Service Available",
    "Eco-Friendly Practices",
    "Competitive Pricing",
    "Professional Team",
    "Free Estimates",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Professional waste management services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80" />
        </div>

        <div className="container mx-auto px-4 z-10 text-center text-primary-foreground">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Professional Waste Management
            <br />
            <span className="text-accent-foreground">For a Cleaner Tomorrow</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Sustainable junk removal, property maintenance, and hoarding remediation services
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/quote">
              <Button variant="hero" size="lg">
                Get Free Quote
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="bg-background/20 backdrop-blur border-primary-foreground text-primary-foreground hover:bg-background/30">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-service-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive waste management solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link key={index} to={service.link}>
                <Card className="h-full hover:shadow-medium transition-all hover:-translate-y-1 cursor-pointer border-border">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-xl text-muted-foreground">
              Trusted by hundreds of satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-muted">
                <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get an instant AI-powered quote by uploading photos of your space
          </p>
          <Link to="/quote">
            <Button variant="hero" size="lg" className="bg-background text-foreground hover:bg-background/90">
              Upload Photos for Quote
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

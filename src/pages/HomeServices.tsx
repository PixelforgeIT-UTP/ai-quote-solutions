import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Trash2, Box, Sofa, CheckCircle2 } from "lucide-react";

export default function HomeServices() {
  const services = [
    {
      icon: Trash2,
      title: "General Junk Removal",
      description: "Remove unwanted items, old furniture, appliances, and household clutter quickly and efficiently.",
    },
    {
      icon: Box,
      title: "Garage & Basement Cleanout",
      description: "Reclaim your storage spaces with complete cleanout services for garages, basements, and attics.",
    },
    {
      icon: Sofa,
      title: "Furniture Removal",
      description: "Safe removal and disposal of old furniture, including couches, mattresses, and large items.",
    },
    {
      icon: Home,
      title: "Estate Cleanout",
      description: "Compassionate estate cleanout services for families during difficult transitions.",
    },
  ];

  const benefits = [
    "Same-day or next-day service available",
    "No hidden fees or surprise charges",
    "Full-service - we do all the heavy lifting",
    "Eco-friendly disposal and recycling",
    "Licensed and fully insured",
    "Satisfaction guaranteed",
  ];

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Residential Home Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Complete home cleanup and junk removal services to help you reclaim your space
          </p>
        </div>
      </section>

      <section className="py-20 bg-service-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Home Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From single-item pickups to complete home cleanouts, we handle it all
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="border-border hover:shadow-medium transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Get a Quote</h3>
                <p className="text-muted-foreground">
                  Upload photos for an instant AI-powered estimate or call us for a phone quote.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Schedule Service</h3>
                <p className="text-muted-foreground">
                  Choose a convenient time - we offer flexible scheduling including same-day service.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">We Handle Everything</h3>
                <p className="text-muted-foreground">
                  Our team does all the work - loading, hauling, and eco-friendly disposal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Our Home Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-background rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Clear Your Space?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get an instant quote with our AI-powered image analysis
          </p>
          <Link to="/quote">
            <Button variant="hero" size="lg">
              Get Free Quote
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

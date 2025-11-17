import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Shield, Wrench, CheckCircle2 } from "lucide-react";

export default function Maintenance() {
  const services = [
    "Regular waste collection and disposal",
    "Recycling program management",
    "Property cleaning and upkeep",
    "Seasonal cleanups",
    "Emergency cleanup services",
    "Tenant turnover services",
  ];

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Property Maintenance Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive ongoing waste management solutions for residential and commercial properties
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Hassle-Free Property Management</h2>
            <p className="text-lg text-muted-foreground">
              Keep your property clean and well-maintained with our flexible, reliable ongoing services. Perfect for property managers, landlords, and commercial facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-border text-center">
              <CardContent className="p-6">
                <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
                <p className="text-muted-foreground">
                  Weekly, bi-weekly, or monthly service plans tailored to your needs
                </p>
              </CardContent>
            </Card>

            <Card className="border-border text-center">
              <CardContent className="p-6">
                <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Reliable Service</h3>
                <p className="text-muted-foreground">
                  Consistent, dependable service you can count on year-round
                </p>
              </CardContent>
            </Card>

            <Card className="border-border text-center">
              <CardContent className="p-6">
                <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Full Service</h3>
                <p className="text-muted-foreground">
                  Complete waste management from collection to disposal
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-background rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0" />
                <span className="font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Perfect For</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-semibold mb-2">Property Managers</h3>
                <p className="text-muted-foreground">
                  Multi-unit residential buildings, apartment complexes, and HOA communities
                </p>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-semibold mb-2">Commercial Properties</h3>
                <p className="text-muted-foreground">
                  Office buildings, retail centers, and business parks
                </p>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-semibold mb-2">Landlords</h3>
                <p className="text-muted-foreground">
                  Single or multiple rental properties requiring regular maintenance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Simplify Property Management?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us for a custom maintenance plan and pricing
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/quote">
              <Button variant="hero" size="lg" className="bg-background text-foreground hover:bg-background/90">
                Get Custom Quote
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

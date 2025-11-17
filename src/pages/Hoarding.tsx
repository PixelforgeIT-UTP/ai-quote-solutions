import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Users, Clock } from "lucide-react";

export default function Hoarding() {
  const approach = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We understand hoarding is a sensitive issue and approach every situation with empathy and respect.",
    },
    {
      icon: Shield,
      title: "Confidential Service",
      description: "Complete discretion guaranteed. Your privacy is our priority throughout the entire process.",
    },
    {
      icon: Users,
      title: "Professional Team",
      description: "Our trained specialists work efficiently while maintaining dignity and understanding.",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "We work at your pace, creating a customized timeline that respects your comfort level.",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Hoarding Remediation Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Professional, compassionate hoarding cleanup services with dignity and respect for all individuals and families
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6">Understanding Hoarding</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Hoarding disorder affects millions of people and their families. We recognize that hoarding is a complex issue that requires patience, understanding, and professional expertise.
            </p>
            <p className="text-lg text-muted-foreground">
              Our team is specially trained to handle hoarding situations with the sensitivity and care they deserve, working alongside individuals and families to restore safe, livable spaces.
            </p>
          </div>

          <h3 className="text-2xl font-bold mb-8 text-center">Our Approach</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approach.map((item, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Process</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-semibold mb-2">1. Initial Consultation</h3>
                <p className="text-muted-foreground">
                  Free, confidential assessment to understand your unique situation and needs.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-semibold mb-2">2. Customized Plan</h3>
                <p className="text-muted-foreground">
                  We create a tailored approach that respects your timeline and comfort level.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-semibold mb-2">3. Professional Cleanup</h3>
                <p className="text-muted-foreground">
                  Our trained team works efficiently while maintaining sensitivity and respect.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-semibold mb-2">4. Follow-Up Support</h3>
                <p className="text-muted-foreground">
                  We provide resources and recommendations for ongoing support services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take the First Step?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us for a free, confidential consultation. We're here to help.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/quote">
              <Button variant="hero" size="lg">
                Request Consultation
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

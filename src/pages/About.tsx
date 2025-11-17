import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Leaf, Heart } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We approach every situation with empathy and understanding, especially in sensitive circumstances.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Environmental responsibility guides every decision we make, from recycling to disposal methods.",
    },
    {
      icon: Users,
      title: "Community",
      description: "We're committed to giving back through donations and supporting local organizations.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Professional service, reliable results, and complete customer satisfaction in every job.",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Who We Are</h1>
          <p className="text-xl max-w-3xl mx-auto">
            A family-owned business dedicated to professional waste management with heart
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Founded in 2010, Urge to Purge started with a simple mission: to provide professional waste management services that respect both people and the planet. What began as a small local operation has grown into a trusted name in sustainable junk removal and property maintenance.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Over the years, we've helped thousands of families, businesses, and property managers with everything from routine junk removal to sensitive hoarding situations. Through it all, we've maintained our commitment to compassionate service and environmental responsibility.
            </p>
            <p className="text-lg text-muted-foreground">
              Today, we're proud to be recognized as leaders in eco-friendly waste management, but we've never forgotten our roots. We're still the same family-oriented team that cares deeply about our community and the people we serve.
            </p>
          </div>

          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-border text-center">
                <CardContent className="p-6">
                  <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Team</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our success is built on the dedication of our professional team. Every member is:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Thoroughly trained in safe handling and disposal procedures
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Background-checked and fully insured for your peace of mind
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Committed to providing respectful, professional service
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Passionate about environmental sustainability
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Certifications & Partnerships</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We maintain the highest industry standards and work with certified partners to ensure responsible waste management.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-3" />
                  <p className="font-semibold">Licensed & Insured</p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <Leaf className="h-12 w-12 text-primary mx-auto mb-3" />
                  <p className="font-semibold">EPA Certified</p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-3" />
                  <p className="font-semibold">BBB Accredited</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

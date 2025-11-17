import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Recycle, RefreshCw, TreePine } from "lucide-react";

export default function Sustainable() {
  const commitments = [
    {
      icon: Recycle,
      title: "Maximum Recycling",
      stat: "85%",
      description: "Average recycling rate across all jobs",
    },
    {
      icon: TreePine,
      title: "Carbon Neutral",
      stat: "100%",
      description: "Of our fleet runs on biodiesel or electric",
    },
    {
      icon: RefreshCw,
      title: "Items Donated",
      stat: "50K+",
      description: "Usable items donated to local charities annually",
    },
    {
      icon: Leaf,
      title: "Landfill Diversion",
      stat: "90%",
      description: "Of collected materials diverted from landfills",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Sustainable Junk Removal</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Eco-friendly waste management that's good for your space and great for the planet
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Environmental Commitment</h2>
            <p className="text-lg text-muted-foreground">
              We believe responsible waste management means more than just hauling things away. Every item we collect is carefully sorted to maximize recycling, donation, and proper disposal while minimizing environmental impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commitments.map((item, index) => (
              <Card key={index} className="border-border text-center">
                <CardContent className="p-6">
                  <div className="inline-flex p-4 bg-accent/10 rounded-full mb-4">
                    <item.icon className="h-8 w-8 text-accent" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">{item.stat}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-service-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Our Sustainable Process</h2>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Collection & Sorting</h3>
                  <p className="text-muted-foreground">
                    Every item is carefully evaluated and sorted at our facility by material type and condition.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Donation & Reuse</h3>
                  <p className="text-muted-foreground">
                    Usable items are donated to local charities, nonprofits, and community organizations to extend their lifecycle.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Recycling Processing</h3>
                  <p className="text-muted-foreground">
                    Materials like metal, wood, plastic, and electronics are sent to certified recycling facilities.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Responsible Disposal</h3>
                  <p className="text-muted-foreground">
                    Only items that cannot be recycled or donated are disposed of, following all environmental regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Partner Organizations</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We proudly partner with local charities and environmental organizations to ensure your unwanted items find new homes or are processed responsibly:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <Leaf className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <span>Local thrift stores and charitable organizations</span>
              </li>
              <li className="flex items-start gap-3">
                <Leaf className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <span>Certified e-waste recycling facilities</span>
              </li>
              <li className="flex items-start gap-3">
                <Leaf className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <span>Metal and material reclamation centers</span>
              </li>
              <li className="flex items-start gap-3">
                <Leaf className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <span>Community furniture banks</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Make an Eco-Friendly Choice</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Choose sustainable junk removal and help us build a cleaner, greener future
          </p>
          <Link to="/quote">
            <Button variant="hero" size="lg" className="bg-background text-foreground hover:bg-background/90">
              Get Your Green Quote
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

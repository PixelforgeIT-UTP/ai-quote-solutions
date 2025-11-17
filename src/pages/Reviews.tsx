import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export default function Reviews() {
  const reviews = [
    {
      name: "Sarah Johnson",
      initials: "SJ",
      rating: 5,
      date: "2 weeks ago",
      service: "Hoarding Remediation",
      text: "The team was incredibly compassionate and professional. They helped my family through a difficult situation with dignity and respect. Highly recommend their hoarding services.",
    },
    {
      name: "Michael Chen",
      initials: "MC",
      rating: 5,
      date: "1 month ago",
      service: "Home Services",
      text: "Fast, efficient, and eco-friendly! They cleared out my entire garage in just a few hours and recycled most of the items. Great service at a fair price.",
    },
    {
      name: "Emily Rodriguez",
      initials: "ER",
      rating: 5,
      date: "3 weeks ago",
      service: "Estate Cleanout",
      text: "Handled my parents' estate cleanout with such care. They were patient, respectful, and went above and beyond. Made a tough time much easier for our family.",
    },
    {
      name: "David Thompson",
      initials: "DT",
      rating: 5,
      date: "1 week ago",
      service: "Property Maintenance",
      text: "We use them for our apartment complex. Always reliable, professional, and thorough. Our residents are happy and our property stays clean. Worth every penny.",
    },
    {
      name: "Lisa Martinez",
      initials: "LM",
      rating: 5,
      date: "2 months ago",
      service: "Sustainable Junk Removal",
      text: "Love that they focus on recycling and donation! They removed all my old furniture and told me exactly what was recycled vs donated. Transparency matters!",
    },
    {
      name: "Robert Lee",
      initials: "RL",
      rating: 5,
      date: "3 weeks ago",
      service: "Commercial Services",
      text: "Used them for our office renovation. The team was punctual, efficient, and left the place spotless. Highly recommend for any commercial project.",
    },
  ];

  return (
    <div className="min-h-screen bg-service-gradient py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Customer Reviews</h1>
          <p className="text-xl text-muted-foreground">
            See what our satisfied customers have to say
          </p>
        </div>

        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-8 w-8 fill-accent text-accent" />
            ))}
          </div>
          <p className="text-3xl font-bold mb-2">5.0 out of 5</p>
          <p className="text-muted-foreground">Based on 200+ reviews</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {review.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold">{review.name}</h3>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{review.service}</p>
                    <p className="text-sm">{review.text}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-muted">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Join Our Happy Customers</h2>
              <p className="text-muted-foreground mb-6">
                Experience the same excellent service that earned us these 5-star reviews
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a href="/quote" className="inline-block">
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-medium hover:shadow-strong">
                    Get Your Free Quote
                  </button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

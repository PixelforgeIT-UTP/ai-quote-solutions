import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

export default function Blog() {
  const posts = [
    {
      title: "10 Tips for Decluttering Your Home",
      category: "Home Organization",
      date: "March 15, 2024",
      excerpt: "Learn practical strategies to declutter your living space and maintain an organized home environment.",
    },
    {
      title: "The Environmental Impact of Proper Waste Disposal",
      category: "Sustainability",
      date: "March 10, 2024",
      excerpt: "Discover how responsible waste management contributes to environmental conservation and sustainability.",
    },
    {
      title: "Understanding Hoarding Disorder: A Compassionate Guide",
      category: "Mental Health",
      date: "March 5, 2024",
      excerpt: "An educational overview of hoarding disorder and how professional services can help affected individuals.",
    },
    {
      title: "Recycling 101: What Can and Cannot Be Recycled",
      category: "Recycling",
      date: "February 28, 2024",
      excerpt: "A comprehensive guide to understanding recycling symbols, accepted materials, and best practices.",
    },
    {
      title: "Estate Cleanout Checklist: Where to Start",
      category: "Estate Services",
      date: "February 20, 2024",
      excerpt: "Step-by-step guidance for families facing the challenging task of cleaning out an estate.",
    },
    {
      title: "Commercial Waste Management Best Practices",
      category: "Business",
      date: "February 15, 2024",
      excerpt: "How businesses can implement effective waste management systems to reduce costs and environmental impact.",
    },
  ];

  return (
    <div className="min-h-screen bg-service-gradient py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog & Resources</h1>
          <p className="text-xl text-muted-foreground">
            Tips, guides, and insights about waste management and home organization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Card key={index} className="border-border hover:shadow-medium transition-all cursor-pointer">
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-3">
                  {post.category}
                </Badge>
                <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Want More Tips?</h2>
              <p className="mb-6">Subscribe to our newsletter for regular updates and exclusive content</p>
              <div className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-md text-foreground"
                />
                <button className="px-6 py-2 bg-accent text-accent-foreground rounded-md font-semibold hover:bg-accent/90 transition-all">
                  Subscribe
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

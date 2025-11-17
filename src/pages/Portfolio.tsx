import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function Portfolio() {
  const projects = {
    hoarding: [
      { title: "3-Bedroom House Cleanup", location: "Downtown", duration: "3 days", items: "15 tons removed" },
      { title: "Apartment Remediation", location: "West End", duration: "2 days", items: "8 tons removed" },
    ],
    residential: [
      { title: "Full Estate Cleanout", location: "Suburban Area", duration: "5 days", items: "20 tons removed" },
      { title: "Garage & Basement Clear", location: "City Center", duration: "1 day", items: "4 tons removed" },
    ],
    commercial: [
      { title: "Office Building Renovation", location: "Business District", duration: "1 week", items: "30 tons removed" },
      { title: "Retail Store Clearance", location: "Shopping Center", duration: "2 days", items: "12 tons removed" },
    ],
  };

  return (
    <div className="min-h-screen bg-service-gradient py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Service Portfolio</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of our completed projects and the impact we've made for our clients
          </p>
        </div>

        <Tabs defaultValue="hoarding" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-8">
            <TabsTrigger value="hoarding">Hoarding</TabsTrigger>
            <TabsTrigger value="residential">Residential</TabsTrigger>
            <TabsTrigger value="commercial">Commercial</TabsTrigger>
          </TabsList>

          <TabsContent value="hoarding" className="space-y-6">
            {projects.hoarding.map((project, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground">{project.location}</p>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-semibold">{project.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Materials Handled</p>
                      <p className="font-semibold">{project.items}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="residential" className="space-y-6">
            {projects.residential.map((project, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground">{project.location}</p>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-semibold">{project.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Materials Handled</p>
                      <p className="font-semibold">{project.items}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="commercial" className="space-y-6">
            {projects.commercial.map((project, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground">{project.location}</p>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-semibold">{project.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Materials Handled</p>
                      <p className="font-semibold">{project.items}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">By the Numbers</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                <div>
                  <div className="text-4xl font-bold mb-2">500+</div>
                  <p className="text-primary-foreground/90">Projects Completed</p>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">2000+</div>
                  <p className="text-primary-foreground/90">Tons Removed</p>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">85%</div>
                  <p className="text-primary-foreground/90">Recycling Rate</p>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <p className="text-primary-foreground/90">Satisfaction Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

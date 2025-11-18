import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface PriceListItem {
  id: string;
  service_key: string;
  service_name: string;
  description: string | null;
  base_rate: number | null;
  per_hour: number | null;
  per_item: number | null;
  per_cubic_yard: number | null;
  per_room: number | null;
  per_load: number | null;
  per_ton: number | null;
  small_item: number | null;
  large_item: number | null;
  minimum_hours: number | null;
}

interface AIPrompt {
  id: string;
  prompt_key: string;
  prompt_text: string;
  description: string | null;
}

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [priceList, setPriceList] = useState<PriceListItem[]>([]);
  const [aiPrompts, setAiPrompts] = useState<AIPrompt[]>([]);
  const [savingPrice, setSavingPrice] = useState(false);
  const [savingPrompt, setSavingPrompt] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id);

    const hasAdminRole = roles?.some(r => r.role === "admin");

    if (!hasAdminRole) {
      toast({
        title: "Access Denied",
        description: "You don't have admin permissions",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setIsAdmin(true);
    await loadData();
    setLoading(false);
  };

  const loadData = async () => {
    const { data: prices } = await supabase
      .from("price_list")
      .select("*")
      .order("service_key");

    const { data: prompts } = await supabase
      .from("ai_prompts")
      .select("*");

    if (prices) setPriceList(prices);
    if (prompts) setAiPrompts(prompts);
  };

  const handlePriceUpdate = async (item: PriceListItem) => {
    setSavingPrice(true);
    const { error } = await supabase
      .from("price_list")
      .update({
        service_name: item.service_name,
        description: item.description,
        base_rate: item.base_rate,
        per_hour: item.per_hour,
        per_item: item.per_item,
        per_cubic_yard: item.per_cubic_yard,
        per_room: item.per_room,
        per_load: item.per_load,
        per_ton: item.per_ton,
        small_item: item.small_item,
        large_item: item.large_item,
        minimum_hours: item.minimum_hours,
        updated_at: new Date().toISOString(),
      })
      .eq("id", item.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update price",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Price updated successfully",
      });
    }
    setSavingPrice(false);
  };

  const handlePromptUpdate = async (prompt: AIPrompt) => {
    setSavingPrompt(true);
    const { error } = await supabase
      .from("ai_prompts")
      .update({
        prompt_text: prompt.prompt_text,
        updated_at: new Date().toISOString(),
      })
      .eq("id", prompt.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update prompt",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "AI prompt updated successfully",
      });
    }
    setSavingPrompt(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-service-gradient flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-service-gradient py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-xl text-muted-foreground">
            Manage pricing and AI prompts for quote generation
          </p>
        </div>

        <Tabs defaultValue="pricing" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="pricing">Price Management</TabsTrigger>
            <TabsTrigger value="prompts">AI Prompts</TabsTrigger>
          </TabsList>

          <TabsContent value="pricing">
            <div className="grid gap-6">
              {priceList.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle>{item.service_name}</CardTitle>
                    <CardDescription>{item.service_key}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${item.id}-description`}>Description</Label>
                        <Input
                          id={`${item.id}-description`}
                          value={item.description || ""}
                          onChange={(e) => {
                            const updated = priceList.map(p =>
                              p.id === item.id ? { ...p, description: e.target.value } : p
                            );
                            setPriceList(updated);
                          }}
                        />
                      </div>
                      {[
                        { key: 'base_rate', label: 'Base Rate ($)' },
                        { key: 'per_hour', label: 'Per Hour ($)' },
                        { key: 'per_item', label: 'Per Item ($)' },
                        { key: 'per_cubic_yard', label: 'Per Cubic Yard ($)' },
                        { key: 'per_room', label: 'Per Room ($)' },
                        { key: 'per_load', label: 'Per Load ($)' },
                        { key: 'per_ton', label: 'Per Ton ($)' },
                        { key: 'small_item', label: 'Small Item ($)' },
                        { key: 'large_item', label: 'Large Item ($)' },
                        { key: 'minimum_hours', label: 'Minimum Hours' },
                      ].map(({ key, label }) => (
                        <div key={key} className="space-y-2">
                          <Label htmlFor={`${item.id}-${key}`}>{label}</Label>
                          <Input
                            id={`${item.id}-${key}`}
                            type="number"
                            step="0.01"
                            value={item[key as keyof PriceListItem] || ""}
                            onChange={(e) => {
                              const updated = priceList.map(p =>
                                p.id === item.id
                                  ? { ...p, [key]: e.target.value ? parseFloat(e.target.value) : null }
                                  : p
                              );
                              setPriceList(updated);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={() => handlePriceUpdate(item)}
                      disabled={savingPrice}
                      className="mt-4"
                    >
                      {savingPrice ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prompts">
            <div className="grid gap-6">
              {aiPrompts.map((prompt) => (
                <Card key={prompt.id}>
                  <CardHeader>
                    <CardTitle>Quote Generation Prompt</CardTitle>
                    <CardDescription>{prompt.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${prompt.id}-text`}>Prompt Text</Label>
                        <Textarea
                          id={`${prompt.id}-text`}
                          value={prompt.prompt_text}
                          onChange={(e) => {
                            const updated = aiPrompts.map(p =>
                              p.id === prompt.id ? { ...p, prompt_text: e.target.value } : p
                            );
                            setAiPrompts(updated);
                          }}
                          rows={8}
                          className="font-mono text-sm"
                        />
                      </div>
                      <Button
                        onClick={() => handlePromptUpdate(prompt)}
                        disabled={savingPrompt}
                      >
                        {savingPrompt ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Prompt"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

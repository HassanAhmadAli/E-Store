import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const ContactUsPage = function () {
    return (
        <section className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-4xl font-bold mb-6 text-center">Contact Us</h2>
            <p className="text-lg text-muted-foreground mb-10 text-center">
                {"Have questions, feedback, or just want to say hello? We' d love to hear from you."}
            </p>
            <Card className="shadow-lg border border-muted rounded-2xl">
                <CardContent className="p-6 space-y-6">
                    <form
                        className="grid grid-cols-1 gap-6"
                        onSubmit={(e) => {
                            e.preventDefault();
                            alert("Message sent!");
                        }}
                    >
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" type="text" required placeholder="Your full name" />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" required placeholder="you@example.com" />
                        </div>
                        <div>
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" rows={5} required placeholder="Write your message here..." />
                        </div>
                        <Button type="submit" className="w-full">
                            Send Message
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="mt-10 text-center text-muted-foreground text-sm">
                <p>Or reach us at:</p>
                <p className="mt-1 font-medium">support@yourstore.com</p>
                <p className="mt-1">123 Market Street, New York, NY 10001</p>
                <p className="mt-1">Phone: (123) 456-7890</p>
            </div>
        </section>
    );
}
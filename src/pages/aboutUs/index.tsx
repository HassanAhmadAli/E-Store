import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
const MemberInfo = function ({ essentials, name }: { essentials: string, name: string }) {
    return (<div className="flex items-center gap-4">
        <Avatar>
            <AvatarImage src="/founder.jpg" alt="Founder" />
            <AvatarFallback>{essentials}</AvatarFallback>
        </Avatar>
        <div>
            <p className="font-medium">{name}</p>
        </div>
    </div>);

}
export const AboutUsPage = function () {
    return (
        <section className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-4xl font-bold mb-6 text-center">About Us</h2>
            <p className="text-lg text-muted-foreground mb-10 text-center">
                Welcome to Yasmeen United - your go-to destination for stylish, sustainable, and affordable online shopping. We’re passionate about curating a unique product range that blends everyday essentials with extraordinary finds.
            </p>
            <Card className="shadow-xl rounded-2xl border border-muted">
                <CardContent className="p-6 space-y-6">
                    <div className="text-center">
                        <h3 className="text-2xl font-semibold">Our Mission</h3>
                        <p className="text-muted-foreground mt-2">
                            To empower customers with seamless access to high-quality goods through an intuitive and joyful shopping experience. We’re here to make e-commerce human, helpful, and fun.
                        </p>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <MemberInfo essentials="HA" name="Hassan Ali" />
                        <MemberInfo essentials="LD" name="Leen Dk" />
                        <MemberInfo essentials="N" name="Nour" />
                        <MemberInfo essentials="ET" name="Eiad Toma" />
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
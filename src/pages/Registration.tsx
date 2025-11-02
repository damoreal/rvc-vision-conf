import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, MapPin } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  church: z.string().optional(),
  attendanceType: z.enum(["full", "morning", "evening"]),
  accommodation: z.enum(["yes", "no"]),
});

const Registration = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      church: "",
      attendanceType: "full",
      accommodation: "no",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast.success("Registration successful! Check your email for confirmation.");
      setIsSubmitting(false);
      form.reset();
      navigate("/");
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Conference Details */}
          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
              Register for RVC 2025
            </h1>
            <div className="h-1 w-24 bg-gradient-hero mx-auto mb-8 rounded-full"></div>

            <div className="bg-gradient-hero text-primary-foreground rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Conference Details</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <Calendar className="w-8 h-8 mb-3" />
                  <h3 className="font-semibold mb-2">Date</h3>
                  <p className="text-sm">10th - 14th December, 2025</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Clock className="w-8 h-8 mb-3" />
                  <h3 className="font-semibold mb-2">Time</h3>
                  <p className="text-sm">Morning Session: 9am WAT</p>
                  <p className="text-sm">Evening Session: 4pm WAT</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <MapPin className="w-8 h-8 mb-3" />
                  <h3 className="font-semibold mb-2">Venue</h3>
                  <p className="text-sm">The Godhouse Centre, Warri</p>
                  <p className="text-xs mt-1">2, Indian Street, off Jakpa Road, by Mansal Hotel, Effurun-Warri, Delta State, Nigeria</p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Registration Form</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+234 XXX XXX XXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="church"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Church (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your church name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="attendanceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Attendance Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select attendance type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="full">Full Conference (All Sessions)</SelectItem>
                          <SelectItem value="morning">Morning Sessions Only</SelectItem>
                          <SelectItem value="evening">Evening Sessions Only</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accommodation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Do you need accommodation? *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select accommodation preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="yes">Yes, I need accommodation</SelectItem>
                          <SelectItem value="no">No, I don't need accommodation</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90 text-lg py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Complete Registration"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Registration;

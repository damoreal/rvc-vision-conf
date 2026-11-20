import { useRef, useState } from "react";
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
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import manifestArt from "@/assets/manifestation.webp";
import { Calendar, Clock, MapPin, Wifi } from "lucide-react";
import { isNoEmailKeyword, isValidEmailOrKeyword } from "@/lib/emailBypass";
import { RegistrationRequestError, submitRegistration, type RegistrationData } from "@/lib/api";

const formSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name").max(100),
  lastName: z.string().trim().min(1, "Enter your last name").max(100),
  email: z.string().trim().max(254).refine(isValidEmailOrKeyword, "Invalid email address"),
  phone: z.string().trim().max(20).refine(
    (value) => /^\+?[\d(). -]+$/.test(value) && value.replace(/\D/g, "").length >= 10,
    "Enter a valid phone number with at least 10 digits",
  ),
  city: z.string().trim().min(1, "City/Location is required").max(100),
  churchType: z.enum(["Godhouse", "Others"]),
  godhouseCentre: z.string().trim().max(150).optional(),
  otherChurch: z.string().trim().optional(),
  attendanceType: z.enum(["Physical", "Virtual"]),
  accommodation: z.enum(["yes", "no"]),
}).superRefine((data, context) => {
  const field = data.churchType === "Godhouse" ? "godhouseCentre" : "otherChurch";
  if (!data[field]) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: [field],
      message: data.churchType === "Godhouse" ? "Select your centre" : "Enter your church name",
    });
  } else if (data[field].length > 150) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: [field],
      message: "Use 150 characters or fewer",
    });
  }
});

const Registration = () => {
  const navigate = useNavigate();
  const posting = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  const form = useForm<RegistrationData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      churchType: "Godhouse",
      godhouseCentre: "",
      otherChurch: "",
      attendanceType: "Physical",
      accommodation: "no",
    },
  });

  const watchChurchType = form.watch("churchType");

  async function onSubmit(values: RegistrationData) {
    if (posting.current) return;
    posting.current = true;
    setIsSubmitting(true);
    setSubmissionError("");
    try {
      const result = await submitRegistration(values);
      navigate("/registration/success", {
        replace: true,
        state: {
          firstName: values.firstName,
          message: result.message,
          confirmationEmailSent: result.confirmation_email_sent,
          confirmationEmailError: result.confirmation_email_error,
        },
      });
    } catch (error) {
      if (error instanceof RegistrationRequestError) {
        for (const [field, messages] of Object.entries(error.fields)) {
          if (Object.prototype.hasOwnProperty.call(values, field) && Array.isArray(messages) && typeof messages[0] === "string") {
            form.setError(field as keyof RegistrationData, { type: "server", message: messages[0] });
          }
        }
        setSubmissionError(error.message);
      } else {
        setSubmissionError("We could not confirm your registration. Please try again.");
      }
    } finally {
      posting.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Dark intro banner */}
      <div className="relative bg-ink overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-0 flex items-start justify-center overflow-hidden"><img src={manifestArt} alt="" className="shrink-0 w-[max(100%,48rem)] aspect-square object-cover opacity-80 ken-burns [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" /></div>
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/25 to-ink/90" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl breathe-gold"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl breathe-gold"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gold font-heading font-bold text-xs tracking-[0.3em] uppercase mb-4">
              Be There — In Person or Online
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Register for <span className="font-display tracking-wide text-gold text-glow-gold">RVC 2026</span>
            </h1>
            <div className="h-1 w-24 bg-gradient-gold mx-auto rounded-full"></div>
          </div>

          {/* Conference details */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="glass-dark rounded-3xl p-8 md:p-10">
              <h2 className="font-heading font-bold text-xl uppercase tracking-[0.2em] text-gold mb-8 text-center">
                Conference Details
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-heading font-bold text-white mb-2">Date</h3>
                  <p className="text-sm text-white/70">9th – 13th December, 2026</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-heading font-bold text-white mb-2">Time</h3>
                  <p className="text-sm text-white/70">Opening: Wed 9th · 5pm WAT</p>
                  <p className="text-sm text-white/70">Thu–Sat: 9am &amp; 4pm WAT</p>
                  <p className="text-sm text-white/70">Grand Finale: Sun 9am WAT</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-heading font-bold text-white mb-2">Venue</h3>
                  <p className="text-sm text-white/70">The Godhouse Centre, Warri</p>
                  <p className="text-xs text-white/50 mt-1">
                    2, Indian Street, off Jakpa Road, by Mansal Hotel, Effurun-Warri, Delta State, Nigeria
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-3 text-sm text-white/70">
                <Wifi className="w-4 h-4 text-gold" />
                Physical and virtual — streamed live on Wholeword TV, YouTube and Facebook channels
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-card border border-border rounded-3xl p-8 md:p-10 shadow-lg">
            <h2 className="font-serif text-2xl font-bold mb-2">Registration Form</h2>
            <div className="h-1 w-16 bg-gradient-gold rounded-full mb-8"></div>

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
                        <Input type="text" inputMode="email" autoComplete="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      {isNoEmailKeyword(field.value ?? "") && (
                        <p className="text-xs text-muted-foreground">On-site registration: no confirmation email will be sent.</p>
                      )}
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
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City/Location *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Lagos, Abuja" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="churchType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Church *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select church" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Godhouse">Godhouse</SelectItem>
                          <SelectItem value="Others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchChurchType === "Godhouse" && (
                  <FormField
                    control={form.control}
                    name="godhouseCentre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Your Centre/Branch *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your centre" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Warri">Warri</SelectItem>
                            <SelectItem value="Lagos">Lagos</SelectItem>
                            <SelectItem value="Portharcourt">Portharcourt</SelectItem>
                            <SelectItem value="Abuja">Abuja</SelectItem>
                            <SelectItem value="Ibadan">Ibadan</SelectItem>
                            <SelectItem value="Sagamu">Sagamu</SelectItem>
                            <SelectItem value="Jeddo">Jeddo</SelectItem>
                            <SelectItem value="Asaba">Asaba</SelectItem>
                            <SelectItem value="Bonny Island">Bonny Island</SelectItem>
                            <SelectItem value="Ojo">Ojo</SelectItem>
                            <SelectItem value="Ecclesia USA">Ecclesia USA</SelectItem>
                            <SelectItem value="Ecclesia UK">Ecclesia UK</SelectItem>
                            <SelectItem value="Ecclesia Canada">Ecclesia Canada</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {watchChurchType === "Others" && (
                  <FormField
                    control={form.control}
                    name="otherChurch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Church Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your church name" maxLength={150} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

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
                          <SelectItem value="Physical">Physical</SelectItem>
                          <SelectItem value="Virtual">Virtual</SelectItem>
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

                {submissionError && (
                  <p role="alert" className="text-sm font-medium text-destructive">{submissionError}</p>
                )}
                <Button
                  type="submit"
                  className="w-full rounded-full bg-gold text-gold-foreground hover:bg-gold/90 font-heading font-bold text-lg py-6 shadow-gold"
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

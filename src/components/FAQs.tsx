import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  const faqs = [
    {
      question: "Who can attend RVC 2025?",
      answer: "RVC 2025 is open to everyone! Whether you're a first-time attendee or a returning participant, we welcome all who desire to experience God's presence and learn how to manifest Heaven on Earth in their daily lives.",
    },
    {
      question: "What is the registration fee?",
      answer: "Registration details and fees will be provided on the registration page. Early bird discounts are available for those who register before the deadline. Group registrations also qualify for special rates.",
    },
    {
      question: "Will there be accommodation arrangements?",
      answer: "Yes, we have partnered with several hotels in Warri to provide accommodation for out-of-town participants. Details and booking information will be sent to registered attendees.",
    },
    {
      question: "What should I bring to the conference?",
      answer: "We recommend bringing your Bible, a notebook for taking notes, and an open heart to receive from God. All sessions will be held in air-conditioned halls, so dress comfortably.",
    },
    {
      question: "Will the sessions be recorded?",
      answer: "Yes, all sessions will be professionally recorded and made available to registered participants after the conference. This allows you to revisit the teachings and share with those who couldn't attend.",
    },
    {
      question: "Is there parking available?",
      answer: "Yes, The Godhouse Centre has ample parking space available for all attendees. Additional parking arrangements have been made nearby for overflow during peak sessions.",
    },
    {
      question: "Can I register on-site?",
      answer: "While we encourage pre-registration to help us plan better, on-site registration will be available. However, early registration ensures you don't miss any sessions and may qualify for special benefits.",
    },
    {
      question: "Are children welcome?",
      answer: "Absolutely! We have a dedicated children's program running parallel to the main sessions. Children will have age-appropriate teaching and activities in a safe, fun environment.",
    },
  ];

  return (
    <section id="faqs" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <div className="h-1 w-24 bg-gradient-hero mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQs;

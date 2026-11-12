import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Who can attend RVC 2026?",
    answer:
      "RVC 2026 is an interdenominational gathering of believers — everyone is welcome, whether you're a first-time attendee or a returning participant. You don't need to belong to any particular church to join us in Warri or online.",
  },
  {
    question: "When and where is the conference holding?",
    answer:
      "RVC 2026 runs from Wednesday 9th to Sunday 13th December 2026 at The Godhouse Centre, Warri — 2, Indian Street, off Jakpa Road, by Mansal Hotel, Effurun-Warri, Delta State, Nigeria.",
  },
  {
    question: "What are the session times?",
    answer:
      "The opening session holds on Wednesday 9th at 5pm WAT. From Thursday 10th to Saturday 12th, there are two sessions daily — Morning at 9am WAT and Evening at 4pm WAT. The grand finale holds on Sunday 13th at 9am WAT.",
  },
  {
    question: "Can I attend virtually if I can't travel?",
    answer:
      "Yes! Every session will be streamed live on Wholeword TV, YouTube and the Facebook channels of The Godhouse Centre. Choose 'Virtual' when registering and join from anywhere in the world.",
  },
  {
    question: "What is the registration fee?",
    answer:
      "There is no registration fee for RVC 2026 — attendance is completely free. However, every participant must register, as it helps us document attendance and prepare adequately for you. Registration takes just a minute and ensures you don't miss any session.",
  },
  {
    question: "Will there be accommodation arrangements?",
    answer:
      "Yes, we have partnered with several hotels in Warri to provide accommodation for out-of-town participants. Indicate your need for accommodation on the registration form and details will be sent to you.",
  },
  {
    question: "What should I bring to the conference?",
    answer:
      "Bring your Bible, a notebook, and an open heart to receive from God. All sessions are held in comfortable halls, so dress comfortably.",
  },
  {
    question: "Can I register on-site?",
    answer:
      "While we encourage pre-registration to help us plan better, on-site registration will be available. Early registration ensures you don't miss any sessions and may qualify for special benefits.",
  },
];

const FAQs = () => {
  return (
    <section id="faqs" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-14">
          <p className="text-gold font-heading font-bold text-xs tracking-[0.3em] uppercase mb-4">
            Good to Know
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <div className="h-1 w-24 bg-gradient-gold mx-auto rounded-full"></div>
          <p className="text-lg text-muted-foreground mt-6">Got questions? We've got answers!</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-2xl px-6 hover:border-gold/50 transition-colors"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:text-gold hover:no-underline">
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

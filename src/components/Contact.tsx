import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { SectionTitle } from "./shared/SectionTitle";
import { personalInfo } from "@/src/data/personalInfo";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { SocialLinks } from "./shared/SocialLinks";
import { Button } from "./shared/Button";
import emailjs from "@emailjs/browser";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init("06eEoXmbQRRc7ritJ");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const form = e.currentTarget;

    try {
      const result = await emailjs.sendForm(
        "service_9wavqtf",
        "template_9nlel7x",
        form,
        "06eEoXmbQRRc7ritJ"
      );
      
      console.log("Email sent successfully:", result);
      setIsSuccess(true);
      form.reset();
    } catch (err: any) {
      const errorMessage = err?.text || err?.message || "Failed to send message";
      console.error("Email error details:", {
        text: err?.text,
        message: err?.message,
        status: err?.status,
        fullError: err
      });
      setError(`Error: ${errorMessage}. Please check console for details.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-6">
      <SectionTitle title="Get in Touch" subtitle="Let's Work Together" titleClassName="text-[29px]" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <h3 className="text-[23px] font-bold text-text-primary mb-6">
            Let's Talk About Everything!
          </h3>
          <div className="text-text-secondary mb-10 text-lg">
            <p className="mb-6 text-justify text-[16px]">Feel Free To Reach Out if You're Looking For a Developer, Have a Question, or Just Want To Connect.</p>
            <div className="flex w-fit items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1a1a24] border border-white/10 font-normal text-[14px] text-[#cdcdcd]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66] shadow-[0_0_8px_rgba(0,255,102,0.6)]"></span>
              I'm Currently Open To Work.
            </div>
          </div>

          <div className="space-y-6 mb-10">
            <div className="flex items-center gap-4 text-[15px]">
              <div className="w-12 h-12 rounded-full bg-bg-tertiary flex items-center justify-center text-accent-primary">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Email</p>
                <a href={`mailto:${personalInfo.email}`} className="text-text-primary hover:text-accent-primary transition-colors font-medium">
                  {personalInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* <div className="w-12 h-12 rounded-full bg-bg-tertiary flex items-center justify-center text-accent-primary">
                <MapPin className="w-5 h-5" />
              </div> */}
              {/* <div>
                <p className="text-sm text-text-muted">Location</p>
                <p className="text-text-primary font-medium">{personalInfo.location}</p>
              </div> */}
            </div>
          </div>

          <SocialLinks links={personalInfo} />
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-card p-8 rounded-2xl">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
                </motion.div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">Message Sent!</h3>
                <p className="text-text-secondary text-[15px]">
                  Thank You For Reaching Out. I'll Get Back To You as Soon as Possible.
                </p>
                <Button
                  variant="outlined"
                  className="mt-8"
                  onClick={() => setIsSuccess(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="to_email" value={personalInfo.email} />
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-color text-text-primary text-[14px] focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/50 focus:shadow-[0_0_15px_rgba(0,210,255,0.2)] transition-all duration-300"
                    placeholder="Enter Your Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-color text-text-primary text-[14px] focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/50 focus:shadow-[0_0_15px_rgba(0,210,255,0.2)] transition-all duration-300"
                    placeholder="Enter Your Email"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-color text-text-primary text-[14px] focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/50 focus:shadow-[0_0_15px_rgba(0,210,255,0.2)] transition-all duration-300"
                    placeholder="e.g, Project inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-color text-text-primary text-[14px] focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/50 focus:shadow-[0_0_15px_rgba(0,210,255,0.2)] transition-all duration-300 resize-none"
                    placeholder="Hello, I'd Like To Talk About..."
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full gap-2 text-[15px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

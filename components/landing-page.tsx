"use client"

import { Search, FileText, Clock, Users, Star, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface LandingPageProps {
  onGetStarted: () => void
  onSearchAssignment: () => void
}

export default function LandingPage({ onGetStarted, onSearchAssignment }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href='/' className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">C</span>
            </div>
            <span className="text-lg font-semibold">COS102 Solutions</span>
          </Link>
          <button
            onClick={onSearchAssignment}
            title="Search Assignment"
            className="flex items-center cursor-pointer space-x-2 text-gray-600 hover:text-gray-800 text-sm"
          >
            <Search className="w-4 h-4" />
            <span className="hidden md:inline">Find my assignment</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get Your COS102 Assignment
            <br />
            <span className="text-blue-600">Done Right, Done Fast</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Struggling with your Computer Science COS102 assignment? We&apos;ve got you covered. Get professionally written
            solutions delivered to your email in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={onGetStarted}
              className="bg-blue-600 cursor-pointer text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get My Assignment Now
            </button>
            <button
              onClick={onSearchAssignment}
              className="border border-gray-300 cursor-pointer px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              I already paid, find my work
            </button>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>20+ students helped</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Average 5 min delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>4.8/5 rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">What You Get</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <FileText className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-semibold mb-2">Complete COS102 Solutions</h3>
              <p className="text-gray-600 text-sm">
                Fully worked out answers covering all COS102 Python topics - Tuples, Strings, Lists, Dictionaries,
                and more.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <Clock className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">
                Most assignments delivered within 10 minutes. No waiting around - get your work and submit on time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <CheckCircle className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="font-semibold mb-2">Ready to Submit</h3>
              <p className="text-gray-600 text-sm">
                Properly formatted PDF with your name and matric number. Just download, Print and submit to your lecturer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Simple Pricing</h2>
          <p className="text-gray-600 mb-8">One price, no hidden fees, instant delivery</p>

          <div className="max-w-sm mx-auto bg-white border-2 border-blue-200 rounded-lg p-8">
            <h3 className="text-lg font-semibold mb-2">COS102 Assignment</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold">₦1,000</span>
              <span className="text-gray-600 ml-1">only</span>
            </div>
            <ul className="text-left text-sm space-y-2 mb-6">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Complete assignment solution</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Delivered to your email</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>PDF format ready for submission</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Your name & matric number included</span>
              </li>
            </ul>
            <button
              onClick={onGetStarted}
              className="w-full bg-blue-600 cursor-pointer text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Fill Your Details</h3>
              <p className="text-gray-600 text-sm">
                Enter your name, email, and matric number so we can personalize your assignment.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Pay ₦1,000</h3>
              <p className="text-gray-600 text-sm">
                Secure payment via Paystack. We accept bank transfer, cards, and USSD.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Get Your Assignment</h3>
              <p className="text-gray-600 text-sm">
                Download your completed COS102 assignment and submit to your lecturer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent reviews */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">What Students Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                &quot;Got my COS102 assignment in 6 minutes! Everything was correct and well formatted. Saved my grade.&quot;
              </p>
              <p className="text-xs text-gray-500">- Kemi A., UNILAG</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                &quot;Very fast service. The solutions were detailed and easy to understand. Will use again.&quot;
              </p>
              <p className="text-xs text-gray-500">- David O., UNILAG</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                &quot;Exactly what I needed for my COS102 assignment. Professional work and delivered on time.&quot;
              </p>
              <p className="text-xs text-gray-500">- Fatima M., UNILAG</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Common Questions</h2>
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Is this the current COS102 assignment?</h3>
              <p className="text-gray-600 text-sm">
                Yes, we update our solutions regularly to match current COS102 curriculum across Unilag.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-2">How long does delivery take?</h3>
              <p className="text-gray-600 text-sm">
                Most assignments are delivered within 5-15 minutes after payment confirmation. Check your email
                (including spam folder).
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-2">What if I&apos;m not satisfied?</h3>
              <p className="text-gray-600 text-sm">
                Contact us within 2 hours if there&apos;s any issue with your assignment. We&apos;ll fix it or refund your money.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Can I get my assignment later?</h3>
              <p className="text-gray-600 text-sm">
                Yes! Every assignment gets a unique ID. Use the &quot;Find my assignment&quot; feature to download it anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Warning */}
      <section className="py-12 bg-yellow-50 border-t border-yellow-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-1">Academic Integrity Notice</h3>
              <p className="text-yellow-700 text-sm">
                This service is for reference and learning purposes. Please ensure you understand your institution&apos;s
                academic policies before submitting any work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">C</span>
              </div>
              <span className="text-lg font-semibold">COS102 Solutions</span>
            </div>
            <div className="text-sm text-gray-600">
              <a href="mailto:ofogbawisdom00@gmail.com" target="_blamk" className="hover:text-gray-800">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>&copy; 2024 COS102 Solutions. Made by students, for students.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  Leaf,
  TrendingUp,
  Users,
  Truck,
  Shield,
  Star,
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Users,
      title: 'Direct from Farmers',
      description: 'Connect directly with farmers and eliminate middlemen for better prices.',
    },
    {
      icon: Leaf,
      title: 'Fresh & Organic',
      description: 'Get fresh produce harvested daily with organic farming practices.',
    },
    {
      icon: TrendingUp,
      title: 'Smart Farming Insights',
      description: 'AI-powered recommendations for crop selection and farming practices.',
    },
    {
      icon: Truck,
      title: 'Quick Delivery',
      description: 'Fast and reliable delivery to your doorstep within 24-48 hours.',
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'All products are quality checked before dispatch.',
    },
    {
      icon: Star,
      title: 'Best Prices',
      description: 'Competitive prices with no hidden charges or commissions.',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Farmers' },
    { value: '50,000+', label: 'Customers' },
    { value: '100+', label: 'Cities' },
    { value: '1M+', label: 'Orders Delivered' },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Farmer, Punjab',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      text: 'KissanKart has transformed my business. I now sell directly to customers and get better prices for my produce.',
    },
    {
      name: 'Priya Sharma',
      role: 'Customer, Delhi',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      text: 'The quality of vegetables and fruits is amazing. Fresh from farm and delivered right to my door!',
    },
    {
      name: 'Amit Patel',
      role: 'Store Manager, Mumbai',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      text: 'Bulk ordering from multiple farmers has never been easier. Great platform for store managers.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-700/70" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeIn">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6">
                <Leaf className="w-4 h-4" />
                India's #1 Farm-to-Consumer Platform
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Fresh from Farm
                <br />
                <span className="text-secondary-400">Direct to Your Door</span>
              </h1>
              <p className="text-lg lg:text-xl text-primary-100 mb-8 max-w-xl">
                Connect with local farmers, buy fresh produce, and support sustainable agriculture.
                No middlemen, just pure farm goodness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-xl font-semibold hover:bg-primary-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white/50 rounded-xl font-semibold hover:bg-white/10 transition-all"
                >
                  Login
                </Link>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-secondary-400/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1595855759920-86582396756a?w=600"
                alt="Fresh vegetables"
                className="relative rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
              />
              <img
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=300"
                alt="Farm produce"
                className="absolute -bottom-10 -left-10 w-48 rounded-xl shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path
              fill="#f9fafb"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold mb-2 block">Why Choose Us</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Everything You Need for
              <br />
              <span className="text-primary-600">Fresh & Healthy Food</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              KissanKart brings together farmers, customers, and store managers on a single platform
              to create a sustainable and efficient food supply chain.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card p-6 hover:border-primary-200 border border-transparent transition-all group"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold mb-2 block">How It Works</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
              Simple Steps to Get Started
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Sign Up',
                description: 'Create your account as a Farmer, Customer, or Store Manager.',
              },
              {
                step: '02',
                title: 'Browse & Order',
                description: 'Explore products from local farmers and add to cart.',
              },
              {
                step: '03',
                title: 'Get Delivered',
                description: 'Receive fresh produce at your doorstep.',
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="card p-8 text-center relative z-10">
                  <div className="w-16 h-16 bg-primary-600 text-white text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary-300 z-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold mb-2 block">Join Us</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
              Who Can Use KissanKart?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Farmers',
                description: 'Sell your products directly to customers and businesses. Get better prices and grow your farm business.',
                image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400',
                benefits: ['List unlimited products', 'Accept orders online', 'Get AI farming insights', 'Order supplies & tools'],
              },
              {
                title: 'Customers',
                description: 'Buy fresh produce directly from farmers. Support local agriculture and get quality products.',
                image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
                benefits: ['Fresh farm products', 'Competitive prices', 'Home delivery', 'Track your orders'],
              },
              {
                title: 'Store Managers',
                description: 'Source products in bulk from multiple farmers. Streamline your supply chain.',
                image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400',
                benefits: ['Bulk ordering', 'Multiple farmers', 'Business pricing', 'Reliable supply'],
              },
            ].map((type, index) => (
              <div key={index} className="card overflow-hidden group">
                <div className="h-48 overflow-hidden">
                  <img
                    src={type.image}
                    alt={type.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{type.title}</h3>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <ul className="space-y-2 mb-6">
                    {type.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-primary-600" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all"
                  >
                    Join as {type.title.slice(0, -1)}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold mb-2 block">Testimonials</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
              What Our Users Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of farmers, customers, and businesses who are already part of the
            KissanKart community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-xl font-semibold hover:bg-primary-50 transition-all shadow-xl"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  Kissan<span className="text-secondary-400">Kart</span>
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting farmers directly with customers for fresh, organic produce.
              </p>
              <div className="flex gap-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <a
                    key={social}
                    href={`#${social}`}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-gray-400 rounded" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['About Us', 'How It Works', 'Pricing', 'Blog', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-primary-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">For Users</h4>
              <ul className="space-y-2">
                {['Farmer Guide', 'Customer Support', 'Store Manager Guide', 'FAQ', 'Terms of Service'].map(
                  (link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-primary-400 transition-colors">
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-400" />
                  <span>Mumbai, Maharashtra, India</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary-400" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <span>support@kissankart.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>© 2024 KissanKart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
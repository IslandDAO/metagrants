import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/ui/stat-card";
import ProjectCard from "@/components/ui/project-card";
import Timeline from "@/components/ui/timeline";
import Testimonial from "@/components/ui/testimonial";
import { Input } from "@/components/ui/input";
import { getAnimationDelay } from "@/lib/utils";

import { stats } from "@/data/stats";
import { projects } from "@/data/projects";

const Home = () => {
  const timelineSteps = [
    {
      number: 1,
      title: "Application",
      description: "Submit your project proposal through our online portal with details about your team and vision",
    },
    {
      number: 2,
      title: "Review",
      description: "Our evaluation committee assesses applications based on innovation, feasibility, and impact",
    },
    {
      number: 3,
      title: "Funding",
      description: "Selected projects receive funding in milestone-based installments to ensure accountability",
    },
    {
      number: 4,
      title: "Support",
      description: "Ongoing mentorship, technical guidance, and networking opportunities throughout development",
    },
  ];

  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Hero Image with Overlay Text */}
        <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary to-transparent opacity-60 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
            alt="Tropical island landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start z-20 p-8 md:p-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">MetaplexDAO Grants</h1>
            <p className="text-white text-lg md:text-xl max-w-xl mb-6">
              Supporting innovative blockchain projects through strategic funding and comprehensive mentorship
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-dark text-secondary font-bold py-3 px-6 rounded-lg transition transform hover:scale-105"
            >
              Apply for Funding
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <StatCard 
            key={stat.id}
            title={stat.title}
            value={stat.value}
            className="animate-fadeIn"
            style={{ animationDelay: getAnimationDelay(index) }}
          />
        ))}
      </div>

      {/* About Section */}
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-secondary">About the Program</h2>
        <Card className="overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-1 p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-4">Empowering the Blockchain Ecosystem</h3>
              <p className="text-gray-700 mb-4">
                The MetaplexDAO Grants Program, managed by IslandDAO, supports innovative projects building on blockchain technology. We provide funding, mentorship, and resources to help projects succeed.
              </p>
              <p className="text-gray-700 mb-4">
                Our focus areas include DeFi infrastructure, NFT marketplaces, decentralized governance, and sustainable blockchain solutions.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="bg-primary px-3 py-1 rounded-full text-secondary text-sm font-medium">Blockchain Innovation</Badge>
                <Badge className="bg-primary px-3 py-1 rounded-full text-secondary text-sm font-medium">Web3 Development</Badge>
                <Badge className="bg-primary px-3 py-1 rounded-full text-secondary text-sm font-medium">Decentralized Applications</Badge>
              </div>
            </div>
            <div className="md:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Team collaboration" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Featured Projects Section */}
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary">Featured Projects</h2>
          <Link 
            href="/projects"
            className="text-secondary hover:text-secondary-light font-medium flex items-center"
          >
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              description={project.description}
              status={project.status}
              fundingAmount={project.fundingAmount}
              imageUrl={project.imageUrl}
            />
          ))}
        </div>
      </motion.div>

      {/* Grant Process Section */}
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-secondary">Grant Process</h2>
        <Timeline steps={timelineSteps} />
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="bg-gradient-to-r from-secondary to-secondary-light rounded-xl overflow-hidden shadow-xl">
          <div className="md:flex items-center">
            <div className="md:w-2/3 p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to Build the Future?</h2>
              <p className="text-white mb-6 md:pr-8">
                Join the next cohort of innovative projects shaping the future of blockchain technology. Applications for the next funding round close in 14 days.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-dark text-secondary font-bold py-3 px-6 rounded-lg transition transform hover:scale-105"
                >
                  Apply Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/3 h-60 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80" 
                alt="Blockchain technology" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-secondary">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Testimonial
            name="DeFi Nexus Protocol"
            projectName="DeFi Nexus Protocol"
            projectType="Cross-chain DeFi aggregation platform"
            testimonial="The MetaplexDAO grant not only provided us with funding but connected us with advisors who helped refine our architecture. Since launch, we've seen over $50M in TVL and integrated with 5 major chains."
            rating={5}
            year={2022}
            initial="D"
          />
          <Testimonial
            name="VerifyChain"
            projectName="VerifyChain"
            projectType="Supply chain verification protocol"
            testimonial="As a small team with big ideas, the grant from MetaplexDAO was crucial in helping us develop our MVP. The milestone-based approach kept us accountable and focused on delivering results."
            rating={5}
            year={2023}
            initial="V"
          />
        </div>
      </motion.div>

      {/* Newsletter Section */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="p-6 md:p-8">
          <div className="md:flex items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-xl md:text-2xl font-bold mb-2 text-secondary">Stay Updated</h2>
              <p className="text-gray-600">
                Subscribe to our newsletter for the latest funding announcements, project highlights, and ecosystem news.
              </p>
            </div>
            <div className="md:w-1/3">
              <div className="flex">
                <Input 
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 rounded-l-lg rounded-r-none border-r-0"
                />
                <Button
                  className="bg-secondary hover:bg-secondary-light text-white font-bold rounded-l-none rounded-r-lg"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Footer */}
      <motion.footer 
        className="text-center md:text-left text-sm text-gray-600 pt-4 border-t border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <div className="md:flex md:justify-between mb-4">
          <div className="mb-4 md:mb-0">
            <p>© 2023 MetaplexDAO & IslandDAO. All rights reserved.</p>
          </div>
          <div className="flex justify-center md:justify-end space-x-4">
            <Link href="#" className="hover:text-secondary">Terms</Link>
            <Link href="#" className="hover:text-secondary">Privacy</Link>
            <Link href="#" className="hover:text-secondary">Contact</Link>
          </div>
        </div>
      </motion.footer>
    </>
  );
};

export default Home;

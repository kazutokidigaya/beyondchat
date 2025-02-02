import { useNavigate } from "react-router-dom";
import {
  FaRobot,
  FaSignInAlt,
  FaCogs,
  FaCheckCircle,
  FaRocket,
  FaEnvelope,
} from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  const handleRoute = () => navigate("/register");

  const steps = [
    {
      name: "Sign Up or Login",
      description: "Create an account to start setting up your chatbot.",
      icon: FaSignInAlt,
    },
    {
      name: "Set Up Your Organization",
      description: "Enter your company details, including name and website.",
      icon: FaCogs,
    },
    {
      name: "Scrape Website",
      description:
        "We automatically analyze your website to train your chatbot.",
      icon: FaRobot,
    },
    {
      name: "Train Your Chatbot",
      description: "We use AI to train a chatbot tailored for your business.",
      icon: FaCheckCircle,
    },
    {
      name: "Integrate Chatbot",
      description:
        "Embed your chatbot on your website easily with a few clicks.",
      icon: FaRocket,
    },
    {
      name: "Get Support & Insights",
      description: "Monitor chatbot performance and optimize conversations.",
      icon: FaEnvelope,
    },
  ];

  return (
    <main className="flex-1 overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-white to-blue-600">
      <div className="bg-white py-24 sm:py-32 rounded-md drop-shadow-xl">
        {/* Hero Section */}
        <div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Welcome to BeyondChats
            </h2>
            <p className="mt-2 text-3xl sm:text-6xl font-bold tracking-tight text-gray-900">
              AI Chatbots for Your Business
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Automate customer interactions with AI-powered chatbots that learn
              from your website. Set up and integrate in just a few simple
              steps.
            </p>
          </div>
          <button
            onClick={handleRoute}
            className="bg-blue-600 text-white mt-4 py-2 px-6 rounded-md hover:bg-blue-700"
          >
            Get Started
          </button>
        </div>

        {/* Image Section */}
        <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <img
              alt="App Screenshot"
              src="https://res.cloudinary.com/dqela8lj8/image/upload/v1738442356/on6mzo6gduq2fy1kp50i.png"
              width={2432}
              height={1442}
              className="mb-[0%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
            />
          </div>
        </div>

        {/* Steps Section */}
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {steps.map((step) => (
              <div key={step.name} className="relative pl-9">
                <dt className=" font-semibold text-gray-900 flex items-center">
                  <step.icon
                    aria-hidden="true"
                    className="absolute left-1 top-1 h-6 w-6 text-blue-600"
                  />
                  <span className="ml-8">{step.name}</span>
                </dt>
                <dd className="mt-2 ml-8 text-gray-600">{step.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </main>
  );
};

export default Home;

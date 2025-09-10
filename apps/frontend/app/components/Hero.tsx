import React, { useState } from 'react'
import PrimaryButton from './Button/PrimaryButton'
import SecondaryButton from './Button/SecondaryButton'
import { useNavigate } from 'react-router'

const Hero = () => {
    const navigate = useNavigate()
    return (
        <div className="relative h-[70vh] w-[90vw] mx-auto top-20">
            {/* Video background */}
            <video
                src="https://n8n.io/videos/home-intro.mp4"
                autoPlay
                loop
                muted
                className="absolute inset-0 w-[100vw] h-[70vh] object-cover z-0"
            ></video>

            {/* Image overlay */}
            <img
                src="https://n8n.io/images/hero-bg.webp"
                alt="Hero Background"
                className="absolute inset-0 w-[100vw] h-[70vh] object-cover z-10"
            />
            {/* Text content */}
            <div className="absolute inset-0 flex items-center px-12 z-20">
                <div className="max-w-xl text-white">
                    <h1 className="text-4xl font-semibold mb-4 leading-snug">
                        Flexible AI workflow automation <br /> <span className='text-orange-500'>for technical teams</span>
                    </h1>
                    <p className="text-lg text-gray-300 mb-6">
                        Build with the precision of code or the speed of drag-n-drop.
                        Host with on-prem control or in-the-cloud convenience.
                        n8n gives you more freedom to implement multi-step AI agents
                        and integrate apps than any other tool.
                    </p>
                    <SecondaryButton label="Get Started for free" onClick={() => navigate("/signup")} />
                </div>
            </div>

            {/* Features Tabs */}
            {/* <FeaturesTabs /> */}

        </div>
    )
}

export default Hero


// import React, { useState } from "react";

const tabs = [
    {
        title: "IT Ops",
        description: "⚡ On-board new employees",
        image:
            "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/Home_ITO_Ps_5a5aac3fda.webp",
    },
    {
        title: "Sec Ops",
        description: "⚡ Enrich security incident tickets",
        image:
            "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/Home_ITO_Ps_5a5aac3fda.webp",
    },
    {
        title: "Dev Ops",
        description: "⚡ Convert natural language into API calls",
        image:
            "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/Home_ITO_Ps_5a5aac3fda.webp",
    },
    {
        title: "Sales",
        description: "⚡ Generate customer insights from reviews",
        image:
            "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/Home_ITO_Ps_5a5aac3fda.webp",
    },
    {
        title: "You",
        description: "▶️ Watch this video to hear our pitch",
        image:
            "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/Home_ITO_Ps_5a5aac3fda.webp",
    },
];

const FeaturesTabs = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="tabs-layer">
            <div className="tabs-layer-wrapper">
                <div className="wrapper flex flex-col md:flex-row">
                    {/* Tabs */}
                    <div className="tabs flex flex-col md:flex-row gap-4">
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`tab group text-left p-3 rounded-md ${activeIndex === index ? "bg-gray-800 text-white" : "text-gray-500"
                                    }`}
                            >
                                <span className="tab-title text-md">
                                    <p>
                                        <strong>{tab.title}</strong> can
                                    </p>
                                </span>
                                <p className="text-sm mt-2">{tab.description}</p>
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="tabs-content z-10 relative rounded-b-2xl aspect-[16/9] w-full mt-6 md:mt-0 md:ml-6">
                        <img
                            alt={tabs[activeIndex].title}
                            src={tabs[activeIndex].image}
                            className="relative z-20 h-full w-full object-cover rounded-xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};


import { Link } from "react-router-dom";
import Logo from "../Logo";

const Footer = () => {
    const footerData = [
        {
            title: "Company",
            links: [
                { name: "Features", to: "/" },
                { name: "Pricing", to: "/" },
                { name: "Affiliate Program", to: "/" },
                { name: "Press Kit", to: "/" },
            ],
        },
        {
            title: "Support",
            links: [
                { name: "Account", to: "/" },
                { name: "Help", to: "/" },
                { name: "Contact Us", to: "/" },
                { name: "Customer Support", to: "/" },
            ],
        },
        {
            title: "Legals",
            links: [
                { name: "Terms & Conditions", to: "/" },
                { name: "Privacy Policy", to: "/" },
                { name: "Licensing", to: "/" },
            ],
        },
    ];

    return (
        <section className="relative overflow-hidden py-10 bg-gray-900  border-t-2 border-t-gray-600">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    {/* Logo and Copyright */}
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="100px" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-300">
                                    &copy; Copyright 2024. All Rights Reserved
                                    by DevUI.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Footer Sections */}
                    {footerData.map((section, index) => (
                        <div
                            key={index}
                            className="w-full p-6 md:w-1/2 lg:w-2/12"
                        >
                            <div className="h-full">
                                <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-400">
                                    {section.title}
                                </h3>
                                <ul>
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex} className="mb-4">
                                            <Link
                                                className="text-base font-medium text-gray-200 hover:text-gray-300"
                                                to={link.to}
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Footer;

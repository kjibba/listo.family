import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: "%s | listo.family blogg",
        default: "Blogg - Tips for måltidsplanlegging | listo.family",
    },
    openGraph: {
        siteName: "listo.family",
        locale: "nb_NO",
        type: "article",
        images: [
            {
                url: "/images/og-blogg.png",
                width: 1200,
                height: 630,
                alt: "listo.family blogg - Tips for travle familier",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        images: ["/images/og-blogg.png"],
    },
};

// Breadcrumb schema for blog section
const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Hjem",
            item: "https://listo.family",
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Blogg",
            item: "https://listo.family/blogg",
        },
    ],
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}

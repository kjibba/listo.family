import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Familieapp | Organisere familien enkelt | listo.family",
    description:
        "Sliter du med å holde orden på familien? ✓ Organisere familien på ett sted ✓ Hverdagslogistikk som fungerer ✓ Delt kalender, middagsplan og gjøremål. Gratis app for familier!",
    keywords: [
        "familieapp",
        "organisere familien",
        "holde orden på familien",
        "familieorganisering",
        "familieorganisering app",
        "hverdagslogistikk familie",
        "familie kalender app",
        "familieplanlegger",
        "app for familier",
        "familie todo app",
        "delt kalender familie",
        "gjøremål barn app",
        "familieapp gratis",
        "organisering familie",
        "styre familien",
    ],
    alternates: {
        canonical: "/familieapp",
    },
    openGraph: {
        title: "Familieapp | Organisere familien enkelt | listo.family",
        description:
            "Sliter du med hverdagslogistikken? Organisere familien med én app - middagsplan, handleliste og gjøremål synkronisert.",
        url: "https://listo.family/familieapp",
        siteName: "listo.family",
        locale: "nb_NO",
        type: "website",
        images: [
            {
                url: "/images/og-familieapp.png",
                width: 1200,
                height: 630,
                alt: "listo.family - Organisere familien enkelt",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Familieapp | Organisere familien enkelt | listo.family",
        description: "Sliter du med hverdagslogistikken? Organisere familien enkelt med Listo!",
        images: ["/images/og-familieapp.png"],
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "Hva er Listo familieapp?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Listo er en komplett familieapp som hjelper norske familier med å organisere hverdagen. Den kombinerer middagsplanlegger, handleliste, og oppgavefordeling i én app - alt synkronisert i sanntid for hele familien.",
            },
        },
        {
            "@type": "Question",
            name: "Er Listo familieapp gratis?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Ja! Grunnfunksjonene i Listo er helt gratis. Du kan planlegge middager, dele handlelister, og administrere gjøremål uten å betale. Premium-funksjoner som AI-assistanse er tilgjengelig mot en liten månedskostnad.",
            },
        },
        {
            "@type": "Question",
            name: "Hvor mange familiemedlemmer kan bruke appen?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Det er ingen grense! Du kan invitere alle i familien - foreldre, barn, besteforeldre - alle kan delta. Hver person kan ha sin egen profil og se oppgaver som er tildelt dem.",
            },
        },
        {
            "@type": "Question",
            name: "Fungerer familieappen på alle enheter?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Ja! Listo fungerer på iPhone, Android, nettbrett og som webapp på PC/Mac. Alt synkroniseres automatisk mellom alle enheter, så familien alltid er oppdatert.",
            },
        },
        {
            "@type": "Question",
            name: "Kan barn bruke familieappen?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Absolutt! Barn kan ha egne profiler og se gjøremål som er tildelt dem. Det er en fin måte å lære barn ansvar og gi dem oversikt over hva de skal bidra med i hverdagen.",
            },
        },
    ],
};

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
            name: "Familieapp",
            item: "https://listo.family/familieapp",
        },
    ],
};

export default function FamilieappLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}

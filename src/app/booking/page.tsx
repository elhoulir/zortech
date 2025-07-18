// src/app/booking/page.tsx
const calendlyEmbedHtml = `
<div class="calendly-inline-widget" data-url="https://calendly.com/rashidelhouli/15min" style="min-width:320px;height:700px;"></div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
<!-- Calendly inline widget end -->
`;

export default function BookingPage() {
    return (
        <div className="py-16 sm:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold">Book a Consultation</h1>
                    <p className="text-lg text-muted-foreground mt-4">Choose a time that works for you. I look forward to our conversation.</p>
                </div>
                <div
                    className="calendly-container rounded-lg overflow-hidden border border-border"
                    dangerouslySetInnerHTML={{ __html: calendlyEmbedHtml }}
                />
            </div>
        </div>
    );
}
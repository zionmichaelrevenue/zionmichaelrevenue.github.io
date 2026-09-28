# Services and quote flow

The site stays compatible with static GitHub Pages hosting. No Next.js server, database credentials, checkout, or build step is required.

## Routes

- /services/: overview; the existing /html/events.html URL also shows this content
- /services/bdr/, /services/product/, /services/automation/: service details and all 12 tiers
- /quote/?service=bdr&tier=Growth: quote form with service/tier preselection
- /thank-you/: submission confirmation and inline booking calendar

## Booking

js/services-config.js uses the owner-provided michel-mz/30min event. Pages say 30 minutes to match that URL rather than the original brief's 15 minutes. Confirm duration and availability in Cal.com. Required Company and Service interest fields, optional Budget range and preparation notes must be configured in the Cal.com event editor. Optional discovery/scoping events are not created by this repository change.

## Email delivery: one-time activation required

The quote form sends a native POST to https://formsubmit.co/micheldeosaran@proton.me. FormSubmit processes the fields and emails the recipient; its default CAPTCHA remains enabled. On success, _next returns to https://zionmichaelrevenue.github.io/thank-you/. Update this absolute URL if the site moves to a custom domain.

Before accepting customer requests:

1. Submit a test quote from the published site.
2. Open the activation email at micheldeosaran@proton.me and confirm the endpoint.
3. Submit another test and verify both email receipt and the thank-you redirect.

Until the mailbox owner completes activation, delivery is unverified. No test email was sent during development. The form also provides a direct email link. Credentials are not stored in this repository. Setup reference: https://formsubmit.co/

## Content and validation

Prices and terms follow the supplied schema. Audience and included/excluded descriptions expand on it and should be reviewed by the owner. Required fields, email validation, and service-specific tier options are implemented. Unknown query parameters fall back to a valid selection. Service content and pricing remain readable without JavaScript; JavaScript enhances the tier selector and loads Cal.com.

Serve the repository root with any static server for preview. Directory index routes support direct links and reloads on GitHub Pages. Existing Clients, Publications, Updates, and home content remain available, with Services navigation updated.

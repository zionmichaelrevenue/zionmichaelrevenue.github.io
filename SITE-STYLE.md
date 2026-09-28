# Shared site UI

Every full page loads `css/styles-boilerplate.css` and `js/site.js`. The shared CSS retains the original Inter font, coral palette, soft panels, and rounded cards while using one type scale, container width, and spacing system.

- The header and footer are identical on all 12 page routes. Keep these blocks synchronized when editing navigation.
- `.info` is the page hero; `.container` aligns body content; `.content-stats` supplies section spacing.
- Use `.btn-primary` and `.btn-secondary` for actions, `.stat-box` for summary cards, and `.service-card` for pricing/service cards.
- `js/site.js` handles current navigation state, the mobile menu, Escape/outside-click closing, and reduced-motion video playback.
- `js/listings.js` handles publications and updates, including category selection and empty/error states.
- `js/resourceLoader.js` handles resource sections and previous/next controls. Existing resource content remains in `assets/resources`.
- The old page-specific CSS and legacy listing/navigation scripts are no longer loaded. New changes belong in the shared files above.

Verified at desktop and 390px mobile width: all 12 routes, navigation, publication category selection, resource section navigation, and service/tier preselection. FormSubmit delivery still requires the mailbox owner's activation as documented in SERVICES-SETUP.md.

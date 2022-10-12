# Best.Dressed

## Plan:

- [x] Users can register
- [ ] Registered Users can create 'parties'
- [ ] A user can connect a party to a FB event? Pull in details
- [ ] A user can connect a party to a Spotify playlist for live updates on dashboard
- [x] A party has a unique id (key) which will be a dynamic route e.g. /p/1a2b3c4d
- [ ] Parties have QR code shorcuts. E.g. a begin voting QR code for patrons to cast their votes
- [ ] A party dashboard receives/displays realtime updates for new partygoers
- [ ] A party dashboard displays a gallery of the partygoers and their outfits
- [ ] A party dashboard can be remotely controlled by the host (creator of party)
- [ ] A host can invite party 'admins' to help manage the party (incase the host is too drunk!)

- [ ] A host should be able to change a party settings:
- [ ] Setting: Anyone with the link can vote
- [ ] Setting: Anyone with the link can add themselves to the best dressed competition
- [ ] Setting: Only invited users can add themselves to the best dressed competition
- [ ] Setting: Only invited users can add multiple people to the competition <-- Should work in conjunction with above settings. E.g. Only registered users can add multiple people to the competition
- [ ]

## Tech-Stack / Resources:

- [x] SvelteKit
      https://github.com/ivanhofer/typesafe-i18n-demo-sveltekit - Basic Sveltekit i18n setup
- [x] TailwindCSS
      https://www.tailwind-kit.com/components
      https://svelte-headlessui.goss.io/docs <-- probably don't need
      https://tailwind-elements.com/quick-start/ <-- might be useful to speed things up
- [x] Backend: Supabase or Firebase (realtime + auth) - realtime required for dashboard
      https://github.com/supabase/auth-helpers/tree/main/examples/sveltekit/src
      https://github.com/supabase-community/supabase-ui-svelte
- [ ] Cloudinary: Storing images on a CDN
- [ ] Deployment: Cloudflare Workers
- [ ] TRPC for typesafe endpoints?
- [ ] Zod for type safety?
- [ ] QR Code generation - https://www.npmjs.com/package/qrcode
- [ ] https://svelte-modals.mattjennings.io/

## Todo

- [ ] Test light theme

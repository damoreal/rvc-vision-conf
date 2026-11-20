# RVC Webpage

## RVC 2026 registration

The form posts the registration to this frontend project's `/api/send-registration-email` Vercel function. That function sends the form data to Django's `/api/rvc/register/` endpoint and waits for a successful save. It then sends one confirmation using Sender.net and the existing HTML template in `api/_template.ts`. Django stores registrations and validates the fields. RVC confirmations use the frontend project's Sender.net configuration.

The success page distinguishes a saved registration with an accepted confirmation, an email send failure, and a desk registration using `none` or `no-email`. A send failure keeps the registration saved. Django rejects duplicate email registrations before the function calls Sender.net, so submitting the same form again does not resend a confirmation.

### Frontend email configuration

Set `SENDER_API_TOKEN` in the Vercel project's server environment for the deployment being used. The sender is `info@godhouse.org`, with the display name `The Godhouse Centre`, and must be authorized in Sender.net. Keep the token on the server. Set `RVC_API_BASE_URL=https://godhouse.org/api/rvc` to select the Django backend. The function also accepts the previous `VITE_RVC_API_BASE_URL` environment name, and defaults to the production Django URL when neither is supplied.

For local development, run Django at `http://localhost:8000` with `DJANGO_DEBUG=True`. Use `vercel dev` for the frontend function and set its `RVC_API_BASE_URL=http://localhost:8000/api/rvc` and server email token in the local environment. `npm run dev` serves the React pages for design work. The registration function requires a server runtime.

### Deployment

1. Deploy the updated Django app on Namecheap before enabling this frontend flow. Keep `DJANGO_DEBUG=False` and retain the existing database. If SQLite is outside the application root, set `DJANGO_DB_PATH` to its absolute path. In Setup Python App, keep the existing startup file loading `TheGodHouseCenter.wsgi.application`. SMTP variables configure other church email features and are independent of RVC confirmations.
2. Back up the database and inspect the RVC migration history on a staging copy. If the two legacy tables exist and match migration `0001_initial` but it is unrecorded, adopt it on the staging copy using `python manage.py migrate runningWithTheVisionConference 0001 --fake-initial`. Then apply `python manage.py migrate runningWithTheVisionConference`. A fresh database can apply both migrations normally. If legacy tables are partial or the migration history differs, reconcile it before applying changes to production.
3. Install the locked frontend dependencies with `npm ci` and run `npm run build`. Deploy the frontend repository to its existing Vercel project with build output `dist` so the React app and `api/send-registration-email.ts` are deployed together. `vercel.json` preserves `/api/` requests and routes browser pages to the React app. An upload of only `dist.zip` provides the static site and needs a separate running service for the registration function.
4. Keep the frontend hostname `rvc.godhouse.org` connected to that Vercel project and the Django hostname `godhouse.org` connected to Namecheap. Confirm `SENDER_API_TOKEN` is set for the chosen Vercel deployment and redeploy after changing runtime configuration.

[Namecheap Django setup](https://www.namecheap.com/support/knowledgebase/article.aspx/10753/2182/how-to-deploy-a-django-application-on-shared-servers/) · [Vercel Node.js functions](https://vercel.com/docs/functions/runtimes/node-js/advanced-node-configuration) · [Sender.net transactional email](https://api.sender.net/transactional-campaigns/send-transactional/)

## Original design brief

I want you to create a conference webpage. The attached image is a guide. Now, I don't want you to follow it exactly, but I want you to use it as a guide concerning the aesthetics.  The Conference titled "Running with the Vision Confence"  (RVC 2025) is done annually, this year's theme is titled "HEAVEN ON EARTH" (This should be largely diplayed on the hero with captivating font styles, like that on the  attached image).

You do not have to use the samecolor as the sample but make it something creative and christian. you can use the color codes of the attached logos (the logos are that of RVC, and The Godhouse Centre).

- Retain the FAQ section of the page. Let the speaker arrangement be a flipcard, the first part showcasing Photo, Name, Designation, and the backflip show a button titled "see bio" such that when clicked opens a modal with speaker bio.

- You can make page have header section: Home, Registration, FAQs, Image Gallery. CDesign the image Gallery section such that participants can upload the event images with a short caption, and also view (and download if necessary) uploaded images of other participants.

- Indicate Registration button at specific session on the webpage. Registration page details should include:

Conference details
Date: 
10th - 14th December, 2025
Time:
Morning Session: 9am WAT
Evening Session: 4pm WAT
Venue:  
The Godhouse Centre, Warri
2, Indian Street, off Jakpa Road, by Mansal Hotel, Effurun-Warri, Delta State, Nigeria.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://rvc-vision-conf.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a4096f4d-e0d4-4d12-8476-186ad09ad924).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

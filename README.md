# RVC Webpage

## RVC 2026 registration

The form sends a JSON `POST` to `/api/rvc/register/` on the existing Django site. It sends the attendee's name, email, phone, city, church affiliation, attendance type, and accommodation choice where applicable. Django saves valid submissions and sends the RVC 2026 confirmation using its configured mail backend. The success page shows the email notice when the backend accepts the message. Validation errors include field messages, and repeat submissions return a readable conflict message. A mail error leaves the registration saved.

For local development, run Django at `http://localhost:8000` with `DJANGO_DEBUG=True` and `EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend`. Set `VITE_RVC_API_BASE_URL=http://localhost:8000/api/rvc` in the frontend's `.env.local` before running `npm run dev`.

### Namecheap and Cloudflare

1. In the existing Namecheap Django application for `godhouse.org`, configure `DJANGO_SECRET_KEY` and the replacement `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`, and `DEFAULT_FROM_EMAIL` in cPanel. Keep `DJANGO_DEBUG=False` and retain the existing database. If the existing SQLite file is outside the application root, set `DJANGO_DB_PATH` to its absolute path. In Setup Python App, keep the existing startup file loading `TheGodHouseCenter.wsgi.application`.
2. Back up the database and inspect the RVC migration history on a staging copy. If the two legacy tables exist and match migration `0001_initial` but it is unrecorded, adopt it on the staging copy using `python manage.py migrate runningWithTheVisionConference 0001 --fake-initial`. Then apply `python manage.py migrate runningWithTheVisionConference`. A fresh database can apply both migrations normally. If legacy tables are partial or the migration history differs, reconcile it before applying changes to production.
3. Build the frontend with `VITE_RVC_API_BASE_URL=https://godhouse.org/api/rvc`. Upload the contents of `dist/`, including the hidden `.htaccess` file, to the Namecheap document root for `rvc2026.godhouse.org`. The rewrite lets browser refreshes reach the React registration routes.
4. Point `rvc2026.godhouse.org` in Cloudflare DNS to the Namecheap origin for the subdomain. Set up origin TLS for both hostnames, then use Cloudflare Full (strict) and enable HTTPS redirects at the edge. Keep the existing `godhouse.org` DNS and document root for Django. Enable HSTS only after verifying HTTPS for every hostname it would cover.

[Namecheap Django setup](https://www.namecheap.com/support/knowledgebase/article.aspx/10753/2182/how-to-deploy-a-django-application-on-shared-servers/) · [Cloudflare Full (strict)](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/)

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

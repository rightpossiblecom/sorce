export const dynamic = "force-static";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://sorce.jobs";

export function GET() {
  const body = `# Sorce

Let AI apply to jobs for you.

Sorce is a job-application agent. You upload your resume, swipe right on jobs you want, and Sorce applies on your behalf. Nothing is submitted until you approve.

## Audience

Job seekers who want to apply to many positions without filling out the same form dozens of times.

## Capabilities

- Parse and store your resume in one upload
- Surface matched job listings you can swipe on
- Draft tailored applications for each job
- Submit only after you review and approve

## Public pages

- ${siteUrl}/ — Home, with the product promise and app preview
- ${siteUrl}/privacy — Privacy policy
- ${siteUrl}/terms — Terms of service

## App

Available on the iOS App Store: https://apps.apple.com/app/id6504584959

## Limitations

Sorce submits applications only after user approval. The website is a marketing landing page. Sign-in and account management happen inside the app.

## Canonical URL

${siteUrl}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

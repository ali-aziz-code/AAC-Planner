# AAC Project Planner

A standalone planning space for Leaving Certificate Climate Action and Sustainable Development students.

## Put it on GitHub Pages

1. Create a new repository named `aac-project-planner` in your GitHub account. For GitHub Free, choose **Public** to use GitHub Pages.
2. Extract the downloaded ZIP. Open the `aac-project-planner` folder and upload its contents to the repository's top level. `index.html`, `style.css` and `app.js` must sit directly in the repository, not inside an extra folder. Include `.nojekyll` if your file browser displays it. No build step is needed.
3. Commit the upload to `main`.
4. Open **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**. Choose **main** and **/(root)**, then click **Save**.
5. When deployment finishes, use **Visit site** on that Pages settings screen. Share that website address with students, rather than the repository's code address.

For the account `ali-aziz-code` and repository `aac-project-planner`, the expected website address is:

`https://ali-aziz-code.github.io/aac-project-planner/`

That address will work only after you create the repository, upload the files and enable Pages. GitHub says changes can take up to ten minutes to publish.

### Before sharing

Open the website and enter a short test plan. Continue to the review screen, edit a note, copy the summary and download the text file. On a phone, check that you can move between the three stages.

## What students can do

- Enter their sector, brief topic, idea and research notes.
- Plan their action, stakeholders, own contribution, evidence and next steps.
- Add practical considerations and a reflection note.
- Review their own wording in a structured summary, with links back to missing areas.
- Copy or download their plan as plain text.

The planner organises students' notes. It does not write answers, grade projects or certify compliance with the brief. Partial drafts can be exported, with empty areas labelled.

## Student privacy

The website is publicly viewable once GitHub Pages is enabled. Repository privacy does not usually make a Pages website private. Do not upload student plans to the repository.

Student notes stay in memory in the current tab. The app has no server, accounts, database, analytics, tracking scripts, cookies or automatic saving. It does not send the notes to GitHub, the teacher or another service. Closing or refreshing clears the draft, so students should copy or download before leaving. Standard hosting access logs are separate from the student's draft content. Avoid personal or sensitive details.

## Run it locally

Open `index.html` in a browser. If automatic clipboard access is unavailable, the planner provides a manual-copy box. Download works locally as well.

Alternatively, serve this folder with any static web server. Relative asset links support both a domain root and a GitHub project subdirectory.

## Editing

- `index.html`: headings, field labels, prompts and layout.
- `style.css`: colours, type and responsive styling.
- `app.js`: navigation, summary, copying, downloading and clearing.

Edit or replace those files, then commit to the publishing branch to update the site. There are no API keys, packages or build tools to configure.

## Curriculum grounding

The prompts are informed by NCCA, *Guidelines to support the Leaving Certificate Climate Action and Sustainable Development Action Project*, November 2024, printed pages 4–9.

https://www.curriculumonline.ie/getmedia/73252104-823e-4a8f-9650-af1144adf110/AAC_Guidelines_LC-CASD_Final.pdf

Students must also use their current SEC brief and submission instructions. This planner produces planning notes, not the prescribed Action Project Journal. Sector suggestions are examples for organising ideas, not an official restricted list.

## Hosting reference

https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

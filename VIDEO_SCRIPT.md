# Video Script: SkillSwap Midterm Project Presentation
**Estimated Duration: 12-15 Minutes**

## Intro & Roles
- **Member 1:** Lennin
- **Member 2:** Dima

---

## Part 1: Introduction (0:00 - 1:30)
**Member 1:**
- Welcome. Introduction of the project: "SkillSwap, a freelance marketplace built with Angular."
- Brief overview of the goal: connecting clients and freelancers through a robust lifecycle.
- Mention that this frontend integrates with a provided REST API.

**Member 2:**
- Overview of the technology stack: Angular 19/21, TypeScript, Tailwind CSS (or Vanilla CSS), and RxJS for reactive data handling.
- Briefly mention the core modules: Auth, Users, Jobs, Proposals, and Reviews.

---

## Part 2: Architecture & Project Structure (1:30 - 4:00)
**Member 1 (Architecture Deep Dive):**
- **Core Layer:** Explain `src/app/core/`.
  - **Interceptors:** "We use an `AuthInterceptor` to automatically attach JWT tokens from local storage to every outgoing request."
  - **Guards:** "Our `AuthGuard` protects routes like /create-job and /profile, ensuring only authenticated users can access them."
  - **Services:** "We’ve abstracted API calls into dedicated services (AuthService, JobService, UserService) for clean code and reusability."
- **Models & Enums:** Explain how we use TypeScript interfaces and enums to ensure type safety across the app.

**Member 2 (Features & Shared):**
- **Features Layer:** "Our app is organized by features (Home, Jobs, Auth, Profile). Each feature contains its own pages and logic."
- **Shared Components:** "We created reusable components like the `Navbar` and a global `Alert` service to handle UI notifications consistently."

---

## Part 3: Full Business Flow Demo (4:00 - 11:00)

### Phase A: User Registration & Job Creation
**Member 1:**
- **Demo Step 1: Register User A (Client).** Show the registration form. Mention validation and the "suggested username" feature if a conflict occurs.
- **Demo Step 2: Login User A.** Show the transition to the dashboard.
- **Demo Step 3: Post a Job.** Navigate to the "Post Job" form. Fill out Title, Description, Budget, and Category.
- **Verification:** Show the job appearing in the "My Postings" section.

### Phase B: User B Registration & Proposal
**Member 2:**
- **Demo Step 4: Register User B (Freelancer).** Show a different account setup.
- **Demo Step 5: Search Jobs.** Use the Search filters (Category/Budget) to find User A's job.
- **Demo Step 6: Submit Proposal.** "I'll submit a proposal with a price and cover letter." Mention that User B cannot bid on their own jobs.

### Phase C: Acceptance & Project Progress
**Member 1:**
- **Demo Step 7: Accept Proposal.** Log back in as User A. Go to the job details. See the proposal from User B and click "Accept".
- **Demo Step 8: Status Check.** Show that the job status has changed from `open` to `in_progress`.

### Phase D: Completion & Reviews
**Member 2:**
- **Demo Step 9: Complete Job.** "As the freelancer, I've finished the work. I'll mark the job as completed."
- **Demo Step 10: Reviews.** "Now both users can review each other."
  - User A reviews User B.
  - User B reviews User A.
- **Demo Step 11: Rating Updates.** Navigate to both profiles to show the updated "Average Rating" and "Completed Jobs" count.

---

## Part 4: Explicit Error Handling Demo (11:00 - 13:30)
**Member 2:**
- **Error 1: Registration Conflict (409).** Attempt to register with an existing email/username. Show the error message and the suggested username.
- **Error 2: Unauthorized Access (401).** Try to access `/jobs/my-postings` without being logged in (or manually clearing the token). Show the redirect to Login and the alert.
- **Error 3: Forbidden Action (403).** Attempt to accept a proposal on a job you don't own (demonstrated via logic or UI restriction).
- **Bonus:** Show field validation errors (e.g., negative budget or empty fields).

---

## Part 5: Conclusion & Reflection (13:30 - 15:00)
**Member 1:**
- Summarize the experience: "Building this Angular app allowed us to master state management, interceptors, and complex business logic flows."
- Thank the viewer/instructor.

**Member 2:**
- Final sign-off. "Check out our README for the demo checklist and technical documentation. Thank you!"

---

## Demo Checklist (For Screen Recording)
*To be checked off during the video:*
- [ ] User A register
- [ ] User A login
- [ ] Post job
- [ ] User B register
- [ ] User B submit proposal
- [ ] User A accept proposal
- [ ] Job in_progress
- [ ] Complete job
- [ ] Both leave reviews
- [ ] Rating updates

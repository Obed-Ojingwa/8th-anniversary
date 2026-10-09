import { useMemo, useState } from "react";
import GridCanvas from "./components/GridCanvas";
import CourseCard from "./components/CourseCard";
import { CATEGORIES, COURSES, SITE } from "./data/courses";
import type { Category } from "./types";

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COURSES.filter(
      (course) =>
        (category === "All" || course.category === category) &&
        (!q || course.title.toLowerCase().includes(q))
    );
  }, [query, category]);

  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <span className="orb orb-a" />
        <span className="orb orb-b" />
      </div>
      <GridCanvas />

      <header className="topbar">
        <a className="brand" href="#top">
          <span className="brand-mark">$8</span>
          <span className="brand-name">{SITE.name}</span>
        </a>
        <a className="topbar-link" href="#courses">
          Browse courses
        </a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <h1>
              <span className="line l1">Judge the course</span>
              <span className="line l2">by its cover.</span>
              <span className="line l3">Pay {SITE.price}.</span>
            </h1>
            <p className="hero-sub">
              {COURSES.length} masterclass replays on business analysis, product,
              data and AI consulting. Every course is {SITE.price}. See the
              thumbnail, pick what you like, and check out in seconds.
            </p>
            <a className="cta" href="#courses">
              See all {COURSES.length} courses
            </a>
          </div>
          <div className="hero-8" aria-hidden="true">
            <span>$8</span>
          </div>
        </section>

        <section id="courses" className="shelf">
          <div className="controls">
            <label className="search">
              <span className="sr-only">Search courses</span>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                placeholder="Search by title"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>

            <div className="chips" role="group" aria-label="Filter by topic">
              {(["All", ...CATEGORIES] as const).map((name) => (
                <button
                  key={name}
                  type="button"
                  className={`chip ${category === name ? "on" : ""}`}
                  aria-pressed={category === name}
                  onClick={() => setCategory(name)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <p className="count" aria-live="polite">
            Showing {visible.length} of {COURSES.length} courses
          </p>

          {visible.length > 0 ? (
            <div className="grid">
              {visible.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <p>No course matches that search.</p>
              <button
                type="button"
                className="chip on"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
              >
                Clear search and filters
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>Secure checkout by Paystack. Each course is a one-time {SITE.price} payment.</p>
      </footer>
    </>
  );
}

import { useState } from "react";
import type { Course } from "../types";
import { SITE } from "../data/courses";

const EXTENSIONS = ["jpg", "png", "webp", "jpeg"];

export default function CourseCard({ course }: { course: Course }) {
  const [extIndex, setExtIndex] = useState(0);
  const imageFiles = course.thumbnail
    ? [course.thumbnail]
    : EXTENSIONS.map((extension) => `${course.id}.${extension}`);
  const missing = extIndex >= imageFiles.length;
  const src = `${import.meta.env.BASE_URL}thumbnails/${imageFiles[extIndex]}`;

  return (
    <article className="card">
      <a
        className="card-media"
        href={course.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${course.title}`}
        tabIndex={-1}
      >
        {missing ? (
          <div className="placeholder">
            <span className="placeholder-num">{course.id}</span>
            <span className="placeholder-hint">
              thumbnails/{course.thumbnail ?? `${course.id}.jpg`}
            </span>
          </div>
        ) : (
          <img
            src={src}
            alt={`${course.title} thumbnail`}
            loading="lazy"
            onError={() => setExtIndex((i) => i + 1)}
          />
        )}
        <span className="price-tag">{SITE.price}</span>
      </a>

      <div className="card-body">
        <p className="card-cat">{course.category}</p>
        <h3 className="card-title">{course.title}</h3>
        <p className="card-meta">Anniversary replay</p>
        <a
          className="buy"
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy for {SITE.price}
        </a>
      </div>
    </article>
  );
}

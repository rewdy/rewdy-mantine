import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ArrowLink, Band, Eyebrow, Prose, RewdyProvider, Swipe } from "../src/index";

/**
 * Mantine 9 throws without a provider rather than falling back to a default
 * theme, so everything goes through the real one. That also exercises the
 * theme and resolver wiring end to end.
 */
const render = (node: ReactNode) => renderToStaticMarkup(<RewdyProvider>{node}</RewdyProvider>);

/**
 * The provider emits its own `<style>` block of `[data-mantine-color-scheme=…]`
 * rules, so assertions about the attribute have to look at the element itself
 * rather than the whole document.
 */
const openTag = (html: string, tag: string) => html.match(new RegExp(`<${tag}[^>]*>`))?.[0] ?? "";

describe("Band", () => {
  it("renders a section and constrains its content by default", () => {
    const html = render(<Band>Content</Band>);

    expect(html).toContain("<section");
    expect(html).toContain("mantine-Container-root");
  });

  it("skips the container when size is false, for bands that lay out their own content", () => {
    const html = render(<Band size={false}>Content</Band>);

    expect(html).not.toContain("mantine-Container-root");
    expect(html).toContain("Content");
  });

  it("declares only the deep variant a dark-scheme island", () => {
    // Mantine keys its dark component rules off this attribute. Without it a card
    // in a deep band paints itself white and inherits near-white text.
    for (const variant of ["base", "tint", "muted"] as const) {
      const tag = openTag(render(<Band variant={variant}>Content</Band>), "section");
      expect(tag, variant).not.toContain("data-mantine-color-scheme");
    }

    const deep = openTag(render(<Band variant="deep">Content</Band>), "section");
    expect(deep).toContain('data-mantine-color-scheme="dark"');
  });
});

describe("Prose", () => {
  it("renders its children", () => {
    expect(render(<Prose>Editorial copy</Prose>)).toContain("Editorial copy");
  });
});

describe("ArrowLink", () => {
  it("renders a link whose trailing arrow is hidden from assistive tech", () => {
    const html = render(<ArrowLink href="/play">Read on</ArrowLink>);

    expect(html).toContain('href="/play"');
    expect(html).toContain("Read on");
    expect(html).toContain("→");
    expect(html).toContain('aria-hidden="true"');
  });
});

describe("Swipe", () => {
  it("wraps the highlighted phrase in a span", () => {
    expect(render(<Swipe>highlighted</Swipe>)).toMatch(/<span[^>]*>highlighted<\/span>/);
  });
});

describe("Eyebrow", () => {
  it("renders its children", () => {
    expect(render(<Eyebrow>Kicker</Eyebrow>)).toContain("Kicker");
  });
});

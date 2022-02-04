import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import MovieDetail from "./movieDetail";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders", () => {
  act(() => {
    render(<MovieDetail />, container);
  });
  expect(container.textContent).toBe(
    "HomeWatchPlay VideoPlayback Rate1.00xPlayreplay 5 secondsforward 5 secondsCurrent Time 0:00/Duration Time 0:00Progress: NaN%Non-FullscreenTom Cruise OblivionPlay MovieADD TO WATCHLISTSHARELanguage: Hindi Genere: Comedy, Action, BollywoodYear: 2015Artist: Naga PestoWhile running from a drug deal gone bad, Mike Ross, a brilliant young college-dropout, slips into a job interview with one of New York City's best legal closers, Harvey Specter. Tired of cookie-cutter law school grads, Harvey takes a gamble by hiring Mike on the spot after he recognizes his raw talent and photographic memory."
  );
});

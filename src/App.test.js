import { render, screen } from "@testing-library/react";
import App from "./App";
import { user } from "./users";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        id: 1,
        email: "george.bluth@reqres.in",
        first_name: "George",
        last_name: "Bluth",
        avatar: "https://reqres.in/img/faces/1-image.jpg",
      }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

it("user is on the list", async () => {
  const usereOne = await user();
  expect(usereOne.last_name).toEqual("George");
  expect(fetch).toHaveBeenCalledTimes(1);
});

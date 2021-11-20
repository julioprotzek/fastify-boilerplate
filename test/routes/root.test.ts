import { build } from "../helper"

describe("Root route", () => {
  const app = build()

  it("works", async () => {
    const res = await app.inject({ url: "/" })
    expect(res.json()).toEqual({ root: true })
  })
})

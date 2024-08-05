// import {describe, expect, it} from 'vitest';

import App from "./App"
import { render, screen, userEvent } from "./utils/test-utils"

describe("App : " , () => {
    it("Checking if vite and react text is available", () => {
        render(<App/>)
        const text = screen.getByText("Vite + React")
        expect(text).toBeInTheDocument()
    })
    // Click test
    it("Should increment count on click", async () => {
        render(<App/>)
        userEvent.click(screen.getByRole("button"))
        expect(await screen.findByText(/count is 1/)).toBeInTheDocument();
    });
})
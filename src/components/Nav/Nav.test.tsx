import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from "../App/App";

it("renders the menu", async () => {
    render(<App />)
    expect(screen.getByText(/Strona Główna/i))
    expect(screen.getByText(/Przystanki/i))
    expect(screen.getByText(/Połączenia/i))
    expect(screen.getByText(/Znajdź trasę/i))
})
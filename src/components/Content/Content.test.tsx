import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from "../App/App";

const renderData = [
    {name: /Przystanki/i, testID: 'train-station-wrapper'},
    {name: /Strona Główna/i, testID: 'main-page'},
    {name: /Połączenia/i, testID: 'train-choosing-wrapper'},
    {name: /Znajdź trasę/i, testID: 'connection-choosing-wrapper'}
]

it("renders valid component on menu link click", async () => {
    render(<App />)
    renderData.forEach( (testDetails:{name: RegExp, testID: string}) => {
        const link = screen.getByRole('link', {name: testDetails.name});
        fireEvent.click(link);
        expect(screen.getByTestId(testDetails.testID))
    })

})
import React from "react";
import './MainPage.css'

const MainPage = () => {
    return(
        <main data-testid="main-page" className="main-page">
            <section>
                <h1 className="main-page-title">Witaj na stronie <i className="icon-train"></i>Sieniczniańskich lini Kolejowych!</h1>
                <p>
                    Serwis ten umożliwia sprawdzenie wszystkich dostępnych tras oraz stacji kolejowych,
                    jak również wyszukiwania tras pomiędzy przystankami
                </p>
            </section>
        </main>
    )
}

export default MainPage
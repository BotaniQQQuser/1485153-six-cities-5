import { CitiesList } from '../../components/CitiesList/CitiesList';
import { Map } from '../../components/Map/Map';
import { OffersList } from '../../components/OffersList/OffersList';
import { SortOffersOptions } from '../../components/SortOffersOptions/SortOffersOptions';
import { useAppSelector } from '../../hooks/redux';
import { CITIES } from '../../mocks/cities';
import type { Offer } from '../../types/offer';
import { filterOffers, sortOffers } from '../../utils/offers';

interface MainProps {
  offers: Offer[];
}

export const Main = ({ offers }: MainProps) => {
  const selectedCity = useAppSelector((state) => state.selectedCity);
  const sortType = useAppSelector((state) => state.offersSortType);
  const highlightedOffer = useAppSelector((state) => state.highlightedOffer);

  const filteredOffers = filterOffers(offers, selectedCity).sort((a, b) => sortOffers(a, b, sortType));

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              cities={CITIES}
              selectedCity={selectedCity}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filteredOffers.length} places to stay in {selectedCity?.name}</b>
              <SortOffersOptions />
              <OffersList
                offers={filteredOffers}
                nearby={false}
              // activeOffer={null}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {selectedCity && (
                  <Map
                    city={selectedCity}
                    offers={filteredOffers}
                    highlightedOffer={highlightedOffer}
                  />
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

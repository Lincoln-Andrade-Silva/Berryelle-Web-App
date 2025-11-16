import {observer} from "mobx-react-lite";
import React from "react";
import {findTranslation} from '../../app/common/language/translations';
import {useStore} from '../../app/store/store.tsx';
import {Container, Segment} from "semantic-ui-react";
import ProductCardsComponent from "./ProductCardsComponent.tsx";

const HomePage: React.FC = () => {
    const {commonStore: {language}, productsStore: {entityList, list}} = useStore();

    return (
        <Segment className="home-page" id="home">
            {/* Hero Section com imagem */}
            <div className="hero-section">
                <div className="hero-image-container">
                    <img
                        src={"../../../image/home-cover.jpg"}
                        alt="Cover Image"
                        className="hero-image"
                    />
                    <div className="hero-overlay">
                        <span className="hero-title">
                            {findTranslation('heroTitle', language)}
                        </span>
                        <span className="hero-subtitle">
                            {findTranslation('heroSubtitle', language)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Seção de Produtos */}
            <Container className="products-section">
                <span className="products-title">
                    {findTranslation('productsTitle', language)}
                </span>

                <ProductCardsComponent
                    language={language}
                    entityList={entityList}
                    list={list}
                />
            </Container>
        </Segment>
    );
};


export default observer(HomePage);
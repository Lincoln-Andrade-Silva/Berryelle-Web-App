import {observer} from "mobx-react-lite";
import React from "react";
import {Button, Card, Container, Header, Icon, Image, Input, Segment} from "semantic-ui-react";
import {findTranslation} from "../../app/common/language/translations";
import {useStore} from "../../app/store/store";
import {useNavigate} from "react-router-dom";

const CartPage: React.FC = () => {
    const {commonStore: {language}, productsStore} = useStore();
    const navigate = useNavigate();

    const handleQuantityChange = (productId: string, quantity: number) => {
        productsStore.updateCartItemQuantity(productId, quantity);
    };

    const handleRemoveItem = (productId: string) => {
        productsStore.removeFromCart(productId);
    };

    const handleClearCart = () => {
        productsStore.clearCart();
    };

    const handleContinueShopping = () => {
        navigate('/');
    };

    const handleCheckout = async () => {
        await productsStore.processCheckout(language);
    };

    return (
        <Container style={{marginTop: '2rem', marginBottom: '2rem', padding: '2rem'}}>
            <Header as="h1" textAlign="center" style={{marginBottom: '3rem'}}>
                {findTranslation('title', language)}
            </Header>

            {productsStore.cartItems.length === 0 ? (
                <Segment placeholder textAlign="center" style={{padding: '4rem'}}>
                    <Header icon>
                        <Icon name="shopping cart"/>
                        {findTranslation('emptyCart', language)}
                    </Header>
                    <Button primary onClick={handleContinueShopping}>
                        {findTranslation('continueShopping', language)}
                    </Button>
                </Segment>
            ) : (
                <>
                    {/* Lista de itens do carrinho */}
                    <Card.Group>
                        {productsStore.cartItems.map((item) => (
                            <Card key={item.product.id} fluid>
                                <Card.Content>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                                        <Image
                                            size="small"
                                            src={`data:image/jpeg;base64,${item.product.image}`}
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                objectFit: 'cover',
                                                borderRadius: '8px'
                                            }}
                                        />

                                        <div style={{flex: 1}}>
                                            <Header as="h3">{item.product.name}</Header>
                                            <p style={{color: '#666', margin: '0.5rem 0'}}>
                                                {item.product.description.substring(0, 100)}...
                                            </p>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginTop: '1rem'
                                            }}>
                                                <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                                                    <label>{findTranslation('quantity', language)}:</label>
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        max={item.product.quantity}
                                                        value={item.quantity}
                                                        onChange={(e) => handleQuantityChange(
                                                            item.product.id,
                                                            parseInt(e.target.value) || 1
                                                        )}
                                                        style={{width: '80px'}}
                                                    />
                                                </div>

                                                <div style={{textAlign: 'right'}}>
                                                    <div style={{fontSize: '18px', fontWeight: 'bold'}}>
                                                        R$ {(item.product.price * item.quantity).toFixed(2)}
                                                    </div>
                                                    <div style={{fontSize: '14px', color: '#888'}}>
                                                        R$ {item.product.price.toFixed(2)} cada
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            icon="trash"
                                            color="red"
                                            circular
                                            onClick={() => handleRemoveItem(item.product.id)}
                                            title={findTranslation('remove', language)}
                                        />
                                    </div>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>

                    {/* Resumo do carrinho */}
                    <Segment style={{marginTop: '2rem'}}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem',
                            padding: '1rem 2rem'
                        }}>
                            <div>
                                <strong>{productsStore.cartItemsCount} {findTranslation('itemsCount', language)}</strong>
                            </div>
                            <Button basic color="red" onClick={handleClearCart}>
                                <Icon name="trash"/>
                                {findTranslation('clearCart', language)}
                            </Button>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            paddingTop: '1rem',
                            borderTop: '2px solid #eee',
                            padding: '1rem 2rem'
                        }}>
                            <span>{findTranslation('total', language)}:</span>
                            <span>R$ {productsStore.cartTotal.toFixed(2)}</span>
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            marginTop: '2rem',
                            padding: '1rem 2rem',
                            justifyContent: 'space-between'
                        }}>
                            <Button size="large" onClick={handleContinueShopping}>
                                {findTranslation('continueShopping', language)}
                            </Button>
                            <Button
                                size="large"
                                primary
                                loading={productsStore.saving}
                                disabled={productsStore.saving}
                                onClick={handleCheckout}
                            >
                                {findTranslation('checkout', language)}
                            </Button>
                        </div>
                    </Segment>
                </>
            )}
        </Container>
    );
};

export default observer(CartPage);
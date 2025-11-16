import {observer} from "mobx-react-lite";
import React, {useState} from "react";
import {Button, Card, Pagination, Label} from "semantic-ui-react";
import {ProductResponse} from "../../app/model/Product";
import {DataListResponse} from "../../app/model/DataListResponse";
import {findTranslation} from "../../app/common/language/translations";
import {useStore} from "../../app/store/store";
import {toast} from "react-toastify";

interface ProductCardsComponentProps {
    language: 'ptbr' | 'en';
    entityList: DataListResponse<ProductResponse>;
    list: (page: number, size?: number, search?: string) => Promise<void>;
}

const ProductCardsComponent: React.FC<ProductCardsComponentProps> = ({language, entityList, list}) => {
    const [activePage, setActivePage] = useState(0);
    const {productsStore} = useStore();

    const handlePaginationChange = (_e: React.MouseEvent, {activePage}: any) => {
        setActivePage(activePage);
        list(activePage - 1, 4);
    };

    const handleAddToCart = (product: ProductResponse) => {
        productsStore.addToCart(product, 1);
        toast.success(findTranslation('addedToCart', language));
    };

    const isOutOfStock = (quantity: number) => quantity === 0;

    const pages = entityList?.totalPages || 1;

    return (
        <>
            {entityList && entityList.data && entityList.totalElements > 0 ? (
                <>
                    <Card.Group itemsPerRow={4} stackable style={{marginTop: '5vh', marginLeft: '1vw'}}>
                        {entityList.data.map((product) => (
                            <Card key={product.id} style={{width: '30vh', marginLeft: '2rem', position: 'relative'}}>
                                {/* Overlay para produtos fora de estoque */}
                                {isOutOfStock(product.quantity) && (
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        zIndex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '4px'
                                    }}>
                                        <Label color="red" size="large" style={{transform: 'rotate(-15deg)'}}>
                                            {findTranslation('outOfStock', language) || 'ESGOTADO'}
                                        </Label>
                                    </div>
                                )}
                                
                                <img
                                    alt={"image"}
                                    src={`data:image/jpeg;base64,${product.image}`}
                                    style={{
                                        height: '30vh', 
                                        width: '30vh', 
                                        objectFit: 'cover',
                                        filter: isOutOfStock(product.quantity) ? 'grayscale(100%) opacity(0.6)' : 'none'
                                    }}
                                />
                                <Card.Content style={{opacity: isOutOfStock(product.quantity) ? 0.7 : 1}}>
                                    <Card.Header>{product.name}</Card.Header>
                                    <Card.Meta>
                                        <span className="price">R$ {product.price.toFixed(2)}</span>
                                    </Card.Meta>
                                    <Card.Description style={{height: '15vh', overflow: 'auto'}}>
                                        {product.description}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <div className="ui two buttons">
                                        <Button
                                            basic
                                            color={isOutOfStock(product.quantity) ? "grey" : "green"}
                                            onClick={() => handleAddToCart(product)}
                                            disabled={isOutOfStock(product.quantity)}
                                            style={{
                                                cursor: isOutOfStock(product.quantity) ? 'not-allowed' : 'pointer'
                                            }}
                                        >
                                            {isOutOfStock(product.quantity) 
                                                ? (findTranslation('outOfStock', language))
                                                : findTranslation('addToCart', language)
                                            }
                                        </Button>
                                    </div>
                                    <div style={{marginTop: '10px', textAlign: 'center'}}>
                                        <small style={{
                                            color: isOutOfStock(product.quantity) ? 'red' : 'inherit',
                                            fontWeight: isOutOfStock(product.quantity) ? 'bold' : 'normal'
                                        }}>
                                            {isOutOfStock(product.quantity) 
                                                ? (findTranslation('unavailable', language))
                                                : `${findTranslation('quantity', language)}: ${product.quantity}`
                                            }
                                        </small>
                                    </div>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>

                    {/* Paginação */}
                    <div style={{textAlign: 'center', paddingTop: '5vh', paddingBottom: '5vh'}}>
                        <Pagination
                            pointing
                            secondary
                            size='mini'
                            lastItem={null}
                            firstItem={null}
                            totalPages={pages}
                            defaultActivePage={1}
                            activePage={activePage}
                            onPageChange={handlePaginationChange}
                        />
                    </div>
                </>
            ) : (
                <div style={{textAlign: 'center', padding: '50px'}}>
                    <span>{findTranslation('noProductsAvailable', language)}</span>
                </div>
            )}
        </>
    );
};

export default observer(ProductCardsComponent);
import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import {Segment} from "semantic-ui-react";
import {findTranslation} from "../../../app/common/language/translations.ts";
import {useStore} from "../../../app/store/store.tsx";
import {ProductResponse} from "../../../app/model/Product.ts";
import GenericTableComponent from "../../../app/layout/component/table/GenericTableComponent.tsx";
import {ConfirmationModal} from "../../../app/layout/modal/ConfirmationModal.tsx";


const ManageProductPage: React.FC = () => {
    const {commonStore: {language}, productsStore} = useStore();

    const columns = [
        findTranslation('id', language),
        findTranslation('name', language),
        findTranslation('description', language),
        findTranslation('quantity', language),
        findTranslation('price', language),
    ];


    const renderCell = (entity: ProductResponse, column: string) => {
        switch (column) {
            case columns[0]:
                return entity.id;
            case columns[1]:
                return entity.name;
            case columns[2]:
                return entity.description;
            case columns[3]:
                return entity.quantity;
            case columns[4]:
                return 'R$' + entity.price;
            default:
                return null;
        }
    };

    useEffect(() => {
        productsStore.list(0, 4).then();
    }, []);

    return (
        <Segment className="create-film-segment" id='manage' style={{margin: 'auto', marginTop: '11vh'}}>
            <GenericTableComponent<ProductResponse>
                store={productsStore}
                renderCell={renderCell}
                entityColumns={columns}
                handleEditClick={productsStore.handleEditClick}
                entityName={findTranslation('Product', language)}
                confirmationModalComponent={
                    <ConfirmationModal
                        open={false}
                        onResult={() => {
                        }}
                        closeModal={() => {
                        }}
                        title={findTranslation('ConfirmAction', language)}
                        message={findTranslation('sureQuestion', language)}
                    />
                }
            />
        </Segment>
    );
};

export default observer(ManageProductPage);
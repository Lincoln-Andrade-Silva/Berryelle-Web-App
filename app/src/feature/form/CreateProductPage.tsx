import {Formik} from 'formik';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Button, Form, Grid, GridColumn, Input, Segment, TextArea} from 'semantic-ui-react';
import {useStore} from "../../app/store/store.tsx";
import {ProductRequest} from "../../app/model/Product.ts";
import {findTranslation} from "../../app/common/language/translations.ts";
import UploadComponent from "../../app/common/form/components/UploadComponent.tsx";

const CreateProductPage: React.FC = () => {
    const {
        commonStore: {language},
        productsStore: {
            onSubmit,
            formValues,
            validationSchema,
            selectedProduct,
            saving,
            setActiveItem,
            setSelectedProduct,
            resetForm
        },
    } = useStore();

    const handleSubmit = async (request: ProductRequest, {resetForm: formikReset}: any) => {
        await onSubmit(request, language);
        formikReset();
        resetForm();
        setSelectedProduct(null);
        setActiveItem('manageProducts');

    };

    const handleCancel = () => {
        resetForm();
        setSelectedProduct(null);
        setActiveItem('manageProducts');
    };

    return (
        <Segment className="create-product-segment" style={{margin: '0 auto', marginTop: '2vh', padding: '30px'}}>
            <h1 className="create-product-title" style={{textAlign: 'center', marginBottom: '30px'}}>
                {selectedProduct
                    ? findTranslation('editProduct', language) || 'Editar Produto'
                    : findTranslation('createProduct', language) || 'Criar Produto'
                }
            </h1>

            <Formik<ProductRequest>
                validateOnMount
                enableReinitialize
                initialValues={formValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({values, errors, touched, handleChange, handleSubmit, setFieldValue, isValid}) => (
                    <Form className="ui form error" autoComplete="off" onSubmit={handleSubmit}>
                        <Grid stackable>
                            {/* Primeira linha - Nome e Preço */}
                            <Grid.Row>
                                <GridColumn width={8}>
                                    <Form.Field required error={touched.name && !!errors.name}>
                                        <label>{findTranslation('name', language) || 'Nome'}</label>
                                        <Input
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            disabled={saving}
                                            placeholder={findTranslation('productName', language) || 'Nome do produto'}
                                        />
                                        {touched.name && errors.name && (
                                            <div className="ui pointing red basic label">{errors.name}</div>
                                        )}
                                    </Form.Field>
                                </GridColumn>

                                <GridColumn width={8}>
                                    <Form.Field required error={touched.price && !!errors.price}>
                                        <label>{findTranslation('price', language) || 'Preço'}</label>
                                        <Input
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={values.price}
                                            onChange={handleChange}
                                            disabled={saving}
                                            placeholder="0.00"
                                            label={{basic: true, content: 'R$'}}
                                            labelPosition='left'
                                        />
                                        {touched.price && errors.price && (
                                            <div className="ui pointing red basic label">{errors.price}</div>
                                        )}
                                    </Form.Field>
                                </GridColumn>
                            </Grid.Row>

                            {/* Segunda linha - Quantidade e Upload de Imagem */}
                            <Grid.Row>
                                <GridColumn width={8}>
                                    <Form.Field required error={touched.quantity && !!errors.quantity}>
                                        <label>{findTranslation('quantity', language) || 'Quantidade'}</label>
                                        <Input
                                            name="quantity"
                                            type="number"
                                            min="0"
                                            value={values.quantity}
                                            onChange={handleChange}
                                            disabled={saving}
                                            placeholder="0"
                                        />
                                        {touched.quantity && errors.quantity && (
                                            <div className="ui pointing red basic label">{errors.quantity}</div>
                                        )}
                                    </Form.Field>
                                </GridColumn>

                                <GridColumn width={8}>
                                    <Form.Field required error={touched.image && !!errors.image}>
                                        <UploadComponent
                                            fieldName="image"
                                            saving={saving}
                                            language={language}
                                            accept=".jpg,.jpeg,.png"
                                            value={values.image}
                                            setFieldValue={setFieldValue}
                                            label={findTranslation('productImage', language) || 'Imagem do Produto'}
                                            validTypes={['image/jpeg', 'image/png', 'image/jpg']}
                                            errorMessage="Por favor, envie um arquivo de imagem válido (.jpg, .jpeg, .png)."
                                        />
                                        {touched.image && errors.image && (
                                            <div className="ui pointing red basic label">{errors.image}</div>
                                        )}
                                    </Form.Field>
                                </GridColumn>
                            </Grid.Row>

                            {/* Terceira linha - Descrição */}
                            <Grid.Row>
                                <GridColumn width={16}>
                                    <Form.Field required error={touched.description && !!errors.description}>
                                        <label>{findTranslation('description', language) || 'Descrição'}</label>
                                        <TextArea
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            disabled={saving}
                                            rows={4}
                                            placeholder={findTranslation('productDescription', language) || 'Descrição do produto'}
                                        />
                                        {touched.description && errors.description && (
                                            <div className="ui pointing red basic label">{errors.description}</div>
                                        )}
                                    </Form.Field>
                                </GridColumn>
                            </Grid.Row>

                            {/* Quarta linha - Botões de Ação */}
                            <Grid.Row>
                                <GridColumn width={16} style={{textAlign: 'center'}}>
                                    <Button
                                        type="button"
                                        onClick={handleCancel}
                                        disabled={saving}
                                        size="large"
                                        style={{marginRight: '10px'}}
                                    >
                                        {findTranslation('cancel', language) || 'Cancelar'}
                                    </Button>

                                    <Button
                                        type="submit"
                                        primary
                                        loading={saving}
                                        disabled={!isValid || saving}
                                        size="large"
                                    >
                                        {selectedProduct
                                            ? (findTranslation('update', language) || 'Atualizar')
                                            : (findTranslation('create', language) || 'Criar')
                                        }
                                    </Button>
                                </GridColumn>
                            </Grid.Row>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Segment>
    );
};

export default observer(CreateProductPage);
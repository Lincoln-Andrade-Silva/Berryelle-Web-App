import {makeAutoObservable, runInAction} from "mobx";
import {DataListResponse} from "../../model/DataListResponse";
import {ProductRequest, ProductResponse} from "../../model/Product";
import service from "../../service/service";
import {IBaseStore} from "../IBaseStore";
import * as Yup from 'yup';
import {toast} from "react-toastify";
import {findTranslation} from "../../common/language/translations.ts";

export interface CartItem {
    product: ProductResponse;
    quantity: number;
}

export default class ProductStore implements IBaseStore<ProductResponse> {
    saving = false;
    activeItem: string = '';
    cartItems: CartItem[] = [];
    searchTerm: string | null = '';
    selectedProduct: ProductResponse | null = null;
    entity: ProductResponse | undefined | null = null;
    entityList: DataListResponse<ProductResponse> = {data: [], totalElements: 0, totalPages: 0,};

    // Valores iniciais do formulário
    initialFormValues: ProductRequest = {
        id: null,
        name: '',
        price: 0,
        image: null,
        quantity: 0,
        description: '',
    };

    // Valores atuais do formulário
    formValues: ProductRequest = {
        id: null,
        name: '',
        price: 0,
        image: null,
        quantity: 0,
        description: '',
    };


    constructor() {
        makeAutoObservable(this);
    }

    list = async (page?: any, pageSize?: any, search?: string) => {
        const response = await service.product.list(page, pageSize, search);
        runInAction(() => {
            this.entityList = response;
        });
    }

    create = async (formData: FormData) => {
        const response = await service.product.create(formData);
        runInAction(() => {
            this.entity = response.data;
            this.list(0, 4);
        });
        return response;
    }

    edit = async (id: any, formData: FormData) => {
        const response = await service.product.edit(id, formData);
        runInAction(() => {
            this.entity = response.data;
            this.list(0, 4);
        });
        return response;
    }

    deleteEntity = async (id: any) => {
        await service.product.remove(id);
        runInAction(() => {
            this.list(0, 4);
        });
    }

    addToCart = (product: ProductResponse, quantity: number = 1) => {
        runInAction(() => {
            const existingItem = this.cartItems.find(item => item.product.id === product.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.cartItems.push({product, quantity});
            }
        });
    }

    removeFromCart = (productId: string) => {
        runInAction(() => {
            this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
        });
    }

    updateCartItemQuantity = (productId: string, quantity: number) => {
        runInAction(() => {
            const item = this.cartItems.find(item => item.product.id === productId);
            if (item) {
                if (quantity <= 0) {
                    this.removeFromCart(productId);
                } else if (quantity > item.product.quantity) {
                    toast.error(`Quantidade máxima disponível: ${item.product.quantity}`);
                    return;
                } else {
                    item.quantity = quantity;
                }
            }
        });
    }

    clearCart = () => {
        runInAction(() => {
            this.cartItems = [];
        });
    }

    processCheckout = async (language: any) => {
        this.saving = true;

        try {
            const checkoutItems = this.cartItems.map(item => ({
                productId: item.product.id,
                quantity: item.quantity
            }));

            await service.product.checkout(checkoutItems);

            this.clearCart();
            await this.list(0, 4);
            toast.success(findTranslation("purchaseSuccess", language) || "Compra efetuada com sucesso!");
        } finally {
            this.saving = false;
        }
    }


    get cartTotal() {
        return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    }

    get cartItemsCount() {
        return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    }

    setSearchTerm = (searchTerm: string | null) => {
        this.searchTerm = searchTerm;
    }

    setActiveItem = (item: string) => {
        runInAction(() => {
            this.activeItem = item;
        });
    }

    handleEditClick = (entity: any) => {
        this.setSelectedProduct(entity);

        const imageBlob = entity.image ? this.base64ToFile(entity.image, 'image.jpg', 'image') : null;

        this.setFormValues({
            id: entity.id,
            name: entity.name,
            price: entity.price,
            image: imageBlob,
            quantity: entity.quantity,
            description: entity.description,
        });
        this.setActiveItem("createProducts");
    };

    base64ToFile = (base64Data: string, filename: string, fileType: string): File | null => {
        let mimeString = '';
        if (fileType === 'image') {
            mimeString = 'image/png';
        }

        if (!base64Data.startsWith('data:')) {
            base64Data = `data:${mimeString};base64,` + base64Data;
        }

        const mimeMatch = base64Data.match(/^data:([A-Za-z-+/]+);base64,/);
        if (!mimeMatch) {
            console.error("Base64 string is missing the mime type.");
            return null;
        }

        const base64Content = base64Data.split(',')[1];
        const blob = this.base64ToBlob(base64Content, mimeString);

        return new File([blob], filename, {type: mimeString});
    }

    base64ToBlob = (base64Data: string, mimeType: string): Blob => {
        const byteString = atob(base64Data);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
            uintArray[i] = byteString.charCodeAt(i);
        }

        return new Blob([uintArray], {type: mimeType});
    }

    get validationSchema() {
        return Yup.object({
            name: Yup.string().required('Name is required'),
            price: Yup.number().required('Price is required').min(0, 'Price must be positive'),
            image: Yup.mixed().required('Image is required'),
            quantity: Yup.number().required('Quantity is required').min(0, 'Quantity must be non-negative'),
            description: Yup.string().required('Description is required'),
            categories: Yup.array().of(Yup.string()).min(1, 'At least one category is required'),
        });
    }

    setSelectedProduct = (product: ProductResponse | null) => {
        runInAction(() => {
            this.selectedProduct = product;
        });
    }

    setFormValues = (newValues: Partial<ProductRequest>) => {
        this.formValues = {...this.formValues, ...newValues};
    }

    resetForm = () => {
        runInAction(() => {
            this.formValues = this.initialFormValues;
            this.selectedProduct = null;
        });
    }

    onSubmit = async (request: ProductRequest, language: any) => {
        this.saving = true;
        const formData = this.createFormData(request);

        try {
            if (request.id && this.selectedProduct) {
                await this.edit(request.id, formData);
                toast.success(`${request.name} ${findTranslation("editSuccess", language)}`);
            } else {
                await this.create(formData);
                toast.success(`${request.name} ${findTranslation("createSuccess", language)}`);
            }
        } finally {
            await this.list(0, 4, undefined);
            this.resetForm();
            this.saving = false;
        }
    };


    private createFormData(request: ProductRequest): FormData {
        const formData = new FormData();

        formData.append('name', request.name);
        formData.append('description', request.description);
        formData.append('price', request.price ? request.price.toString() : '0');
        formData.append('quantity', request.quantity ? request.quantity.toString() : '0');

        if (request.id) {
            formData.append('id', request.id.toString());
        }

        if (request.image) {
            formData.append('image', request.image);
        }

        return formData;
    }

}
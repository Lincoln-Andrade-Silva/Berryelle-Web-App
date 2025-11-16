type Language = 'ptbr' | 'en';

interface TranslationSections {
    [key: string]: {
        [lang in Language]: {
            [key: string]: string;
        };
    };
}

const translations: TranslationSections = {
    module: {
        ptbr: {
            home: 'Inicio',
            login: 'Entrar',
            cart: 'Carrinho',
            register: 'Registrar',
            settings: "Configurações",
        },
        en: {
            home: 'Home',
            cart: 'Cart',
            login: 'Login',
            settings: 'Settings',
            register: 'Register',
        }
    },
    audit: {
        ptbr: {
            active: 'Ativo',
            status: 'Situação',
            inactive: 'Inativo',
            createdIn: 'Criado Em',
            createdBy: 'Criado Por',
            changedIn: 'Alterado Em',
            changedBy: 'Alterado Por'
        },
        en: {
            active: 'Active',
            status: 'Status',
            inactive: 'Inactive',
            createdBy: 'Created By',
            changedBy: 'Changed By',
            createdIn: 'Created In',
            changedIn: 'Changed In'
        }
    },
    home: {
        ptbr: {
            heroTitle: 'Cupcakes Artesanais',
            heroSubtitle: 'Descubra nossos sabores exclusivos feitos com amor e ingredientes selecionados',
            productsTitle: 'Nossos Produtos 🧁',
        },
        en: {
            heroTitle: 'Artisanal Cupcakes',
            heroSubtitle: 'Discover our exclusive flavors made with love and selected ingredients',
            productsTitle: 'Our Products 🧁',
        }
    },
    others: {
        ptbr: {
            name: 'Nome',
            price: 'Preço',
            email: "Email",
            user: 'Usuário',
            nameLabel: 'Nome',
            password: "Senha",
            cancel: 'Cancelar',
            product: 'Produto',
            emailLabel: 'Email',
            manage: 'Gerenciar',
            register: 'Registrar',
            passwordLable: 'Senha',
            quantity: 'Quantidade',
            description: 'Descrição',
            nicknameLabel: 'Usuário',
            newAccount: 'Nova Conta',
            nickname: 'Nome de Usuário',
            unavailable: 'Indisponível',
            outOfStock: 'Estoque esgotado',
            productName: 'Nome do Produto',
            confirmAction: 'Confirmar Ação',
            createProducts: 'Criar Produtos',
            productImage: 'Imagem do Produto',
            manageUsers: 'Gerenciar Usuários',
            haveAccount: 'Já tem uma conta? ',
            addToCart: 'Adicionar ao Carrinho',
            noData: 'Nenhum registro encontrado',
            manageProducts: 'Gerenciar Produtos',
            repeatPasswordLabel: 'Repita a Senha',
            forgotPassword: 'Esqueceu sua senha?',
            recordsFound: 'Registros encontrados: ',
            productDescription: 'Descrição do Produto',
            dontHaveAccount: 'Ainda não tem uma conta? ',
            noProductsAvailable: 'Nenhum produto disponível',
            sureQuestion: 'Tem certeza de que deseja prosseguir?',
        },
        en: {
            name: 'Name',
            price: 'Price',
            email: 'Email',
            user: 'Usuário',
            manage: 'Manage',
            cancel: 'Cancel',
            nameLabel: 'Name',
            product: 'Product',
            emailLabel: 'Email',
            register: 'Register',
            password: "Password",
            quantity: 'Quantity',
            nickname: 'Nickname',
            noData: 'No data found',
            addToCart: 'Add to Cart',
            nicknameLabel: 'Nickname',
            passwordLable: 'Password',
            newAccount: 'New Account',
            outOfStock: 'Out of Stock',
            unavailable: 'Unavailable',
            manageUsers: 'Manage Users',
            description: 'Description',
            productName: 'Product Name',
            productImage: 'Product Image',
            recordsFound: 'Records found: ',
            confirmAction: 'Confirm Action',
            manageProducts: 'Manage Products',
            createProducts: 'Create Products',
            forgotPassword: 'Forgot password?',
            repeatPasswordLabel: 'Repeat Password',
            haveAccount: "Alredy have an account? ",
            productDescription: 'Product Description',
            dontHaveAccount: "Don't have an account? ",
            noProductsAvailable: 'No products available',
            sureQuestion: 'Are you sure you want to proceed?',
        }
    },
    cart: {
        ptbr: {
            title: 'Meu Carrinho 🛒',
            emptyCart: 'Seu carrinho está vazio',
            continueShopping: 'Continuar Comprando',
            total: 'Total',
            checkout: 'Finalizar Pedido',
            remove: 'Remover',
            clearCart: 'Limpar Carrinho',
            itemsCount: 'itens',
            updateQuantity: 'Atualizar Quantidade',
            addedToCart: 'Produto adicionado ao carrinho!',
        },
        en: {
            title: 'My Cart 🛒',
            emptyCart: 'Your cart is empty',
            continueShopping: 'Continue Shopping',
            total: 'Total',
            checkout: 'Checkout',
            remove: 'Remove',
            clearCart: 'Clear Cart',
            itemsCount: 'items',
            updateQuantity: 'Update Quantity',
            addedToCart: 'Product added to cart!',
        }
    },
    toasters: {
        ptbr: {
            success: 'Sucesso',
            notAllowed: 'Não Permitido',
            applicationError: 'Erro na API',
            tokenHasExpired: 'Token expirado',
            editSuccess: ' editado com sucesso!',
            createSuccess: ' criado com sucesso!',
            noPermission: 'Usuário não tem a permissão ',
            failedLogin: 'Email ou senha estão inválidos',
            purchaseError: 'Erro ao processar compra',
            purchaseSuccess: 'Compra efetuada com sucesso!',
            entitynotfoundexception: 'Entidade não encontrada',
            unexpectedError: 'Um erro Inesperado ocorreu, entre em contato com um adiministrador',
        },
        en: {
            successs: 'Success',
            notAllowed: 'Not Allowed',
            applicationError: 'API Error',
            purchaseError: 'Purchase Error',
            purchaseSuccess: 'Purchase Success',
            tokenHasExpired: 'Token has expired',
            editSuccess: ' edited successfully!',
            createSuccess: ' created successfully!',
            failedLogin: 'Invalid email or password',
            entitynotfoundexception: 'Entity not found',
            noPermission: 'User does not have permission ',
            unexpectedError: 'Unexpected Error contact an administrator ',
        }
    },
    button: {
        ptbr: {
            back: 'Voltar',
            edit: 'Editar',
            next: 'Próximo',
            signout: 'Sair',
            create: 'Criar',
            close: "Fechar",
            language: 'Idioma',
            actions: 'Actions',
            update: 'Atualizar',
            confirm: 'Confirmar',
            uploadFile: 'Carregar Arquivo',
        },
        en: {
            next: 'Next',
            back: 'Back',
            edit: 'Edit',
            close: "Close",
            addList: "List",
            update: 'Update',
            create: 'Create',
            actions: 'Actions',
            confirm: 'Confirm',
            signout: 'Sign Out',
            language: 'Language',
            uploadFile: 'Upload File',
        }
    },
};

const findTranslation = (title: string, language: 'ptbr' | 'en' = 'en') => {
    if (title) {
        for (const section in translations) {
            const translationSection = translations[section];
            const translatedText = Object.keys(translationSection[language]).find(key => normalize(key) === normalize(title));

            if (translatedText)
                return translationSection[language][translatedText];
        }
    }
    return title;
};

const normalize = (str: string) => {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();
}

export {findTranslation, translations};


import {makeAutoObservable, runInAction} from "mobx";
import {DataListResponse} from "../../model/DataListResponse";
import {UserFormValues, UserResponse} from "../../model/UserResponse";
import {router} from "../../router/Route";
import service from "../../service/service";
import {IBaseStore} from "../IBaseStore";
import {store} from "../store";

export default class UserStore implements IBaseStore<UserResponse> {
    searchTerm: string | null = '';
    entity: UserResponse | undefined | null = null;
    entityList: DataListResponse<UserResponse> = {data: [], totalElements: 0, totalPages: 0,};

    constructor() {
        makeAutoObservable(this);
    }

    login = async (creds: UserFormValues) => {
        store.commonStore.setLoading(true);
        store.commonStore.setToken(null);

        try {
            const entity = await service.auth.login(creds);
            runInAction(() => this.entity = entity.data);
            store.commonStore.setToken(entity.data.token);
            router.navigate("/");
        } catch {
            store.commonStore.setLoading(false);
            router.navigate("/login");
        } finally {
            store.commonStore.setLoading(true);
            await store.commonStore.initApp();
            store.commonStore.setLoading(false);
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        this.entity = null;
        router.navigate('/');
    }

    register = async (creds: UserFormValues, overwriteToken: boolean) => {
        try {
            store.commonStore.setLoading(true);
            if (overwriteToken)
                store.commonStore.setToken(null);
            const entity = await service.auth.register(creds);

            runInAction(() => {
                this.entity = entity.data;
                this.list(0, 4);
            });

            if (overwriteToken)
                store.commonStore.setToken(entity.data.token);
            if (overwriteToken)
                router.navigate("/");
            store.commonStore.setLoading(false);
        } catch {
            store.commonStore.setLoading(false);
            router.navigate("/register");
        }
    }

    list = async (page?: any, pageSize?: any, search?: string) => {
        const response = await service.user.list(page, pageSize, search);
        runInAction(() => {
            this.entityList = response;
        });
    }

    deleteEntity = async (id: any) => {
        await service.user.remove(id);
        runInAction(() => {
            this.list(0, 4)
        });
    }

    get = async () => {
        if (this.entity === null) {
            try {
                const response = await service.user.get()
                runInAction(() => {
                    this.entity = response.data;
                });
            } catch {
                store.commonStore.setLoading(false);
                router.navigate("/login");
            }
        }
    };

    isLoggedIn = async () => {
        if (store.commonStore.token) {
            await this.get();
        }
    }

    setSearchTerm = (searchTerm: string | null) => {
        this.searchTerm = searchTerm;
    }
}
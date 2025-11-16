import { observer } from "mobx-react-lite";
import { Segment } from "semantic-ui-react";
import {UserResponse} from "../../../app/model/UserResponse.ts";
import {findTranslation} from "../../../app/common/language/translations.ts";
import { useStore } from "../../../app/store/store.tsx";
import GenericTableComponent from "../../../app/layout/component/table/GenericTableComponent.tsx";
import {ConfirmationModal} from "../../../app/layout/modal/ConfirmationModal.tsx";
import {useEffect} from "react";

const ManageUserPage: React.FC = () => {
    const { commonStore: { language }, userStore } = useStore();

    const columns = [
        findTranslation('Name', language),
        findTranslation('Nickname', language),
        findTranslation('Email', language),
        findTranslation('Admin', language),
    ];


    const renderCell = (entity: UserResponse, column: string) => {
        switch (column) {
            case columns[0]:
                return entity.name;
            case columns[1]:
                return entity.nickname;
            case columns[2]:
                return entity.email;
            case columns[3]:
                return entity.admin;
            default:
                return null;
        }
    };

    useEffect(() => {
        userStore.list(0, 4).then();
    }, []);

    return (
        <Segment className="create-film-segment" id='manage' style={{ margin: 'auto', marginTop: '11vh' }}>
            <GenericTableComponent<UserResponse>
                store={userStore}
                renderCell={renderCell}
                entityColumns={columns}
                entityName={findTranslation('User', language)}
                confirmationModalComponent={
                    <ConfirmationModal
                        open={false}
                        onResult={() => { }}
                        closeModal={() => { }}
                        title={findTranslation('ConfirmAction', language)}
                        message={findTranslation('sureQuestion', language)}
                    />
                }
            />
        </Segment>
    );
};

export default observer(ManageUserPage);
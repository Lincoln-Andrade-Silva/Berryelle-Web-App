import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import {Grid, GridColumn, Menu, MenuItem, Segment} from "semantic-ui-react";
import ManageProductPage from "./section/ManageProductPage.tsx";
import ManageUserPage from "./section/ManageUserPage";
import {findTranslation} from "../../app/common/language/translations.ts";
import CreateProductPage from "../form/CreateProductPage.tsx";
import {useStore} from "../../app/store/store.tsx";

const ManagePage: React.FC = () => {
    const {commonStore: {language}, productsStore: {setSearchTerm, setSelectedProduct, setActiveItem, setFormValues, initialFormValues, activeItem}} = useStore();

    const menuItems = [
        {key: 'createProducts', label: findTranslation('createProducts', language), component: <CreateProductPage/>},
        {key: 'manageProducts', label: findTranslation('manageProducts', language), component: <ManageProductPage/>},
        {key: 'manageUsers', label: findTranslation('manageUsers', language), component: <ManageUserPage/>},
    ];

    const activeComponent = menuItems.find((item) => item.key === activeItem)?.component;

    const handleItemClick = (key: string) => {
        setActiveItem(key);
        setSelectedProduct(null);
        setFormValues(initialFormValues);
    };

    useEffect(() => {
        setActiveItem('createProducts');
        setSearchTerm(null);
        setFormValues(initialFormValues);
    }, []);

    return (
        <Grid className="manage-grid"
              style={{
                  color: 'white',
                  maxWidth: '90vw',
                  marginLeft: '5vw',
                  marginRight: '5vw',
                  paddingTop: '15vh',
                  backgroundColor: 'transparent'
              }}
        >
            <GridColumn width={2} className="manage-column">
                <Menu className="manage-menu" pointing secondary vertical fluid>
                    {menuItems.map((item) => (
                        <MenuItem
                            key={item.key}
                            name={item.key}
                            active={activeItem === item.key}
                            onClick={() => handleItemClick(item.key)}
                        >
                            {item.label}
                        </MenuItem>
                    ))}
                </Menu>
            </GridColumn>
            <GridColumn width={12}>
                <Segment basic style={{flex: 1, padding: "20px"}}>
                    {activeComponent && activeComponent}
                </Segment>
            </GridColumn>
        </Grid>
    );
};

export default observer(ManagePage);
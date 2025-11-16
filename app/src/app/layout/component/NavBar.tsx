import {observer} from 'mobx-react-lite';
import {useEffect, useState} from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import {Container, Icon, Image, Menu, Popup, Segment} from "semantic-ui-react";
import {findTranslation} from '../../common/language/translations';
import {useStore} from '../../store/store';

const NavBar = () => {
    const location = useLocation();
    const [popupOpen, setPopupOpen] = useState(false);
    const {commonStore: {language, changeLanguage, activeItem, setActiveItem}, userStore} = useStore();

    const handleItemClick = async (name: string) => {
        setActiveItem(name);
    };

    const handlePopupItemClick = () => {
        setActiveItem('');
        setPopupOpen(false);
    };

    const menuItems = [
        {key: 'home', label: findTranslation('home', language)},
        {key: 'cart', label: findTranslation('cart', language)},
    ];

    useEffect(() => {
        const currentPath = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
        if (activeItem !== currentPath) {
            setActiveItem(currentPath);
        }
    }, [location.pathname, activeItem, setActiveItem]);

    return (
        <Segment inverted className='navbar'>
            <Container>
                <Menu pointing secondary inverted style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div className='nav-icon'>
                        🍒 Berryelle
                    </div>
                    <div style={{display: 'flex', flex: 1, justifyContent: 'center'}}>
                        {menuItems.map(({key, label}) => (
                            <Menu.Item
                                key={key}
                                name={label}
                                active={activeItem === key}
                                as={NavLink} to={`/${key}`}
                                onClick={() => {
                                    handleItemClick(key).then();
                                }}
                            />
                        ))}
                    </div>
                    <div>
                        {userStore.entity ? (
                            <Menu.Item className="language-nav-icon">
                                <Popup
                                    on="click"
                                    open={popupOpen}
                                    className='navbar'
                                    position="bottom left"
                                    onOpen={() => setPopupOpen(true)}
                                    onClose={() => setPopupOpen(false)}
                                    trigger={
                                        <img
                                            alt="Icon"
                                            className="user-avatar-img"
                                            src={"../../../image/user.png"}
                                        />
                                    }
                                    content={
                                        <Menu vertical size="mini" className='navbar'>
                                            {userStore.entity?.admin && (
                                                <Menu.Item className='navbar' as={NavLink} to="/manage" onClick={() => {
                                                    handlePopupItemClick()
                                                }}>
                                                    <Icon name='birthday cake'/>
                                                    <div className='popup-item'>{findTranslation('manage', language)}</div>
                                                </Menu.Item>
                                            )}
                                            <Menu.Item className='navbar navbar-language-item'
                                                       onClick={() => changeLanguage(language === 'ptbr' ? 'en' : 'ptbr')}>
                                                <Image
                                                    className='language-popup-icon' size='mini'
                                                    src={language === 'ptbr' ? '../../../image/br-flag.png' : '../../../image/us-flag.png'}
                                                />
                                                <div className='popup-item'>{findTranslation('Language', language)}</div>
                                            </Menu.Item>
                                            <Menu.Item className='navbar' onClick={() => {
                                                userStore.logout();
                                                handlePopupItemClick()
                                            }}>
                                                <Icon name='sign-out'/>
                                                <div className='popup-item'>{findTranslation('signout', language)}</div>
                                            </Menu.Item>
                                        </Menu>
                                    }
                                />
                            </Menu.Item>
                        ) : (
                            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <Menu.Item
                                    to="/login"
                                    as={NavLink}
                                    icon="sign in"
                                    className="login-menu-item"
                                    name={findTranslation('login', language)}
                                />
                                <Menu.Item onClick={() => changeLanguage(language === 'ptbr' ? 'en' : 'ptbr')} className="language-menu-item">
                                    <Image
                                        className='language-popup-icon' size='mini'
                                        src={language === 'ptbr' ? '../../../image/br-flag.png' : '../../../image/us-flag.png'}
                                    />
                                    <div className='popup-item'>{findTranslation('Language', language)}</div>
                                </Menu.Item>
                            </div>
                        )}
                    </div>
                </Menu>
            </Container>
        </Segment>
    );
};

export default observer(NavBar);
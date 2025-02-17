import { auth } from '../../firebase';
import { Admin , Resource , List } from 'react-admin';
import {profilData} from "../../model/dataProvider.js";

const Navigationbar = () => {

    const handleLogout = async () => {
        try {
            await auth.signOut(); // Déconnexion
            window.location.replace('/login');
        } catch (err) {
            console.error("Erreur de déconnexion :", err.message);
        }
    };
    const UserList = () => (
        <List>
            <button onClick={handleLogout}>Disconnect</button>
        </List>
    );

    return (
        <>
            <Admin dataProvider={profilData} >
                <Resource name="dashboard" list={UserList}/>
                <Resource name="account" list={UserList}/>
                <Resource name="settings" list={UserList}/>
                <Resource name="disconnect" list={UserList} onClick={handleLogout}/>
                <button onClick={handleLogout}>Disconnect</button>
            </Admin>
        </>
    )
}

export default Navigationbar;
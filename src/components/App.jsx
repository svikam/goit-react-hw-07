import ContactForm from './ContactForm/ContactForm';
import SearchBox from './SearchBox/SearchBox';
import ContactList from './ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, selectError } from "../redux/contactsSlice";
import { fetchContacts} from "../redux/contactsOps";
import { useEffect } from 'react';

const App = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectLoading);
    const isError = useSelector(selectError);
    useEffect(() => {
    dispatch(fetchContacts());
    }, [dispatch]);
    return (
        <div>
            <h1>Phonebook</h1>
            <ContactForm />
            <SearchBox />
            <ContactList />
            {isLoading && <h1>Loading...</h1>}
            {isError && <h2>Something went wrong!</h2>}
        </div>
    );
};

export default App;
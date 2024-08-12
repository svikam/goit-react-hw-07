import ContactForm from './ContactForm/ContactForm';
import SearchBox from './SearchBox/SearchBox';
import ContactList from './ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { selectNameFilter, changeFilter } from "../redux/filtersSlice";
import { selectLoading, selectError } from "../redux/contactsSlice";
import { selectContacts } from "../redux/contactsSlice";
import { fetchContacts, deleteContact, addContact } from "../redux/contactsOps";
import { useEffect } from 'react';

const App = () => {
    const contacts = useSelector(selectContacts);
    const filter = useSelector(selectNameFilter);
    const dispatch = useDispatch();
    const visibleContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    const isLoading = useSelector(selectLoading);
    const isError = useSelector(selectError);
    useEffect(() => {
    dispatch(fetchContacts());
    }, [dispatch]);
    
    const handleAddContact = (newContact) => {
        dispatch(addContact(newContact));
    };
    const handleDeleteContact = (id) => {
        dispatch(deleteContact(id));
    };
    const handleSearch = (search) => {
        dispatch(changeFilter(search));
    };

    return (
        <div>
            <h1>Phonebook</h1>
            <ContactForm onAdd={handleAddContact} />
            <SearchBox value={filter} onFilter={handleSearch} />
            <ContactList contacts={visibleContacts} onDelete={handleDeleteContact} />
            {isLoading && <h1>Loading...</h1>}
            {isError && <h2>Something went wrong!</h2>}
        </div>
    );
};

export default App;